import React from "react";
import { Casino } from "@/src/data/casinos";
import { getRegulatorMeta } from "@/src/data/regulators";

interface ReviewSchemaProps {
  review: Casino;
}

function describeLicensing(review: Casino): string {
  const types = review.licenseTypes && review.licenseTypes.length > 0
    ? review.licenseTypes
    : [review.licenseType];
  const labels = types.map((t) => {
    const meta = getRegulatorMeta(t);
    return `${meta.fullName} (${meta.shortLabel})`;
  });

  if (labels.length === 0) {
    return "Offshore/Unlicensed entity. Restricted in Netherlands.";
  }
  return `Licensed and regulated by ${labels.join(" and ")}${
    review.licenseNumber ? ` under license number: ${review.licenseNumber}` : ""
  }.`;
}

export function ReviewSchema({ review }: ReviewSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "name": review.name,
      "url": `https://${review.domain}`,
      "logo": {
        "@type": "ImageObject",
        "url": `https://VerifiedSlots.com/assets/${review.id}-logo.png`
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "10",
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
        "url": "https://verifiedslots.com/loogo_twitter.png"
      }
    },
    "datePublished": review.datePublished,
    "dateModified": review.lastModified || review.datePublished,
    "description": review.summaryText,
    "reviewBody": `Independent audit report of ${review.name} (${review.domain}). Licensing configuration: ${describeLicensing(review)}`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  );
}
