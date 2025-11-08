"use client";

import { useEffect } from "react";

export function SidebarStateWatcher() {
  useEffect(() => {
    const sidebar = document.querySelector(".peer[data-state]");
    const main = document.querySelector("main");

    if (!sidebar || !main) return;

    const updateMainWidth = () => {
      const state = sidebar.getAttribute("data-state");

      if (state === "collapsed") {
        main.style.width = `calc(100% - var(--sidebar-width-icon) - 1rem)`;
      } else {
        main.style.width = `calc(100% - var(--sidebar-width))`;
      }
    };

    // Estado inicial
    updateMainWidth();

    // Observar cambios del atributo data-state
    const observer = new MutationObserver(updateMainWidth);
    observer.observe(sidebar, { attributes: true, attributeFilter: ["data-state"] });

    return () => observer.disconnect();
  }, []);

  return null;
}
