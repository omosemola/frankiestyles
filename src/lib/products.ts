export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  description: string;
  details: string[];
  images: string[];
  sizes: string[];
}

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Emerald Prestige Agbada Set",
    price: 280000,
    category: "Agbadas",
    image: "/images/product-1-front.png",
    isNew: true,
    description: "Make a statement in this luxury emerald green Agbada set. Handcrafted from premium structured cotton, featuring custom ivory embroidery, tailored trousers (sokoto), and matching under-shirt. Perfect for prestige celebrations.",
    details: [
      "Complete 3-piece traditional Agbada set",
      "Premium structured cotton-linen blend fabric",
      "Ivory geometric embroidery detailing",
      "Tailored trousers and matching fila cap included",
      "Dry clean only"
    ],
    images: [
      "/images/product-1-front.png",
      "/images/product-1-back.png",
      "/images/product-1-detail.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "2",
    name: "Olive Textured Luxury Kaftan",
    price: 220000,
    category: "Kaftans",
    image: "/images/product-2-front.png",
    description: "An exquisite olive-mustard yellow Kaftan suit tailored from textured premium fabric. Features a clean round neckline, structured mid-length drape, and matching trousers for a modern, sophisticated style.",
    details: [
      "Two-piece bespoke Kaftan set",
      "Textured premium cotton-blend fabric",
      "Classic round neckline with hidden placket",
      "Tailored trousers included",
      "Dry clean or delicate hand wash"
    ],
    images: [
      "/images/product-2-front.png",
      "/images/product-2-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "3",
    name: "Sky Blue Prestige Senator",
    price: 350000,
    originalPrice: 400000,
    category: "Senator Wears",
    image: "/images/product-3-front.png",
    description: "Elevate your wardrobe with this prestigious sky blue short-sleeve Senator suit. Features a custom hand-embroidered neckline, flared trousers, and premium structured fabric designed for a commanding presence.",
    details: [
      "Two-piece premium Senator set",
      "Soft, structured wool-blend fabric",
      "Short-sleeve top with custom neckline embroidery",
      "Includes flared, tailored trousers",
      "Dry clean only"
    ],
    images: [
      "/images/product-3-front.png",
      "/images/product-3-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "4",
    name: "Prestige Black Dry Lace Kaftan Set",
    price: 390000,
    category: "Kaftans",
    image: "/images/product-4-front.png",
    description: "Make a statement in this prestige black dry lace Kaftan. Artfully tailored from premium dry lace fabric, it features a structured semi-translucent layout, matching buba under-shirt, and tailored trousers.",
    details: [
      "Two-piece luxury dry lace Kaftan set",
      "Semi-translucent premium dry lace fabric",
      "Round neck collar with front button layout",
      "Includes tailored trousers and black under-lining fabric",
      "Dry clean only"
    ],
    images: [
      "/images/product-4-front.png",
      "/images/product-4-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "5",
    name: "Turquoise Textured Kaftan Set",
    price: 220000,
    category: "Kaftans",
    image: "/images/product-5-front.png",
    description: "Stand out in this vibrant turquoise Kaftan set, meticulously tailored from premium textured cotton. Features a sleek round neck, tailored mid-length drape, and matching trousers for a modern look.",
    details: [
      "Two-piece bespoke Kaftan set",
      "Vibrant turquoise textured premium fabric",
      "Hidden button neck placket",
      "Tailored trousers included",
      "Dry clean or delicate hand wash"
    ],
    images: [
      "/images/product-5-front.png",
      "/images/product-5-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "6",
    name: "Prestige Olive Dry Lace Kaftan Set",
    price: 390000,
    category: "Kaftans",
    image: "/images/product-6-front.png",
    description: "Make a statement in this prestige olive green dry lace Kaftan. Artfully tailored from premium dry lace fabric, it features a structured semi-translucent layout, matching buba under-shirt, and tailored trousers.",
    details: [
      "Two-piece luxury dry lace Kaftan set",
      "Semi-translucent premium dry lace fabric",
      "Round neck collar with front button layout",
      "Includes tailored trousers and olive under-lining fabric",
      "Dry clean only"
    ],
    images: [
      "/images/product-6-front.png",
      "/images/product-6-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "7",
    name: "Prestige Purple Dry Lace Kaftan Set",
    price: 390000,
    category: "Kaftans",
    image: "/images/product-7-front.png",
    description: "Make a statement in this prestige purple dry lace Kaftan. Artfully tailored from premium dry lace fabric, it features a structured semi-translucent layout, matching buba under-shirt, and tailored trousers.",
    details: [
      "Two-piece luxury dry lace Kaftan set",
      "Semi-translucent premium dry lace fabric",
      "Round neck collar with front button layout",
      "Includes tailored trousers and purple under-lining fabric",
      "Dry clean only"
    ],
    images: [
      "/images/product-7-front.png",
      "/images/product-7-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "8",
    name: "Grey Premium Linen Short Set",
    price: 120000,
    category: "Senator Wears",
    image: "/images/product-8-front.png",
    description: "Experience relaxed luxury in this premium grey linen two-piece short set. Expertly crafted from lightweight, breathable pure linen, featuring a short-sleeve button-down shirt and matching tailored shorts.",
    details: [
      "Two-piece casual linen set",
      "100% premium lightweight breathable linen",
      "Short-sleeve button-up shirt with classic collar",
      "Tailored shorts with comfortable drawstring waist",
      "Machine wash cold or dry clean"
    ],
    images: [
      "/images/product-8-front.png",
      "/images/product-8-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "9",
    name: "Prestige White Dry Lace Kaftan Set",
    price: 390000,
    category: "Kaftans",
    image: "/images/product-9-front.png",
    description: "Make a statement in this prestige white dry lace Kaftan. Artfully tailored from premium dry lace fabric, it features a structured semi-translucent layout, matching buba under-shirt, and tailored trousers.",
    details: [
      "Two-piece luxury dry lace Kaftan set",
      "Semi-translucent premium dry lace fabric",
      "Round neck collar with front button layout",
      "Includes tailored trousers and white under-lining fabric",
      "Dry clean only"
    ],
    images: [
      "/images/product-9-front.png",
      "/images/product-9-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "10",
    name: "Off-White Geometric Senator Suit",
    price: 155000,
    category: "Senator Wears",
    image: "/images/product-10-front.png",
    description: "An exquisite off-white cream Senator suit tailored from textured premium fabric. Features a clean round neckline, a pocket detailed with custom geometric embroidery, and matching tailored trousers.",
    details: [
      "Two-piece bespoke Senator suit",
      "Textured premium cotton-blend fabric",
      "Chest pocket with custom geometric embroidery",
      "Tailored trousers included",
      "Dry clean only"
    ],
    images: [
      "/images/product-10-front.png",
      "/images/product-10-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "11",
    name: "Cream Prestige Jalabiya Set",
    price: 250000,
    category: "Kaftans",
    image: "/images/product-11-front.png",
    description: "Experience majestic elegance in this cream Jalabiya set. Masterfully tailored from premium flowy fabric, featuring rich V-shaped chest embroidery and standard tassels. Includes shemagh headscarf.",
    details: [
      "Premium full-length Jalabiya robe",
      "Soft, breathable flowy fabric",
      "V-shaped detailed chest embroidery",
      "Includes shemagh headscarf and tassels",
      "Dry clean only"
    ],
    images: [
      "/images/product-11-front.png",
      "/images/product-11-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "12",
    name: "Modern Charcoal Kaftan",
    price: 185000,
    category: "Kaftans",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
    description: "A dark charcoal gray Kaftan featuring an ultra-modern geometric zipper collar instead of buttons. Ideal for tech-forward modern gentlemen.",
    details: [
      "Polyester-rayon heavy stretch blend",
      "Gunmetal zipper neckline detail",
      "Structured shoulder profile",
      "Includes tailored pants",
      "Machine wash safe"
    ],
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "13",
    name: "Textured Cream Senator",
    price: 155000,
    category: "Senator Wears",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    description: "Crafted from highly textured linen, this Cream Senator suit boasts a modern diagonal button closure and premium bone buttons.",
    details: [
      "Diagonal button placket detailing",
      "Handmade bone buttons",
      "Highly breathable linen texture fabric",
      "Custom comfort waist trousers included",
      "Hand wash cold"
    ],
    images: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "14",
    name: "Classic Fila Cap - Red",
    price: 25000,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2000&auto=format&fit=crop",
    description: "A premium, hand-woven cotton Fila cap (Aso-Oke style). Features soft, foldable sides that allow you to style it to your preference. An essential finish to any native wear.",
    details: [
      "100% hand-woven cotton Aso-Oke",
      "Flexible, foldable structure",
      "Traditional Nigerian cap styling",
      "Spot clean only"
    ],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2000&auto=format&fit=crop"
    ],
    sizes: [
      "M (22.5\" Head)",
      "L (23.5\" Head)",
      "XL (24.5\" Head)",
      "Custom Measure"
    ]
  },
  {
    id: "15",
    name: "Hand-Carved Walking Stick",
    price: 75000,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1537151172096-74b34ba859ee?q=80&w=2000&auto=format&fit=crop",
    description: "An elegant, hand-carved walking stick made of premium solid mahogany wood. Accented with a polished silver brass handle, perfect for completion of a regal Agbada look.",
    details: [
      "Bespoke solid Mahogany wood shaft",
      "Polished solid brass handle",
      "Durable rubber safety tip",
      "Hand-polished wax finish"
    ],
    images: [
      "https://images.unsplash.com/photo-1537151172096-74b34ba859ee?q=80&w=2000&auto=format&fit=crop"
    ],
    sizes: [
      "M (34\" Length)",
      "L (36\" Length)",
      "XL (38\" Length)",
      "Custom Measure"
    ]
  },
  {
    id: "16",
    name: "Brocade Cap - Gold",
    price: 30000,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=2000&auto=format&fit=crop",
    description: "Elevate your Senator or Kaftan look with this premium gold brocade Fila cap. Features high rigidity structure that stays upright.",
    details: [
      "Rigid luxury gold brocade fabric",
      "Traditional crown structure",
      "Inside lining for scalp comfort",
      "Dry clean only"
    ],
    images: [
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=2000&auto=format&fit=crop"
    ],
    sizes: [
      "M (22.5\" Head)",
      "L (23.5\" Head)",
      "XL (24.5\" Head)",
      "Custom Measure"
    ]
  },
  {
    id: "17",
    name: "Imperial White Agbada",
    price: 380000,
    category: "Agbadas",
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1934&auto=format&fit=crop",
    description: "The peak of traditional luxury. An all-white Imperial Agbada set showcasing intricate silver and white embroidery. Cut from structured heavy cotton.",
    details: [
      "Premium heavy-weave structured cotton",
      "Bespoke silver and white embroidery",
      "Includes Buba inner shirt and Sokoto pants",
      "Generous side drape design",
      "Professional dry clean only"
    ],
    images: [
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1934&auto=format&fit=crop"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "18",
    name: "Navy Blue Senator Wear",
    price: 145000,
    category: "Senator Wears",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=2069&auto=format&fit=crop",
    description: "A dark Navy Blue Senator suit featuring clean lines and a modern zip closure on the shoulder for comfortable wear. Cut from luxury crepe.",
    details: [
      "Premium Italian wool-crepe base",
      "Invisible zipper shoulder closure",
      "Tonal piping along chest panel",
      "Includes tailored sokoto trousers",
      "Dry clean only"
    ],
    images: [
      "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=2069&auto=format&fit=crop"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "19",
    name: "Pastel Pink Luxury Kaftan",
    price: 195000,
    category: "Kaftans",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop",
    isNew: true,
    description: "Make a soft statement. This Pastel Pink Kaftan features structured shoulders, clean cuffs, and highly minimalist hand-done white chest embroidery.",
    details: [
      "Premium cotton-polyester polished blend",
      "White hand-embroidered minimalist chest detail",
      "Hidden front button closure",
      "Comfort-fit sokoto pants included",
      "Hand wash cold"
    ],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  },
  {
    id: "20",
    name: "Classic Fila Cap - Blue",
    price: 25000,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2000&auto=format&fit=crop",
    description: "A premium Royal Blue hand-woven Fila cap in traditional Aso-Oke style. Completes any native wear look with distinction.",
    details: [
      "100% hand-woven cotton Aso-Oke",
      "Flexible structure for custom folding shapes",
      "Inside lining for longevity",
      "Spot clean only"
    ],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2000&auto=format&fit=crop"
    ],
    sizes: [
      "M (22.5\" Head)",
      "L (23.5\" Head)",
      "XL (24.5\" Head)",
      "Custom Measure"
    ]
  }
];
