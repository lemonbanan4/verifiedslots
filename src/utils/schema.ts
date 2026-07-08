import { Casino } from "../data/casinos";

export function injectReviewSchema(review: Casino) {
  const scriptId = `review-schema-${review.id}`;

  // Remove existing review schema scripts to prevent duplicate tags
  const existingScripts = document.querySelectorAll(`script[id^="review-schema-"]`);
  existingScripts.forEach(script => script.remove());

  // Create new JSON-LD element
  const script = document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "name": review.name,
      "logo": {
        "@type": "ImageObject",
        "url": `https://${review.domain}/logo.png`
      },
      "url": `https://${review.domain}`,
      // License info included in the item reviewed
      "identifier": review.isKsaLicensed ? review.licenseNumber : "Unlicensed/Offshore"
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
    "description": review.summaryText,
    "reviewBody": `Detailed review of ${review.name} (${review.domain}). Licensing status: ${review.isKsaLicensed
        ? `Fully licensed and compliant with the Kansspelautoriteit (KSA) under license: ${review.licenseNumber}.`
        : "Unlicensed/Offshore entity. Warning: Bypasses standard European consumer safety protections."
      }`
  };

  script.textContent = JSON.stringify(schemaData, null, 2);
  document.head.appendChild(script);
}

export function removeReviewSchema() {
  const existingScripts = document.querySelectorAll(`script[id^="review-schema-"]`);
  existingScripts.forEach(script => script.remove());
}
