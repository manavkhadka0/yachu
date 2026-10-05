import { useCallback, useRef } from "react";

export function useCartAnimation() {
  const triggerFlyToCart = useCallback((fromEl: HTMLElement) => {
    const cartIcon = document.querySelector("[data-cart-icon]");
    if (!cartIcon) return;

    const fromRect = fromEl.getBoundingClientRect();
    const toRect = cartIcon.getBoundingClientRect();

    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: oklch(0.35 0.12 145);
      pointer-events: none;
      z-index: 9999;
      left: ${fromRect.left + fromRect.width / 2 - 6}px;
      top: ${fromRect.top + fromRect.height / 2 - 6}px;
      transition: none;
    `;
    document.body.appendChild(dot);

    const deltaX =
      toRect.left +
      toRect.width / 2 -
      6 -
      (fromRect.left + fromRect.width / 2 - 6);
    const deltaY =
      toRect.top +
      toRect.height / 2 -
      6 -
      (fromRect.top + fromRect.height / 2 - 6);

    // Arc via Web Animations API
    dot.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        {
          transform: `translate(${deltaX * 0.5}px, ${deltaY * 0.3 - 40}px) scale(1.2)`,
          opacity: 1,
          offset: 0.4,
        },
        {
          transform: `translate(${deltaX}px, ${deltaY}px) scale(0.3)`,
          opacity: 0,
        },
      ],
      {
        duration: 520,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fill: "forwards",
      },
    ).onfinish = () => {
      dot.remove();
      // Pulse the cart icon
      cartIcon.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.3)" },
          { transform: "scale(1)" },
        ],
        { duration: 280, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
      );
    };
  }, []);

  return { triggerFlyToCart };
}
