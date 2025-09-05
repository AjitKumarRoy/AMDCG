"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FiSearch, FiChevronDown, FiChevronUp, FiHome } from "react-icons/fi";
import { mainNavLinks, moreDropdownLinks } from "./NavbarData";

// Define the props for the component
interface DesktopNavProps {
  isMoreOpen: boolean;
  setIsMoreOpen: (isOpen: boolean) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  // --- THIS IS THE CORRECTED LINE ---
  moreDropdownRef: React.RefObject<HTMLDivElement | null>;
  handleCloseAll: () => void;
  isActive: (href: string) => boolean;
  isMoreLinkActive: boolean;
}

// Animation variants for the dropdown
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export function DesktopNav({
  isMoreOpen,
  setIsMoreOpen,
  setIsSearchOpen,
  moreDropdownRef,
  handleCloseAll,
  isActive,
  isMoreLinkActive,
}: DesktopNavProps) {
  return (
    // Set the base text color for the entire desktop nav
    <div className="hidden lg:flex gap-8 items-center text-slate-300 font-heading ">
      {mainNavLinks.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.href === "/" ? <FiHome className="text-xl" /> : undefined}
          isActive={isActive(item.href)}
          onClick={handleCloseAll}
        />
      ))}

      {/* More Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setIsMoreOpen(true)}
        onMouseLeave={() => setIsMoreOpen(false)}
        ref={moreDropdownRef}
      >
        <button
          className={`text-lg font-medium transition-colors duration-300 flex items-center gap-1 group ${
            isMoreOpen || isMoreLinkActive ? "text-cyan-400" : "hover:text-cyan-400"
          }`}
        >
          More
          <span className="text-sm">{isMoreOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
          <Underline isActive={isMoreOpen || isMoreLinkActive} />
        </button>
        <AnimatePresence>
          {isMoreOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[180px] bg-slate-900 border border-slate-800 shadow-xl rounded-lg overflow-hidden py-2"
            >
              {moreDropdownLinks.map((item) => (
                <DropdownLink 
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={isActive(item.href)}
                  onClick={handleCloseAll}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Button */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="p-3 text-slate-300 hover:text-cyan-400 transition-colors duration-300 bg-slate-800 rounded-full hover:bg-slate-700"
        aria-label="Toggle search"
      >
        <FiSearch className="text-xl" />
      </button>
    </div>
  );
}

// NavLink sub-component with updated colors
function NavLink({ href, label, isActive, onClick, icon }: { href: string; label: string; isActive: boolean; onClick: () => void; icon?: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`relative text-lg font-medium transition-colors duration-300 group flex items-center gap-1 ${
        isActive ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      <Underline isActive={isActive} />
    </Link>
  );
}


// Underline sub-component with updated accent color
function Underline({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 transform transition-transform origin-left duration-300 ${
        isActive ? "scaleX-100" : "scaleX-0 group-hover:scaleX-100"
      }`}
    />
  );
}

// --- NEW SUB-COMPONENT FOR DROPDOWN LINKS ---
function DropdownLink({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick: () => void; }) {
  const isExternal = href.startsWith('http');
  const linkClasses = `block px-5 py-2 transition-colors duration-200 text-base ${
    isActive
      ? "bg-cyan-900/50 text-cyan-400"
      : "text-slate-300 hover:bg-slate-800"
  }`;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={linkClasses}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}