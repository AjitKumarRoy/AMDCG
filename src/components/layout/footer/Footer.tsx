"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { mainNavLinks, moreDropdownLinks } from './FooterData';
import footerData from './footer.json';
import { Twitter, Linkedin, Github, ChevronUp, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { VisitorCounter } from '@/components/ui/VisitorCounter';

const iconMap = {
  Twitter: Twitter,
  Linkedin: Linkedin,
  Github: Github,
};


// --- NEW SUB-COMPONENT FOR THE PREMIUM UNDERLINE ---
const FooterHeadingUnderline = () => (
  <motion.div 
    className="mt-2 mb-4 h-0.5 w-1/3 bg-gradient-to-r from-cyan-400 to-sky-500"
    initial={{ scaleX: 0, originX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  />
);

// --- UPDATED BACK TO TOP BUTTON LOGIC ---
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Rule 1: Show the button only after scrolling past 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
        
        // Rule 3: When scrolling starts, clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Rule 2: Set a new timeout to hide the button after 2 seconds of no scrolling
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 2000); // 2000 milliseconds = 2 seconds

      } else {
        setIsVisible(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
     <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 h-10 w-10 z-50 rounded-xl bg-cyan-500/80 text-white shadow-lg backdrop-blur-sm transition-opacity duration-300 hover:bg-cyan-500 hover:scale-110 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ChevronUp className="mx-auto h-6 w-6" />
    </motion.button>
  );
};


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] text-slate-400 border-t border-white/50">
      {/* 1. Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Column 1: About ORBI */}
          <motion.div variants={itemVariants} className="lg:col-span-1 lg:border-r-2 lg:border-slate-700 pr-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 border border-white/10 ">
              <Image src={footerData.logoUrl} alt="AMDCG Logo" width={250} height={250} className='rounded-2xl' />
            </Link>
            <div className="text-xl  font-bold text-white mb-2 font-heading">Advanced Materials Development & Characterization Group</div>
            <FooterHeadingUnderline />
            <p className="text-sm">{footerData.brief}</p>
            <div className="mt-6 flex gap-4">
              {footerData.socials.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap];
                return (
                  <Link key={social.name} href={social.link} className="transition-transform hover:scale-110 hover:text-cyan-400" target='_blank'>
                    <Icon className="h-6 w-6" />
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white font-heading">Quick Links</h3>
            <FooterHeadingUnderline />
            <ul className="mt-4 space-y-2">
              {mainNavLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Explore */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white font-heading">Explore</h3>
            <FooterHeadingUnderline />
            <ul className="mt-4 space-y-2">
              {moreDropdownLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="w-full mt-6">
             <VisitorCounter />
             </div>
          </motion.div>
          
          {/* Column 4: Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white font-heading">Contact Us</h3>
            <FooterHeadingUnderline />
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-cyan-400" />
                <address className="not-italic">{footerData.address.line1}, {footerData.address.line2}</address>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-cyan-400" />
                <a href={`mailto:${footerData.contact.email}`} className="hover:text-cyan-400">{footerData.contact.email}</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-cyan-400" />
                <a href={`tel:${footerData.contact.phone}`} className="hover:text-cyan-400">{footerData.contact.phone}</a>
              </div>
            </div>

            {/* Interactive Map Section */}
              <div className="w-full mt-4">
                <iframe
                  src={footerData.googleMapsEmbedUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale transition-all duration-500 hover:grayscale-0 rounded-2xl"
                ></iframe>
              </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. Interactive Map Section */}
      

      {/* 3. Sub-Footer / Copyright Bar */}
      <div className="border-t border-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm font-heading">
          <p>&copy; {currentYear} AMDCG: Advanced Materials Development & Characterization Group. All Rights Reserved.</p>
          <p className="mt-1">
          Designed & Developed by {" "}
          <Link
            href="https://www.linkedin.com/in/ajitroyofficial/" 
            target="_blank"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
          >
            Ajit Kumar Roy
          </Link>
          .
        </p>
        </div>
      </div>

      <BackToTopButton />
    </footer>
  );
}