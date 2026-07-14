import { useEffect, type ReactNode } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Locomotive Scroll v5 is Lenis-based and scrolls the real window (no wrapper div
 * needed, unlike v3/v4's data-scroll-container model). We drive its RAF loop off
 * gsap.ticker (not its own) so GSAP-driven ScrollTriggers (including pinned/scrubbed
 * ones) and Locomotive's smooth scroll stay in the same frame, per the standard
 * Lenis+GSAP integration recipe.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      lenisOptions: { lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.5 },
      scrollCallback: () => ScrollTrigger.update(),
      initCustomTicker: (render) => {
        gsap.ticker.add(render);
        gsap.ticker.lagSmoothing(0);
      },
      destroyCustomTicker: (render) => {
        gsap.ticker.remove(render);
      },
    });

    ScrollTrigger.addEventListener("refresh", () => scroll.resize());
    const raf = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(raf);
      scroll.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
