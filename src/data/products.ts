import type { Product, Category } from "@/hooks/useProducts";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Mugs",
    description: "Mugs en céramique au design unique",
    created_at: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "cat-2",
    name: "Tumblers",
    description: "Gobelets isothermes pour vos boissons",
    created_at: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "cat-3",
    name: "Travel Mugs",
    description: "Mugs de voyage compacts et élégants",
    created_at: "2025-01-01T00:00:00.000Z",
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Mug Ember Noir",
    description:
      "Un mug en céramique au fini dégradé noir et argenté, alliant élégance et robustesse. Sa forme arrondie offre une prise en main confortable, idéal pour savourer votre café ou thé préféré.",
    price: 89,
    image_url: "/assets/products-images/mug-easer.png",
    images: [
      "/assets/products-images/mug-easer.png",
      "/assets/products-images/mug2-easer.png",
    ],
    category_id: "cat-1",
    available: true,
    colors: [
      { name: "Noir Charbon", hex: "#2C2C2C" },
      { name: "Blanc Cassé", hex: "#F5F0E8" },
      { name: "Bordeaux", hex: "#722F37" },
    ],
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-01-15T10:00:00.000Z",
    category: {
      id: "cat-1",
      name: "Mugs",
      description: "Mugs en céramique au design unique",
    },
  },
  {
    id: "prod-2",
    name: "Tumbler Sakura Rose",
    description:
      "Gobelet isotherme rose pastel avec couvercle et paille en acier inoxydable. Design moderne et féminin, parfait pour garder vos boissons froides ou chaudes pendant des heures.",
    price: 129,
    image_url: "/assets/products-images/n1-easer.png",
    images: [
      "/assets/products-images/n1-easer.png",
      "/assets/products-images/n2-easer.png",
    ],
    category_id: "cat-2",
    available: true,
    colors: [
      { name: "Rose Sakura", hex: "#F4A7B9" },
      { name: "Bleu Glacier", hex: "#A8C5DA" },
      { name: "Vert Sauge", hex: "#8FAF8F" },
      { name: "Noir Mat", hex: "#1A1A1A" },
    ],
    createdAt: "2025-01-20T10:00:00.000Z",
    updatedAt: "2025-01-20T10:00:00.000Z",
    category: {
      id: "cat-2",
      name: "Tumblers",
      description: "Gobelets isothermes pour vos boissons",
    },
  },
  {
    id: "prod-3",
    name: "Travel Mug Bronze",
    description:
      "Mug de voyage en acier inoxydable finition cuivre brossé avec couvercle flip-top étanche. Compact et résistant, il vous accompagne partout avec style et praticité.",
    price: 149,
    image_url: "/assets/products-images/p1-easer.png",
    images: [
      "/assets/products-images/p1-easer.png",
      "/assets/products-images/p2.webp",
      "/assets/products-images/p3.webp",
    ],
    category_id: "cat-3",
    available: true,
    colors: [
      { name: "Bronze Cuivré", hex: "#B87333" },
      { name: "Noir Mat", hex: "#1A1A1A" },
      { name: "Argent", hex: "#C0C0C0" },
    ],
    createdAt: "2025-02-01T10:00:00.000Z",
    updatedAt: "2025-02-01T10:00:00.000Z",
    category: {
      id: "cat-3",
      name: "Travel Mugs",
      description: "Mugs de voyage compacts et élégants",
    },
  },
  {
    id: "prod-4",
    name: "Tumbler Glacier Blanc",
    description:
      "Gobelet isotherme blanc élégant avec anse et couvercle à verrouillage. Double paroi en acier inoxydable pour une isolation optimale. Design minimaliste et moderne.",
    price: 119,
    image_url: "/assets/products-images/t1 easer.jpg",
    images: [
      "/assets/products-images/t1 easer.jpg",
      "/assets/products-images/t2.webp",
    ],
    category_id: "cat-2",
    available: true,
    colors: [
      { name: "Blanc Glacier", hex: "#F0F4F8" },
      { name: "Noir Mat", hex: "#1A1A1A" },
      { name: "Bleu Nuit", hex: "#1B2A4A" },
      { name: "Rose Poudré", hex: "#F2C4CE" },
    ],
    createdAt: "2025-02-10T10:00:00.000Z",
    updatedAt: "2025-02-10T10:00:00.000Z",
    category: {
      id: "cat-2",
      name: "Tumblers",
      description: "Gobelets isothermes pour vos boissons",
    },
  },
];
