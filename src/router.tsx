import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * On a full page reload, restore the previous scroll position once the page
 * is tall enough. The router's scrollRestoration covers SPA back/forward
 * navigation but not browser reloads, so we persist scrollY here.
 */
const setupReloadScrollRestore = () => {
  if (typeof window === "undefined") return;
  const KEY = "ccit-reload-scroll";

  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (nav?.type === "reload") {
    const saved = Number(sessionStorage.getItem(KEY) ?? 0);
    if (saved > 0) {
      const tryRestore = (attempts: number) => {
        if (attempts <= 0) return;
        if (document.documentElement.scrollHeight >= saved + window.innerHeight) {
          window.scrollTo({ top: saved, behavior: "instant" as ScrollBehavior });
        } else {
          setTimeout(() => tryRestore(attempts - 1), 100);
        }
      };
      setTimeout(() => tryRestore(50), 100);
    }
  }

  let timer: ReturnType<typeof setTimeout>;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(timer);
      timer = setTimeout(() => sessionStorage.setItem(KEY, String(window.scrollY)), 150);
    },
    { passive: true },
  );
};

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  setupReloadScrollRestore();

  return router;
};
