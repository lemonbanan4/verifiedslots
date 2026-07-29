import React from "react";
import type { FAQItem } from "@/src/data/casinos";

interface FAQSchemaProps {
  faqs: FAQItem[];
}

// Google can render FAQ entries as an expandable rich result directly in
// search — real SERP real estate a brand-new, low-authority page otherwise
// has no way to win. Requires FAQPage JSON-LD; without it these Q&As are
// just plain text to a crawler, regardless of how well they answer the query.
export function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  );
}
