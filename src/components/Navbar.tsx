import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "../data/catalog";
import { useStore } from "../context/StoreContext";

const marqueeItems = [
  "Free Insured Shipping", "Lifetime Exchange", "30-Day Returns", "Certified Natural Diamonds",
];

const directLinks = ["Rings", "Earrings", "Solitaires", "Necklaces", "Bracelets"];

export default function Navbar() {
  const [mega, setMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const { cartCount, wishCount, setCartOpen } = useStore();
  const navigate = useNavigate();

  const goShop = (cat?: string) => {
    setMobileOpen(false);
    setMega(false);
    navigate(cat ? `/shop?cat=${encodeURIComponent(cat)}` : "/shop");
  };

  return (
    <>
      {/* Announcement marquee */}
      <div className="bg-navy text-cream overflow-hidden whitespace-nowrap font-sans text-[11.5px] font-semibold tracking-[0.18em] uppercase">
        <div className="inline-flex w-max wd-marquee-track py-2">
          <span className="inline-flex gap-11 pr-11">
            {[...marqueeItems, ...marqueeItems].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-11">
                {m}
                <span className="text-gold">◆</span>
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(26,35,56,0.08)]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex items-center gap-4 md:gap-8">
          <button
            className="lg:hidden flex-none text-navy text-2xl leading-none"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
          <Link to="/" className="flex items-center gap-2 md:gap-3 flex-none" onClick={() => setMobileOpen(false)}>
            <span className="wd-diamond inline-block w-7 h-7 md:w-9 md:h-9 [clip-path:polygon(50%_0%,100%_35%,50%_100%,0%_35%)] bg-gradient-to-br from-champagne to-gold" />
            <span className="font-serif font-semibold text-sm md:text-xl tracking-[0.2em] md:tracking-[0.26em] text-navy whitespace-nowrap">
              WHITE DIAMOND
            </span>
          </Link>
          <label className="hidden md:flex flex-1 items-center gap-2 bg-cream-alt border border-navy/10 rounded-full px-5 py-2.5">
            <span className="text-navy/40 text-sm">⌕</span>
            <input
              type="text"
              placeholder="Search for jewellery…"
              className="flex-1 bg-transparent border-0 outline-none text-ink text-sm font-sans"
            />
          </label>
          <nav className="hidden lg:flex items-center gap-6 flex-none text-ink font-sans text-[11px] font-semibold tracking-[0.06em] uppercase">
            <span className="wd-underline cursor-pointer">Stores</span>
            <span className="wd-underline cursor-pointer">Wishlist ({wishCount})</span>
            <span onClick={() => setCartOpen(true)} className="wd-underline cursor-pointer text-gold">
              Bag ({cartCount})
            </span>
            <span className="wd-underline cursor-pointer">Account</span>
          </nav>
          <button
            className="lg:hidden ml-auto text-navy text-sm font-semibold"
            onClick={() => setCartOpen(true)}
            aria-label="Open bag"
          >
            Bag ({cartCount})
          </button>
        </div>

        {/* Category bar (desktop) */}
        <div className="hidden lg:block bg-navy">
          <div className="max-w-[1400px] mx-auto px-8 flex items-center gap-8 h-[50px] font-sans text-xs font-semibold tracking-[0.1em] uppercase text-cream/90">
            <span
              onMouseEnter={() => setMega(true)}
              onMouseLeave={() => setMega(false)}
              className="cursor-pointer h-full flex items-center gap-1 relative"
            >
              All Jewellery <span className="text-[9px] opacity-70">▾</span>
              <AnimatePresence>
                {mega && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-[50px] left-[-24px] w-[660px] bg-white border border-navy/10 p-8 grid grid-cols-3 gap-x-8 gap-y-1.5 shadow-[0_30px_70px_rgba(26,35,56,0.18)]"
                  >
                    {categories.map((c) => (
                      <span
                        key={c.slug}
                        onClick={() => goShop(c.name)}
                        className="wd-underline cursor-pointer normal-case tracking-normal font-sans text-sm text-ink/75 py-1.5"
                      >
                        {c.name}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
            {directLinks.map((l) => (
              <span key={l} onClick={() => goShop(l)} className="wd-underline cursor-pointer">
                {l}
              </span>
            ))}
            <span onClick={() => goShop()} className="wd-underline cursor-pointer ml-auto text-champagne">
              Gifting
            </span>
            <span onClick={() => goShop()} className="wd-underline cursor-pointer text-champagne">
              Offers
            </span>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/50 z-[70] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[82vw] max-w-[340px] bg-white z-[80] lg:hidden overflow-y-auto"
            >
              <div className="p-5 flex items-center justify-between border-b border-navy/10">
                <span className="font-serif font-semibold text-navy tracking-[0.2em]">MENU</span>
                <button onClick={() => setMobileOpen(false)} className="text-2xl leading-none text-navy" aria-label="Close menu">×</button>
              </div>
              <div className="p-5 flex flex-col gap-1 font-sans text-sm text-ink">
                <button
                  className="flex items-center justify-between py-3 border-b border-navy/10 text-left font-semibold"
                  onClick={() => setMobileCatOpen((v) => !v)}
                >
                  All Jewellery <span className="text-xs">{mobileCatOpen ? "▴" : "▾"}</span>
                </button>
                <AnimatePresence>
                  {mobileCatOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col pl-3"
                    >
                      {categories.map((c) => (
                        <span
                          key={c.slug}
                          onClick={() => goShop(c.name)}
                          className="py-2.5 border-b border-navy/5 text-ink/75 min-h-11 flex items-center cursor-pointer"
                        >
                          {c.name}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                {["Gifting", "Offers", "Stores", "Account"].map((l) => (
                  <span
                    key={l}
                    onClick={() => goShop()}
                    className="py-3 border-b border-navy/10 min-h-11 flex items-center cursor-pointer"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
