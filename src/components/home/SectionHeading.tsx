import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** "light" is for dark (forest) section backgrounds */
  tone?: "dark" | "light";
  /** Use "h1" when this is the heading of a whole page */
  as?: "h1" | "h2";
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  tone = "dark",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) => (
  <div className={cn("mb-12 md:mb-14 md:text-center", className)}>
    {eyebrow && (
      <p className="mb-2 font-script text-2xl text-gold">{eyebrow}</p>
    )}
    <Heading
      className={cn(
        "text-balance text-4xl md:text-6xl",
        tone === "light" ? "text-cream" : "text-forest"
      )}
    >
      {title}
    </Heading>
    {description && (
      <p
        className={cn(
          "mt-4 max-w-xl md:mx-auto",
          tone === "light" ? "text-cream/75" : "text-foreground/65"
        )}
      >
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
