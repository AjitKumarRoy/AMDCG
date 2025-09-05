"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FiSearch, FiMenu, FiX, FiHome, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AnimatedTitle } from "./AnimatedTitle";
import { mainNavLinks, moreDropdownLinks } from "./NavbarData";

// Define props
interface MobileNavProps {
  isMobileMenuOpen: boolean;
  isMoreOpen: boolean;
  handleMobileMenuToggle: () => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  setIsMoreOpen: (isOpen: boolean) => void;
  mobileMenuRef: React.RefObject<HTMLDivElement | null>;
  handleCloseAll: () => void;
  isActive: (href: string) => boolean;
  isMoreLinkActive: boolean;
}

// Animation variants for the mobile menu and its dropdown
const mobileMenuVariants: Variants = {
  hidden: { x: "-100%", transition: { duration: 0.4, ease: "easeOut" } },
  visible: { x: "0%", transition: { duration: 0.4, ease: "easeIn" } },
};
const dropdownVariants: Variants = {
  hidden: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
};

export function MobileNav({
  isMobileMenuOpen,
  isMoreOpen,
  handleMobileMenuToggle,
  setIsSearchOpen,
  setIsMoreOpen,
  mobileMenuRef,
  handleCloseAll,
  isActive,
  isMoreLinkActive,
}: MobileNavProps) {
  return (
    <>
      {/* Mobile Icons (Hamburger & Search) */}
      <div className="flex lg:hidden items-center justify-end w-full gap-4">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 text-slate-300 hover:text-cyan-400 transition-colors"
          aria-label="Toggle search"
        >
          <FiSearch className="text-xl" />
        </button>
        <button
          onClick={handleMobileMenuToggle}
          className="p-2 text-slate-300 hover:text-cyan-400 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="fixed top-0 left-0 w-64 h-screen bg-slate-950 shadow-2xl z-50 flex flex-col lg:hidden"
          >
            <div className="flex justify-between items-center p-5 border-b border-slate-800">
              <Link href="/" onClick={handleCloseAll}><AnimatedTitle /></Link>
            </div>
            <div className="flex-1 p-5 flex flex-col gap-2 overflow-y-auto">
              {mainNavLinks.map((item) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.href === "/" ? <FiHome className="text-xl" /> : undefined}
                  isActive={isActive(item.href)}
                  onClick={handleCloseAll}
                />
              ))}
              {/* More Accordion */}
              <div>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`w-full text-left py-3 px-3 rounded-lg flex items-center justify-between font-medium text-lg transition-colors ${
                    isMoreOpen || isMoreLinkActive ? "bg-cyan-900/50 text-cyan-400" : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  More {isMoreOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="pl-6 mt-2 border-l-2 border-cyan-400/30 flex flex-col gap-1"
                    >
                      {moreDropdownLinks.map((item) => (
                        <MobileNavLink key={item.href} href={item.href} label={item.label} isActive={isActive(item.href)} onClick={handleCloseAll} isSubLink />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Sub-component for a single mobile navigation link
function MobileNavLink({ href, label, isActive, onClick, icon, isSubLink = false }: { href: string; label: string; isActive: boolean; onClick: () => void; icon?: React.ReactNode; isSubLink?: boolean }) {
  const linkClass = isSubLink
    ? "px-4 py-2 rounded-md text-base"
    : "py-3 px-3 rounded-lg font-medium text-lg flex items-center gap-3";
  
  const finalClassName = `${linkClass} block w-full text-left transition-colors duration-200 ${
    isActive
      ? "bg-cyan-900/50 text-cyan-400"
      : "text-slate-300 hover:bg-slate-800"
  }`;

  const isExternal = href.startsWith('http');

  // For external links, we render a <button> to ensure the action is not cancelled.
  if (isExternal) {
    return (
      <button
        // This onClick ONLY opens the new tab. It does not try to close the menu.
        onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
        className={finalClassName}
      >
        {icon} {label}
      </button>
    );
  }
  
  // For internal links, we use the Next.js <Link> component with the closing function.
  return (
    <Link
      href={href}
      className={finalClassName}
      onClick={onClick}
    >
      {icon} {label}
    </Link>
  );
}