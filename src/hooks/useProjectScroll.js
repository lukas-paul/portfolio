import { useEffect } from "react";

const prefersReducedMotion = () =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Mild scroll atmosphere for the projects list:
 *  - each project fades in once as it enters the viewport
 *  - each project's media/text block drifts a few px against the scroll
 *  - the page heading lingers slightly (~0.9x scroll speed)
 * Fully disabled under prefers-reduced-motion (everything shown, static).
 */
export function useProjectScroll(containerRef, deps = []) {
    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;
        const projects = Array.from(root.querySelectorAll(".project"));
        if (!projects.length) return;
        const heading = document.querySelector(".sub-page-content .headline");

        if (prefersReducedMotion()) {
            projects.forEach((p) => p.classList.add("is-visible"));
            return;
        }

        // one-time entrance
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        projects.forEach((p) => io.observe(p));

        // continuous parallax (max ±15px)
        const AMPLITUDE = 30;
        let ticking = false;
        const update = () => {
            ticking = false;
            const vh = window.innerHeight;
            for (const p of projects) {
                const rect = p.getBoundingClientRect();
                const centre = rect.top + rect.height / 2;
                const t = centre / vh; // 0 = viewport top, 1 = viewport bottom
                const offset =
                    Math.max(-1, Math.min(1, 0.5 - t)) * AMPLITUDE;
                p.style.setProperty("--parallax", `${offset.toFixed(1)}px`);
            }
            if (heading) {
                // heading lags the scroll a touch, then parks once it's gone
                const shift = Math.min(window.scrollY * 0.12, 48);
                heading.style.setProperty(
                    "--heading-shift",
                    `${shift.toFixed(1)}px`
                );
            }
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            io.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
