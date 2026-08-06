export interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
}

export interface MenuCategory {
  categoryId: string;
  categoryLabel: string;
  items: MenuItem[];
}

// ----------------------------------------------------------------------
// FEATURED FAVOURITES
// A curated showcase of Uncle Drew's best photography and signature items.
// ----------------------------------------------------------------------
export const FEATURED_MENU: MenuCategory[] = [
  {
    categoryId: 'morning',
    categoryLabel: 'Morning',
    items: [
      {
        id: 'bircher-muesli',
        title: 'Bircher Muesli',
        image: '/images/featured-menu/morning/bircher-muesli.webp',
      },
      {
        id: 'baked-eggs',
        title: 'Baked Eggs',
        image: '/images/featured-menu/morning/baked-eggs.webp',
      },
      {
        id: 'oyster-mushroom-omelette',
        title: 'Oyster Mushroom Omelette',
        image: '/images/featured-menu/morning/oyster-mushroom-omelette.webp',
      },
      {
        id: 'brekkie-roll',
        title: 'Brekkie Roll',
        image: '/images/featured-menu/morning/brekkie-roll.webp',
      }
    ]
  },
  {
    categoryId: 'bagels-sandwiches',
    categoryLabel: 'Bagels & Sandwiches',
    items: [
      {
        id: 'mortadella-burrata-bagel',
        title: 'Mortadella & Burrata Bagel',
        image: '/images/featured-menu/bagels-sandwiches/mortadella-burrata-bagel.webp',
      },
      {
        id: 'traditional-ny-style-burrata-blt-bagel',
        title: 'Traditional NY Style Burrata BLT Bagel',
        image: '/images/featured-menu/bagels-sandwiches/traditional-ny-style-burrata-blt-bagel.webp',
      },
      {
        id: 'ny-style-bagel',
        title: 'NY Style Bagel',
        image: '/images/featured-menu/bagels-sandwiches/ny-style-bagel.webp',
      },
      {
        id: 'pork-cutlet-parma-sandwich',
        title: 'Pork Cutlet Parma Sandwich',
        image: '/images/featured-menu/bagels-sandwiches/pork-cutlet-parma-sandwich.webp',
      }
    ]
  },
  {
    categoryId: 'signature-dishes',
    categoryLabel: 'Signature Dishes',
    items: [
      {
        id: 'chicken-schnitzel-wrap',
        title: 'Chicken Schnitzel Wrap',
        image: '/images/featured-menu/signature-dishes/chicken-schnitzel-wrap.webp',
      },
      {
        id: 'red-pesto-tomato-gnocchi',
        title: 'Red Pesto & Tomato Gnocchi',
        image: '/images/featured-menu/signature-dishes/red-pesto-tomato-gnocchi.webp',
      },
      {
        id: 'sausage-chickpea-stew',
        title: 'Sausage & Chickpea Stew',
        image: '/images/featured-menu/signature-dishes/sausage-chickpea-stew.webp',
      },
      {
        id: 'avo-breakfast',
        title: 'Avo Breakfast',
        image: '/images/featured-menu/signature-dishes/avo-breakfast.webp',
      }
    ]
  },
  {
    categoryId: 'coffee',
    categoryLabel: 'Coffee',
    items: [
      {
        id: 'hot-latte',
        title: 'Hot Latte',
        image: '/images/featured-menu/coffee/hot-latte.webp',
      },
      {
        id: 'iced-coffee',
        title: 'Iced Coffee',
        image: '/images/featured-menu/coffee/iced-coffee.webp',
      }
    ]
  },
  {
    categoryId: 'sweet-finish',
    categoryLabel: 'Sweet Finish',
    items: [
      {
        id: 'blackberry-raspberry-cream-cheese-crumb',
        title: 'Blackberry Raspberry & Cream Cheese Crumb',
        image: '/images/featured-menu/sweet-finish/blackberry-raspberry-cream-cheese-crumb.webp',
      }
    ]
  }
];