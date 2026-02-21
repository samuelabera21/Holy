import { useEffect } from "react";

function useGlobalReveal(rootSelector = "main") {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect user preference
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const root = document.querySelector(rootSelector);
    if (!root) return;

    // collect potential reveal candidates inside the root
    const all = Array.from(root.querySelectorAll("*")).filter((el) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === "script" || tag === "style" || tag === "link") return false;
      // skip invisible or purely structural elements
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;
      // avoid observing very large containers (sections) — we still want sections, but not the whole page container
      // larger than 85% viewport height we skip to avoid animating the whole panel
      if (rect.height > window.innerHeight * 0.85) return false;
      return true;
    });

    // Assign a small 'reveal-item' class and stagger delay
    all.forEach((el, idx) => {
      el.classList.add("reveal-item");
      const delay = Math.min(idx * 35, 420);
      el.style.transitionDelay = `${delay}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            // unobserve once visible
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    all.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      all.forEach((el) => {
        el.classList.remove("reveal-item");
        el.classList.remove("in-view");
        el.style.transitionDelay = "";
      });
    };
  }, [rootSelector]);
}

export default useGlobalReveal;
