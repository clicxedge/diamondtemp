import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";

const values = [
  { title: "Certified Materials", desc: "Every gold-plated and silver piece is checked for finish and durability before it ships." },
  { title: "Honest Pricing", desc: "No hidden making charges — the price you see on the card is the price you pay." },
  { title: "Handcrafted Detail", desc: "Each design passes through a karigar's hands, not just a mould." },
  { title: "Easy Exchange", desc: "Lifetime exchange and 30-day returns on every piece, no questions asked." },
];

export default function About() {
  const navigate = useNavigate();
  return (
    <section className="bg-navy pb-24">
      <div className="max-w-[1400px] mx-auto pt-5 px-4 md:px-8 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-cream/50">
        <span onClick={() => navigate("/")} className="cursor-pointer text-gold">Home</span> &nbsp;/&nbsp; <span className="text-cream">About Us</span>
      </div>

      <div className="max-w-[900px] mx-auto px-4 md:px-8 pt-14 text-center">
        <Reveal>
          <div className="font-sans font-bold text-xs tracking-[0.4em] uppercase text-gold mb-4">Our Story</div>
          <h1 className="m-0 font-serif font-semibold text-champagne" style={{ fontSize: "clamp(30px,5vw,52px)" }}>
            Welcome to JKP Jewellers
          </h1>
          <p className="mt-6 font-sans text-base leading-loose text-cream/75">
            We are a trusted jewellery shop offering pure gold and silver jewellery with assured quality and honest
            pricing. Customer satisfaction is our priority — every piece in our catalog is chosen for craftsmanship,
            not just catalog volume, and every price is exactly what you pay at checkout.
          </p>
        </Reveal>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 mt-16 grid sm:grid-cols-2 gap-6">
        {values.map((v) => (
          <Reveal key={v.title} className="bg-navy-light border border-champagne/25 rounded-xl p-7 text-center sm:text-left" delay={0.05}>
            <div className="text-gold text-xl mb-3">✦</div>
            <h3 className="m-0 mb-2 font-serif font-semibold text-lg text-cream">{v.title}</h3>
            <p className="m-0 font-sans text-sm leading-relaxed text-cream/65">{v.desc}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="text-center mt-16">
        <span onClick={() => navigate("/shop")} className="inline-block px-11 py-3.5 border border-champagne/55 text-champagne rounded-full font-sans font-bold text-xs tracking-[0.12em] uppercase cursor-pointer transition-all hover:bg-champagne/10 hover:border-champagne">
          Explore the Collection
        </span>
      </Reveal>
    </section>
  );
}
