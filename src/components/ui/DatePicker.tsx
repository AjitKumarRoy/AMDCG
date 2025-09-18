"use client";

import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  label: string;
  name: string;
  initialDate?: Date;
  required?: boolean;
}

export function DatePicker({ label, name, initialDate, required }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);
  const [month, setMonth] = useState<Date>(initialDate || new Date());
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

// --- UPDATED DATE RANGE ---
  const currentYear = new Date().getFullYear();
  const fromMonth = new Date(currentYear - 25, 0); // 25 years in the past
  const toMonth = new Date(currentYear + 10, 11);  // 10 years in the future

  return (
    <div>
      <label className="block text-xs font-medium text-slate-400">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative mt-1" ref={popoverRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full cursor-default rounded-md border border-slate-700 bg-slate-800/50 py-2.5 pl-3 pr-10 text-left text-sm text-white focus:outline-none focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <span className={selectedDate ? 'text-white' : 'text-slate-400'}>
            {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 mt-1 rounded-md border border-slate-700 bg-slate-800 p-2 shadow-lg"
            >
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setIsOpen(false);
                }}
                month={month}
                onMonthChange={setMonth}
                // --- UPDATED PROPS FOR YOUR LIBRARY VERSION ---
                captionLayout="dropdown"
                startMonth={fromMonth}
                endMonth={toMonth}
                autoFocus
                classNames={{
                  caption: 'flex justify-center py-2 mb-2 relative items-center',
                  caption_label: 'text-sm font-medium text-white hidden', // Now used by dropdown
                  caption_dropdowns: 'flex gap-2',
                  dropdown: 'px-2 py-1.5 rounded-md bg-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500',
                   nav_button: 'h-6 w-6 bg-transparent p-1 rounded-md hover:bg-slate-700',
                  nav_button_previous: 'absolute left-1',
                    nav_button_next: 'absolute right-1',
                    table: 'w-full border-collapse',
                    head_row: 'flex font-medium text-slate-300',
                    head_cell: 'p-2 text-sm w-9',
                    row: 'flex w-full mt-2',
                    cell: 'text-white rounded-md h-9 w-9 text-sm p-0 flex items-center justify-center',
                    day: 'hover:bg-slate-700 rounded-md',
                    day_today: 'text-amber-400',
                    day_selected: 'bg-amber-600 text-white hover:bg-amber-500',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <input
        type="hidden"
        name={name}
        value={selectedDate ? selectedDate.toISOString() : ''}
      />
    </div>
  );
}