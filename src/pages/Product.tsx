import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products, certs, thumbs } from "../data/catalog";
import { useStore } from "../context/StoreContext";
import { money } from "../lib/format";

const sizes = ["8", "10", "12", "14", "16", "18"];

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWish, isWished } = useStore();
  const [size, setSize] = useState<string | null>(null);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [pincode, setPincode] = useState("");

  const product = products.find((p) => p.id === slug) ?? products[0];
  const wished = isWished(product.id);

  return (
    <section className="bg-white pb-20">
      <div className="max-w-[1400px] mx-auto pt-5 px-4 md:px-8 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-ink/50">
        <span onClick={() => navigate("/")} className="cursor-pointer text-gold">Home</span> &nbsp;/&nbsp;{" "}
        <span onClick={() => navigate("/shop")} className="cursor-pointer text-gold">Jewellery</span> &nbsp;/&nbsp;{" "}
        <span onClick={() => navigate(`/shop?cat=${encodeURIComponent(product.cat)}`)} className="cursor-pointer text-gold">{product.cat}</span> &nbsp;/&nbsp;{" "}
        <span className="text-ink">{product.name}</span>
      </div>

      <div className="max-w-[1300px] mx-auto mt-5 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
        {/* Gallery */}
        <div className="lg:sticky lg:top-[110px]">
          <div className="relative aspect-square bg-cream-alt rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 [background:repeating-linear-gradient(45deg,transparent,transparent_16px,rgba(26,35,56,.03)_16px,rgba(26,35,56,.03)_32px)]" />
            <img src="/diamond.png" alt={product.name} className="w-3/5 h-3/5 object-contain drop-shadow-xl relative" />
            <button
              onClick={() => toggleWish(product)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full border border-navy/12 bg-white shadow-md flex items-center justify-center text-lg"
              style={{ color: wished ? "#c0455a" : "#12213f" }}
              aria-label="Toggle wishlist"
            >
              {wished ? "♥" : "♡"}
            </button>
          </div>
          <div className="flex gap-3 mt-4 flex-wrap">
            {thumbs.map((th, i) => (
              <div key={i} className="w-[70px] h-[70px] rounded-md border border-navy/12 bg-cream-alt flex flex-col items-center justify-center gap-1 cursor-pointer">
                {th.video ? (
                  <>
                    <span className="w-6 h-6 rounded-full border-[1.5px] border-navy/50 flex items-center justify-center">
                      <span className="border-l-[8px] border-l-navy border-y-[5px] border-y-transparent ml-0.5" />
                    </span>
                    <span className="font-sans font-bold text-[8px] tracking-[0.1em] text-ink/60">VIDEO</span>
                  </>
                ) : (
                  <img src="/diamond.png" alt="" className="w-9 h-9 object-contain" />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-6 pt-5 border-t border-navy/10 font-sans font-semibold text-[11px] tracking-[0.1em] uppercase text-ink/50">
            <span>Certified by</span>
            {certs.map((c) => (
              <span key={c} className="px-3 py-1.5 border border-navy/15 rounded font-sans font-bold text-[11px] text-navy">{c}</span>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="m-0 font-serif font-semibold text-[28px] md:text-[38px] text-navy leading-tight">{product.name}</h1>
          <div className="mt-3.5 font-sans font-bold text-2xl md:text-[30px] text-ink">{money(product.price)}</div>
          <div className="font-sans text-xs text-ink/50 mt-0.5">MRP Incl. of all taxes</div>

          <div className="mt-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <span className="w-6.5 h-6.5 rounded-full bg-blush text-rose flex items-center justify-center text-[13px] flex-none">%</span>
              <span className="font-sans text-sm text-ink">
                50% off on Making Charges: Use <b className="text-navy">ALLURE50</b> <a className="text-gold cursor-pointer">T&C</a>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6.5 h-6.5 rounded-full bg-[#eef1f6] text-navy flex items-center justify-center text-[13px] flex-none">▶</span>
              <span className="font-sans text-sm text-ink">Schedule video call <a className="text-gold cursor-pointer">Book Now</a></span>
            </div>
          </div>

          <div className="mt-5 bg-cream-alt rounded-lg px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="font-sans font-semibold text-[13px] text-ink">Your pincode</span>
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                type="text"
                placeholder="Pincode"
                className="flex-1 bg-white border border-navy/15 rounded px-3 py-2 outline-none font-sans text-[13px] text-ink min-w-0"
              />
              <span className="px-4 py-2 bg-navy text-white rounded font-sans font-bold text-[11px] tracking-[0.06em] uppercase cursor-pointer">Update</span>
            </div>
            <div className="mt-2.5 font-sans text-[13px] text-ink/60">Provide pincode for delivery date & nearby stores.</div>
          </div>

          <div className="mt-5 font-sans font-medium text-[15px] text-ink leading-relaxed">{product.desc}</div>

          <div className="mt-5 border-y border-navy/12 py-4 flex items-center justify-between cursor-pointer">
            <span className="font-sans font-semibold text-[15px] text-ink">Customize this design</span>
            <span className="text-xl text-gold">+</span>
          </div>

          <div className="mt-6 flex items-center gap-4 flex-wrap relative">
            <span className="font-sans font-semibold text-sm text-ink">Size</span>
            <button
              onClick={() => setSizeOpen((v) => !v)}
              className="min-w-[170px] px-4 py-2.5 border border-navy/20 rounded font-sans text-sm text-ink/70 flex items-center justify-between gap-2"
            >
              {size ? `Size ${size}` : "Select Size"} <span className="text-[10px]">▾</span>
            </button>
            {sizeOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-navy/12 rounded shadow-lg grid grid-cols-3 gap-1 p-3 z-10">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setSizeOpen(false); }}
                    className="w-11 h-11 border border-navy/15 rounded text-sm text-ink hover:bg-navy hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <a className="text-gold font-sans text-[13px] cursor-pointer">Not sure about the size?</a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => addToCart(product)}
              className="py-4 bg-gold text-white border-0 rounded font-sans font-bold text-[13px] tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-navy"
            >
              Buy Now
            </button>
            <button className="py-4 bg-white text-gold border border-gold rounded font-sans font-bold text-[13px] tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-blush">
              10 + 1 Monthly Plan
            </button>
          </div>

          <div className="mt-7 pt-5 border-t border-navy/12 flex justify-between gap-4 text-center">
            <div className="flex-1"><div className="text-xl text-gold">↺</div><div className="mt-1.5 font-sans font-semibold text-xs text-ink">30-Day Returnable</div></div>
            <div className="flex-1 border-x border-navy/10"><div className="text-xl text-gold">◈</div><div className="mt-1.5 font-sans font-semibold text-xs text-ink">Lifetime Exchange</div></div>
            <div className="flex-1"><div className="text-xl text-gold">✦</div><div className="mt-1.5 font-sans font-semibold text-xs text-ink">Certified Jewellery</div></div>
          </div>

          <div className="mt-6 text-center font-sans text-[13px] text-ink/60">
            Any questions? Reach us at <b className="text-navy">1800-419-0066</b>
          </div>
        </div>
      </div>
    </section>
  );
}
