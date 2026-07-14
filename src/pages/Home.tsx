import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";
import { categories, collections, lookbook, designs, testimonials, products } from "../data/catalog";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const navigate = useNavigate();
  return (
    <section
      id="top"
      className="relative w-full h-[86vh] min-h-[520px] overflow-hidden"
      style={{ background: "linear-gradient(120deg,#fdeff1,#f4f1ec 55%,#eef1f6)" }}
    >
      <div className="absolute inset-0 [background:repeating-linear-gradient(135deg,rgba(184,137,47,.05),rgba(184,137,47,.05)_16px,transparent_16px,transparent_32px)]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(26,35,56,.42),rgba(26,35,56,.12) 55%,transparent)" }} />

      <span className="wd-spark absolute top-[26%] left-[60%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_#fff]" />
      <span className="wd-spark absolute top-[44%] left-[74%] w-[5px] h-[5px] bg-white rounded-full shadow-[0_0_12px_#fff]" style={{ animationDelay: "1s" }} />
      <span className="wd-spark absolute top-[60%] left-[52%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]" style={{ animationDelay: "1.8s" }} />

      <div className="relative z-[5] h-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="wd-float mb-6 w-14 h-14 md:w-[74px] md:h-[74px] relative">
          <img src="/diamond.png" alt="" className="wd-diamond absolute inset-0 w-full h-full object-contain drop-shadow-[0_6px_26px_rgba(255,255,255,0.7)]" />
        </div>
        <div className="font-sans font-semibold text-[11px] md:text-[13px] tracking-[0.4em] md:tracking-[0.48em] uppercase text-white mb-4" style={{ textShadow: "0 1px 12px rgba(26,35,56,.4)" }}>
          Fine Diamond Jewellery
        </div>
        <h1 className="m-0 font-serif font-medium leading-[0.9] tracking-tight text-white" style={{ fontSize: "clamp(48px,10vw,150px)", textShadow: "0 4px 40px rgba(26,35,56,.35)" }}>
          <span className="block">White</span>
          <span className="block italic">Diamond</span>
        </h1>
        <p className="max-w-[460px] mt-5 font-sans font-light text-base md:text-lg leading-relaxed text-white/90" style={{ textShadow: "0 1px 14px rgba(26,35,56,.4)" }}>
          Light, cut into forever — brilliant-cut diamonds set in recycled gold, made to be worn every single day.
        </p>
        <div className="flex gap-3.5 flex-wrap mt-8">
          <button
            onClick={() => navigate("/shop")}
            className="px-8 py-4 bg-gold text-white font-sans font-bold text-xs tracking-[0.12em] uppercase rounded-sm transition-all hover:bg-navy hover:-translate-y-0.5"
          >
            Shop the Collection
          </button>
          <a href="#video" className="px-8 py-4 bg-white/92 text-navy font-sans font-bold text-xs tracking-[0.12em] uppercase rounded-sm transition-transform hover:-translate-y-0.5">
            Watch the Film
          </a>
        </div>
      </div>
    </section>
  );
}

