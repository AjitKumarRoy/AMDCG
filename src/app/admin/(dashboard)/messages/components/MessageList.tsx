"use client";

import { useState, Fragment } from "react";
import { format } from 'date-fns';
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import { type ContactMessage as IContactMessage } from "@/types";
import { updateMessageStatus } from "../actions";
import toast from "react-hot-toast";

type MessageWithId = IContactMessage & { _id: string };

export function MessageList({ messages }: { messages: MessageWithId[] }) {
  const [localMessages, setLocalMessages] = useState(messages);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const handleStatusToggle = (message: MessageWithId) => {
    const newStatus = message.status === 'New' ? 'Read' : 'New';
    // Optimistically update UI
    setLocalMessages(prev => 
      prev.map(m => m._id === message._id ? { ...m, status: newStatus } : m)
    );
    // Update DB in background
    toast.promise(updateMessageStatus(message._id, newStatus), {
      loading: 'Updating...',
      success: 'Status updated!',
      error: 'Failed to update.',
    });
  };

  return (
    <div className="mt-8">
      <div className="rounded-lg border border-slate-800 overflow-x-auto">
        <table className="min-w-[800px] w-full divide-y divide-slate-800">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-4 text-left border-r border-slate-800 text-amber-400">Status</th>
              <th className="px-6 py-4 text-left border-r border-slate-800 text-amber-400">From</th>
              <th className="px-6 py-4 text-left border-r border-slate-800 text-amber-400">Subject</th>
              <th className="px-6 py-4 text-left border-r border-slate-800 text-amber-400">Received</th>
              <th className="px-6 py-4 text-center text-amber-400">Message</th>
            </tr>
          </thead>
          <tbody className="bg-black/20 divide-y divide-slate-800">
            {localMessages.map((msg) => (
              <Fragment key={msg._id}>
                <tr className={msg.status === 'Read' ? 'bg-slate-800/20 text-slate-500' : ''}>
                  <td className="px-6 py-4 border-r border-slate-800">
                    <Button onClick={() => handleStatusToggle(msg)} variant={msg.status === 'New' ? 'primary' : 'secondary'} >
                      {msg.status}
                    </Button>
                  </td>
                  <td className="px-6 py-4 text-white border-r border-slate-800">{msg.name}</td>
                  <td className="px-6 py-4 border-r border-slate-800">{msg.subject || '-'}</td>
                  <td className="px-6 py-4 border-r border-slate-800">{format(new Date(msg.submittedAt), 'PPP')}</td>
                  <td className="px-6 py-4 text-center">
                    <Button onClick={() => setExpandedRowId(expandedRowId === msg._id ? null : msg._id)} variant="secondary" >
                      View Message <ChevronDown className={`h-4 w-4 transition-transform ${expandedRowId === msg._id ? 'rotate-180' : ''}`} />
                    </Button>
                  </td>
                </tr>
                {expandedRowId === msg._id && (
                  <tr className="bg-slate-900/50">
                    <td colSpan={5} className="p-4 text-sm text-slate-300">
                      <p className="font-semibold">From: <a href={`mailto:${msg.email}`} className="text-sky-400 hover:underline">{msg.email}</a></p>
                      <p className="mt-4 whitespace-pre-wrap">{msg.message}</p>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}