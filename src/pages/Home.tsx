import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";
import { categories, collections, testimonials, products } from "../data/catalog";
import { useStore } from "../context/StoreContext";

gsap.registerPlugin(ScrollTrigger);

const trustBar = [
  { title: "BIS Hallmarked", sub: "Pure & Authentic Gold" },
  { title: "Certified Diamonds", sub: "Quality You Can Trust" },
  { title: "Secure Payments", sub: "Your Safety, Our Priority" },
  { title: "Free Shipping", sub: "Across India" },
  { title: "Lifetime Service", sub: "Always by Your Side" },
];

function Hero() {
  const navigate = useNavigate();
  return (
    <section id="top" className="relative w-full overflow-hidden bg-black flex flex-col lg:min-h-screen">
      {/* Mobile: image sits above the text in normal flow (never overlapped) */}
      <div className="lg:hidden relative w-full aspect-[4/5] overflow-hidden">
        <img src="/hero-model-tight.png" alt="" className="absolute inset-0 w-full h-full object-cover object-[62%_16%]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 55%,#000 97%)" }} />
      </div>

      {/* Desktop: layered image + decorative fill for the mid-section gap */}
      <img
        src="/hero-model-tight.png"
        alt=""
        className="hidden lg:block absolute right-0 top-0 h-full w-[60%] object-cover object-center"
        style={{ transform: "scale(1.25)", transformOrigin: "100% 50%" }}
      />
      <div className="hidden lg:block absolute inset-0" style={{ background: "linear-gradient(90deg,#000 28%,rgba(0,0,0,.6) 36%,rgba(0,0,0,.18) 46%,transparent)" }} />
      <div className="hidden lg:block absolute inset-y-0 left-[22%] right-[60%] pointer-events-none">
        <span className="wd-spark absolute top-[22%] left-[20%] w-1.5 h-1.5 rounded-full bg-gold" />
        <span className="wd-spark absolute top-[48%] left-[55%] w-1 h-1 rounded-full bg-champagne" style={{ animationDelay: "1.1s" }} />
        <span className="wd-spark absolute top-[68%] left-[30%] w-1 h-1 rounded-full bg-gold" style={{ animationDelay: "2s" }} />
        <span className="wd-float absolute top-[38%] left-[42%] text-gold/40 text-2xl">✦</span>
        <span className="wd-float absolute top-[62%] left-[15%] text-champagne/30 text-lg" style={{ animationDelay: "1.4s" }}>✦</span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 md:px-14 lg:pl-24 py-10 lg:max-w-[700px]">
        <h1
          className="m-0 leading-[0.9] text-champagne"
          style={{ fontFamily: "var(--font-script)", fontWeight: 400, fontSize: "clamp(52px,8.5vw,124px)", textShadow: "0 2px 30px rgba(201,162,75,.4)" }}
        >
          <span className="block">Where Every</span>
          <span className="block mt-1">Jewel Tells a Story</span>
        </h1>
        <div className="flex items-center gap-3.5 mt-7 lg:ml-8">
          <span className="w-20 h-px" style={{ background: "linear-gradient(90deg,transparent,#c9a24b)" }} />
          <span className="text-gold text-xs">◆</span>
          <span className="w-20 h-px" style={{ background: "linear-gradient(90deg,#c9a24b,transparent)" }} />
        </div>
        <p className="max-w-[430px] mt-6 font-sans text-base leading-relaxed text-cream/75">
          Discover handcrafted gold, diamond, silver, and bridal collections designed to celebrate life's most precious moments.
        </p>
        <div className="flex gap-4 flex-wrap mt-9 justify-center lg:justify-start">
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-3 px-7 py-4 font-sans font-bold text-xs tracking-[0.14em] uppercase rounded-full text-navy transition-transform hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#f6e5a8,#d4af37 48%,#b0862f)" }}
          >
            Explore Collection <span>→</span>
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-3 px-7 py-4 bg-transparent text-champagne border border-champagne/55 font-sans font-bold text-xs tracking-[0.14em] uppercase rounded-full transition-colors hover:bg-champagne/10 hover:border-champagne"
          >
            Custom Jewellery <span>→</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 border-t border-champagne/20 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-5 grid grid-cols-2 md:grid-cols-5 gap-5">
          {trustBar.map((t) => (
            <div key={t.title} className="text-center">
              <div className="font-sans font-bold text-[11px] md:text-xs tracking-[0.06em] text-cream">{t.title}</div>
              <div className="font-sans text-[10px] md:text-[11px] text-cream/50 mt-0.5">{t.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <Reveal className="flex items-center justify-center gap-4 mb-11">
      <span className="w-14 h-px" style={{ background: "linear-gradient(90deg,transparent,#c9a24b)" }} />
      <span className="text-gold">✦</span>
      <h2 className="m-0 font-serif font-semibold italic text-champagne text-[28px] md:text-[34px]">{children}</h2>
      <span className="text-gold">✦</span>
      <span className="w-14 h-px" style={{ background: "linear-gradient(90deg,#c9a24b,transparent)" }} />
    </Reveal>
  );
}

function CategoryRail() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#0b0a08] py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-[1240px] mx-auto">
        <SectionHeading>Shop by Category</SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((c, i) => {
            const sample = products.find((p) => p.cat === c.name);
            return (
              <Reveal
                key={c.slug}
                delay={(i % 5) * 0.06}
                onClick={() => navigate(`/shop?cat=${encodeURIComponent(c.name)}`)}
                className="cursor-pointer text-center bg-navy-light border border-champagne/25 rounded-xl p-3 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3">
                  {sample && <img src={sample.image} alt="" className="w-full h-full object-cover" loading="lazy" />}
                </div>
                <div className="font-sans font-semibold text-[13px] text-cream truncate">{c.name}</div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Collections() {
  const navigate = useNavigate();
  return (
    <section className="bg-[#080705] py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-[1240px] mx-auto">
        <SectionHeading>Browse Latest Collections</SectionHeading>
        <div className="grid md:grid-cols-3 gap-5">
          {collections.map((col) => (
            <Reveal key={col.name} as="div" className="relative h-[380px] md:h-[460px] rounded-xl overflow-hidden cursor-pointer border border-champagne/25" delay={0.05}>
              <div onClick={() => navigate("/shop")} className="absolute inset-0" style={{ background: col.bg }}>
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 42%,rgba(0,0,0,.86))" }} />
                <div className="absolute left-0 right-0 bottom-0 p-7 text-center md:text-left">
                  <div className="font-sans font-bold text-[11px] tracking-[0.3em] uppercase text-champagne mb-2.5">{col.kicker}</div>
                  <h3 className="m-0 font-serif font-semibold text-3xl md:text-4xl text-cream truncate">{col.name}</h3>
                  <p className="mt-2 mb-4 font-sans text-sm leading-relaxed text-cream/65">{col.desc}</p>
                  <span className="wd-underline font-sans font-bold text-xs tracking-[0.1em] uppercase text-champagne">Discover →</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lookbook() {
  const tags = ["#WornInLight", "#OOTD", "#StyleInspo", "#StackItUp", "#BoldMoves", "#Heirloom", "#DateNight"];

  const renderCard = (tag: string, i: number, dup: number) => {
    if (i === 0) {
      return (
        <div key={`${tag}-${dup}`} className="relative flex-none w-[68vw] sm:w-[290px] aspect-[3/4] rounded-xl overflow-hidden border border-champagne/25">
          <video src="/videos/lookbook-loop.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 55%,rgba(0,0,0,.88))" }} />
          <span className="absolute left-4 bottom-4 font-sans font-bold text-sm text-champagne">{tag}</span>
        </div>
      );
    }
    const p = products[((i - 1) * 17 + 6) % products.length];
    return (
      <div key={`${tag}-${dup}`} className="relative flex-none w-[68vw] sm:w-[290px] aspect-[3/4] rounded-xl overflow-hidden border border-champagne/25">
        <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 55%,rgba(0,0,0,.88))" }} />
        <span className="absolute left-4 bottom-4 font-sans font-bold text-sm text-champagne truncate max-w-[85%]">{tag}</span>
      </div>
    );
  };

  return (
    <section className="bg-[#0b0a08] py-16 md:py-20 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <SectionHeading>Styled by You</SectionHeading>
        <p className="text-center -mt-6 mb-9 font-sans text-sm text-cream/60">
          Scroll to explore how our community wears JKP. Tag <span className="text-gold">#WornInLight</span>.
        </p>
      </div>
      <div className="group relative overflow-hidden">
        <div className="wd-marquee-track flex gap-5 w-max px-4 md:px-8 group-hover:[animation-play-state:paused]">
          {tags.map((tag, i) => renderCard(tag, i, 0))}
          {tags.map((tag, i) => renderCard(tag, i, 1))}
        </div>
      </div>
    </section>
  );
}

function Bestsellers() {
  const navigate = useNavigate();
  return (
    <section id="shop" className="bg-[#0b0a08] py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-[1240px] mx-auto">
        <SectionHeading>Bestsellers</SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((c) => products.find((p) => p.cat === c.name)!).map((p) => (
            <Reveal key={p.id} delay={0.03}><ProductCard product={p} /></Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-9">
          <span onClick={() => navigate("/shop")} className="inline-block px-11 py-3.5 border border-champagne/55 text-champagne rounded-full font-sans font-bold text-xs tracking-[0.12em] uppercase cursor-pointer transition-all hover:bg-champagne/10 hover:border-champagne">
            View All 150 Designs
          </span>
        </Reveal>
      </div>
    </section>
  );
}

function VideoFeature() {
  const navigate = useNavigate();
  return (
    <section className="bg-[#080705] py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <Reveal
          as="div"
          className="relative aspect-video rounded-xl overflow-hidden border border-champagne/30 bg-navy-light w-full"
          delay={0}
        >
          <video
            src="/videos/campaign.mp4"
            poster="/videos/campaign-poster.jpg"
            autoPlay
            muted
            loop
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </Reveal>
        <Reveal delay={0.1} className="text-center lg:text-left">
          <div className="font-sans font-bold text-sm md:text-base tracking-[0.3em] uppercase text-gold">The Campaign</div>
          <h2 className="mt-3.5 m-0 font-serif font-semibold text-cream leading-[1.1]" style={{ fontSize: "clamp(30px,4vw,50px)" }}>
            Crafted by hand,<br />worn for life
          </h2>
          <p className="mt-4.5 mb-6 font-sans text-base leading-loose text-cream/70 max-w-[440px] mx-auto lg:mx-0">
            Every JKP piece begins with a single certified stone and the hands of a master karigar. Watch the making of our signature collection.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="inline-block px-9 py-3.5 rounded font-sans font-bold text-xs tracking-[0.1em] uppercase text-navy cursor-pointer"
            style={{ background: "linear-gradient(135deg,#f6e5a8,#c9a24b 45%,#a9822b)" }}
          >
            Watch &amp; Shop
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function StoreLocator() {
  const { notify } = useStore();
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#f6e5a8,#c9a24b 45%,#a9822b)" }}>
      <Reveal as="div" className="relative max-w-[1180px] mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-navy/20">
          <video
            src="/videos/lookbook-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <div className="font-sans font-bold text-sm md:text-base tracking-[0.35em] uppercase text-navy/60 mb-3.5">Visit Us</div>
          <h2 className="m-0 font-serif font-semibold text-navy leading-snug" style={{ fontSize: "clamp(26px,4vw,50px)" }}>
            A JKP boutique is<br />closer than you think
          </h2>
          <div className="my-6 inline-block px-5 py-2 border border-navy/35 rounded-full font-sans font-semibold text-xs text-navy">
            120+ Stores Nationwide
          </div>
          <div>
            <button
              onClick={() => notify("Store locator — coming soon")}
              className="inline-block px-9 py-3.5 bg-navy text-champagne rounded font-sans font-bold text-xs tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-navy-light"
            >
              Find your nearest store
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#0b0a08] py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-[1180px] mx-auto">
        <SectionHeading>Loved by Our Clients</SectionHeading>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <Reveal key={t.name} className="bg-navy-light rounded-xl p-7 border border-champagne/25 text-center md:text-left" delay={0.05}>
              <div className="text-gold text-xl mb-3">❝</div>
              <p className="my-0 mb-5 font-serif italic text-base leading-snug text-cream">{t.quote}</p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="w-11 h-11 flex-none rounded-full border border-champagne/40" style={{ background: "linear-gradient(135deg,#2a2114,#1c1712)" }} />
                <div className="min-w-0">
                  <div className="font-sans font-semibold text-sm text-cream truncate">{t.name}</div>
                  <div className="font-sans text-xs text-gold truncate">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="bg-[#080705] py-16 pb-20 px-4 md:px-8 text-center">
      <SectionHeading>About Us</SectionHeading>
      <Reveal className="max-w-[760px] mx-auto">
        <h3 className="m-0 mb-4.5 font-serif font-semibold text-[22px] md:text-[26px] text-cream">Welcome to JKP Jewellers</h3>
        <p className="m-0 font-sans text-base leading-loose text-cream/70">
          We are a trusted jewellery shop offering pure gold and silver jewellery with assured quality and honest
          pricing. Customer satisfaction is our priority.
        </p>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryRail />
      <Collections />
      <Lookbook />
      <Bestsellers />
      <VideoFeature />
      <StoreLocator />
      <Testimonials />
      <AboutUs />
    </>
  );
}
