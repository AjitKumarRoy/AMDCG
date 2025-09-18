"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Title } from "@/components/ui/Title";  
import { Button } from "@/components/ui/Button";
import { type Event } from "@/types";

type EventWithId = Event & { _id: string };

// Importing datas
// import eventsData from "@/data/Notices/events.json";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return { day, month, year };
};

export function UpcomingEvents({ events }: { events: EventWithId[] }) {
  const upcomingEvents = useMemo(() => {
    // Get the exact time now
    const now = new Date();
    
    // Create a new date object representing the beginning of today (midnight)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return events
      // Compare the event date with the start of today
      .filter(event => new Date(event.date).getTime() >= startOfToday.getTime())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 20);
  }, []);

  return (
     <div className="relative h-full w-full rounded-2xl border border-white/10 p-4 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] sm:p-6 flex flex-col">
      {/* className="relative h-full w-full rounded-2xl border border-white/10 p-4 bg-black/20  shadow-2xl backdrop-blur-md sm:p-6" */}
      <Title icon={FaCalendar} as="h3">
        Upcoming Events
      </Title>

      {/* --- PREMIUM DIVIDER --- */}
      <motion.div 
        className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-6"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      />
      {/* --- END OF DIVIDER --- */}
      

      <div className="flex-grow space-y-4 h-[350px] overflow-y-auto pr-2 custom-scrollbar ">
        {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
          {/* --- THIS LINK STRUCTURE IS NOW CORRECTED --- */}
                <Link href={`/news-events/event/${event.slug}`} className="text-sm group flex items-center justify-between rounded-lg p-3 transition-colors duration-300 hover:bg-white/10 border border-white/10" target="_blank">
                  {/* Date and Text are now grouped together */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-center font-bold w-20 border-r-2 border-slate-700 pr-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl text-white">{formatDate(event.date).day}</span>
                        <span className="text-base text-amber-500">{formatDate(event.date).month}</span>
                      </div>
                      <div className="h-px bg-slate-700 my-1"></div>
                      <p className="text-sm text-slate-400">{formatDate(event.date).year}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-200 group-hover:text-amber-500 transition-colors duration-300 mb-1">{event.title}</h4>
                      {event.location && (
                        <div className="flex items-center text-slate-400 text-sm">
                          <FaMapMarkerAlt className="mr-2" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                {/* --- UPDATED ARROW TO HIDE ON MOBILE --- */}
                <FaArrowRight className="hidden sm:block mt-1 flex-shrink-0 text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            </Link>
          </motion.div>
        ))
        ) : (
          <p className="p-4 text-center text-slate-400">No events available.</p>
        )}
      </div>

       {/* --- PREMIUM DIVIDER --- */}
      <motion.div 
        className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-6"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      />
      {/* --- END OF DIVIDER --- */}

       {/* --- THIS BUTTON IS NOW CONDITIONAL --- */}
      {upcomingEvents.length > 0 && (
        <div className="text-center ">
            <Button href="/news-events" variant="secondary" className="inline-flex">
              <span>View All Events</span>
              <FaArrowRight />
            </Button>
        </div>
      )}

    </div>
  );
}