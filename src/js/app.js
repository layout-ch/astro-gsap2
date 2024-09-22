import Swup from "swup";
import SwupParallelPlugin from "@swup/parallel-plugin";

import { gsap } from "gsap";

const swup = new Swup({
  plugins: [new SwupParallelPlugin()],
});

swup.hooks.on("visit:start", (visit) => {
  visit.scroll.reset = false;
});

swup.hooks.before("content:insert", (visit, { containers }) => {
  containers[0].previous.style.top = `-${window.scrollY}px`;
  window.scrollTo(0, { immediate: true });
});

swup.hooks.replace("animation:in:await", async () => {
  const containerNext = document.querySelector("#swup");
  const containerPrevious = document.querySelector(
    "#swup.is-previous-container"
  );
  console.log(containerNext, containerPrevious);
  await Promise.all([
    gsap.fromTo(
      containerNext,
      { y: "100vh" },
      { y: 0, duration: 1, ease: "power3.out" }
    ),
    gsap.fromTo(
      containerPrevious,
      { autoAlpha: 1, scale: 1, y: 0 },
      { autoAlpha: 0, scale: 0.9, y: -300, duration: 1, ease: "power3.out" }
    ),
  ]);
});
