import * as fs from "fs";
import * as path from "path";

function main() {
  const reviewsDir = path.resolve("./src/content/reviews");
  const outputPath = path.resolve("./src/data/casinos.ts");

  if (!fs.existsSync(reviewsDir)) {
    console.error(`❌ Error: content directory not found at: ${reviewsDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(reviewsDir).filter((file) => file.endsWith(".json"));
  const casinos: any[] = [];

  for (const file of files) {
    const filePath = path.join(reviewsDir, file);
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const casino = JSON.parse(content);
      
      // Dynamic Fact-Check Stamp based on last modified date of the JSON content file
      const stats = fs.statSync(filePath);
      const formattedDate = stats.mtime.toISOString().split("T")[0];
      casino.lastModified = formattedDate;
      casino.lastUpdated = formattedDate;

      // Fallback values for required fields if they are missing in the scraped JSON
      casino.bonus = casino.bonus || casino.bonusMatchOffer || "";
      casino.wagering = casino.wagering || casino.bonusWagering || "";
      casino.welcomeBonus = casino.welcomeBonus || casino.bonusMatchOffer || "";

      casinos.push(casino);
    } catch (err) {
      console.error(`❌ Error parsing JSON file: ${filePath}`);
      console.error(err);
      process.exit(1);
    }
  }

  // Sort casinos by name or rating to keep the list stable
  casinos.sort((a, b) => a.name.localeCompare(b.name));
  const interfacesCode = `export interface ResponsibleGamblingTool {
  title: string;
  description: string;
  status: "success" | "warning" | "error" | "supported";
  iconName: "euro" | "clock" | "ban" | "shield-ban" | "alert";
}
export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  feature: string;
  thisCasino: string;
  regulatedStandard: string;
  status: "success" | "warning" | "danger" | "neutral";
}

export interface PaymentMethodItem {
  name: string;
  type: string;
  depositTime: string;
  withdrawalTime: string;
  fees: string;
}

export interface GameCategory {
  title: string;
  description: string;
  notable: string;
  iconName: "slots" | "dice" | "live";
}

export interface Casino {
  id: string;
  name: string;
  slug: string;
  domain: string;
  isKsaLicensed: boolean;
  isLicensedInNL: boolean;
  license: string;
  licenseType: "ksa" | "mga" | "curacao";
  licenseTypes?: Array<"ksa" | "mga" | "curacao">;
  restrictedCountries: string[];
  bonus: string;
  wagering: string;
  licenseNumber: string;
  rating: number;
  author: string;
  datePublished: string;
  lastModified: string;
  lastUpdated: string;
  logoColor: string; // Tailwind class, e.g. "from-emerald-500 to-blue-600"
  
  // Hero section
  welcomeBonus: string;
  gameLibraryCount: string;
  summaryText: string;
  warningText?: string;
  affiliateUrl: string;
  isPartner?: boolean;

  // Verdict section
  editorialVerdict?: string;
  pros: string[];
  cons: string[];

  // Security & License section
  securityTitle: string;
  securitySummary: string;
  securityWarning: string;
  securityPoints: Array<{
    title: string;
    description: string;
    iconName: "shield" | "zap" | "alert" | "shield-ban";
    status: "success" | "warning" | "danger";
  }>;

  // Bonus section
  bonusMatchOffer: string;
  bonusWagering: string;
  bonusMinDeposit: string;
  bonusValidity: string;
  bonusMaxBet: string;
  bonusTermsVerdict: string;
  bonusTermsDetails: Array<{
    title: string;
    description: string;
  }>;

  // Game Variety section
  gameSummary: string;
  gameCategories: GameCategory[];
  gameContributions?: Array<{
    category: string;
    contribution: string;
  }>;

  // Payment Methods section
  paymentSummary: string;
  paymentMethods: PaymentMethodItem[];

  // Responsible Gambling section
  rgTitle?: string;
  rgSummary?: string;
  rgTools?: ResponsibleGamblingTool[];

  // Comparison section
  comparisonTitle: string;
  comparisonRows: ComparisonRow[];

  // FAQ section
  faqs: FAQItem[];
  localizedBonuses?: {
    [key: string]: {
      offer: string;
      wagering: string;
    };
  };
}
`;

  const casinosCode = `${interfacesCode}\nexport const casinos: Casino[] = ${JSON.stringify(casinos, null, 2)};\n\nexport function isCasinoAvailableInCountry(slug: string, countryCode: string): boolean {\n  const casino = casinos.find((c) => c.slug === slug);\n  if (!casino) return false;\n  return !casino.restrictedCountries.includes(countryCode);\n}\n`;

  fs.writeFileSync(outputPath, casinosCode, "utf-8");
  console.log(`🎉 Successfully compiled ${casinos.length} reviews from JSON to ${outputPath}`);
}

main();
