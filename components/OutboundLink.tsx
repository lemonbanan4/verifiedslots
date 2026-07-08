import React from "react";

interface OutboundLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function OutboundLink({ href, className = "", children }: OutboundLinkProps) {
  // Always inject rel="nofollow sponsored" to protect site SEO
  // Combine with noopener noreferrer for security with target="_blank"
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
    >
      {children}
    </a>
  );
}
