import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { money } from "../lib/format";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, cartTotal, setQty, removeFromCart } = useStore();
  const navigate = useNavigate();
  const lines = Object.values(cart);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/50 z-[90]"
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-navy-light z-[100] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-champagne/10">
              <h2 className="font-serif font-semibold text-lg text-champagne">Your Bag ({lines.length})</h2>
              <button onClick={() => setCartOpen(false)} className="text-2xl leading-none text-champagne" aria-label="Close bag">×</button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <p className="text-cream/60 font-sans text-sm mt-10 text-center">Your bag is empty.</p>
              ) : (
                <div className="flex flex-col gap-5">
                  {lines.map(({ product, qty }) => (
                    <div key={product.id} className="flex gap-4 border-b border-champagne/8 pb-5">
                      <div className="w-20 h-20 flex-none rounded-md bg-cream-alt relative overflow-hidden flex items-center justify-center">
                        <img src={product.image} alt="" className="w-full h-full object-cover relative" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-sans tracking-[0.18em] uppercase text-gold">{product.cat}</div>
                        <div className="font-serif font-semibold text-champagne text-sm truncate">{product.name}</div>
                        <div className="font-sans font-semibold text-cream text-sm mt-1">{money(product.price)}</div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-champagne/15 rounded">
                            <button className="w-7 h-7 text-champagne" onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease quantity">−</button>
                            <span className="w-8 text-center text-sm">{qty}</span>
                            <button className="w-7 h-7 text-champagne" onClick={() => setQty(product.id, qty + 1)} aria-label="Increase quantity">+</button>
                          </div>
                          <button className="text-xs text-rose underline" onClick={() => removeFromCart(product.id)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <div className="px-6 py-5 border-t border-champagne/10">
                <div className="flex items-center justify-between font-sans text-sm mb-4">
                  <span className="text-cream/70">Subtotal</span>
                  <span className="font-semibold text-champagne text-lg">{money(cartTotal)}</span>
                </div>
                <button
                  className="w-full py-4 bg-gold text-white font-sans font-bold text-xs tracking-[0.1em] uppercase rounded transition-colors hover:bg-navy"
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/shop");
                  }}
                >
                  Checkout (Demo)
                </button>
                <p className="text-center text-[11px] text-cream/45 mt-3">Dummy data — no real payment is processed.</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
