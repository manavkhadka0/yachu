import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** "light" is for dark (forest) section backgrounds */
  tone?: "dark" | "light";
  /** Use "h1" when this is the heading of a whole page */
  as?: "h1" | "h2";
  /** Compact headings for denser mobile landing sections */
  size?: "default" | "sm";
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  tone = "dark",
  as: Heading = "h2",
  size = "default",
  className,
}: SectionHeadingProps) => (
  <div
    className={cn(
      "text-center",
      size === "sm" ? "mb-5 md:mb-8" : "mb-12 md:mb-14",
      className
    )}
  >
    {eyebrow && (
      <p
        className={cn(
          "mb-1.5 font-script text-gold",
          size === "sm" ? "text-xl md:text-2xl" : "mb-2 text-2xl"
        )}
      >
        {eyebrow}
      </p>
    )}
    <Heading
      className={cn(
        "text-balance",
        size === "sm"
          ? "text-2xl leading-tight md:text-4xl"
          : "text-4xl md:text-6xl",
        tone === "light" ? "text-cream" : "text-forest"
      )}
    >
      {title}
    </Heading>
    {description && (
      <p
        className={cn(
          "mx-auto max-w-xl",
          size === "sm" ? "mt-2 text-sm md:text-base" : "mt-4",
          tone === "light" ? "text-cream/75" : "text-foreground/70"
        )}
      >
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
