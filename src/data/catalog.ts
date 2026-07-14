export type Category = { name: string; slug: string };

export const categories: Category[] = [
  "Rings", "Earrings", "Pendants", "Necklaces", "Bracelets", "Bangles",
  "Solitaires", "Nose Pins", "Anklets", "Chains", "Mangalsutra", "Gifting",
].map((name) => ({ name, slug: name.toLowerCase().replace(/\s+/g, "-") }));

export type Product = {
  id: string;
  name: string;
  cat: string;
  price: number; // INR
  deal?: boolean;
  desc: string;
};

const unitOf = (c: string) =>
  ({ Earrings: "Earrings", Bracelets: "Bracelet", Pendants: "Pendant", Necklaces: "Necklace" } as Record<string, string>)[c] || "Ring";

const rawProducts: [string, string, number, boolean?][] = [
  ["Solitaire Halo Ring", "Rings", 204500, true],
  ["Pavé Heart Pendant", "Pendants", 157800],
  ["Riviera Tennis Bracelet", "Bracelets", 438600, true],
  ["Baguette Drop Earrings", "Earrings", 259400],
  ["Eternity Band", "Rings", 138900],
  ["Marquise Line Necklace", "Necklaces", 361200, true],
  ["Classic Diamond Studs", "Earrings", 83200],
  ["Cushion Cocktail Ring", "Rings", 232900],
  ["The Odalia Ring", "Rings", 91686, true],
  ["The Osla Ring", "Rings", 119441, true],
  ["Aster Halo Ring", "Rings", 84210],
  ["Lumen Drop Earrings", "Earrings", 63500, true],
  ["Riviera Line Bracelet", "Bracelets", 152000],
  ["Marquise Solitaire Pendant", "Pendants", 47800, true],
  ["Eternity Diamond Band", "Rings", 56300],
  ["Classic Diamond Studs II", "Earrings", 38900],
  ["Aurora Solitaire Necklace", "Necklaces", 210500, true],
];

export const products: Product[] = rawProducts.map(([name, cat, price, deal]) => ({
  id: name.toLowerCase().replace(/\s+/g, "-"),
  name, cat, price, deal,
  desc: `Diamond ${unitOf(cat)} in 18Kt White Gold with certified natural diamonds.`,
}));

export const collections = [
  { name: "Nocturne", kicker: "Evening", desc: "Statement pieces for the spotlight.", shot: "dark editorial shot", bg: "linear-gradient(135deg,#2a1a1f,#4a2b33)" },
  { name: "Lumen", kicker: "Everyday", desc: "Featherlight diamonds for daily wear.", shot: "bright product still", bg: "linear-gradient(135deg,#4a5a72,#8fa2b8)" },
  { name: "Ether", kicker: "Bridal", desc: "The pieces you say forever in.", shot: "soft bridal scene", bg: "linear-gradient(135deg,#1a2338,#3a4a63)" },
];

export const lookbook = ([
  ["#OOTD", "#c9a4a8"], ["#StyleInspo", "#a8b0c4"], ["#StackItUp", "#c4b39a"],
  ["#BoldMoves", "#9aa8c4"], ["#EverydayShine", "#c4a8b8"], ["#ArmCandy", "#a8c4b8"],
  ["#WhatIWore", "#b8a8c4"], ["#FestiveGlow", "#c4a89a"],
] as [string, string][]).map(([tag, c]) => ({ tag, bg: `linear-gradient(160deg,${c},#2a3550)` }));

export const designs = [
  { name: "Shoulder Dusters", bg: "linear-gradient(160deg,#5a6478,#2a3550)" },
  { name: "Statement Cuffs", bg: "linear-gradient(160deg,#6a5a5f,#2f2530)" },
  { name: "Y-Necklaces", bg: "linear-gradient(160deg,#4a5a6a,#232f3f)" },
];

export const testimonials = [
  { quote: "It catches light like nothing I own. I never take it off.", name: "Amara S.", role: "Halo Ring" },
  { quote: "The video consult made choosing my bridal set effortless.", name: "Priya & Dev", role: "Ether Collection" },
  { quote: "Ethical, brilliant, and lighter than I expected. Perfect.", name: "Noor K.", role: "Tennis Bracelet" },
];

export const priceFilters = [
  "Below ₹5,000 (239)", "₹5k – ₹25k (717)", "₹25k – ₹50k (762)",
  "₹50k – ₹1L (726)", "₹1L – ₹2L (812)", "₹2L and Above (340)",
];
export const metalFilters = ["White Gold (3228)", "Yellow Gold (2685)", "Rose Gold (1181)", "Platinum (901)"];
export const occasionFilters = ["Everyday (2412)", "Bridal (1740)", "Gifting (1355)", "Office (988)"];
export const certs = ["BIS", "SGL", "IGI", "GSI"];
export const thumbs = [{ gem: true }, { video: true }, { video: true }, { gem: true }, { gem: true }];
