export const money = (n: number) => "₹" + n.toLocaleString("en-IN");
export const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
