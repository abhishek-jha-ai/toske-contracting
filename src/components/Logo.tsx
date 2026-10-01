type LogoProps = {
  className?: string;
  /** "light" for dark backgrounds, "dark" for light backgrounds. */
  tone?: "light" | "dark";
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="40 12 456 166" fill="none" className={className} aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="9" strokeLinejoin="miter">
        <path d="M56 170 262 22l46 33" />
        <path d="m308 55 26-18 146 133" />
        <path d="m140 170 122-88 42 30 32-23 92 81" />
        <path d="m200 170 62-45 62 45" />
        <path d="M48 170h440" />
      </g>
    </svg>
  );
}

export function Logo({ className, tone = "light" }: LogoProps) {
  const text = tone === "light" ? "text-cream-50" : "text-forest-900";
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className ?? ""}`}>
      <LogoMark className="h-[22px] w-auto text-gold-400" />
      <span className={`mt-[5px] pl-[0.42em] text-[17px] font-semibold tracking-[0.42em] ${text}`}>TOSKE</span>
      <span
        className={`mt-[4px] border px-[6px] py-[2px] pl-[calc(6px+0.24em)] text-[7.5px] font-bold tracking-[0.24em] ${text} ${
          tone === "light" ? "border-gold-400/80" : "border-gold-600"
        }`}
      >
        CONTRACTING
      </span>
    </span>
  );
}
