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
    name: "Sky Blue Embroidered Kaftan Set",
    price: 195000,
    category: "Kaftans",
    image: "/images/product-12-front.png",
    description: "Command attention in this clean Sky Blue traditional Kaftan set. Expertly tailored with subtle white floral chest embroidery, complete with tailored trousers and matching fila cap. Designed for light, prestige summer wear.",
    details: [
      "Complete 3-piece traditional Kaftan set",
      "Premium lightweight cotton-linen blend",
      "Artisan white chain-stitch chest embroidery",
      "Includes comfort-fit trousers and matching fila cap",
      "Dry clean only"
    ],
    images: [
      "/images/product-12-front.png",
      "/images/product-12-back.png"
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
    name: "Prestige Oatmeal Linen Set",
    price: 165000,
    category: "Senator Wears",
    image: "/images/product-13-front.png",
    description: "Relax in absolute distinction. This Prestige Oatmeal Linen Set features a premium short-sleeve button-up shirt and matching tailored trousers. Handcrafted from luxury, breathable linen for unmatched comfort.",
    details: [
      "Complete 2-piece linen shirt and trouser set",
      "Premium structured Italian oatmeal linen",
      "Minimalist hidden button-down front with pocket detailing",
      "Includes tailored comfort-fit trousers",
      "Dry clean recommended"
    ],
    images: [
      "/images/product-13-front.png",
      "/images/product-13-back.png"
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
    name: "Prestige Black Jacquard Senator Suit",
    price: 175000,
    category: "Senator Wears",
    image: "/images/product-18-front.png",
    description: "Command elegance in this premium Textured Black Onyx Senator suit. Expertly cut from luxury textured damask/jacquard wool-blend fabric, featuring a signature gold crest back neck embroidery, and complete with tailored trousers and matching Fila cap. The absolute pinnacle of modern traditional wear.",
    details: [
      "Complete 2-piece traditional Senator suit with custom Fila cap",
      "Premium textured jacquard wool-blend base fabric",
      "Signature gold FS crest embroidery on the back of the neck",
      "Includes tailored comfort-fit trousers and matching Fila cap",
      "Dry clean only"
    ],
    images: [
      "/images/product-18-front.png",
      "/images/product-18-back.png"
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
    name: "Classic Navy Senator Suit",
    price: 155000,
    category: "Senator Wears",
    image: "/images/product-19-front.png",
    isNew: true,
    description: "Command elegance in this classic Navy Blue Senator suit. Designed with elbow-length sleeves, a minimalist chest panel, a signature pocket accent, and tailored trousers. Perfect for prestigious gatherings and events.",
    details: [
      "Complete 2-piece traditional Senator suit",
      "Premium wool-blend crepe fabric",
      "Elbow-length sleeve cut with clean cuff stitch",
      "Includes custom comfort-fit tailored trousers",
      "Dry clean recommended"
    ],
    images: [
      "/images/product-19-front.png",
      "/images/product-19-back.png"
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
    id: "17",
    name: "Navy Blue Royal Agbada Set",
    price: 295000,
    category: "Agbadas",
    image: "/images/product-17-front.png",
    isNew: true,
    description: "Command the room in this majestic navy blue traditional Agbada set. Exquisitely tailored with custom chest embroidery, paired with matching pants, an inner shirt, and a traditional cap. Impeccable drape for elite celebrations.",
    details: [
      "Complete 3-piece traditional Agbada set",
      "Premium heavy-weave cotton-crepe fabric",
      "Tonal custom embroidery detailing",
      "Includes custom-tailored sokoto and matching under-shirt",
      "Dry clean only"
    ],
    images: [
      "/images/product-17-front.png",
      "/images/product-17-back.png"
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
    id: "22",
    name: "Luxury Isiagu Deer Motif Set",
    price: 220000,
    category: "IGBO",
    image: "/images/product-22-front.png",
    isNew: true,
    description: "Honor heritage with this exceptional Ivory and Red Isiagu set. Designed with a custom deer motif print, matching trousers, and a traditional red chieftaincy cap with an authentic feather. Absolute prestige for traditional ceremonies.",
    details: [
      "Complete traditional Igbo Isiagu set",
      "Premium soft-brushed heritage cotton fabric",
      "Vibrant custom deer-head pattern print",
      "Includes dark brown trousers and red chieftaincy cap with feather",
      "Dry clean only"
    ],
    images: [
      "/images/product-22-front.png",
      "/images/product-22-back.png"
    ],
    sizes: [
      "M (Chest 38-40\")",
      "L (Chest 41-43\")",
      "XL (Chest 44-46\")",
      "XXL (Chest 47-49\")",
      "XXXL (Chest 50-52\")",
      "Custom Measure"
    ]
  }
];
