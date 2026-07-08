export function t(key: string, locale: string): string {
  const dictionary: Record<string, { nl: string; en: string }> = {
    "about_us_headline": {
      nl: "Over VerifiedSlots",
      en: "About VerifiedSlots"
    },
    "editorial_policy_headline": {
      nl: "Redactioneel Beleid & Richtlijnen",
      en: "Editorial Policy & Guidelines"
    }
  };

  const entry = dictionary[key];
  if (!entry) return key;

  return locale === "nl" ? entry.nl : entry.en;
}
