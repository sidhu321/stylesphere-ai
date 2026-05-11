import jacket from "@/assets/p-jacket.jpg";
import sweater from "@/assets/p-sweater.jpg";
import jeans from "@/assets/p-jeans.jpg";
import sneakerWhite from "@/assets/p-sneaker-white.jpg";
import dressGreen from "@/assets/p-dress-green.jpg";
import bag from "@/assets/p-bag.jpg";
import sunglasses from "@/assets/p-sunglasses.jpg";
import shirtWhite from "@/assets/p-shirt-white.jpg";
import coat from "@/assets/p-coat.jpg";
import hoodieBlack from "@/assets/p-hoodie-black.jpg";
import sneakerChunky from "@/assets/p-sneaker-chunky.jpg";
import watch from "@/assets/p-watch.jpg";

import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catSneakers from "@/assets/cat-sneakers.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catHoodies from "@/assets/cat-hoodies.jpg";
import catWatches from "@/assets/cat-watches.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  category: CategorySlug;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  badges?: string[];
};

export type CategorySlug =
  | "women" | "men" | "kids" | "sneakers" | "hoodies" | "watches" | "accessories";

export const categories: { slug: CategorySlug; label: string; image: string; tagline: string }[] = [
  { slug: "women", label: "Women", image: catWomen, tagline: "Atelier essentials" },
  { slug: "men", label: "Men", image: catMen, tagline: "Tailored & raw" },
  { slug: "sneakers", label: "Sneakers", image: catSneakers, tagline: "Drops & icons" },
  { slug: "hoodies", label: "Hoodies", image: catHoodies, tagline: "Heavyweight street" },
  { slug: "kids", label: "Kids", image: catKids, tagline: "Mini icons" },
  { slug: "watches", label: "Watches", image: catWatches, tagline: "Timeless craft" },
  { slug: "accessories", label: "Accessories", image: catAccessories, tagline: "Finishing touches" },
];

const sizesApparel = ["XS", "S", "M", "L", "XL"];
const sizesShoe = ["7", "8", "9", "10", "11"];

