import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, priceFilters, metalFilters, occasionFilters, categories } from "../data/catalog";

export default function Shop() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const activeCat = params.get("cat");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(
    () => (activeCat ? products.filter((p) => p.cat.toLowerCase() === activeCat.toLowerCase() || p.cat === activeCat) : products),
    [activeCat],
  );
  const list = filtered.length ? filtered : products;

  const FilterPanel = (
    <>
      <div className="bg-navy text-white px-5 py-3.5 rounded-t-md font-sans font-bold text-[13px] tracking-[0.1em] uppercase">
        Filters
      </div>
      <div className="border border-navy/10 border-t-0 rounded-b-md px-5 py-6 flex flex-col gap-6">
        <div>
          <div className="font-sans font-bold text-[13px] text-navy mb-3.5">Price</div>
          {priceFilters.map((f) => (
            <label key={f} className="flex items-center gap-2.5 py-1.5 cursor-pointer font-sans text-[13px] text-ink/75">
              <span className="w-[15px] h-[15px] border-[1.5px] border-navy/35 rounded-[3px] flex-none" />
              {f}
            </label>
          ))}
        </div>
        <div className="border-t border-navy/10 pt-5">
          <div className="font-sans font-bold text-[13px] text-navy mb-3.5">Metal</div>
          {metalFilters.map((f) => (
            <label key={f} className="flex items-center gap-2.5 py-1.5 cursor-pointer font-sans text-[13px] text-ink/75">
              <span className="w-[15px] h-[15px] border-[1.5px] border-navy/35 rounded-[3px] flex-none" />
              {f}
            </label>
          ))}
        </div>
        <div className="border-t border-navy/10 pt-5">
          <div className="font-sans font-bold text-[13px] text-navy mb-3.5">Occasion</div>
          {occasionFilters.map((f) => (
            <label key={f} className="flex items-center gap-2.5 py-1.5 cursor-pointer font-sans text-[13px] text-ink/75">
              <span className="w-[15px] h-[15px] border-[1.5px] border-navy/35 rounded-[3px] flex-none" />
              {f}
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section className="bg-white min-h-[80vh] pb-24">
      <div className="max-w-[1400px] mx-auto pt-5 px-4 md:px-8 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-ink/50">
        <span onClick={() => navigate("/")} className="cursor-pointer text-gold">Home</span> &nbsp;/&nbsp; <span className="text-ink">Jewellery</span>
      </div>

      <div className="max-w-[1400px] mx-auto mt-4 px-4 md:px-8">
        <div className="rounded-lg overflow-hidden flex items-center justify-between px-6 md:px-12 py-6 md:py-0 md:h-[120px] text-white gap-4 flex-wrap" style={{ background: "linear-gradient(90deg,#12213f,#2b3f6b)" }}>
          <span className="font-serif text-xl md:text-3xl font-medium">Old is the new gold?</span>
          <span className="flex items-center gap-5">
            <span className="font-serif font-semibold text-lg md:text-2xl text-champagne text-right leading-tight">Big Gold<br />Upgrade</span>
            <span className="px-5 py-3 border border-champagne text-champagne rounded font-sans font-bold text-xs tracking-[0.1em] uppercase cursor-pointer transition-all hover:bg-champagne hover:text-navy">
              Try Now
            </span>
          </span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-6 px-4 md:px-8 flex items-baseline gap-4">
        <h1 className="m-0 font-serif font-semibold text-2xl md:text-[34px] text-gold tracking-wide">
          {activeCat || "Jewellery"}
        </h1>
        <span className="w-px h-5 bg-navy/20 self-center" />
        <span className="font-sans text-sm text-ink/55">{list.length} Designs shown (of 10,000+)</span>
      </div>

      <div className="max-w-[1400px] mx-auto mt-4 px-4 md:px-8">
        <div className="bg-blush rounded-lg px-5 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2.5">
            <span className="px-5 py-2 bg-navy text-white rounded font-sans font-bold text-[11px] tracking-[0.08em] uppercase cursor-pointer">All</span>
            <button onClick={() => setFilterOpen(true)} className="lg:hidden px-5 py-2 bg-white border border-navy/15 rounded font-sans font-bold text-[11px] tracking-[0.08em] uppercase text-ink">
              Filters
            </button>
          </div>
          <div className="flex gap-2.5 items-center">
            <span className="px-4 py-2 border border-gold text-gold rounded font-sans font-bold text-[11px] tracking-[0.06em] cursor-pointer">⌖ Pincode</span>
            <span className="px-4 py-2 border border-navy/20 rounded font-sans font-semibold text-xs text-ink cursor-pointer">Popular ▾</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-6 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
        <aside className="hidden lg:block">{FilterPanel}</aside>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setFilterOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-[85vw] max-w-[340px] bg-white overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-navy/10">
              <span className="font-serif font-semibold text-navy">Filters</span>
              <button onClick={() => setFilterOpen(false)} className="text-2xl leading-none text-navy">×</button>
            </div>
            <div className="px-5">{FilterPanel}</div>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto mt-2 px-4 md:px-8 flex flex-wrap gap-2 lg:hidden">
        {categories.slice(0, 6).map((c) => (
          <span key={c.slug} onClick={() => navigate(`/shop?cat=${encodeURIComponent(c.name)}`)} className="px-3 py-1.5 border border-navy/15 rounded-full text-xs text-ink/70 cursor-pointer">
            {c.name}
          </span>
        ))}
      </div>
    </section>
  );
}
