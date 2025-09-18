"use client";

import { useState, Fragment } from "react";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";

interface CustomSelectProps {
  label: string;
  name: string;
  options: string[];
  initialValue?: string;
  className?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
}

export function CustomSelect({ label, name, options, initialValue, className, required, onValueChange }: CustomSelectProps) {
  const [selectedValue, setSelectedValue] = useState(initialValue || options[0]);

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue); // --- CALL THE NEW CALLBACK ---
  };

  return (
    <div className={className}>
      <Listbox value={selectedValue} onChange={handleChange} name={name}>
        <div className="relative">
          <label htmlFor={name} className="block text-xs font-medium text-slate-400 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
          <ListboxButton className="relative w-full cursor-default rounded-md border border-slate-700 bg-slate-800/50 py-2.5 pl-3 pr-10 text-left text-sm text-white focus:outline-none focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500">
            <span className="block truncate">{selectedValue}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm custom-scrollbar">
              {options.map((option, optionIdx) => (
                <ListboxOption
                  key={optionIdx}
                  className="relative cursor-default select-none py-2 pl-10 pr-4 text-slate-300 data-[active]:bg-amber-600/20 data-[active]:text-amber-400"
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-500">
                          <Check className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}