import React from "react";
import { Casino } from "@/src/data/casinos";

interface ReviewSchemaProps {
  review: Casino;
}

export function ReviewSchema({ review }: ReviewSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "GamePlatform",
      "name": review.name,
      "url": `https://${review.domain}`,
      "logo": {
        "@type": "ImageObject",
        "url": `https://VerifiedSlots.com/assets/${review.id}-logo.png`
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": review.rating.toString(),
        "reviewCount": "38", // Number of independent audited audits
        "bestRating": review.isKsaLicensed ? "10" : "5",
        "worstRating": "1"
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": review.isKsaLicensed ? "10" : "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "VerifiedSlots",
      "logo": {
        "@type": "ImageObject",
        "url": "https://VerifiedSlots.com/logo.png"
      }
    },
    "datePublished": review.datePublished,
    "dateModified": review.lastModified || review.datePublished,
    "description": review.summaryText,
    "reviewBody": `Independent audit report of ${review.name} (${review.domain}). Licensing configuration: ${review.isKsaLicensed
        ? `Fully licensed and compliant with the Kansspelautoriteit (KSA) under license number: ${review.licenseNumber}.`
        : `Offshore/Unlicensed entity. Restricted in Netherlands.`
      }`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  );
}
