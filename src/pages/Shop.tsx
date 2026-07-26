import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, priceFilterOptions, metalFilterOptions, colourFilterOptions, categories, type FilterOption } from "../data/catalog";
import { useStore } from "../context/StoreContext";

function FilterGroup({ title, options, active, onToggle }: { title: string; options: FilterOption[]; active: Set<string>; onToggle: (key: string) => void }) {
  return (
    <div className="border-t border-champagne/15 pt-5 first:border-t-0 first:pt-0">
      <div className="font-sans font-bold text-[13px] text-champagne mb-3.5">{title}</div>
      {options.map((f) => (
        <label key={f.key} className="flex items-center gap-2.5 py-1.5 cursor-pointer font-sans text-[13px] text-cream/75">
          <input
            type="checkbox"
            checked={active.has(f.key)}
            onChange={() => onToggle(f.key)}
            className="w-[15px] h-[15px] accent-gold flex-none"
          />
          {f.label}
        </label>
      ))}
    </div>
  );
}

export default function Shop() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { notify } = useStore();
  const activeCat = params.get("cat");
  const searchTerm = (params.get("search") || "").toLowerCase().trim();
  const [filterOpen, setFilterOpen] = useState(false);
  const [price, setPrice] = useState<Set<string>>(new Set());
  const [metal, setMetal] = useState<Set<string>>(new Set());
  const [colour, setColour] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, key: string) => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    setter(next);
  };

  const list = useMemo(() => {
    let out = activeCat ? products.filter((p) => p.cat.toLowerCase() === activeCat.toLowerCase()) : products;
    if (searchTerm) out = out.filter((p) => p.name.toLowerCase().includes(searchTerm) || p.cat.toLowerCase().includes(searchTerm));
    if (price.size) out = out.filter((p) => priceFilterOptions.some((f) => price.has(f.key) && f.test(p)));
    if (metal.size) out = out.filter((p) => metalFilterOptions.some((f) => metal.has(f.key) && f.test(p)));
    if (colour.size) out = out.filter((p) => colourFilterOptions.some((f) => colour.has(f.key) && f.test(p)));
    return out;
  }, [activeCat, searchTerm, price, metal, colour]);

  const anyActive = price.size > 0 || metal.size > 0 || colour.size > 0;
  const clearAll = () => { setPrice(new Set()); setMetal(new Set()); setColour(new Set()); };

  const FilterPanel = (
    <>
      <div className="bg-navy-light text-cream px-5 py-3.5 rounded-t-md font-sans font-bold text-[13px] tracking-[0.1em] uppercase flex items-center justify-between">
        Filters
        {anyActive && (
          <button onClick={clearAll} className="text-[10px] font-semibold text-gold normal-case tracking-normal">Clear</button>
        )}
      </div>
      <div className="border border-champagne/15 border-t-0 rounded-b-md px-5 py-6 flex flex-col gap-6">
        <FilterGroup title="Price" options={priceFilterOptions} active={price} onToggle={(k) => toggle(price, setPrice, k)} />
        <FilterGroup title="Metal" options={metalFilterOptions} active={metal} onToggle={(k) => toggle(metal, setMetal, k)} />
        <FilterGroup title="Colour" options={colourFilterOptions} active={colour} onToggle={(k) => toggle(colour, setColour, k)} />
      </div>
    </>
  );

  return (
    <section className="bg-navy min-h-[80vh] pb-24">
      <div className="max-w-[1400px] mx-auto pt-5 px-4 md:px-8 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-cream/50">
        <span onClick={() => navigate("/")} className="cursor-pointer text-gold">Home</span> &nbsp;/&nbsp; <span className="text-cream">Jewellery</span>
      </div>

      <div className="max-w-[1400px] mx-auto mt-4 px-4 md:px-8">
        <div className="rounded-lg overflow-hidden flex flex-col md:flex-row items-center justify-between text-center md:text-left px-6 md:px-12 py-6 md:py-0 md:h-[120px] text-cream gap-4 flex-wrap" style={{ background: "linear-gradient(90deg,#1a1510,#3a2c15)" }}>
          <span className="font-serif text-xl md:text-3xl font-medium">Old is the new gold?</span>
          <span className="flex items-center gap-5">
            <span className="font-serif font-semibold text-lg md:text-2xl text-champagne text-center md:text-right leading-tight">Big Gold<br />Upgrade</span>
            <button
              onClick={() => notify("10+1 Gold Plan — coming soon")}
              className="px-5 py-3 border border-champagne text-champagne rounded font-sans font-bold text-xs tracking-[0.1em] uppercase cursor-pointer transition-all hover:bg-champagne hover:text-navy"
            >
              Try Now
            </button>
          </span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-6 px-4 md:px-8 flex justify-center md:justify-start items-baseline gap-4 flex-wrap text-center md:text-left">
        <h1 className="m-0 font-serif font-semibold text-2xl md:text-[34px] text-gold tracking-wide truncate max-w-full">
          {searchTerm ? `Search: "${searchTerm}"` : activeCat || "Jewellery"}
        </h1>
        <span className="w-px h-5 bg-champagne/20 self-center" />
        <span className="font-sans text-sm text-cream/55">{list.length} Designs</span>
      </div>

      <div className="max-w-[1400px] mx-auto mt-4 px-4 md:px-8">
        <div className="bg-navy-light rounded-lg px-5 py-3.5 flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-4">
          <div className="flex gap-2.5 justify-center flex-wrap">
            <span
              onClick={() => { navigate(activeCat ? "/shop" : "/shop"); clearAll(); }}
              className="px-5 py-2 bg-gold text-navy rounded font-sans font-bold text-[11px] tracking-[0.08em] uppercase cursor-pointer"
            >
              All
            </span>
            <button onClick={() => setFilterOpen(true)} className="lg:hidden px-5 py-2 bg-navy border border-champagne/20 rounded font-sans font-bold text-[11px] tracking-[0.08em] uppercase text-cream">
              Filters
            </button>
          </div>
          <div className="flex gap-2.5 items-center justify-center flex-wrap">
            <button onClick={() => notify("Pincode delivery check — coming soon")} className="px-4 py-2 border border-gold text-gold rounded font-sans font-bold text-[11px] tracking-[0.06em] cursor-pointer">⌖ Pincode</button>
            <button onClick={() => notify("Sort — coming soon")} className="px-4 py-2 border border-champagne/25 rounded font-sans font-semibold text-xs text-cream cursor-pointer">Popular ▾</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-6 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
        <aside className="hidden lg:block">{FilterPanel}</aside>

        {list.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-champagne">No designs match these filters</p>
            <p className="mt-2 font-sans text-sm text-cream/60">Try clearing a filter or browse everything instead.</p>
            <span onClick={() => { clearAll(); navigate("/shop"); }} className="inline-block mt-6 px-7 py-3 bg-gold text-navy rounded font-sans font-bold text-xs tracking-[0.1em] uppercase cursor-pointer">
              Browse All Jewellery
            </span>
          </div>
        )}
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setFilterOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-[85vw] max-w-[340px] bg-navy overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-champagne/15">
              <span className="font-serif font-semibold text-champagne">Filters</span>
              <button onClick={() => setFilterOpen(false)} className="text-2xl leading-none text-champagne">×</button>
            </div>
            <div className="px-5">{FilterPanel}</div>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto mt-2 px-4 md:px-8 flex flex-wrap justify-center gap-2 lg:hidden">
        {categories.slice(0, 6).map((c) => (
          <span key={c.slug} onClick={() => navigate(`/shop?cat=${encodeURIComponent(c.name)}`)} className="px-3 py-1.5 border border-champagne/25 rounded-full text-xs text-cream/70 cursor-pointer whitespace-nowrap">
            {c.name}
          </span>
        ))}
      </div>
    </section>
  );
}
