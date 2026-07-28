import dummyImage from "../../../images/outfit/dummy.webp";

const blazer1 = dummyImage;
const blazer2 = dummyImage;

const jacket1 = dummyImage;
const jacket2 = dummyImage;

const shirt1 = dummyImage;
const shirt2 = dummyImage;

const sneakers1 = dummyImage;
const sneakers2 = dummyImage;

export const products = [
  {
    id: 1,
    name: "Premium Black Blazer",
    category: "Men",
    price: 85000,
    oldPrice: 105000,
    rating: 4.9,

    images: [
      blazer1,
      blazer2,
    ],

    badge: "NEW",

    description:
      "Crafted from premium Italian wool with a modern tailored fit. Perfect for formal occasions, business meetings, and elegant evening events.",

    colors: ["Black", "Grey"],

    sizes: ["S", "M", "L", "XL"],

    sku: "BLZ-001",

    stock: 12,
  },

  {
    id: 2,
    name: "Luxury Leather Jacket",
    category: "Men",
    price: 120000,
    oldPrice: 150000,
    rating: 5,

    images: [
      jacket1,
      jacket2,
    ],

    badge: "HOT",

    description:
      "Premium genuine leather jacket featuring a slim-fit silhouette, durable craftsmanship, and timeless luxury styling.",

    colors: ["Black", "Brown"],

    sizes: ["M", "L", "XL"],

    sku: "JKT-002",

    stock: 8,
  },

  {
    id: 3,
    name: "Oversized Cotton Shirt",
    category: "Women",
    price: 35000,
    oldPrice: 48000,
    rating: 4.8,

    images: [
      shirt1,
      shirt2,
    ],

    badge: "-30%",

    description:
      "Soft premium cotton oversized shirt designed for maximum comfort with a relaxed contemporary fit.",

    colors: ["White", "Blue"],

    sizes: ["S", "M", "L"],

    sku: "SHT-003",

    stock: 15,
  },

  {
    id: 4,
    name: "Premium Sneakers",
    category: "Shoes",
    price: 72000,
    oldPrice: 89000,
    rating: 4.9,

    images: [
      sneakers1,
      sneakers2,
    ],

    badge: "NEW",

    description:
      "Luxury everyday sneakers designed with lightweight cushioning, breathable materials, and exceptional comfort.",

    colors: ["White", "Black"],

    sizes: ["40", "41", "42", "43", "44"],

    sku: "SNK-004",

    stock: 20,
  },
];