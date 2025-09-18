"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
// 1. Import the new icons you'll need
import { FolderKanban, Users, Newspaper, Presentation, BookOpen, FileBadge, Megaphone, UserPlus, CalendarDays, Rss, Wrench, Images, Inbox, Mail, BookText } from "lucide-react";

// 2. Add the new icons to the map
const iconMap = {
  FolderKanban: FolderKanban,
  Users: Users,
  Newspaper: Newspaper,
  Presentation: Presentation,
  BookOpen: BookOpen,
  FileBadge: FileBadge,
  Megaphone: Megaphone,
  UserPlus: UserPlus,
  CalendarDays: CalendarDays,
  Rss: Rss,
  Wrench: Wrench,
  Images: Images,
  Inbox: Inbox,
  Mail: Mail,
  BookText: BookText,
};

interface StatCardProps {
  title: string;
  value: number;
  iconName: keyof typeof iconMap;
}

export function StatCard({ title, value, iconName }: StatCardProps) {
  const countRef = useRef<HTMLParagraphElement>(null);
  const Icon = iconMap[iconName];

  useEffect(() => {
    const node = countRef.current;
    if (!node) return;

    // Animate the number from 0 to the target value
    const controls = animate(0, value, {
      duration: 1.5, // Animation duration in seconds
      onUpdate(latest) {
        // Round the number and update the text content
        node.textContent = Math.round(latest).toString();
      },
    });

    // Cleanup function to stop the animation when the component unmounts
    return () => controls.stop();
  }, [value]);


  return (
     <div className="rounded-lg border border-white/10 bg-black/20 p-6 flex items-center gap-6 transition-colors hover:border-amber-500/50 hover:bg-slate-800/40">
      <div className="bg-amber-500/10 p-4 rounded-lg">
        {Icon && <Icon className="h-8 w-8 text-amber-500" />}
      </div>
      <div>
        <p className="text-slate-400">{title}</p>
        <p ref={countRef} className="text-3xl font-bold text-white">0</p>
      </div>
    </div>
  );
}