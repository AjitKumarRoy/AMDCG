import { Title } from "@/components/ui/Title";
import dbConnect from "@/lib/dbConnect";
import { ContactMessage } from "@/lib/models";
import { MessageList } from "./components/MessageList"; 
import { Mail } from "lucide-react";

async function getMessages() {
  await dbConnect();
  const messages = await ContactMessage.find({}).sort({ submittedAt: -1 });
  return JSON.parse(JSON.stringify(messages));
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <Title as="h1" icon={Mail}>Contact Messages</Title>
      <p className="mt-2 text-slate-400">Review messages submitted through your website&apos;s contact form.</p>
      <MessageList messages={messages} />
    </div>
  );
}