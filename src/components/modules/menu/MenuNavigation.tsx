'use client';

import React from 'react';

const CATEGORIES = [
  { name: 'BAKERY & BOWLS', targetIndex: 1 },
  { name: 'TOASTIES & BRUNCH', targetIndex: 2 },
  { name: 'MAINS & WRAPS', targetIndex: 3 },
  { name: 'DESSERTS & SIDES', targetIndex: 4 },
  { name: 'COFFEE', targetIndex: 5 },
  { name: 'HOT & ICED DRINKS', targetIndex: 6 },
  { name: 'TEA & SOFT DRINKS', targetIndex: 7 },
  { name: 'JUICES', targetIndex: 8 },
  { name: 'SMOOTHIES & SHAKES', targetIndex: 9 },
  { name: 'MATCHA', targetIndex: 10 },
  { name: 'KOMBUCHA', targetIndex: 11 },
  { name: 'ALCOHOLIC DRINKS', targetIndex: 12 },
];

interface MenuNavigationProps {
  activeCategoryIndex?: number;
  onSelectCategory?: (targetPageIndex: number) => void;
}

export default function MenuNavigation({
  activeCategoryIndex = 0,
  onSelectCategory,
}: MenuNavigationProps) {
  return (
    <nav className="w-64 flex-shrink-0 pt-32 pb-12 pl-10 h-screen sticky top-0 overflow-y-auto hidden lg:block z-40 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
<ul className="flex flex-col gap-4">
        {CATEGORIES.map((category) => {
          const isActive = category.targetIndex === activeCategoryIndex;
          return (
            <li key={category.name}>
              <button
                onClick={() => onSelectCategory?.(category.targetIndex)}
                className={`text-left uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    // REDUCED: text-lg for active
                    ? 'font-bold text-lg opacity-100 text-[#1A1A1A] translate-x-2'
                    // REDUCED: text-base for inactive
                    : 'font-normal text-base opacity-60 text-[#1A1A1A] hover:opacity-100 hover:translate-x-1'
                }`}
                style={{ fontFamily: "'Indie Flower', cursive" }}
              >
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}