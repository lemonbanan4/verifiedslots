import React from "react";

interface XLogoProps {
  size?: number;
  className?: string;
}

// lucide-react doesn't ship the X (formerly Twitter) brand mark — its "X"
// export is a generic close/multiply glyph, not this logo — so this is a
// small inline SVG of the official mark instead of a mismatched fallback.
export function XLogo({ size = 16, className = "" }: XLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
