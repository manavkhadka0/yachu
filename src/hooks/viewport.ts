import { useState, useEffect } from "react";

type ViewportSize = "sm" | "md" | "lg";

export function useViewportSize(): ViewportSize | null {
  const [viewportSize, setViewportSize] = useState<ViewportSize | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 600) {
        setViewportSize("sm");
      } else if (screenWidth < 1024) {
        setViewportSize("md");
      } else {
        setViewportSize("lg");
      }
    };

    // Initial check on mount
    handleResize();

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportSize;
}
