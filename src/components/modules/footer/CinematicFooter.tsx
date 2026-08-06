'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

const SOCIAL_LINKS = [
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/explore/tags/uncledrewcafe/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  { 
    name: 'Facebook', 
    url: 'https://www.facebook.com/uncledrewcafe/?fref=ts',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    )
  },
  { 
    name: 'Google Maps', 
    url: 'https://www.google.com/maps/place/uncle+drew+cafe/data=!4m2!3m1!1s0x6ad6430f1f9794eb:0x79ebc9daebfdf339?sa=X&ved=1t:242&ictx=111',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    )
  },
];

const CAFE_HOURS = [
  { day: 'Monday', time: '6:30am – 3pm' },
  { day: 'Tuesday', time: '6:30am – 3pm' },
  { day: 'Wednesday', time: '6:30am – 3pm' },
  { day: 'Thursday', time: '6:30am – 3pm' },
  { day: 'Friday', time: '6:30am – 3pm' },
  { day: 'Saturday', time: '7:30am – 3pm' },
  { day: 'Sunday', time: '8am – 3pm' },
];

export default function CinematicFooter() {
  const shouldReduceMotion = useReducedMotion();
  const [currentMelbourneDay, setCurrentMelbourneDay] = useState<string>('');
  const [melbourneTime, setMelbourneTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = now.toLocaleString('en-US', { timeZone: 'Australia/Melbourne', weekday: 'long' });
      const time = now.toLocaleTimeString('en-US', { timeZone: 'Australia/Melbourne', hour: 'numeric', minute: '2-digit', hour12: true });

      setCurrentMelbourneDay(day);
      setMelbourneTime(`${time} LOCAL`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  return (
    <footer className="relative w-full bg-[#F3F0E7] text-[#1A1A1A] overflow-hidden selection:bg-[#1A1A1A] selection:text-[#F3F0E7] border-t-2 border-[#1A1A1A]">
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span 
          className="text-[18vw] font-bold uppercase tracking-widest text-[#1A1A1A] opacity-[0.03] whitespace-nowrap leading-none"
          style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
        >
          Uncle Drew
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-24 pb-12 md:pb-16">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInVariants}
          className="text-center mb-16 md:mb-24"
        >
          <h2 
            className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight text-[#1A1A1A]"
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            Come for the coffee.<br />
            <span className="text-[#8B3A2B]/80">Stay for the stories.</span>
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          // FIX: Reduced gap for mobile layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16 md:mb-20"
        >
          
          <motion.div variants={fadeInVariants} className="space-y-4">
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-mono font-bold">
              Explore
            </h3>
            <ul className="space-y-2 md:space-y-3 font-medium tracking-wide text-sm md:text-base">
              {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((item) => {
                const route = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                return (
                  <li key={item}>
                    <Link 
                      href={route}
                      className="inline-block hover:translate-x-1 transition-transform duration-300 hover:text-[#8B3A2B]"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div variants={fadeInVariants} className="space-y-4">
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-mono font-bold">
              Visit Us
            </h3>
            <div className="space-y-2 text-sm leading-relaxed text-[#1A1A1A]/80">
              <p className="font-bold text-[#1A1A1A]">Uncle Drew Cafe</p>
              <p>23 Groom St<br />Clifton Hill VIC 3068<br />Australia</p>
              <p className="pt-2 font-mono text-xs md:text-sm">+61 (03) 9400 2026</p>
              <p className="font-mono text-xs md:text-sm">e-uncledrewcafe@gmail.com</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInVariants} className="space-y-4">
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-mono font-bold">
              Cafe Policy
            </h3>
            <div className="relative p-5 border-2 border-dashed border-[#8B3A2B]/40 bg-[#F7F2E8] rounded-sm transform rotate-[-1deg]">
              <p 
                className="text-base md:text-lg font-bold uppercase tracking-wider text-[#8B3A2B] mb-2"
                style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
              >
                No Bookings
              </p>
              <p className="text-xs leading-relaxed text-[#1A1A1A]/80 font-medium">
                We operate on a strictly walk-in basis to ensure everyone gets a fair seat at the counter. Come on by, we'll find a place for you.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInVariants} className="space-y-8 lg:pl-4">
            <div>
              <h3 className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-mono font-bold mb-4">
                Opening Hours
              </h3>
              <ul className="space-y-1.5 w-full max-w-[220px]">
                {CAFE_HOURS.map(({ day, time }) => {
                  const isToday = currentMelbourneDay === day;
                  return (
                    <li 
                      key={day} 
                      className={`flex justify-between items-center text-sm transition-colors duration-300 ${
                        isToday ? 'text-[#8B3A2B] font-bold scale-[1.02] origin-left' : 'text-[#1A1A1A]/70 font-medium'
                      }`}
                    >
                      <span>{day}</span>
                      <span className="font-mono text-[10px] md:text-xs">{time}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 flex items-center gap-2 pt-4 border-t border-[#1A1A1A]/10 max-w-[220px]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B3A2B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B3A2B]"></span>
                </span>
                <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-widest text-[#1A1A1A]/70 uppercase">
                  {melbourneTime || 'Loading Time...'}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-mono font-bold mb-3">
                Connect
              </h3>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="
                      w-10 h-10 rounded-full border border-[#1A1A1A]/20 
                      flex items-center justify-center text-[#1A1A1A]
                      transition-all duration-300 ease-out bg-[#F7F4EC]
                      hover:-translate-y-1 hover:border-[#8B3A2B] hover:bg-[#8B3A2B] hover:text-[#F3F0E7] hover:shadow-[0_4px_10px_rgba(139,58,43,0.3)]
                      focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2 focus:ring-offset-[#F3F0E7]
                    "
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>

        <div className="w-full h-[2px] bg-[#1A1A1A]/10 mb-6 md:mb-8" />

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          // FIX: Changed flex direction and text alignment for mobile
          className="flex flex-col md:flex-row items-center text-center md:text-left justify-center md:justify-between text-[9px] md:text-[11px] tracking-widest uppercase text-[#1A1A1A]/50 gap-2 md:gap-4 font-mono font-bold"
        >
          <p>© 2026 Uncle Drew Cafe. All rights reserved.</p>
          <p>Crafted with ❤️ by Rudra.</p>
        </motion.div>

      </div>
    </footer>
  );
}