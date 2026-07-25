import { useNavigate } from "react-router-dom";
import type { Product } from "../data/catalog";
import { useStore } from "../context/StoreContext";
import { money } from "../lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWish, isWished } = useStore();
  const navigate = useNavigate();
  const wished = isWished(product.id);

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-navy-light border border-champagne/20 rounded-[10px] overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_26px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-square bg-cream-alt flex items-center justify-center">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        {product.deal && (
          <span className="absolute top-3 left-3 text-[9px] font-sans font-bold tracking-[0.08em] text-rose bg-navy/80 px-2 py-1 rounded">
            OFFER
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWish(product); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-navy/80 shadow-[0_3px_10px_rgba(0,0,0,0.4)] flex items-center justify-center text-base"
          style={{ color: wished ? "#e2495f" : "#e6c56f" }}
          aria-label="Toggle wishlist"
        >
          {wished ? "♥" : "♡"}
        </button>
      </div>
      <div className="p-4">
        <div className="font-sans text-[9px] tracking-[0.18em] uppercase text-gold">{product.cat}</div>
        <div className="mt-1.5 font-serif font-semibold text-lg text-champagne leading-tight">{product.name}</div>
        <div className="font-sans font-semibold text-[15px] text-cream mt-0.5">{money(product.price)}</div>
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="mt-3.5 w-full py-3 bg-gold text-navy border-0 rounded font-sans font-bold text-[11px] tracking-[0.12em] uppercase cursor-pointer transition-colors hover:bg-champagne"
        >
          Add to Bag
        </button>
      </div>
    </article>
  );
}
