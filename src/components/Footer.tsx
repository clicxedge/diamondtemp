export default function Footer() {
  return (
    <footer className="bg-navy text-cream/70 px-4 md:px-8 pt-16 pb-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-8 h-8 [clip-path:polygon(50%_0%,100%_35%,50%_100%,0%_35%)] bg-gradient-to-br from-champagne to-gold" />
            <span className="font-serif font-semibold text-lg tracking-[0.24em] text-white">WHITE DIAMOND</span>
          </div>
          <p className="font-sans font-light text-sm leading-relaxed max-w-[300px] text-cream/55">
            Light, cut into forever. Certified natural diamonds, ethically sourced, crafted in recycled gold.
          </p>
        </div>
        <div>
          <div className="font-sans font-bold text-xs tracking-[0.14em] uppercase text-champagne mb-4">Shop</div>
          <div className="flex flex-col gap-2.5 font-sans text-sm">
            {["Rings", "Earrings", "Necklaces", "Solitaires"].map((l) => (
              <span key={l} className="wd-underline cursor-pointer text-cream/70 w-fit">{l}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="font-sans font-bold text-xs tracking-[0.14em] uppercase text-champagne mb-4">Company</div>
          <div className="flex flex-col gap-2.5 font-sans text-sm">
            {["Our Story", "Stores", "Sustainability", "Contact"].map((l) => (
              <span key={l} className="wd-underline cursor-pointer text-cream/70 w-fit">{l}</span>
            ))}
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="font-sans font-bold text-xs tracking-[0.14em] uppercase text-champagne mb-4">Newsletter</div>
          <p className="font-sans font-light text-[13px] leading-relaxed text-cream/55 mb-3">
            First access to new drops & offers.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 bg-white/8 border border-white/18 rounded px-3 py-2.5 text-white outline-none font-sans text-sm min-w-0"
            />
            <button className="px-4 py-2.5 bg-gold text-white rounded font-sans font-bold text-sm flex-none">→</button>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-11 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 font-sans text-xs text-cream/45">
        <span>© 2026 White Diamond. All rights reserved.</span>
        <span>Privacy · Terms · Shipping</span>
      </div>
    </footer>
  );
}
