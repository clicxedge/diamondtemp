import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "../data/catalog";
import { useStore } from "../context/StoreContext";

const navLinks = ["Home", "Collections", "Gold", "Diamond", "Bridal", "About", "Contact"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const { cartCount, setCartOpen } = useStore();
  const navigate = useNavigate();

  const goShop = (cat?: string) => {
    setMobileOpen(false);
    navigate(cat ? `/shop?cat=${encodeURIComponent(cat)}` : "/shop");
  };

  const goLink = (link: string) => {
    if (link === "Home") { setMobileOpen(false); navigate("/"); return; }
    goShop();
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-navy border-b border-champagne/20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3.5 flex items-center gap-4 md:gap-8">
          <button
            className="lg:hidden flex-none text-champagne text-2xl leading-none"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          <Link to="/" className="flex-none text-center leading-none" onClick={() => setMobileOpen(false)}>
            <div className="font-serif font-bold text-xl md:text-[26px] tracking-[0.06em] text-champagne">
              <span className="italic">J</span>K<span className="italic">P</span>
            </div>
            <div className="font-serif font-medium text-[8px] md:text-[10px] tracking-[0.5em] text-champagne ml-1">JEWELLERS</div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center font-sans text-[11.5px] font-semibold tracking-[0.1em] uppercase">
            {navLinks.map((l) => (
              <span
                key={l}
                onClick={() => goLink(l)}
                className={`wd-underline cursor-pointer ${l === "Home" ? "text-champagne" : "text-cream/80"}`}
              >
                {l}
              </span>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5 flex-none text-champagne">
            <span className="cursor-pointer" aria-label="Search">⌕</span>
            <span className="cursor-pointer" aria-label="Account">☺</span>
            <span onClick={() => setCartOpen(true)} className="cursor-pointer relative" aria-label="Open bag">
              🛍
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-gold text-navy text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </span>
          </div>

          <button
            className="lg:hidden ml-auto text-champagne text-sm font-semibold relative"
            onClick={() => setCartOpen(true)}
            aria-label="Open bag"
          >
            Bag ({cartCount})
          </button>
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
              className="fixed inset-0 bg-black/60 z-[70] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[82vw] max-w-[340px] bg-navy z-[80] lg:hidden overflow-y-auto"
            >
              <div className="p-5 flex items-center justify-between border-b border-champagne/15">
                <span className="font-serif font-semibold text-champagne tracking-[0.2em]">MENU</span>
                <button onClick={() => setMobileOpen(false)} className="text-2xl leading-none text-champagne" aria-label="Close menu">×</button>
              </div>
              <div className="p-5 flex flex-col gap-1 font-sans text-sm text-cream/85">
                {navLinks.map((l) => (
                  <span key={l} onClick={() => goLink(l)} className="py-3 border-b border-champagne/10 min-h-11 flex items-center cursor-pointer">
                    {l}
                  </span>
                ))}
                <button
                  className="flex items-center justify-between py-3 border-b border-champagne/10 text-left font-semibold mt-2"
                  onClick={() => setMobileCatOpen((v) => !v)}
                >
                  Shop by Category <span className="text-xs">{mobileCatOpen ? "▴" : "▾"}</span>
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
                          className="py-2.5 border-b border-champagne/5 text-cream/70 min-h-11 flex items-center cursor-pointer"
                        >
                          {c.name}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
