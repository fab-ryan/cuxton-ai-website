type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Accepted for backwards compatibility; no longer used. */
  delay?: number;
  as?: "div" | "li";
};

/* Previously faded and slid each section in on scroll. That put a
   fade-and-slide-up on every section of the site — the same motion
   thirty-two times — and gated the content behind an IntersectionObserver,
   so a failed client bundle left most of the page invisible.

   The site now spends its whole motion budget on one moment (the trust
   perimeter drawing itself once, in globals.css). This renders its children
   directly and keeps the prop signature so call sites don't have to change. */
export default function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