function CategoryRail() {
  const navigate = useNavigate();
  return (
    <section className="bg-cream py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="text-center mb-10">
          <div className="font-sans font-bold text-xs tracking-[0.4em] uppercase text-gold">Shop by Category</div>
          <h2 className="mt-3 font-serif font-medium text-navy" style={{ fontSize: "clamp(30px,5vw,56px)" }}>
            Find your everyday sparkle
          </h2>
        </Reveal>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((c) => (
            <div key={c.slug} onClick={() => navigate(`/shop?cat=${encodeURIComponent(c.name)}`)} className="cursor-pointer text-center">
              <div className="aspect-square rounded-2xl bg-blush flex items-center justify-center relative overflow-hidden shadow-[0_6px_20px_rgba(26,35,56,0.05)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_22px_44px_rgba(26,35,56,0.13)]">
                <img src="/diamond.png" alt="" className="w-[58%] h-[58%] object-contain drop-shadow-md" />
              </div>
              <div className="mt-3 font-sans text-[13px] text-ink">{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoStrip() {
  return (
    <Reveal as="section" className="max-w-[1400px] mx-auto mb-5 px-4 md:px-8">
      <div className="rounded-[10px] px-6 md:px-9 py-6 flex items-center justify-center gap-5 flex-wrap text-center" style={{ background: "linear-gradient(90deg,#fdeff1,#fbe5e8)" }}>
        <span className="font-serif font-semibold text-2xl text-navy">
          Forever Plan <span className="text-gold">10 + 1</span>
        </span>
        <span className="font-sans text-sm text-ink/70">Pay 10 installments, get the 11th month free.</span>
        <span className="px-7 py-3 bg-navy text-white rounded font-sans font-bold text-xs tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-gold">
          Enroll Now
        </span>
      </div>
    </Reveal>
  );
}

function Collections() {
  const navigate = useNavigate();
  return (
    <section id="collections" className="bg-cream py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="text-center mb-12">
          <div className="font-sans font-bold text-xs tracking-[0.4em] uppercase text-gold">The Edit</div>
          <h2 className="mt-3 font-serif font-medium text-navy" style={{ fontSize: "clamp(32px,5.5vw,60px)" }}>
            Browse Latest Collections
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {collections.map((col) => (
            <Reveal key={col.name} as="div" className="relative h-[380px] md:h-[480px] rounded-lg overflow-hidden cursor-pointer" delay={0.05}>
              <div onClick={() => navigate("/shop")} className="absolute inset-0" style={{ background: col.bg }}>
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 35%,rgba(18,33,63,.82))" }} />
                <div className="absolute left-0 right-0 bottom-0 p-7 text-white">
                  <div className="font-sans font-bold text-[11px] tracking-[0.4em] uppercase text-champagne mb-2">{col.kicker}</div>
                  <h3 className="m-0 font-serif font-semibold text-3xl md:text-4xl tracking-wide">{col.name}</h3>
                  <p className="mt-2 mb-4 font-sans font-light text-sm leading-relaxed text-white/75">{col.desc}</p>
                  <span className="wd-underline font-sans font-bold text-xs tracking-[0.12em] uppercase text-white">Discover →</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-9">
          <span onClick={() => navigate("/shop")} className="inline-block px-9 py-3.5 border border-gold text-gold rounded font-sans font-bold text-xs tracking-[0.14em] uppercase cursor-pointer transition-all hover:bg-gold hover:text-white">
            Browse All Collections
          </span>
        </Reveal>
      </div>
    </section>
  );
}

function Bestsellers() {
  return (
    <section id="shop" className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="flex items-end justify-between flex-wrap gap-5 mb-9">
          <div>
            <div className="font-sans font-bold text-xs tracking-[0.4em] uppercase text-gold">Bestsellers</div>
            <h2 className="mt-3 font-serif font-medium text-navy" style={{ fontSize: "clamp(30px,5vw,56px)" }}>Loved by many</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 8).map((p) => (
            <Reveal key={p.id} delay={0.03}><ProductCard product={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoFeature() {
  return (
    <section id="video" className="bg-cream py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
        <Reveal className="relative aspect-video rounded-lg overflow-hidden border-[3px] border-gold cursor-pointer" delay={0}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#eef1f6,#fdeff1)" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-navy/85 flex items-center justify-center relative">
              <span className="wd-pulse-ring absolute -inset-2.5 rounded-full border-2 border-gold/60" />
              <span className="border-l-[18px] border-l-white border-y-[11px] border-y-transparent ml-1" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="font-sans font-bold text-xs tracking-[0.4em] uppercase text-gold mb-4">The Campaign</div>
          <h2 className="wd-shine m-0 font-serif font-semibold leading-none tracking-wide" style={{ fontSize: "clamp(38px,6vw,84px)" }}>
            #WornInLight
          </h2>
          <div className="h-0.5 bg-gold my-6 w-full" />
          <p className="m-0 font-sans font-light text-base md:text-[17px] leading-loose text-ink/70 max-w-[440px]">
            Everyday brilliance, captured. Our latest film follows the light through every facet — see how White Diamond moves with you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Lookbook() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const row = rowRef.current;
    if (!track || !row) return;

    const ctx = gsap.context(() => {
      const setup = () => {
        gsap.to(row, {
          x: () => -(row.scrollWidth - window.innerWidth + 60),
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: () => "+=" + (row.scrollWidth - window.innerWidth + 400),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      };
      const t = setTimeout(setup, 200);
      return () => clearTimeout(t);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={trackRef} className="bg-navy h-screen overflow-hidden flex items-center">
      <div ref={rowRef} className="flex gap-6 px-8 md:px-16 w-max items-center">
        <div className="flex-none w-[280px] md:w-[420px]">
          <div className="font-sans font-bold text-xs tracking-[0.4em] uppercase text-champagne">Lookbook</div>
          <h2 className="mt-3.5 font-serif font-medium text-4xl md:text-6xl leading-none text-white">
            Styled by<br /><span className="italic">you</span>
          </h2>
          <p className="mt-5 font-sans font-light text-base leading-relaxed text-cream/60 max-w-[320px]">
            Scroll to explore how our community wears White Diamond. Tag <b className="text-champagne">#WornInLight</b>.
          </p>
        </div>
        {lookbook.map((l) => (
          <div key={l.tag} className="flex-none w-[220px] md:w-[300px]">
            <div className="aspect-[3/4] rounded-lg overflow-hidden relative" style={{ background: l.bg }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 55%,rgba(18,33,63,.6))" }} />
              <span className="absolute bottom-3.5 left-4 font-sans font-semibold text-base text-white">{l.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DesignLed() {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <Reveal as="h2" className="text-center mb-12 font-serif font-medium text-navy" delay={0}>
          <span style={{ fontSize: "clamp(30px,5vw,56px)" }}>Design-Led Jewellery</span>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-4">
          {designs.map((d) => (
            <Reveal key={d.name} delay={0.05}>
              <div onClick={() => navigate("/shop")} className="cursor-pointer">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden" style={{ background: d.bg }}>
                  <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-[130px] h-[130px] bg-white rounded-[10px] shadow-[0_16px_40px_rgba(26,35,56,0.16)] flex items-center justify-center">
                    <img src="/diamond.png" alt="" className="w-20 h-20 object-contain" />
                  </div>
                </div>
                <div className="text-center mt-11 font-sans text-sm tracking-wide text-ink">{d.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoreLocator() {
  return (
    <section className="bg-cream-alt py-16 md:py-20 px-4 md:px-8">
      <Reveal as="div" className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/3] rounded-[10px] flex items-center justify-center font-sans text-xs text-ink/40" style={{ background: "repeating-linear-gradient(135deg,#e7e2d8,#e7e2d8 16px,#ded8ca 16px,#ded8ca 32px)" }}>
          boutique illustration
        </div>
        <div className="text-center">
          <h2 className="m-0 font-serif font-medium text-navy leading-snug" style={{ fontSize: "clamp(26px,4vw,50px)" }}>
            A White Diamond boutique is<br />closer than you think
          </h2>
          <div className="my-6 inline-block px-5 py-2 border border-navy/25 rounded-full font-sans font-semibold text-xs text-ink">
            120+ Stores Nationwide
          </div>
          <div>
            <span className="inline-block px-9 py-3.5 bg-navy text-white rounded font-sans font-bold text-xs tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-gold">
              Find your nearest store
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-24 pb-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="m-0 font-serif font-medium text-navy" style={{ fontSize: "clamp(28px,4.5vw,52px)" }}>Customer Stories</h2>
          <div className="text-gold font-sans font-semibold text-xs tracking-[0.2em] mt-1.5">#WhiteDiamondAndMe</div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Reveal key={t.name} className="bg-cream rounded-[10px] p-8 border border-navy/7" delay={0.05}>
              <div className="text-gold text-lg tracking-widest">★★★★★</div>
              <p className="my-4 font-serif italic text-xl leading-snug text-navy">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full" style={{ background: "linear-gradient(135deg,#fdeff1,#dfe6f0)" }} />
                <div>
                  <div className="font-sans font-semibold text-sm text-ink">{t.name}</div>
                  <div className="font-sans text-xs text-ink/50">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryRail />
      <PromoStrip />
      <Collections />
      <Bestsellers />
      <VideoFeature />
      <Lookbook />
      <DesignLed />
      <StoreLocator />
      <Testimonials />
    </>
  );
}
