import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useStore } from "../context/StoreContext";
import { waLink } from "../lib/whatsapp";

// Dummy/placeholder store details for this demo catalog — replace with the real
// boutique address/phone/email before going live.
const CONTACT = {
  address: "JKP Jewellers, MG Road, Shop No. 14, Bengaluru, Karnataka 560001, India",
  phone: "+91 98765 43210",
  email: "hello@jkpjewellers.example",
  hours: "Mon–Sat, 10:00 AM – 8:00 PM IST",
};

export default function Contact() {
  const navigate = useNavigate();
  const { notify } = useStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    notify("Message sent (demo) — we'll reply within 24 hours");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-navy pb-24">
      <div className="max-w-[1400px] mx-auto pt-5 px-4 md:px-8 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-cream/50">
        <span onClick={() => navigate("/")} className="cursor-pointer text-gold">Home</span> &nbsp;/&nbsp; <span className="text-cream">Contact</span>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-10 grid md:grid-cols-2 gap-12 items-start">
        <Reveal className="text-center md:text-left">
          <div className="font-sans font-bold text-xs tracking-[0.4em] uppercase text-gold mb-4">Get In Touch</div>
          <h1 className="m-0 font-serif font-semibold text-champagne" style={{ fontSize: "clamp(28px,4.5vw,46px)" }}>
            We'd Love to Hear From You
          </h1>
          <div className="mt-8 flex flex-col items-center md:items-start gap-5 font-sans text-sm text-cream/80">
            <div>
              <div className="font-sans font-bold text-[11px] tracking-[0.14em] uppercase text-champagne mb-1.5">Visit</div>
              {CONTACT.address}
            </div>
            <div>
              <div className="font-sans font-bold text-[11px] tracking-[0.14em] uppercase text-champagne mb-1.5">Call</div>
              <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className="text-cream/80 hover:text-champagne">{CONTACT.phone}</a>
            </div>
            <div>
              <div className="font-sans font-bold text-[11px] tracking-[0.14em] uppercase text-champagne mb-1.5">Email</div>
              <a href={`mailto:${CONTACT.email}`} className="text-cream/80 hover:text-champagne">{CONTACT.email}</a>
            </div>
            <div>
              <div className="font-sans font-bold text-[11px] tracking-[0.14em] uppercase text-champagne mb-1.5">Hours</div>
              {CONTACT.hours}
            </div>
            <a
              href={waLink("Hi JKP Jewellers, I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit mt-2 px-6 py-3 bg-gold text-navy rounded font-sans font-bold text-xs tracking-[0.1em] uppercase"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="bg-navy-light border border-champagne/25 rounded-xl p-7">
          <form onSubmit={submit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs font-semibold text-cream/70">Name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="bg-navy border border-champagne/20 rounded px-3 py-2.5 text-cream outline-none font-sans text-sm"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs font-semibold text-cream/70">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="bg-navy border border-champagne/20 rounded px-3 py-2.5 text-cream outline-none font-sans text-sm"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs font-semibold text-cream/70">Message</span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="bg-navy border border-champagne/20 rounded px-3 py-2.5 text-cream outline-none font-sans text-sm resize-none"
              />
            </label>
            <button
              type="submit"
              className="mt-2 py-3.5 bg-gold text-navy rounded font-sans font-bold text-xs tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-champagne"
            >
              Send Message
            </button>
            {sent && <p className="text-center font-sans text-xs text-cream/50">This is a demo form — no message is actually sent.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
