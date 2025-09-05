"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import { FaBullhorn, FaUserPlus, FaArrowRight } from "react-icons/fa";
import { FiChevronsRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";

// Importing datas
import announcementsData from "@/data/Notices/announcements.json";
import recruitmentsData from "@/data/Notices/recruitments.json";

// Helper to automatically determine if an item is new (published in the last 30 days)
const isItemNew = (dateString: string): boolean => {
  if (!dateString) return false;
  const itemDate = new Date(dateString);
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 30);
  return itemDate > tenDaysAgo;
};

// Helper to format the date nicely
const formatPublishedDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function AnnouncementRecruitment() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null); // Ref for the scrollable panel

  // --- UPDATED LOGIC: Using separate data and slicing to get the latest 20 ---
  const announcements = useMemo(() =>
    announcementsData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20),
    []
  );

  const recruitments = useMemo(() =>
    recruitmentsData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20),
    []
  );

  const tabs = [
    { name: "Announcements", icon: FaBullhorn, data: announcements, link: "/announcements"  },
    { name: "Recruitment", icon: FaUserPlus, data: recruitments, link: "/recruitments" },
  ];

  const CurrentIcon = tabs[selectedIndex].icon;

  // --- FUNCTION TO HANDLE TAB CHANGE ---
  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    // Reset scroll to top
    if (panelRef.current) {
      panelRef.current.scrollTop = 0;
    }
  };


  return (
    <div className="relative h-full w-full rounded-2xl border border-white/10 p-4 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] sm:p-6 flex flex-col">
      <Tab.Group selectedIndex={selectedIndex} onChange={handleTabChange}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Title icon={CurrentIcon} as="h3">
            {tabs[selectedIndex].name}
          </Title>
         <Tab.List className="flex items-center gap-1 mt-4 sm:mt-0 bg-slate-800/50 rounded-full p-1 font-heading">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className="relative w-full rounded-full px-4 py-1.5 text-sm font-semibold transition focus:outline-none"
              >
                {({ selected }) => (
                  <>
                    {/* Animated background pill */}
                    {selected && (
                      <motion.div
                        layoutId="active-pill-notices"
                        className="absolute inset-0 bg-slate-700 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {/* Tab text */}
                    <span className={`relative z-10 ${selected ? 'text-white' : 'text-slate-300'}`}>
                      {tab.name}
                    </span>
                  </>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>



        {/* Divider */}
        <motion.div 
          className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        <Tab.Panels ref={panelRef} className="flex-grow space-y-4 h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.name} className="focus:outline-none">
              <div className="space-y-2">
                {tab.data.length > 0 ? (
                  tab.data.map((item, index) => {
                    // --- APPLYING NEW LOGIC ---
                    const isNew = isItemNew(item.date);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {/* --- UPDATED PADDING & GAP FOR MOBILE --- */}
                        <Link href={item.link} className="text-sm group flex items-start gap-2 sm:gap-4 rounded-lg p-3 transition-colors duration-300 hover:bg-white/10 border border-white/10" target="_blank">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/10 mt-1">
                            <FiChevronsRight className="text-base text-amber-500" />
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex items-center">
                              <p className="font-medium text-slate-300 transition-colors duration-300 group-hover:text-amber-500 sm:text-base">{item.title}.{isNew && (
                                <span className=" ml-3 text-xs font-semibold bg-amber-900/70 text-amber-300 px-2 py-0.5 rounded-full">NEW</span>
                              )}</p>
                              
                            </div>
                            {item.date && (
                              <p className="text-sm text-slate-400 mt-1">
                                Published: {formatPublishedDate(item.date)}
                              </p>
                            )}
                          </div>
                          
                          {/* --- UPDATED ARROW TO HIDE ON MOBILE --- */}
                          <FaArrowRight className="hidden sm:block mt-1 flex-shrink-0 text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Link>
                      </motion.div>
                    );
                  })
                ) : (
                  <p className="p-4 text-center text-slate-400">No {tab.name.toLowerCase()} available.</p>
                )}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>

        {/* Divider */}
        <motion.div 
          className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        {/* --- "VIEW ALL" BUTTON WITH CONDITIONAL LOGIC --- */}
        {/* This button will only show if the current tab has data */}
        {tabs[selectedIndex].data.length > 0 && (
          <div className="text-center ">
            <Button
              href={"/news-events"}
              variant="secondary"
              className="inline-flex"
            >
              <span>View All {tabs[selectedIndex].name}</span>
              <FaArrowRight />
            </Button>
          </div>
        )}
        
      </Tab.Group>
    </div>
  );
}