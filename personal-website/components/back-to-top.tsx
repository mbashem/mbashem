"use client";

import type { ReactNode } from "react";

export function BackToTop({ children, label }: { children: ReactNode; label?: string }) {
  function scrollToTop() {
    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  return (
    <button type="button" className="back-to-top" aria-label={label} onClick={scrollToTop}>
      {children}
    </button>
  );
}