export const products: Product[] = [
  {
    id: "atelier-biker-jacket",
    name: "Atelier Biker Jacket",
    brand: "MAISON ECLIPSE",
    price: 18999, mrp: 28999, rating: 4.7, reviews: 312,
    image: jacket, gallery: [jacket, coat, hoodieBlack],
    category: "men",
    colors: [{ name: "Onyx", hex: "#0a0a0a" }, { name: "Espresso", hex: "#3a2418" }],
    sizes: sizesApparel,
    description: "Hand-finished Italian lambskin biker with asymmetric YKK zip and tonal hardware. Cut for the modern silhouette.",
    badges: ["New"],
  },
  {
    id: "cashmere-cocoon-sweater",
    name: "Cashmere Cocoon Sweater",
    brand: "NOIR ATELIER",
    price: 9499, mrp: 13999, rating: 4.8, reviews: 504,
    image: sweater, gallery: [sweater, coat, shirtWhite],
    category: "men",
    colors: [{ name: "Sand", hex: "#d8c8a8" }, { name: "Stone", hex: "#bcb1a0" }],
    sizes: sizesApparel,
    description: "12-gauge Mongolian cashmere knit, oversized cocoon fit with dropped shoulders.",
  },
  {
    id: "selvedge-raw-denim",
    name: "Selvedge Raw Denim",
    brand: "FORGE & CO.",
    price: 7299, mrp: 9999, rating: 4.6, reviews: 218,
    image: jeans, gallery: [jeans, jacket, sneakerWhite],
    category: "men",
    colors: [{ name: "Indigo", hex: "#1b2740" }],
    sizes: sizesApparel,
    description: "14oz Japanese selvedge, slim-tapered cut with copper rivets and hidden chain stitch.",
  },
  {
    id: "halo-low-sneaker",
    name: "Halo Low Sneaker",
    brand: "AURUM",
    price: 12499, mrp: 16999, rating: 4.9, reviews: 1124,
    image: sneakerWhite, gallery: [sneakerWhite, sneakerChunky],
    category: "sneakers",
    colors: [{ name: "Bone", hex: "#f3ece1" }, { name: "Black", hex: "#0a0a0a" }],
    sizes: sizesShoe,
    description: "Whole-cut leather upper with vulcanised gum sole. The clean silhouette, perfected.",
    badges: ["Bestseller"],
  },
  {
    id: "emerald-slip-dress",
    name: "Emerald Silk Slip",
    brand: "MAISON ECLIPSE",
    price: 14999, mrp: 21999, rating: 4.7, reviews: 287,
    image: dressGreen, gallery: [dressGreen],
    category: "women",
    colors: [{ name: "Emerald", hex: "#0e6b4f" }, { name: "Noir", hex: "#0a0a0a" }],
    sizes: sizesApparel,
    description: "Bias-cut silk charmeuse slip with hand-rolled hems. Effortless evening drape.",
    badges: ["Trending"],
  },
  {
    id: "monogram-tote",
    name: "Monogram Carry Tote",
    brand: "OROLUX",
    price: 24999, mrp: 32999, rating: 4.8, reviews: 412,
    image: bag, gallery: [bag],
    category: "accessories",
    colors: [{ name: "Cognac", hex: "#b16a32" }, { name: "Noir", hex: "#0a0a0a" }],
    sizes: ["One Size"],
    description: "Vegetable-tanned full-grain leather tote with brass hardware. Develops a unique patina.",
  },
  {
    id: "icon-aviator",
    name: "Icon Aviator",
    brand: "LUMEN",
    price: 8999, mrp: 11999, rating: 4.6, reviews: 189,
    image: sunglasses, gallery: [sunglasses],
    category: "accessories",
    colors: [{ name: "Gold/Black", hex: "#c8a35a" }],
    sizes: ["One Size"],
    description: "Hand-polished gold-tone frame with gradient zeiss lenses. UV400.",
  },
  {
    id: "linen-sunday-shirt",
    name: "Linen Sunday Shirt",
    brand: "FORGE & CO.",
    price: 5499, mrp: 7499, rating: 4.5, reviews: 142,
    image: shirtWhite, gallery: [shirtWhite, sweater],
    category: "men",
    colors: [{ name: "Optic White", hex: "#f7f5ef" }],
    sizes: sizesApparel,
    description: "Pure Belgian linen, garment-washed for a soft hand. Open Cuban collar.",
  },
  {
    id: "midnight-overcoat",
    name: "Midnight Wool Overcoat",
    brand: "NOIR ATELIER",
    price: 28999, mrp: 39999, rating: 4.9, reviews: 96,
    image: coat, gallery: [coat, jacket],
    category: "men",
    colors: [{ name: "Charcoal", hex: "#2a2a2e" }],
    sizes: sizesApparel,
    description: "Double-breasted virgin wool overcoat. Tailored in Biella, Italy.",
    badges: ["Editor's pick"],
  },
  {
    id: "shadow-hoodie",
    name: "Shadow Heavy Hoodie",
    brand: "AURUM",
    price: 6499, mrp: 8999, rating: 4.7, reviews: 822,
    image: hoodieBlack, gallery: [hoodieBlack],
    category: "hoodies",
    colors: [{ name: "Black", hex: "#0a0a0a" }, { name: "Bone", hex: "#e7dfd1" }],
    sizes: sizesApparel,
    description: "500gsm loopback cotton, garment-dyed for depth. Boxy oversized fit.",
  },
  {
    id: "sand-trail-runner",
    name: "Sand Trail Runner",
    brand: "AURUM",
    price: 13499, mrp: 17999, rating: 4.6, reviews: 463,
    image: sneakerChunky, gallery: [sneakerChunky, sneakerWhite],
    category: "sneakers",
    colors: [{ name: "Sand/Black", hex: "#c8a98a" }],
    sizes: sizesShoe,
    description: "Sculpted EVA midsole with technical mesh upper. Built for the city, styled for the runway.",
    badges: ["New"],
  },
  {
    id: "rose-chronograph",
    name: "Rose Chronograph",
    brand: "OROLUX",
    price: 34999, mrp: 49999, rating: 4.9, reviews: 78,
    image: watch, gallery: [watch],
    category: "watches",
    colors: [{ name: "Rose Gold", hex: "#b76e58" }],
    sizes: ["40mm", "42mm"],
    description: "Swiss automatic chronograph with sapphire crystal and alligator strap.",
    badges: ["Limited"],
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const byCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);
