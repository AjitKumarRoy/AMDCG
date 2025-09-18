"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Users, Wrench, BookCopy, Newspaper, LogOut, ChevronLeft, ChevronRight, Images, Inbox, Mail, BookText   } from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Team Members", href: "/admin/team", icon: Users },
  { name: "Publications", href: "/admin/publications", icon: BookCopy },
  { name: "News & Notices", href: "/admin/news-notices", icon: Newspaper },
  { name: "Facilities", href: "/admin/facilities", icon: Wrench },
  { name: "Gallery", href: "/admin/gallery", icon: Images },
  { name: "Applications", href: "/admin/applications", icon: Inbox },
  { name: "Messages", href: "/admin/messages", icon: Mail  },
  { name: "Blog", href: "/admin/blog", icon: BookText },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // On component mount, check the screen width and set the initial state
    const checkScreenWidth = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    checkScreenWidth();
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <aside className={`sticky top-0 h-screen flex-shrink-0 bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 h-[73px] flex items-center justify-between border-b border-slate-800">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-white font-display">AMDCG Admin</h1>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 rounded-md hover:bg-slate-800"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                    isActive ? "bg-amber-600 text-white" : "text-slate-300 hover:bg-slate-800"
                  } ${isCollapsed && "justify-center"}`}
                  title={isCollapsed ? link.name : ""}
                >
                  <link.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{link.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-slate-300 transition-colors hover:bg-red-900/50 ${isCollapsed && "justify-center"}`}
          title={isCollapsed ? "Sign Out" : ""}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}