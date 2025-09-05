"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { AnimatedTitle } from "./AnimatedTitle";
import Logo from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { moreDropdownLinks } from "./NavbarData";


const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (isMoreOpen && moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen, isMoreOpen]);

  const handleCloseAll = () => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
    setIsSearchOpen(false);
  };

  const handleMobileMenuToggle = () => {
    if (!isMobileMenuOpen && navRef.current && window.scrollY < navRef.current.offsetTop) {
      window.scrollTo({ top: navRef.current.offsetTop, behavior: "smooth" });
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isMoreLinkActive = moreDropdownLinks.some((link) => pathname.startsWith(link.href));

  return (
    <nav
      ref={navRef}
      // --- UPDATED THIS LINE ---
      className="sticky top-0 w-full z-50 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] backdrop-blur-lg border-b border-slate-800 font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/" onClick={handleCloseAll}>
            <AnimatedTitle />
          </Link>
        </div>

        {isMounted && (
          <>
            <DesktopNav
              isMoreOpen={isMoreOpen}
              setIsMoreOpen={setIsMoreOpen}
              setIsSearchOpen={setIsSearchOpen}
              moreDropdownRef={moreDropdownRef}
              handleCloseAll={handleCloseAll}
              isActive={isActive}
              isMoreLinkActive={isMoreLinkActive}
            />
            <MobileNav
              isMobileMenuOpen={isMobileMenuOpen}
              isMoreOpen={isMoreOpen}
              handleMobileMenuToggle={handleMobileMenuToggle}
              setIsSearchOpen={setIsSearchOpen}
              setIsMoreOpen={setIsMoreOpen}
              mobileMenuRef={mobileMenuRef}
              handleCloseAll={handleCloseAll}
              isActive={isActive}
              isMoreLinkActive={isMoreLinkActive}
            />
          </>
        )}
      </div>

      {isMounted && isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
    </nav>
  );
};

export default Navbar;