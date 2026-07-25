import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products, certs, thumbs, getReviews } from "../data/catalog";
import { useStore } from "../context/StoreContext";
import { money } from "../lib/format";
import { waLink } from "../lib/whatsapp";

const sizes = ["8", "10", "12", "14", "16", "18"];

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWish, isWished, notify } = useStore();
  const [size, setSize] = useState<string | null>(null);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [pincode, setPincode] = useState("");

  const product = products.find((p) => p.id === slug) ?? products[0];
  const wished = isWished(product.id);
  const { reviews, average, count } = getReviews(product.id);

  return (
    <section className="bg-navy pb-20">
      <div className="max-w-[1400px] mx-auto pt-5 px-4 md:px-8 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-cream/50">
        <span onClick={() => navigate("/")} className="cursor-pointer text-gold">Home</span> &nbsp;/&nbsp;{" "}
        <span onClick={() => navigate("/shop")} className="cursor-pointer text-gold">Jewellery</span> &nbsp;/&nbsp;{" "}
        <span onClick={() => navigate(`/shop?cat=${encodeURIComponent(product.cat)}`)} className="cursor-pointer text-gold">{product.cat}</span> &nbsp;/&nbsp;{" "}
        <span className="text-cream">{product.name}</span>
      </div>

      <div className="max-w-[1300px] mx-auto mt-5 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
        {/* Gallery */}
        <div className="lg:sticky lg:top-[110px]">
          <div className="relative aspect-square bg-cream-alt rounded-lg flex items-center justify-center overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover relative" />
            <button
              onClick={() => toggleWish(product)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full border border-champagne/20 bg-navy/85 shadow-md flex items-center justify-center text-lg"
              style={{ color: wished ? "#e2495f" : "#e6c56f" }}
              aria-label="Toggle wishlist"
            >
              {wished ? "♥" : "♡"}
            </button>
          </div>
          <div className="flex gap-3 mt-4 flex-wrap">
            {thumbs.map((th, i) => (
              <div key={i} className="w-[70px] h-[70px] rounded-md border border-champagne/15 bg-cream-alt flex flex-col items-center justify-center gap-1 cursor-pointer overflow-hidden">
                {th.video ? (
                  <>
                    <span className="w-6 h-6 rounded-full border-[1.5px] border-champagne/50 flex items-center justify-center">
                      <span className="border-l-[8px] border-l-gold border-y-[5px] border-y-transparent ml-0.5" />
                    </span>
                    <span className="font-sans font-bold text-[8px] tracking-[0.1em] text-cream/60">VIDEO</span>
                  </>
                ) : (
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-6 pt-5 border-t border-champagne/15 font-sans font-semibold text-[11px] tracking-[0.1em] uppercase text-cream/50">
            <span>Certified by</span>
            {certs.map((c) => (
              <span key={c} className="px-3 py-1.5 border border-champagne/20 rounded font-sans font-bold text-[11px] text-champagne">{c}</span>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="m-0 font-serif font-semibold text-[28px] md:text-[38px] text-champagne leading-tight">{product.name}</h1>
          <a href="#reviews" className="mt-2 flex items-center gap-2 w-fit">
            <span className="text-gold text-sm tracking-widest">{"★".repeat(Math.round(average))}{"☆".repeat(5 - Math.round(average))}</span>
            <span className="font-sans text-[13px] text-cream/60">{average} ({count} reviews)</span>
          </a>
          <div className="mt-3.5 font-sans font-bold text-2xl md:text-[30px] text-cream">{money(product.price)}</div>
          <div className="font-sans text-xs text-cream/50 mt-0.5">MRP Incl. of all taxes</div>

          <div className="mt-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <span className="w-6.5 h-6.5 rounded-full bg-blush text-rose flex items-center justify-center text-[13px] flex-none">%</span>
              <span className="font-sans text-sm text-cream">
                50% off on Making Charges: Use <b className="text-champagne">ALLURE50</b> <a onClick={() => notify("ALLURE50 — 50% off making charges applied at checkout")} className="text-gold cursor-pointer">T&C</a>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6.5 h-6.5 rounded-full bg-cream-alt text-champagne flex items-center justify-center text-[13px] flex-none">▶</span>
              <span className="font-sans text-sm text-cream">Schedule video call <a onClick={() => notify("Video consult booking — coming soon")} className="text-gold cursor-pointer">Book Now</a></span>
            </div>
          </div>

          <div className="mt-5 bg-cream-alt rounded-lg px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="font-sans font-semibold text-[13px] text-cream">Your pincode</span>
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                type="text"
                placeholder="Pincode"
                className="flex-1 bg-navy border border-champagne/20 rounded px-3 py-2 outline-none font-sans text-[13px] text-cream min-w-0"
              />
              <button
                onClick={() => notify(pincode.trim() ? `Delivery to ${pincode.trim()}: 3-5 business days` : "Enter a pincode first")}
                className="px-4 py-2 bg-gold text-navy rounded font-sans font-bold text-[11px] tracking-[0.06em] uppercase cursor-pointer"
              >
                Update
              </button>
            </div>
            <div className="mt-2.5 font-sans text-[13px] text-cream/60">Provide pincode for delivery date & nearby stores.</div>
          </div>

          <div className="mt-5 font-sans font-medium text-[15px] text-cream leading-relaxed">{product.desc}</div>

          <button
            onClick={() => notify("Custom design requests — coming soon")}
            className="w-full mt-5 border-y border-champagne/15 py-4 flex items-center justify-between cursor-pointer text-left"
          >
            <span className="font-sans font-semibold text-[15px] text-cream">Customize this design</span>
            <span className="text-xl text-gold">+</span>
          </button>

          <div className="mt-6 flex items-center gap-4 flex-wrap relative">
            <span className="font-sans font-semibold text-sm text-cream">Size</span>
            <button
              onClick={() => setSizeOpen((v) => !v)}
              className="min-w-[170px] px-4 py-2.5 border border-champagne/25 rounded font-sans text-sm text-cream/70 flex items-center justify-between gap-2"
            >
              {size ? `Size ${size}` : "Select Size"} <span className="text-[10px]">▾</span>
            </button>
            {sizeOpen && (
              <div className="absolute top-full left-0 mt-2 bg-navy-light border border-champagne/20 rounded shadow-lg grid grid-cols-3 gap-1 p-3 z-10">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setSizeOpen(false); }}
                    className="w-11 h-11 border border-champagne/20 rounded text-sm text-cream hover:bg-gold hover:text-navy transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <a onClick={() => notify("Size guide — coming soon")} className="text-gold font-sans text-[13px] cursor-pointer">Not sure about the size?</a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => addToCart(product)}
              className="py-4 bg-gold text-navy border-0 rounded font-sans font-bold text-[13px] tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-champagne"
            >
              Buy Now
            </button>
            <button
              onClick={() => notify("10 + 1 Monthly Plan — coming soon")}
              className="py-4 bg-navy text-gold border border-gold rounded font-sans font-bold text-[13px] tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-blush"
            >
              10 + 1 Monthly Plan
            </button>
          </div>

          <div className="mt-7 pt-5 border-t border-champagne/15 flex justify-between gap-4 text-center">
            <div className="flex-1"><div className="text-xl text-gold">↺</div><div className="mt-1.5 font-sans font-semibold text-xs text-cream">30-Day Returnable</div></div>
            <div className="flex-1 border-x border-champagne/15"><div className="text-xl text-gold">◈</div><div className="mt-1.5 font-sans font-semibold text-xs text-cream">Lifetime Exchange</div></div>
            <div className="flex-1"><div className="text-xl text-gold">✦</div><div className="mt-1.5 font-sans font-semibold text-xs text-cream">Certified Jewellery</div></div>
          </div>

          <div className="mt-6 text-center font-sans text-[13px] text-cream/60">
            Any questions? {" "}
            <a
              href={waLink(`Hi JKP Jewellers, I'd like to ask about ${product.name} (${product.sku}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-champagne font-semibold underline"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div id="reviews" className="max-w-[1300px] mx-auto mt-16 px-4 md:px-8 pt-10 border-t border-champagne/15">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="m-0 font-serif font-semibold text-2xl md:text-[32px] text-champagne">Ratings & Reviews</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-gold text-lg tracking-widest">{"★".repeat(Math.round(average))}{"☆".repeat(5 - Math.round(average))}</span>
              <span className="font-sans font-semibold text-sm text-cream">{average} out of 5</span>
              <span className="font-sans text-sm text-cream/50">({count} verified reviews)</span>
            </div>
          </div>
          <button
            onClick={() => notify("Review form — coming soon")}
            className="px-6 py-3 border border-champagne text-champagne rounded font-sans font-bold text-xs tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-champagne hover:text-navy"
          >
            Write a Review
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-cream-alt rounded-lg p-6 border border-champagne/15">
              <div className="text-gold text-sm tracking-widest">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-cream/80">{r.comment}</p>
              <div className="mt-4 flex items-center justify-between font-sans text-xs text-cream/50">
                <span className="font-semibold text-cream">{r.name}</span>
                <span>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
