import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { waLink } from "../lib/whatsapp";
import { useStore } from "../context/StoreContext";

const companyLinks: Record<string, string> = {
  "Our Story": "/about",
  Contact: "/contact",
};

export default function Footer() {
  const navigate = useNavigate();
  const { notify } = useStore();
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-navy text-cream/70 px-4 md:px-8 pt-16 pb-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 text-center lg:text-left">
        <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-8 h-8 [clip-path:polygon(50%_0%,100%_35%,50%_100%,0%_35%)] bg-gradient-to-br from-champagne to-gold" />
            <span className="font-serif font-semibold text-lg tracking-[0.24em] text-white">JKP JEWELLERS</span>
          </div>
          <p className="font-sans font-light text-sm leading-relaxed max-w-[300px] text-cream/55">
            Crafting timeless elegance — pure gold and silver jewellery with assured quality and honest pricing.
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <div className="font-sans font-bold text-xs tracking-[0.14em] uppercase text-champagne mb-4">Shop</div>
          <div className="flex flex-col items-center lg:items-start gap-2.5 font-sans text-sm">
            {["Rings", "Earrings", "Necklaces", "Bangles"].map((l) => (
              <span key={l} onClick={() => navigate(`/shop?cat=${encodeURIComponent(l)}`)} className="wd-underline cursor-pointer text-cream/70 w-fit">{l}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <div className="font-sans font-bold text-xs tracking-[0.14em] uppercase text-champagne mb-4">Company</div>
          <div className="flex flex-col items-center lg:items-start gap-2.5 font-sans text-sm">
            {["Our Story", "Stores", "Sustainability", "Contact"].map((l) => (
              <span
                key={l}
                onClick={() => (companyLinks[l] ? navigate(companyLinks[l]) : notify(`${l} — coming soon`))}
                className="wd-underline cursor-pointer text-cream/70 w-fit"
              >
                {l}
              </span>
            ))}
            <a
              href={waLink("Hi JKP Jewellers, I'd like to know more about your collection.")}
              target="_blank"
              rel="noopener noreferrer"
              className="wd-underline text-champagne w-fit"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start">
          <div className="font-sans font-bold text-xs tracking-[0.14em] uppercase text-champagne mb-4">Newsletter</div>
          <p className="font-sans font-light text-[13px] leading-relaxed text-cream/55 mb-3">
            First access to new drops & offers.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              notify(email.trim() ? "Subscribed (demo) — thanks!" : "Enter an email first");
              setEmail("");
            }}
            className="flex gap-2 w-full max-w-[320px]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 bg-white/8 border border-white/18 rounded px-3 py-2.5 text-white outline-none font-sans text-sm min-w-0"
            />
            <button type="submit" className="px-4 py-2.5 bg-gold text-white rounded font-sans font-bold text-sm flex-none">→</button>
          </form>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-11 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-xs text-cream/45 text-center sm:text-left">
        <span>© 2026 JKP Jewellers. All rights reserved.</span>
        <span>Privacy · Terms · Shipping</span>
      </div>
    </footer>
  );
}
