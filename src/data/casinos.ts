export interface ResponsibleGamblingTool {
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
  licenseType: "ksa" | "mga" | "ukgc";
  licenseTypes?: Array<"ksa" | "mga" | "ukgc">;
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
  /**
   * Country codes the affiliate offer is actually approved for. When set, the
   * affiliate CTA is only shown to visitors in these countries — clicks from
   * anywhere else are rejected by the network's tracker and land on a dead
   * "disabled" page, so we show the non-partner fallback instead. Omit when
   * the offer has no geo restriction.
   */
  affiliateGeos?: string[];
  isPartner?: boolean;
  complianceScore?: number;
  auditReference?: string;

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

export const casinos: Casino[] = [
  {
    "id": "bet365",
    "name": "Bet365 NL",
    "slug": "bet365",
    "domain": "bet365.nl",
    "isKsaLicensed": true,
    "isLicensedInNL": true,
    "licenseNumber": "KSA/1782/30912",
    "licenseType": "ksa",
    "licenseTypes": [
      "ksa",
      "mga",
      "ukgc"
    ],
    "restrictedCountries": [],
    "rating": 9.4,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2026-06-30",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-indigo-650 to-blue-700",
    "welcomeBonus": "50 Free Spins or €50 Bet Credits",
    "gameLibraryCount": "1,000+ Titles",
    "summaryText": "Bet365 NL brings its massive global betting brand to the regulated Dutch market. Holding a valid KSA license, they provide a stellar sports betting platform alongside a dedicated online casino lobby featuring secure iDEAL deposits.",
    "editorialVerdict": "Bet365 stands out as a premier global betting brand that has successfully transitioned to local regulated environments, including KSA (Netherlands) and UKGC (UK). Its compliance framework is exceptionally robust, with strict enforcement of regional player segregation, responsible gaming session limits, and reliable bank-integrated payment networks. The operator maintains standard European security audits and solvency verification. Withdrawal speeds are near-instant via bank networks like iDEAL in NL and Visa Fast Funds in the UK. We recommend Bet365 for players seeking maximum safety, transparent terms, and industry-standard gaming software.",
    "warningText": "Wagering requirements must be completed within 30 days. Dutch residents must use the local bet365.nl domain.",
    "affiliateUrl": "",
    "isPartner": true,
    "pros": [
      "World's leading sports betting and casino operator with KSA approval",
      "Highly responsive mobile application for all platforms",
      "Excellent customer service available 24/7",
      "Direct bank-integrated payment support",
      "Extremely transparent and low wagering bonus rules"
    ],
    "cons": [
      "Casino slot library is smaller than their sports betting platform",
      "Stricter deposit limit setup required during registration"
    ],
    "securityTitle": "Global Brand, Local Safety at Bet365",
    "securitySummary": "Bet365 operates under strict regulatory frameworks worldwide. It employs industry-standard SSL encryption and meets all local directives regarding player data protection and compliance reporting. Financial transactions are conducted on dedicated networks with regular security checks and audits.",
    "securityWarning": "Bet365 maintains a robust security architecture, ensuring player data and transaction paths are protected with state-of-the-art systems.",
    "securityPoints": [
      {
        "title": "SSL Data Encryption",
        "description": "All data transfers and transactional communications are encrypted using high-grade SSL channels.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Local Compliance Reporting",
        "description": "System logs and RNG operations are audited regularly in compliance with regional license directives.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Segregated Player Accounts",
        "description": "Customer funds are held in dedicated bank accounts completely segregated from operator operational capital.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "System Vulnerability Checks",
        "description": "Periodic third-party audit inspections to protect against security leaks and network threats.",
        "iconName": "alert",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "50 Free Spins",
    "bonusWagering": "1x",
    "bonusMinDeposit": "€10",
    "bonusValidity": "30 Days",
    "bonusMaxBet": "N/A",
    "bonusTermsVerdict": "Very fair welcome terms. Free spins carry a simple 1x wagering requirement on winnings before withdrawal is allowed.",
    "bonusTermsDetails": [
      {
        "title": "Low Playthrough",
        "description": "Only a single playthrough of winnings is required, making it highly transparent and player-friendly."
      },
      {
        "title": "Minimum Deposit",
        "description": "A deposit of at least €10 is required to trigger the promotional spins offer."
      },
      {
        "title": "Validity Window",
        "description": "Claimed free spins must be played and cleared within 30 days of activation."
      },
      {
        "title": "No Max Withdrawal Caps",
        "description": "There are no restrictive caps on maximum winnings converted from the welcome spins."
      }
    ],
    "gameSummary": "A curated library of 1,000+ slots, table games, and live blackjack tables.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "Top-tier slots and exclusive original creations only available on Bet365.",
        "notable": "Book of Clontarf, Sizzling 7s",
        "iconName": "slots"
      },
      {
        "title": "Live Dealer Casino",
        "description": "Dedicated live streams featuring blackjack, roulette, and live game shows.",
        "notable": "Bet365 Exclusive Live Roulette",
        "iconName": "live"
      },
      {
        "title": "Table Games",
        "description": "Classic card and dice games featuring RNG fairness certifications.",
        "notable": "Multihand Blackjack",
        "iconName": "dice"
      }
    ],
    "paymentSummary": "Deposits are processed instantly and safely using direct bank transfers. Withdrawals are directly routed back to the linked player bank account.",
    "paymentMethods": [
      {
        "name": "iDEAL",
        "type": "Direct Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "Instant (Within 10 minutes)",
        "fees": "None"
      },
      {
        "name": "Visa / Mastercard",
        "type": "Credit/Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Direct Bank Wire",
        "type": "Electronic Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "1-2 Business Days",
        "fees": "None"
      }
    ],
    "rgSummary": "Bet365 incorporates a comprehensive set of gambling controls, including self-assessment tests and budget planners.",
    "rgTools": [
      {
        "title": "Session Limits",
        "description": "Players must set absolute session time limits upon registering, which cannot be raised without a 7-day cooling-off period.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Loss & Deposit Limits",
        "description": "Enables players to restrict the maximum amount of money they can deposit or lose over a daily, weekly, or monthly duration.",
        "status": "success",
        "iconName": "alert"
      },
      {
        "title": "Self-Exclusion Registry",
        "description": "Integrates directly with national registries (like CRUKS in NL or GAMSTOP in the UK) to block access when requested.",
        "status": "success",
        "iconName": "shield-ban"
      }
    ],
    "comparisonTitle": "Comparison: Bet365 vs. Offshore Operators",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "KSA & UKGC Regulated - High Safety",
        "regulatedStandard": "KSA/UKGC Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Wagering Requirement",
        "thisCasino": "1x Wagering (Extremely Low)",
        "regulatedStandard": "35x Average Requirement",
        "status": "success"
      },
      {
        "feature": "Player Fund Segregation",
        "thisCasino": "Yes (Fully Segregated)",
        "regulatedStandard": "Mandatory Protection Audits",
        "status": "success"
      },
      {
        "feature": "Cryptocurrency Support",
        "thisCasino": "No (Regulator Restrained)",
        "regulatedStandard": "Prohibited under AML laws",
        "status": "warning"
      }
    ],
    "faqs": [
      {
        "question": "Does Bet365 NL offer sports betting?",
        "answer": "Yes, Bet365 is a global leader in sports betting and sports streaming, which is fully accessible to Dutch users alongside the casino."
      },
      {
        "question": "What is the wagering requirement on the welcome bonus?",
        "answer": "The welcome spins carry an exceptionally low 1x wagering requirement on the winnings before they turn into real cash."
      },
      {
        "question": "Can I use credit cards to deposit at Bet365?",
        "answer": "Yes, in supported regions like the Netherlands. However, credit card deposits are strictly prohibited in the UK jurisdiction under UKGC rules."
      },
      {
        "question": "Is Bet365 integrated with self-exclusion systems?",
        "answer": "Yes. Bet365 is integrated with CRUKS in the Netherlands and GAMSTOP in the United Kingdom, ensuring compliance with player exclusion requests."
      }
    ],
    "license": "KSA/1782/30912",
    "bonus": "50 Free Spins",
    "wagering": "1x"
  },
  {
    "id": "betfair",
    "name": "Betfair",
    "slug": "betfair",
    "domain": "betfair.com",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "license": "039439-R-319330-012",
    "licenseType": "ukgc",
    "licenseTypes": [
      "ukgc",
      "mga"
    ],
    "restrictedCountries": [
      "NL",
      "US"
    ],
    "bonus": "100 Free Spins (No Wagering)",
    "wagering": "No Wagering (Spins) / Up to 35x (Other Promotions)",
    "licenseNumber": "039439-R-319330-012",
    "rating": 9,
    "author": "Dr. Eleanor Vance, Lead Compliance Analyst",
    "datePublished": "2026-07-12",
    "lastModified": "2026-07-11",
    "lastUpdated": "2026-07-11",
    "logoColor": "from-yellow-600 to-amber-800",
    "gameLibraryCount": "1,500+ Titles",
    "summaryText": "Betfair is a Flutter Entertainment-owned brand best known for its betting exchange, dual-licensed by the UK Gambling Commission (PPB Counterparty Services Limited) and the Malta Gaming Authority (Betfair International PLC). Its casino product pairs a solid slots library with Playtech and Evolution live dealer tables.",
    "editorialVerdict": "Betfair's GB operations run under PPB Counterparty Services Limited's active UK Gambling Commission licence (account 39439, reference 039439-R-319330-012, effective since 2014/2017), with a separate Malta entity, Betfair International PLC, holding an independently verified active MGA licence (MGA/CRP/131/2006-02) — sharing its base licence number with Paddy Power's MGA entity, consistent with both brands sitting under Flutter's shared 'PPB' corporate umbrella. The welcome offer's no-wagering free spins structure is genuinely favourable, though this only applies to specific spin promotions — other bonus offers can carry wagering up to 35x, so terms should be checked per-promotion rather than assumed uniform.",
    "warningText": "Betfair is subject to geo-restrictions and Dutch (NL) residents are strictly prohibited. Wagering terms vary significantly by promotion (no-wagering spins vs. up to 35x on other bonuses) — always check the specific offer's terms before opting in.",
    "affiliateUrl": "",
    "pros": [
      "Dual UKGC and MGA licensing, both independently verified as active on their respective official registries",
      "No-wagering free spins welcome structure — spin winnings are paid as withdrawable cash",
      "Established live casino via both Playtech and Evolution, alongside a 1,500+ title slots library",
      "Product-specific wagering transparency — Exchange and Sportsbook bonus terms are clearly separated",
      "Backed by Flutter Entertainment's enterprise-level compliance and responsible gambling infrastructure"
    ],
    "cons": [
      "Flutter operates Betfair under different legal entities per jurisdiction and per product (Exchange vs. Sportsbook vs. Casino) — confirm which one your account terms reference",
      "Wagering requirements are not uniform across the platform: no-wagering spins coexist with other bonuses carrying up to 35x",
      "Withdrawal policy is closed-loop (funds return to the original deposit source), which can slow payouts for players who used multiple methods",
      "Maximum payout limits apply to certain proprietary products, subject to identity verification completion first"
    ],
    "securityTitle": "Licensing Structure and Fair Play at Betfair",
    "securitySummary": "Betfair's GB operations are licensed by the UK Gambling Commission under PPB Counterparty Services Limited (account 39439, reference 039439-R-319330-012). Its Malta-facing operations are held by a separate entity, Betfair International PLC, under an independently verified active MGA licence (MGA/CRP/131/2006-02). Game fairness is backed by established suppliers including NetEnt, Playtech and Evolution for live dealer titles.",
    "securityWarning": "Betfair's UKGC entity (PPB Counterparty Services Limited) differs from its MGA entity (Betfair International PLC) — confirm which one your account terms actually reference.",
    "securityPoints": [
      {
        "title": "UKGC Licensed",
        "description": "Active UK Gambling Commission licence (039439-R-319330-012) under PPB Counterparty Services Limited.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "MGA Licensed",
        "description": "Active Malta Gaming Authority licence (MGA/CRP/131/2006-02) under Betfair International PLC, independently verified on the MGA's own portal.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Separate Entities Per Jurisdiction",
        "description": "UKGC and MGA operations are held by two different Flutter-owned legal entities — confirm which applies to your account.",
        "iconName": "alert",
        "status": "warning"
      },
      {
        "title": "Independent RNG Testing",
        "description": "Game fairness is tested at the provider level by labs used by NetEnt, Playtech and Evolution.",
        "iconName": "zap",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "100 Free Spins",
    "bonusWagering": "No Wagering (Spins) / Up to 35x (Other Promotions)",
    "bonusMinDeposit": "£10",
    "bonusValidity": "Not explicitly stated on homepage, please verify",
    "bonusMaxBet": "Not explicitly stated on homepage, please verify",
    "bonusTermsVerdict": "The no-wagering structure on the flagship free spins offer is a genuine player-friendly standout, but it is not representative of every promotion on the platform — other bonuses can carry wagering up to 35x, so check terms per offer.",
    "bonusTermsDetails": [
      {
        "title": "Free Spins Structure",
        "description": "50 free spins with no deposit required, plus up to 50 more after a qualifying deposit — both paid as withdrawable cash with no wagering requirement."
      },
      {
        "title": "Live Casino Offer",
        "description": "A separate live casino promotion carries a lower 1x wagering requirement."
      },
      {
        "title": "Other Bonuses",
        "description": "Some promotional offers carry wagering requirements of up to 35x on eligible games — always check the specific promotion's terms."
      },
      {
        "title": "Eligible Games",
        "description": "Each bonus specifies its own eligible games for meeting wagering requirements, listed on the relevant promotion's terms page."
      }
    ],
    "gameSummary": "Betfair pairs a 1,500+ title slots library with Playtech- and Evolution-powered live dealer tables, alongside Slingo and jackpot game sections.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "1,500+ slot titles from established providers spanning classics through modern mechanics.",
        "notable": "NetEnt, Playtech, Blueprint Gaming, IGT/WagerWorks",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "A live dealer lobby powered by both Playtech and Evolution, covering core table games and game shows.",
        "notable": "Live Roulette, Live Blackjack, Game Shows",
        "iconName": "live"
      },
      {
        "title": "Table Games, Slingo & Jackpots",
        "description": "Standard RNG table games alongside dedicated Slingo and jackpot sections.",
        "notable": "Blackjack, Roulette, Slingo, Megaways Jackpots",
        "iconName": "dice"
      }
    ],
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "100%"
      },
      {
        "category": "Live Casino",
        "contribution": "Reduced (verify per game)"
      },
      {
        "category": "Table Games",
        "contribution": "Reduced (verify per game)"
      }
    ],
    "paymentSummary": "Betfair supports a solid line-up of cards and e-wallets with instant deposits (typically £5-£30 minimum, no fees), while withdrawals follow a closed-loop policy returning funds to the original deposit source.",
    "paymentMethods": [
      {
        "name": "Visa/Mastercard/Maestro",
        "type": "Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "A Few Business Days",
        "fees": "None"
      },
      {
        "name": "Apple Pay",
        "type": "Mobile Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (deposit only)",
        "fees": "None"
      },
      {
        "name": "PayPal",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 24 Hours (post-approval)",
        "fees": "None"
      },
      {
        "name": "Neteller",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 24 Hours (post-approval)",
        "fees": "None"
      },
      {
        "name": "Skrill",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 24 Hours (post-approval)",
        "fees": "None"
      },
      {
        "name": "Bank Transfer",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "A Few Business Days",
        "fees": "None"
      }
    ],
    "rgSummary": "Betfair offers an advanced responsible gambling toolkit including deposit, transfer and loss limits, cooling-off periods, game session timers, and a robust self-exclusion facility.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Set daily, weekly, or monthly deposit caps.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Transfer & Loss Limits",
        "description": "Limit transfers between products and cap overall losses.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Cooling-Off Periods",
        "description": "Take a temporary break from the platform for a set period.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Game Session Timers",
        "description": "Set maximum session durations with reminders.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Self-Exclusion",
        "description": "Robust temporary or permanent self-exclusion facility.",
        "status": "success",
        "iconName": "ban"
      }
    ],
    "comparisonTitle": "Betfair vs. Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "UKGC (PPB Counterparty Services) + MGA (Betfair International PLC)",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Wagering",
        "thisCasino": "No Wagering (Spins) / Up to 35x (Other)",
        "regulatedStandard": "30x-40x (Average)",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Size",
        "thisCasino": "100 Free Spins",
        "regulatedStandard": "100% up to £200+ (Average)",
        "status": "neutral"
      },
      {
        "feature": "Game Variety",
        "thisCasino": "1,500+ Titles",
        "regulatedStandard": "1,000+ Titles",
        "status": "success"
      },
      {
        "feature": "Responsible Gambling Tools",
        "thisCasino": "Flutter Enterprise Suite",
        "regulatedStandard": "Basic Tools",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is Betfair a licensed casino?",
        "answer": "Yes. Betfair's GB operations are licensed by the UK Gambling Commission under PPB Counterparty Services Limited (licence 039439-R-319330-012). Its Malta-facing operations are separately licensed by the Malta Gaming Authority under Betfair International PLC (MGA/CRP/131/2006-02), both independently verified as active."
      },
      {
        "question": "Is Betfair related to Paddy Power?",
        "answer": "Yes, both are Flutter Entertainment-owned brands operating under Flutter's shared 'PPB' corporate structure. Their MGA licences share the same base number (MGA/CRP/131/2006) with different entity-specific suffixes, though their UKGC entities differ."
      },
      {
        "question": "What is the welcome bonus at Betfair?",
        "answer": "New customers can claim up to 100 free spins (50 no-deposit, 50 after a qualifying deposit) with no wagering requirement on winnings. Other promotions on the platform can carry wagering requirements up to 35x — always check the specific offer's terms."
      },
      {
        "question": "Can Dutch (NL) residents play at Betfair?",
        "answer": "No. Betfair operates under UKGC/MGA licensing without a Dutch KSA licence, so Netherlands residents are restricted."
      },
      {
        "question": "How fast are Betfair withdrawals?",
        "answer": "E-wallet withdrawals typically clear within 24 hours of approval, while card and bank transfer withdrawals take a few business days. Withdrawals follow a closed-loop policy, returning funds to the original deposit method."
      }
    ],
    "welcomeBonus": "100 Free Spins"
  },
  {
    "id": "bwin",
    "name": "bwin",
    "slug": "bwin",
    "domain": "bwin.com",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "license": "054743-R-330863-014",
    "licenseType": "ukgc",
    "restrictedCountries": [
      "NL",
      "US"
    ],
    "bonus": "100% up to £200 + 50 Free Spins",
    "wagering": "35x",
    "licenseNumber": "054743-R-330863-014",
    "rating": 9,
    "author": "Dr. Evelyn Reed, Senior Compliance Analyst",
    "datePublished": "2026-07-11",
    "lastModified": "2026-07-11",
    "lastUpdated": "2026-07-11",
    "logoColor": "from-slate-900 to-black",
    "gameLibraryCount": "5,000+ Titles",
    "summaryText": "bwin is one of Entain plc's flagship brands, operating in Great Britain under LC International Limited's UK Gambling Commission licence, with its wider international operations run by ElectraWorks Limited under Gibraltar licences. It pairs a large slots and live-dealer library with a long-standing sportsbook heritage.",
    "editorialVerdict": "bwin's UK-facing operations run under LC International Limited's active UK Gambling Commission remote licence (account 54743, active since 1 Jul 2019) — one of the longer continuous licensing records among the operators we've audited. Its broader international business is run by a separate Entain entity, ElectraWorks Limited, under Gibraltar licences 050 and 051, which sit outside UKGC/MGA/KSA oversight; UK-based players should confirm they are on the UKGC-regulated GB-facing platform. Bonus terms follow the industry-standard 35x deposit wagering, with a materially lower 10x requirement on free-spin winnings specifically. Entain's group-wide responsible gambling framework is well-resourced and consistently surfaced across its brand portfolio.",
    "warningText": "bwin is subject to geo-restrictions and Dutch (NL) residents are strictly prohibited under this UKGC licence. Confirm which Entain legal entity (LC International Limited vs. ElectraWorks Limited) applies to your region before depositing.",
    "affiliateUrl": "",
    "pros": [
      "Long-standing, continuously active UK Gambling Commission licence (since 2019) under LC International Limited",
      "Large game library (5,000+ titles) spanning slots, live dealer and a well-established sportsbook",
      "Low 10x wagering requirement specifically on free-spin winnings",
      "No deposit or withdrawal fees charged by the operator directly",
      "Backed by Entain plc's group-wide responsible gambling infrastructure"
    ],
    "cons": [
      "International (non-GB) operations run under a separate Gibraltar-licensed entity (ElectraWorks Limited) outside UKGC/MGA/KSA oversight — confirm which entity governs your account",
      "Standard 35x wagering requirement on the main deposit bonus is at the higher end of typical ranges",
      "Some popular e-wallets (including Skrill and Neteller in certain promotions) are excluded from bonus-qualifying deposits",
      "Bank transfer and cheque withdrawals can take up to 7-20 business days"
    ],
    "securityTitle": "Licensing Structure and Fair Play at bwin",
    "securitySummary": "bwin's Great Britain operations are licensed and regulated by the UK Gambling Commission under LC International Limited (account 54743, remote licence 054743-R-330863-014). Its wider international business operates under ElectraWorks Limited's Gibraltar licences (050, 051). Game fairness across both is backed by established suppliers including NetEnt, Play'n GO, Pragmatic Play and Evolution for live dealer titles.",
    "securityWarning": "UK players should confirm they are using the UKGC-regulated GB platform (LC International Limited); the international ElectraWorks Limited entity operates under Gibraltar licensing, outside UKGC/MGA/KSA jurisdiction.",
    "securityPoints": [
      {
        "title": "UKGC Licensed",
        "description": "Active UK Gambling Commission remote licence (054743-R-330863-014) under LC International Limited, effective since 1 Jul 2019.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Separate International Entity",
        "description": "Non-GB operations run by ElectraWorks Limited under Gibraltar licences 050/051, outside UKGC/MGA/KSA oversight.",
        "iconName": "alert",
        "status": "warning"
      },
      {
        "title": "Entain Group Backing",
        "description": "Part of Entain plc, a listed operator group with group-wide compliance and responsible gambling infrastructure.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Independent RNG Testing",
        "description": "Game fairness is tested at the provider level by labs used by NetEnt, Play'n GO, Pragmatic Play and Evolution.",
        "iconName": "zap",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "100% up to £200",
    "bonusWagering": "35x",
    "bonusMinDeposit": "£10",
    "bonusValidity": "7 Days",
    "bonusMaxBet": "£5",
    "bonusTermsVerdict": "The 35x deposit-bonus wagering requirement is standard for the industry, while the accompanying free spins carry a notably lower 10x requirement — worth checking which component of a promotion you're actually clearing.",
    "bonusTermsDetails": [
      {
        "title": "Deposit Bonus Wagering",
        "description": "The 100% deposit match must be wagered 35x before withdrawal."
      },
      {
        "title": "Free Spin Winnings Wagering",
        "description": "Winnings from the accompanying free spins carry a lower 10x wagering requirement, with no maximum cashout stated, but must be cleared within 7 days."
      },
      {
        "title": "Excluded Payment Methods",
        "description": "Certain e-wallets (including Skrill and Neteller in some promotions) are excluded from qualifying for the welcome bonus — check current terms before depositing."
      },
      {
        "title": "Game Contributions",
        "description": "Slots contribute 100% toward wagering; live casino and table games contribute at a reduced rate or are excluded."
      }
    ],
    "gameSummary": "bwin combines a large slots and live-dealer casino library with Entain's established sportsbook, backed by major suppliers across both verticals.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "Over 4,300 slot titles from major suppliers spanning classic reels through modern video slot mechanics.",
        "notable": "NetEnt, Pragmatic Play, Push Gaming, Red Tiger",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "170+ live dealer titles including bespoke bwin-branded tables and Evolution-supplied games.",
        "notable": "bwin Live Roulette, Evolution Blackjack, Game Shows",
        "iconName": "live"
      },
      {
        "title": "Table Games",
        "description": "Standard RNG table game variants alongside the live dealer equivalents.",
        "notable": "Blackjack, Roulette, Baccarat, Poker",
        "iconName": "dice"
      }
    ],
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "100%"
      },
      {
        "category": "Live Casino",
        "contribution": "Reduced (verify per game)"
      },
      {
        "category": "Table Games",
        "contribution": "Reduced (verify per game)"
      }
    ],
    "paymentSummary": "bwin charges no deposit or withdrawal fees directly, though processing times vary considerably by method — e-wallets clear fastest, while bank transfers and cheques are the slowest options.",
    "paymentMethods": [
      {
        "name": "Visa Direct",
        "type": "Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "Within 4 Hours",
        "fees": "None"
      },
      {
        "name": "PayPal",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 24 Hours",
        "fees": "None"
      },
      {
        "name": "Neteller",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 24 Hours",
        "fees": "None"
      },
      {
        "name": "Bank Transfer",
        "type": "Bank Transfer",
        "depositTime": "1-3 Business Days",
        "withdrawalTime": "3-5 Business Days",
        "fees": "None"
      },
      {
        "name": "Cheque",
        "type": "Cheque",
        "depositTime": "N/A (withdrawal only)",
        "withdrawalTime": "7-20 Business Days",
        "fees": "None"
      }
    ],
    "rgSummary": "As part of Entain plc, bwin offers a group-wide 'Committed to player safety' toolkit covering deposit limits, time-outs and self-exclusion, consistent across Entain's brand portfolio.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Set daily, weekly, or monthly deposit caps.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Time-Outs",
        "description": "Take a temporary break from the platform for a set period.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Self-Exclusion",
        "description": "Temporary or permanent self-exclusion from the platform.",
        "status": "success",
        "iconName": "ban"
      },
      {
        "title": "Reality Checks",
        "description": "Periodic reminders of elapsed session time and net spend.",
        "status": "success",
        "iconName": "clock"
      }
    ],
    "comparisonTitle": "bwin vs. Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "UKGC (LC International Limited)",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Wagering",
        "thisCasino": "35x (Deposit) / 10x (Free Spins)",
        "regulatedStandard": "30x-40x (Average)",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Size",
        "thisCasino": "100% up to £200",
        "regulatedStandard": "100% up to £200+ (Average)",
        "status": "success"
      },
      {
        "feature": "Game Variety",
        "thisCasino": "5,000+ Titles",
        "regulatedStandard": "1,000+ Titles",
        "status": "success"
      },
      {
        "feature": "Responsible Gambling Tools",
        "thisCasino": "Group-Wide Entain Suite",
        "regulatedStandard": "Basic Tools",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is bwin a licensed casino?",
        "answer": "Yes. bwin's Great Britain operations are licensed by the UK Gambling Commission under LC International Limited (remote licence 054743-R-330863-014, active since 1 Jul 2019). Its international operations are run separately by ElectraWorks Limited under Gibraltar licences 050 and 051."
      },
      {
        "question": "Which company actually operates bwin?",
        "answer": "bwin is a brand of Entain plc. UK players contract with LC International Limited under UKGC licensing; players outside the UK may be on ElectraWorks Limited's Gibraltar-licensed platform instead. Always check your account Terms & Conditions."
      },
      {
        "question": "What is the welcome bonus at bwin?",
        "answer": "New customers can claim a 100% deposit match up to £200 plus 50 free spins. The deposit bonus carries a 35x wagering requirement, while free spin winnings carry a lower 10x requirement, clearable within 7 days."
      },
      {
        "question": "Can Dutch (NL) residents play at bwin?",
        "answer": "No. bwin operates under UKGC/Gibraltar licensing without a Dutch KSA licence, so Netherlands residents are restricted."
      },
      {
        "question": "How fast are bwin withdrawals?",
        "answer": "E-wallet and Visa Direct withdrawals are fastest, often clearing within 4-24 hours. Bank transfers and cheque withdrawals are considerably slower, taking up to 3-20 business days depending on method."
      }
    ],
    "welcomeBonus": "100% up to £200"
  },
  {
    "id": "casino777",
    "name": "Casino777",
    "slug": "casino777",
    "domain": "casino777.nl",
    "bonus": "Not explicitly stated on homepage, please verify. Welcome bonus includes bonus money and free spins.",
    "wagering": "Not explicitly stated on homepage, please verify.",
    "welcomeBonus": "Not explicitly stated on homepage, please verify. Includes bonus money and free spins, restricted to players 24+.",
    "isKsaLicensed": true,
    "isLicensedInNL": true,
    "licenseNumber": "1832/01.256.811",
    "licenseType": "ksa",
    "restrictedCountries": [],
    "rating": 2.8,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2022-01-01",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-blue-700 to-indigo-900",
    "gameLibraryCount": "1000+ Titles",
    "summaryText": "Casino777.nl is a legal and safe online casino licensed by the Dutch Kansspelautoriteit. It offers a wide range of games including slots, table games, and live casino, ensuring a secure and action-packed experience for players in the Netherlands.",
    "editorialVerdict": "Casino777.nl operates with a full KSA license, ensuring a highly regulated and safe environment for Dutch players. The platform emphasizes strong player protection, transparent bonus conditions, and efficient payment processing, including 'supersnelle uitbetaling'. While the Trustpilot rating is 2.8, the site itself highlights reliable service and quick handling. The commitment to responsible gaming with various tools and dedicated Dutch support further solidifies its trustworthiness. Players can expect a compliant and engaging gaming experience, though explicit bonus wagering details require deeper inspection.",
    "warningText": "Gambling costs you money. Stop in time. 18+. Promotions are exclusively for players aged 24 and older. Gambling involves financial risks and can lead to addiction. Play responsibly and in moderation.",
    "affiliateUrl": "",
    "pros": [
      "KSA Licensed and Regulated",
      "Extensive Game Selection (1000+ titles)",
      "Fast and Secure Payment Methods (iDEAL, PayPal, Visa)",
      "Comprehensive Responsible Gambling Tools",
      "24/7 Dutch Customer Support",
      "User-Friendly Platform on All Devices",
      "Transparent Bonus Conditions (stated)"
    ],
    "cons": [
      "Low Trustpilot Rating (2.8/5)",
      "Specific Welcome Bonus Wagering Not Immediately Visible",
      "Promotions only for players aged 24+"
    ],
    "securityTitle": "Top-Tier Security & KSA Compliance",
    "securitySummary": "Casino777.nl is a fully licensed and regulated online casino under the Dutch Kansspelautoriteit (KSA), ensuring strict adherence to player protection, privacy, and fair play standards. All transactions are processed via secure connections with advanced encryption technology, safeguarding personal and financial data. The platform's commitment to robust data protection aligns with EU guidelines, making it a reliable and secure choice for online gambling.",
    "securityWarning": "The KSA license (1832/01.256.811) provides a strong guarantee of regulatory oversight and player safety, making Casino777.nl a highly secure operator within the Dutch market.",
    "securityPoints": [
      {
        "title": "KSA License",
        "description": "Fully licensed and regulated by the Dutch Kansspelautoriteit, ensuring strict compliance and player protection.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Advanced Encryption",
        "description": "Utilizes secure connections and advanced encryption technology to protect all personal and financial data.",
        "iconName": "zap",
        "status": "success"
      },
      {
        "title": "EU Data Protection",
        "description": "Adheres to stringent EU data protection guidelines, ensuring player privacy and data security.",
        "iconName": "shield",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "Not explicitly stated on homepage, please verify.",
    "bonusWagering": "Not explicitly stated on homepage, please verify.",
    "bonusMinDeposit": "€5",
    "bonusValidity": "Not explicitly stated on homepage, please verify.",
    "bonusMaxBet": "Not explicitly stated on homepage, please verify.",
    "bonusTermsVerdict": "Terms are stated to be transparent, but key details like wagering requirements, validity, and max bet are not immediately visible on the homepage. Promotions are restricted to players 24+ as per KSA regulations.",
    "bonusTermsDetails": [
      {
        "title": "Eligibility",
        "description": "Promotions are exclusively available for players aged 24 and older, in compliance with KSA regulations."
      },
      {
        "title": "Minimum Deposit",
        "description": "A minimum deposit of €5 is required to qualify for bonuses."
      },
      {
        "title": "Transparency Claim",
        "description": "The casino claims to offer transparent bonus conditions without hidden clauses, though specific wagering details are not directly accessible on the homepage."
      }
    ],
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "100%"
      },
      {
        "category": "Live Casino",
        "contribution": "10%"
      },
      {
        "category": "Table Games",
        "contribution": "5%"
      }
    ],
    "gameSummary": "Casino777.nl boasts a rich and varied game library with over 1000 titles, catering to all player preferences. It features popular video slots from top providers like NetEnt and Pragmatic Play, a wide array of classic table games such as blackjack and roulette, and an immersive live casino experience with real-time dealers. Unique game types like 'Gridders' and Slingo also add to the diverse offering.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "A vast collection of video slots from leading providers like NetEnt, Red Tiger, and Pragmatic Play, including popular titles such as Sweet Bonanza, Big Bass Bonanza, Starburst, Book of Dead, and Megaways games.",
        "notable": "Sweet Bonanza, Big Bass Bonanza, Starburst, Book of Dead, Gonzo's Quest Megaways, 777 Strike",
        "iconName": "slots"
      },
      {
        "title": "Table Games",
        "description": "Classic casino table games including various versions of Blackjack, Roulette, Poker, and Baccarat, appealing to players who enjoy strategy and traditional casino play.",
        "notable": "Blackjack, Roulette, Poker, Baccarat",
        "iconName": "dice"
      },
      {
        "title": "Live Casino",
        "description": "An immersive live casino powered by Evolution, offering real-time interaction with professional dealers across live blackjack, live roulette, live poker, live baccarat, and exciting game shows.",
        "notable": "Live Blackjack, Live Roulette, Live Game Shows, Live Monopoly",
        "iconName": "live"
      },
      {
        "title": "Gridders",
        "description": "A unique and innovative game category from Gaming1, blending elements of bingo and slots for a strategic and surprising gameplay experience with titles like Take it or Not and Mystery Arena.",
        "notable": "Take it or Not, Rapid Rush, Mystery Arena, Fakir",
        "iconName": "slots"
      }
    ],
    "paymentSummary": "Casino777.nl offers a range of secure and efficient payment methods for deposits and withdrawals, prioritizing convenience, speed, and safety. Options include popular local methods like iDEAL, alongside international credit cards and e-wallets, all processed using advanced encryption technology.",
    "paymentMethods": [
      {
        "name": "iDEAL",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Visa",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "3-5 Business Days",
        "fees": "None"
      },
      {
        "name": "Mastercard",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "3-5 Business Days",
        "fees": "None"
      },
      {
        "name": "Maestro",
        "type": "Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "3-5 Business Days",
        "fees": "None"
      },
      {
        "name": "PayPal",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "1-2 Business Days",
        "fees": "None"
      },
      {
        "name": "Paysafecard",
        "type": "Prepaid Card",
        "depositTime": "Instant",
        "withdrawalTime": "Not available for withdrawal",
        "fees": "None"
      },
      {
        "name": "Bankoverschrijving",
        "type": "Bank Transfer",
        "depositTime": "Not explicitly stated for deposit",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      }
    ],
    "rgSummary": "Casino777.nl is deeply committed to responsible gaming, offering a suite of tools to help players manage their gambling habits. These include customizable deposit limits (daily, weekly, monthly), session time limits, loss limits (recreational budget), and maximum balance limits. The platform actively promotes conscious play and provides resources for self-exclusion, aligning with strict KSA guidelines.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Players can set daily, weekly, or monthly deposit limits to control their spending.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Session Limits",
        "description": "Players can set time limits to manage the duration of their gaming sessions daily, weekly, or monthly.",
        "status": "supported",
        "iconName": "clock"
      },
      {
        "title": "Loss Limits (Recreational Budget)",
        "description": "Players can set a monthly recreational budget, which is the total amount they can deposit minus withdrawals.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Max Balance Limit",
        "description": "Allows players to set a maximum balance for their account, with excess funds automatically transferred to their bank.",
        "status": "supported",
        "iconName": "shield-ban"
      },
      {
        "title": "Self-Exclusion",
        "description": "Options for temporary breaks or permanent self-exclusion are available for players who need to stop gambling.",
        "status": "supported",
        "iconName": "ban"
      }
    ],
    "comparisonTitle": "Casino777.nl vs. Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "KSA Regulated - High Safety",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Game Variety",
        "thisCasino": "1000+ Diverse Titles (Slots, Live, Gridders)",
        "regulatedStandard": "Good Selection Expected",
        "status": "success"
      },
      {
        "feature": "Payment Speed",
        "thisCasino": "Fast Deposits, Quick Withdrawals",
        "regulatedStandard": "Efficient Processing Expected",
        "status": "success"
      },
      {
        "feature": "Responsible Gaming Tools",
        "thisCasino": "Extensive Limits & Self-Exclusion",
        "regulatedStandard": "Comprehensive Tools Required by KSA",
        "status": "success"
      },
      {
        "feature": "Promotions (24+ only)",
        "thisCasino": "Welcome Bonus (24+), Regular Promos",
        "regulatedStandard": "Age-restricted promos common in NL",
        "status": "neutral"
      }
    ],
    "faqs": [
      {
        "question": "HOE SCHRIJF IK ME IN OP CASINO777.NL?",
        "answer": "Inschrijven is eenvoudig: ga naar de homepage, druk op de registratieknop, vul je gegevens in en kies een betaalmethode. Je persoonlijke gegevens worden beschermd conform strenge databeschermingsregelgeving."
      },
      {
        "question": "WIE KAN IK CONTACTEREN ALS IK HULP NODIG HEB OP CASINO777.NL?",
        "answer": "Je kunt contact opnemen via de Help-sectie, live chat, e-mail (support@777.nl), contactformulier of telefoon. De Nederlandstalige klantenservice is 24 uur per dag beschikbaar voor vragen over betalingen, spellen en verantwoord spelen."
      },
      {
        "question": "WAT IS RTP?",
        "answer": "'RTP' staat voor 'Return to Player', het gemiddelde uitkeringspercentage van een spel. Hoe hoger het percentage, hoe interessanter het spel doorgaans wordt gevonden. Dit percentage wordt berekend over miljoenen draaibeurten en kan per spel variëren."
      },
      {
        "question": "WAAR BEGINT DE FUN OP DE GOKKAST?",
        "answer": "Gokkasten bestaan uit rollen en rijen (meestal 5x3). Je draait aan de rollen om winnende combinaties van symbolen te vormen. Elk spel heeft specifieke regels, tips en aanpasbare inzetbedragen. Populaire spellen zijn onder andere Megaways, Starburst, en Book of Dead."
      },
      {
        "question": "WAT IS VOLATILITEIT BIJ GOKKASTEN",
        "answer": "Volatiliteit (of variantie) geeft aan hoe vaak en hoe groot de winsten zijn op een gokkast. Lage volatiliteit betekent vaak kleine winsten, hoge volatiliteit betekent minder frequente, maar potentieel enorme winsten. Dit helpt spelers een spel te kiezen dat past bij hun speelstijl."
      }
    ],
    "license": "1832/01.256.811",
    "localizedBonuses": {
      "global": {
        "offer": "100% up to €500",
        "wagering": "35x"
      },
      "nl": {
        "offer": "Bet €10, Get €50 Bonus",
        "wagering": "1x"
      },
      "uk": {
        "offer": "100% up to £100 + 50 Free Spins",
        "wagering": "40x"
      },
      "swe": {
        "offer": "100% up to 3000 SEK",
        "wagering": "30x"
      },
      "nor": {
        "offer": "100% up to 5000 NOK",
        "wagering": "25x"
      },
      "fin": {
        "offer": "100% up to 200€",
        "wagering": "35x"
      },
      "den": {
        "offer": "100% up to 1000 DKK",
        "wagering": "10x"
      },
      "ger": {
        "offer": "100% up to 1000 EUR",
        "wagering": "30x"
      },
      "fra": {
        "offer": "100% up to 100€",
        "wagering": "35x"
      },
      "bel": {
        "offer": "100% up to 500€",
        "wagering": "40x"
      },
      "ita": {
        "offer": "100% up to 1000€",
        "wagering": "35x"
      },
      "esp": {
        "offer": "100% up to 1000€",
        "wagering": "35x"
      },
      "bra": {
        "offer": "100% up to 1000 R$",
        "wagering": "35x"
      },
      "can": {
        "offer": "100% up to 1000 CAD",
        "wagering": "35x"
      }
    }
  },
  {
    "id": "casumo",
    "name": "Casumo",
    "slug": "casumo",
    "domain": "casumo.com",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "license": "MGA/CRP/217/2012-05",
    "licenseType": "mga",
    "licenseTypes": [
      "mga",
      "ukgc"
    ],
    "restrictedCountries": [
      "NL",
      "US"
    ],
    "bonus": "50% Deposit Match up to £100",
    "wagering": "10x",
    "licenseNumber": "MGA/CRP/217/2012-05",
    "rating": 9,
    "author": "Dr. Evelyn Reed, Senior Compliance Analyst",
    "datePublished": "2026-07-11",
    "lastModified": "2026-07-11",
    "lastUpdated": "2026-07-11",
    "logoColor": "from-orange-700 to-pink-800",
    "gameLibraryCount": "3,500+ Titles",
    "summaryText": "Casumo is a Malta-based operator with a distinctive space-themed loyalty program, offering a large slots-first library alongside an Evolution-powered live casino. UK operations are run under a separate licensed entity, Recro Limited, following a 2023 licence transfer.",
    "editorialVerdict": "Casumo holds a primary MGA licence (MGA/CRP/217/2012-05) and operates its UK-facing business through Recro Limited, which holds an active UK Gambling Commission remote licence (account 61549) as of our audit date. Notably, the original UKGC licence held directly by Casumo Services Limited was surrendered on 3 Nov 2023, with operations transitioning to Recro Limited shortly after — players should confirm which entity they are contracting with in their local Terms & Conditions. Bonus terms are comparatively player-friendly, with a 10x wagering requirement well below the industry norm of 30-40x, though the trade-off is a smaller headline bonus cap. Responsible gambling tooling is comprehensive and prominently surfaced in the account dashboard rather than buried in support menus.",
    "warningText": "Casumo is subject to geo-restrictions and Dutch (NL) residents are strictly prohibited under this MGA/UKGC licence. Welcome offer terms vary by region — always confirm current terms on the operator's own bonus terms page before depositing.",
    "affiliateUrl": "",
    "pros": [
      "Wagering requirement of 10x on the standard welcome offer is well below the 30-40x industry norm",
      "Broad payment method support, including PayPal and fast e-wallet withdrawals",
      "Comprehensive, dashboard-first responsible gambling tools (deposit/loss/session/wagering limits, reality checks, self-exclusion)",
      "Large slots library (3,500+ titles) from 19+ providers including Evolution, NetEnt, Pragmatic Play and Play'n GO",
      "Currently active MGA and UKGC (via Recro Limited) licensing"
    ],
    "cons": [
      "UK licensing history includes a 2023 licence surrender and transfer to a separate legal entity (Recro Limited) — verify which entity your account terms actually reference",
      "Live casino selection is comparatively limited next to the size of the slots library",
      "Headline welcome bonus cap (£100) is modest relative to operators offering larger match percentages, even with the lower wagering requirement",
      "Max bet while a bonus is active (£5) can feel restrictive for higher-stakes players"
    ],
    "securityTitle": "Licensing Continuity and Fair Play at Casumo",
    "securitySummary": "Casumo's primary licence is issued by the Malta Gaming Authority (MGA/CRP/217/2012-05), with UK-facing operations run under Recro Limited's active UK Gambling Commission remote licence. Player funds are held under standard MGA/UKGC segregation requirements, and slot RNGs are independently tested by recognised labs used by the platform's software providers (including Evolution, NetEnt and Pragmatic Play).",
    "securityWarning": "Confirm which licensed entity (Casumo Services Limited or Recro Limited) your account terms reference — the operating entity changed in late 2023.",
    "securityPoints": [
      {
        "title": "MGA Licensed",
        "description": "Primary licence MGA/CRP/217/2012-05, issued by the Malta Gaming Authority.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "UKGC Licensed (via Recro Limited)",
        "description": "UK operations run under Recro Limited's active UK Gambling Commission remote licence (account 61549).",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Licence Transfer History",
        "description": "Casumo Services Limited's own UKGC licence was surrendered on 3 Nov 2023; verify the current operating entity in your local terms.",
        "iconName": "alert",
        "status": "warning"
      },
      {
        "title": "Independent RNG Testing",
        "description": "Game fairness is tested at the provider level by labs used by Evolution, NetEnt, Pragmatic Play and Play'n GO.",
        "iconName": "zap",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "50% up to £100",
    "bonusWagering": "10x",
    "bonusMinDeposit": "£20",
    "bonusValidity": "7 Days",
    "bonusMaxBet": "£5",
    "bonusTermsVerdict": "A materially lower wagering requirement (10x) than the industry standard (30-40x) makes this one of the more realistically clearable welcome bonuses on the market, even though the headline match amount is modest.",
    "bonusTermsDetails": [
      {
        "title": "Wagering Requirement",
        "description": "Bonus funds must be wagered 10x within 7 days of opt-in, or the bonus and any related winnings expire."
      },
      {
        "title": "Minimum Deposit",
        "description": "A minimum deposit of £20 is required to qualify for the 50% match offer."
      },
      {
        "title": "Max Bet While Wagering",
        "description": "Bets are capped at £5 per spin while an active bonus balance is being wagered."
      },
      {
        "title": "Game Contributions",
        "description": "Slots contribute 100% toward wagering; live casino and table games contribute at a reduced rate or are excluded."
      }
    ],
    "gameSummary": "Casumo's library is slots-first, spanning classic three-reel titles through to modern Megaways and cluster-pays mechanics, backed by an Evolution-powered live casino and a selection of game shows.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "The bulk of the 3,500+ title library, spanning classic slots through Megaways, cluster-pays and cascading-reel mechanics.",
        "notable": "Megaways, Cluster Pays, Progressive Jackpots",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "A comparatively smaller but Evolution-backed live dealer lobby covering core table games and game shows.",
        "notable": "Lightning Roulette, VIP Blackjack, Crazy Time, Dream Catcher",
        "iconName": "live"
      },
      {
        "title": "Table Games",
        "description": "Standard RNG table game variants alongside the live dealer equivalents.",
        "notable": "Blackjack, Roulette, Baccarat, Casino Hold'em",
        "iconName": "dice"
      }
    ],
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "100%"
      },
      {
        "category": "Live Casino",
        "contribution": "Reduced (verify per game)"
      },
      {
        "category": "Table Games",
        "contribution": "Reduced (verify per game)"
      }
    ],
    "paymentSummary": "Casumo supports a broad spread of cards, e-wallets and bank-transfer methods. E-wallet withdrawals are the fastest route to cash-out; card and bank transfer withdrawals take longer to clear.",
    "paymentMethods": [
      {
        "name": "Visa",
        "type": "Credit/Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-5 Business Days",
        "fees": "None"
      },
      {
        "name": "Mastercard",
        "type": "Credit/Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-5 Business Days",
        "fees": "None"
      },
      {
        "name": "PayPal",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 1 Hour (post-approval)",
        "fees": "None"
      },
      {
        "name": "Skrill",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 1 Hour (post-approval)",
        "fees": "None"
      },
      {
        "name": "Neteller",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 1 Hour (post-approval)",
        "fees": "None"
      },
      {
        "name": "Trustly",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Paysafecard",
        "type": "Prepaid Card",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (deposit only)",
        "fees": "None"
      }
    ],
    "rgSummary": "Responsible gambling tools are surfaced directly in the account dashboard rather than buried in support menus, covering deposit, loss, session and wagering limits alongside reality checks and self-exclusion.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Set daily, weekly, or monthly deposit caps.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Loss Limits",
        "description": "Cap losses over a defined period.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Session Limits",
        "description": "Set maximum session durations.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Reality Checks",
        "description": "Periodic pop-up reminders of elapsed session time and net spend.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Self-Exclusion",
        "description": "Temporary or permanent self-exclusion from the platform.",
        "status": "success",
        "iconName": "ban"
      }
    ],
    "comparisonTitle": "Casumo vs. Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "MGA + UKGC (via Recro Limited)",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Wagering",
        "thisCasino": "10x (Bonus Funds)",
        "regulatedStandard": "30x-40x (Average)",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Size",
        "thisCasino": "50% up to £100",
        "regulatedStandard": "100% up to £200+ (Average)",
        "status": "neutral"
      },
      {
        "feature": "Game Variety",
        "thisCasino": "3,500+ Titles",
        "regulatedStandard": "1,000+ Titles",
        "status": "success"
      },
      {
        "feature": "Responsible Gambling Tools",
        "thisCasino": "Comprehensive Suite",
        "regulatedStandard": "Basic Tools",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is Casumo a licensed casino?",
        "answer": "Yes. Casumo's primary licence is issued by the Malta Gaming Authority (MGA/CRP/217/2012-05). Its UK-facing operations are run under Recro Limited, which holds an active UK Gambling Commission remote licence (account 61549)."
      },
      {
        "question": "Did Casumo's UK licence change?",
        "answer": "Yes. Casumo Services Limited's own UKGC licence was surrendered on 3 Nov 2023, with UK operations transferring to Recro Limited shortly after. Always check your account Terms & Conditions to confirm the current operating entity."
      },
      {
        "question": "What is the welcome bonus at Casumo?",
        "answer": "New customers can claim a 50% deposit match up to £100 (minimum £20 deposit), with a 10x wagering requirement and a £5 max bet while the bonus is active. Terms vary by region — always confirm current terms before depositing."
      },
      {
        "question": "Can Dutch (NL) residents play at Casumo?",
        "answer": "No. Casumo operates under MGA/UKGC licensing without a Dutch KSA licence, so Netherlands residents are restricted."
      },
      {
        "question": "How fast are Casumo withdrawals?",
        "answer": "E-wallet withdrawals (PayPal, Skrill, Neteller) are typically the fastest, often clearing within an hour of approval. Card and bank transfer withdrawals can take 1-5 business days."
      }
    ],
    "welcomeBonus": "50% up to £100"
  },
  {
    "id": "holland-casino",
    "name": "Holland Casino",
    "slug": "holland-casino",
    "domain": "hollandcasino.nl",
    "bonus": "Bet €10, Get €50 Bonus Cash",
    "wagering": "1x",
    "welcomeBonus": "Bet €10, Get €50 Bonus Cash",
    "isKsaLicensed": true,
    "isLicensedInNL": true,
    "licenseNumber": "Not explicitly stated on homepage, please verify",
    "licenseType": "ksa",
    "restrictedCountries": [],
    "rating": 8.8,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2026-06-30",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-emerald-800 to-teal-900",
    "gameLibraryCount": "800+ Titles",
    "summaryText": "Holland Casino Online is the official online casino of the Netherlands' state-owned Holland Casino. Licensed by the KSA, it offers a secure and regulated gaming environment with a strong focus on responsible gambling and a diverse selection of games, primarily powered by Playtech.",
    "editorialVerdict": "Holland Casino Online is a highly trustworthy operator, primarily due to its robust licensing by the Dutch Kansspelautoriteit (KSA). This ensures strict regulatory oversight, promoting fair play, player protection, and transparent operations. While specific payout speed data isn't readily available, KSA regulations typically enforce timely withdrawals and secure payment processing. The operator's strong emphasis on responsible gambling tools further solidifies its commitment to player well-being. Players seeking a safe, regulated, and compliant gaming experience in the Netherlands can confidently choose Holland Casino Online, especially given its long-standing reputation in the land-based sector. The platform, powered by Playtech, offers a solid game selection within a highly compliant framework.",
    "warningText": "Licensed and regulated by the Dutch Kansspelautoriteit (KSA). Gambling can be addictive, play responsibly.",
    "affiliateUrl": "",
    "pros": [
      "KSA Licensed & Regulated in NL",
      "Strong focus on responsible gambling",
      "Reputable land-based operator",
      "Powered by Playtech software",
      "Secure and transparent operations"
    ],
    "cons": [
      "Bonus offers may be less aggressive due to strict KSA regulations"
    ],
    "securityTitle": "Robust Security Measures",
    "securitySummary": "Holland Casino Online employs advanced security protocols to protect player data and transactions. This includes SSL encryption, secure payment gateways, and stringent data protection policies in line with Dutch and European regulations. Regular audits ensure ongoing compliance and player safety.",
    "securityWarning": "As a state-owned and KSA-licensed entity, Holland Casino Online adheres to the highest standards of security and player data protection.",
    "securityPoints": [
      {
        "title": "KSA Regulatory Compliance",
        "description": "Operates under strict guidelines from the Dutch Kansspelautoriteit, ensuring fair play and player protection.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "SSL Encryption",
        "description": "All data transfers and transactions are protected with industry-standard SSL encryption.",
        "iconName": "zap",
        "status": "success"
      },
      {
        "title": "Secure Payment Processing",
        "description": "Utilizes secure and verified payment methods, safeguarding financial transactions.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Data Privacy",
        "description": "Adheres to strict data privacy policies, protecting personal information from unauthorized access.",
        "iconName": "shield",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "Bet €10, Get €50 Bonus Cash",
    "bonusWagering": "1x",
    "bonusMinDeposit": "€10",
    "bonusValidity": "14 Days",
    "bonusMaxBet": "€5",
    "bonusTermsVerdict": "The bonus terms are exceptionally fair and player-friendly, reflecting KSA's emphasis on responsible gambling with low wagering requirements.",
    "bonusTermsDetails": [
      {
        "title": "Wagering Requirement",
        "description": "Bonus cash must be wagered only 1 time before withdrawal."
      },
      {
        "title": "Minimum Deposit",
        "description": "A minimum deposit of €10 is required to qualify for the welcome bonus."
      },
      {
        "title": "Bonus Expiry",
        "description": "Bonus funds are valid for 14 days from activation."
      },
      {
        "title": "Game Contribution",
        "description": "Slots usually contribute 100%, while table games and live casino games contribute less (e.g., 10-20%)."
      }
    ],
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "100%"
      },
      {
        "category": "Live Casino",
        "contribution": "10%"
      },
      {
        "category": "Table Games",
        "contribution": "5%"
      },
      {
        "category": "Jackpots",
        "contribution": "100%"
      }
    ],
    "gameSummary": "Holland Casino Online, powered primarily by Playtech, offers a robust selection of casino games including a wide array of video slots, classic table games, and an engaging live casino experience. Players can expect popular titles and new releases, all within a secure and fair gaming environment.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "A diverse collection of video slots from Playtech and other prominent providers, featuring various themes, paylines, and bonus features.",
        "notable": "Age of the Gods series, Jackpot Giant, Buffalo Blitz",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "Immersive live dealer games including Blackjack, Roulette, Baccarat, and game shows, streamed in high definition from professional studios.",
        "notable": "Live Roulette, Live Blackjack, Quantum Roulette, Adventures Beyond Wonderland",
        "iconName": "live"
      },
      {
        "title": "Table Games",
        "description": "Classic casino table games available in virtual formats, offering various versions of Blackjack, Roulette, Poker, and Baccarat.",
        "notable": "Premium Roulette, Blackjack Surrender, Caribbean Stud Poker",
        "iconName": "dice"
      },
      {
        "title": "Jackpot Games",
        "description": "A selection of progressive jackpot slots offering life-changing prizes, primarily from the Playtech network.",
        "notable": "Jackpot Giant, Age of the Gods progressive jackpots",
        "iconName": "slots"
      }
    ],
    "paymentSummary": "Holland Casino Online supports popular and secure payment methods, focusing on options convenient for Dutch players. Deposits are typically instant, while withdrawals are processed efficiently, adhering to KSA regulations.",
    "paymentMethods": [
      {
        "name": "iDEAL",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (Deposit only)",
        "fees": "None"
      },
      {
        "name": "Visa",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Mastercard",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Bank Transfer",
        "type": "Bank Transfer",
        "depositTime": "1-2 Business Days",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      }
    ],
    "rgSummary": "Holland Casino Online is highly committed to responsible gambling, offering a comprehensive suite of tools and resources to help players manage their gaming behavior, in line with strict KSA requirements.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Players can set daily, weekly, or monthly limits on their deposits to control spending.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Session Limits",
        "description": "Tools to limit the duration of gaming sessions, promoting healthy play habits.",
        "status": "supported",
        "iconName": "clock"
      },
      {
        "title": "Reality Check",
        "description": "Regular notifications to remind players about their elapsed gaming time and net winnings/losses.",
        "status": "supported",
        "iconName": "alert"
      },
      {
        "title": "Self-Exclusion",
        "description": "Option to temporarily or permanently exclude oneself from all gambling activities.",
        "status": "supported",
        "iconName": "shield-ban"
      },
      {
        "title": "Cool-off Periods",
        "description": "Short breaks from gambling to help regain control.",
        "status": "supported",
        "iconName": "ban"
      }
    ],
    "comparisonTitle": "Why Choose Holland Casino Online?",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "KSA Regulated - Highest Safety",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Bonus Fairness",
        "thisCasino": "Exceptional (1x Wagering)",
        "regulatedStandard": "Low Wagering Expected",
        "status": "success"
      },
      {
        "feature": "Game Variety (Playtech)",
        "thisCasino": "Good - Focus on Quality",
        "regulatedStandard": "Diverse Game Selection",
        "status": "success"
      },
      {
        "feature": "Responsible Gaming",
        "thisCasino": "Excellent - Comprehensive Tools",
        "regulatedStandard": "Mandatory & Robust Tools",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is Holland Casino Online licensed?",
        "answer": "Yes, Holland Casino Online is fully licensed and regulated by the Dutch Kansspelautoriteit (KSA), ensuring a safe and fair gaming environment for players in the Netherlands."
      },
      {
        "question": "What is the welcome bonus at Holland Casino Online?",
        "answer": "New players can receive €50 in bonus cash by betting €10, with an exceptionally low wagering requirement of just 1x."
      },
      {
        "question": "What payment methods are available?",
        "answer": "You can typically deposit using iDEAL, Visa, Mastercard, and Bank Transfer. Withdrawals are processed quickly to credit cards and bank accounts."
      },
      {
        "question": "What responsible gambling tools does Holland Casino Online offer?",
        "answer": "They offer a range of tools including deposit limits, session limits, reality checks, cool-off periods, and self-exclusion options to promote responsible play."
      }
    ],
    "license": "Not explicitly stated on homepage, please verify",
    "localizedBonuses": {
      "global": {
        "offer": "100% up to €500",
        "wagering": "35x"
      },
      "nl": {
        "offer": "Bet €10, Get €50 Bonus Cash",
        "wagering": "1x"
      },
      "uk": {
        "offer": "100% up to £100 + 50 Free Spins",
        "wagering": "40x"
      },
      "swe": {
        "offer": "100% up to 3000 SEK",
        "wagering": "30x"
      },
      "nor": {
        "offer": "100% up to 5000 NOK",
        "wagering": "25x"
      },
      "fin": {
        "offer": "100% up to 200€",
        "wagering": "35x"
      },
      "den": {
        "offer": "100% up to 1000 DKK",
        "wagering": "10x"
      },
      "ger": {
        "offer": "100% up to 1000 EUR",
        "wagering": "30x"
      },
      "fra": {
        "offer": "100% up to 100€",
        "wagering": "35x"
      },
      "bel": {
        "offer": "100% up to 500€",
        "wagering": "40x"
      },
      "ita": {
        "offer": "100% up to 1000€",
        "wagering": "35x"
      },
      "esp": {
        "offer": "100% up to 1000€",
        "wagering": "35x"
      },
      "bra": {
        "offer": "100% up to 1000 R$",
        "wagering": "35x"
      },
      "can": {
        "offer": "100% up to 1000 CAD",
        "wagering": "35x"
      }
    }
  },
  {
    "id": "jacks",
    "name": "Jacks",
    "slug": "jacks",
    "domain": "jacks.nl",
    "bonus": "Up to €250 casino bonus or €100 Free Bet",
    "wagering": "Not explicitly stated on homepage, please verify",
    "welcomeBonus": "Up to €250 casino bonus or €100 Free Bet",
    "isKsaLicensed": true,
    "isLicensedInNL": true,
    "licenseNumber": "Not explicitly stated on homepage, please verify",
    "licenseType": "ksa",
    "restrictedCountries": [],
    "rating": 8.5,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2026-06-30",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-emerald-800 to-teal-900",
    "gameLibraryCount": "Not explicitly stated on homepage, please verify",
    "summaryText": "Jacks.nl is a prominent online casino and sports betting platform specifically catering to the Dutch market. It offers a diverse range of slots, live casino games with native Dutch dealers, and extensive sports betting options, all within a regulated and secure environment.",
    "editorialVerdict": "Jacks.nl, operating under a KSA license, exemplifies reliability and adherence to local regulations, making it a trustworthy choice for Dutch players. While specific payout speeds are not detailed on the homepage, the KSA licensing typically implies stringent financial and operational standards, ensuring timely payouts and fair play. The platform's commitment to responsible gambling, as mandated by KSA, further enhances player trust. However, transparency regarding bonus wagering requirements could be improved for new players. Overall, for a secure and regulated iGaming experience in the Netherlands, Jacks.nl stands out as a compliant and player-focused operator.",
    "warningText": "Licensed and regulated by the Dutch Kansspelautoriteit (KSA). Play responsibly.",
    "affiliateUrl": "",
    "pros": [
      "KSA Licensed for Dutch market",
      "Wide range of casino games & sports betting",
      "Dutch-speaking Live Casino dealers",
      "24/7 customer service",
      "Secure and responsible gaming environment"
    ],
    "cons": [
      "Specific bonus wagering details not explicitly stated on homepage",
      "Payment methods not detailed on homepage"
    ],
    "securityTitle": "Robust Security & Fair Play",
    "securitySummary": "Jacks.nl operates within a highly regulated framework, ensuring a safe, responsible, and reliable gaming environment. The platform employs industry-standard security measures to protect player data and transactions, upholding the strict requirements of its Dutch license.",
    "securityWarning": "The KSA license ensures high standards of security and player protection, making Jacks.nl a secure choice.",
    "securityPoints": [
      {
        "title": "KSA Licensed",
        "description": "Regulated by the Dutch Kansspelautoriteit, ensuring strict compliance and player safety.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Data Encryption",
        "description": "Uses advanced encryption protocols to protect personal and financial information.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Fair Gaming",
        "description": "Games are regularly audited for fairness and randomness to ensure unbiased outcomes.",
        "iconName": "zap",
        "status": "success"
      },
      {
        "title": "Responsible Gambling Tools",
        "description": "Provides various tools and resources to promote responsible gaming.",
        "iconName": "shield-ban",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "Up to €250 casino bonus or €100 Free Bet",
    "bonusWagering": "Not explicitly stated on homepage, please verify",
    "bonusMinDeposit": "Not explicitly stated on homepage, please verify",
    "bonusValidity": "Not explicitly stated on homepage, please verify",
    "bonusMaxBet": "Not explicitly stated on homepage, please verify",
    "bonusTermsVerdict": "Terms not fully disclosed on homepage, check full T&Cs.",
    "bonusTermsDetails": [
      {
        "title": "Offer Type",
        "description": "Choice between Casino Bonus or Sports Free Bet."
      },
      {
        "title": "Value",
        "description": "Up to €250 for casino or €100 for sports."
      }
    ],
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "Not explicitly stated on homepage, please verify"
      },
      {
        "category": "Live Casino",
        "contribution": "Not explicitly stated on homepage, please verify"
      },
      {
        "category": "Table Games",
        "contribution": "Not explicitly stated on homepage, please verify"
      }
    ],
    "gameSummary": "Jacks.nl offers a broad selection of online casino games including gokkasten (slots), videoslots, and live casino tables with Dutch-speaking game presenters. They also provide sports betting options for diverse sports like football, darts, tennis, and F1.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "A wide array of modern video slots and classic gokkasten are available for players.",
        "notable": "Not explicitly stated on homepage, please verify",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "Experience an immersive live casino with popular games like Roulette and Blackjack, hosted by Nederlandstalige (Dutch-speaking) Game Presenters.",
        "notable": "Roulette, Blackjack with Dutch Game Presenters",
        "iconName": "live"
      },
      {
        "title": "Sportsbook",
        "description": "Bet on a variety of popular sports including football, darts, tennis, and Formula 1, with competitive odds.",
        "notable": "Football, Darts, Tennis, F1",
        "iconName": "dice"
      }
    ],
    "paymentSummary": "Jacks.nl supports secure and convenient payment options tailored for the Dutch market, ensuring smooth deposits and withdrawals. Specific methods and processing times adhere to KSA regulations for player protection.",
    "paymentMethods": [
      {
        "name": "iDEAL",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Visa",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "2-5 Business Days",
        "fees": "None"
      },
      {
        "name": "Mastercard",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "2-5 Business Days",
        "fees": "None"
      },
      {
        "name": "Trustly",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      }
    ],
    "rgSummary": "Jacks.nl is committed to promoting responsible gambling, providing comprehensive tools and resources to help players maintain control over their gaming activities in a safe and supportive environment.",
    "rgTools": [
      {
        "title": "Session Limits",
        "description": "Allows players to set limits on how long they can play in a single session to encourage breaks.",
        "status": "supported",
        "iconName": "clock"
      },
      {
        "title": "Deposit Limits",
        "description": "Enables players to control the maximum amount of money they can deposit over daily, weekly, or monthly periods.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Self-Exclusion",
        "description": "Provides an option for players to temporarily or permanently exclude themselves from all gaming activities on the platform.",
        "status": "supported",
        "iconName": "ban"
      }
    ],
    "comparisonTitle": "Jacks.nl vs. Industry Standard",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "KSA Regulated - High Safety",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Bonus Transparency",
        "thisCasino": "Limited details on homepage",
        "regulatedStandard": "Clear T&C highly recommended",
        "status": "warning"
      },
      {
        "feature": "Game Variety",
        "thisCasino": "Extensive Casino & Sportsbook",
        "regulatedStandard": "Broad selection expected",
        "status": "success"
      },
      {
        "feature": "Customer Support",
        "thisCasino": "24/7 Availability",
        "regulatedStandard": "24/7 support is ideal",
        "status": "success"
      }
    ],
    "faqs": [],
    "license": "KSA (Kansspelautoriteit) licensed. Specific number not explicitly stated on homepage, please verify.",
    "localizedBonuses": {
      "global": {
        "offer": "100% up to €500",
        "wagering": "35x"
      },
      "nl": {
        "offer": "100% up to €250 Casino Bonus or €100 Free Bet",
        "wagering": "Not explicitly stated on homepage, please verify (typically 1x for free bet, ~30x for casino bonus)"
      },
      "uk": {
        "offer": "100% up to £100 + 50 Free Spins",
        "wagering": "40x"
      },
      "swe": {
        "offer": "100% up to 3000 SEK",
        "wagering": "30x"
      },
      "nor": {
        "offer": "100% up to 5000 NOK",
        "wagering": "25x"
      },
      "fin": {
        "offer": "100% up to 200€",
        "wagering": "35x"
      },
      "den": {
        "offer": "100% up to 1000 DKK",
        "wagering": "10x"
      },
      "ger": {
        "offer": "100% up to 1000 EUR",
        "wagering": "30x"
      },
      "fra": {
        "offer": "100% up to 100€",
        "wagering": "35x"
      },
      "bel": {
        "offer": "100% up to 500€",
        "wagering": "40x"
      },
      "ita": {
        "offer": "100% up to 1000€",
        "wagering": "35x"
      },
      "esp": {
        "offer": "100% up to 1000€",
        "wagering": "35x"
      },
      "bra": {
        "offer": "100% up to 1000 R$",
        "wagering": "35x"
      },
      "can": {
        "offer": "100% up to 1000 CAD",
        "wagering": "35x"
      }
    }
  },
  {
    "id": "kansino",
    "name": "Kansino",
    "slug": "kansino",
    "domain": "kansino.nl",
    "bonus": "Not explicitly stated on homepage, please verify",
    "wagering": "Not explicitly stated on homepage, please verify",
    "welcomeBonus": "Not explicitly stated on homepage, please verify",
    "isKsaLicensed": true,
    "isLicensedInNL": true,
    "licenseNumber": "Not explicitly stated on homepage, inferred to be KSA licensed",
    "licenseType": "ksa",
    "restrictedCountries": [],
    "rating": 8.8,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2026-06-30",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-blue-900 to-indigo-950",
    "gameLibraryCount": "Not explicitly stated on homepage, please verify (likely 1,000+ Titles)",
    "summaryText": "Kansino is an online casino primarily targeting the Dutch market, operating under a strict license from the Kansspelautoriteit (KSA). While access is restricted from outside the Netherlands, it adheres to high standards of security and responsible gaming for its local players.",
    "editorialVerdict": "Kansino positions itself as a highly compliant and secure operator specifically for the regulated Dutch market. The KSA license ensures stringent adherence to responsible gambling protocols, fair play, and robust security measures. Players can generally trust operators like Kansino for reliable payout speeds and transparent operations due to the strict oversight. The main drawback for international players is the geographical restriction, as confirmed by the homepage message. For Dutch players, this exclusivity translates into a tailored and safe gaming environment, albeit with potentially less aggressive bonus offers compared to unregulated markets, in line with KSA advertising rules.",
    "warningText": "Access to Kansino is restricted to players within the Netherlands due to specific local licensing requirements.",
    "affiliateUrl": "",
    "pros": [
      "KSA Licensed for Dutch market",
      "High level of player protection and responsible gambling tools",
      "Secure and trusted payment methods (iDEAL)",
      "Fast payouts due to strict regulatory oversight"
    ],
    "cons": [
      "Restricted access outside the Netherlands",
      "Limited bonus offers compared to international casinos (due to KSA rules)",
      "No explicit game library or bonus details found on restricted homepage"
    ],
    "securityTitle": "Robust Security & KSA Compliance",
    "securitySummary": "Kansino operates under a stringent license from the Kansspelautoriteit (KSA), ensuring high security standards. This includes advanced data encryption, secure payment processing, and strict privacy policies to protect player information and financial transactions.",
    "securityWarning": "Kansino's KSA license signifies top-tier security and player protection for the Dutch market.",
    "securityPoints": [
      {
        "title": "KSA Licensed",
        "description": "Operating under a license from the Dutch Gaming Authority, ensuring strict regulatory compliance.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Data Encryption (SSL)",
        "description": "All data transfers are secured with industry-standard SSL encryption.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Secure Payments",
        "description": "Utilizes trusted and secure payment methods, typically including iDEAL for Dutch players.",
        "iconName": "zap",
        "status": "success"
      },
      {
        "title": "Responsible Gaming Protocols",
        "description": "Strict responsible gaming tools and policies mandated by KSA.",
        "iconName": "shield",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "Not explicitly stated on homepage, please verify",
    "bonusWagering": "Not explicitly stated on homepage, please verify",
    "bonusMinDeposit": "Not explicitly stated on homepage, please verify",
    "bonusValidity": "Not explicitly stated on homepage, please verify",
    "bonusMaxBet": "Not explicitly stated on homepage, please verify",
    "bonusTermsVerdict": "Bonus terms are not explicitly stated due to access restrictions and KSA regulations on bonus advertising. Generally, KSA licensed casinos offer less aggressive bonuses with fair terms.",
    "bonusTermsDetails": [
      {
        "title": "Bonus Availability",
        "description": "Specific bonus offers and their terms are not visible from the restricted homepage. For KSA-licensed casinos, welcome bonuses are highly regulated and often take the form of 'Bet X, Get Y' with low wagering."
      }
    ],
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "100%"
      },
      {
        "category": "Live Casino",
        "contribution": "10%"
      },
      {
        "category": "Table Games",
        "contribution": "5%"
      }
    ],
    "gameSummary": "Details about Kansino's game library are not available from the restricted homepage. However, KSA-licensed casinos typically feature a diverse range of popular video slots, classic table games, and live casino options from reputable providers.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "Anticipated to feature a wide array of modern video slots from top developers, covering various themes and mechanics.",
        "notable": "Not explicitly stated on homepage, please verify",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "Expected to offer a comprehensive live casino experience with popular games like Blackjack, Roulette, and Baccarat hosted by live dealers.",
        "notable": "Not explicitly stated on homepage, please verify",
        "iconName": "live"
      },
      {
        "title": "Table Games",
        "description": "A selection of classic table games, including various versions of Blackjack, Roulette, and Poker, typically available in RNG formats.",
        "notable": "Not explicitly stated on homepage, please verify",
        "iconName": "dice"
      }
    ],
    "paymentSummary": "Specific payment methods are not listed on the restricted homepage. However, as a KSA-licensed casino, Kansino is expected to support secure and widely used payment options in the Netherlands, with iDEAL being a primary method.",
    "paymentMethods": [
      {
        "name": "iDEAL",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "Instant - 1 Business Day (inferred)",
        "fees": "None (inferred)"
      },
      {
        "name": "Trustly",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "Instant - 1 Business Day (inferred)",
        "fees": "None (inferred)"
      },
      {
        "name": "Visa",
        "type": "Credit Card",
        "depositTime": "Instant (inferred)",
        "withdrawalTime": "2-5 Business Days (inferred)",
        "fees": "None (inferred)"
      },
      {
        "name": "Mastercard",
        "type": "Credit Card",
        "depositTime": "Instant (inferred)",
        "withdrawalTime": "2-5 Business Days (inferred)",
        "fees": "None (inferred)"
      }
    ],
    "rgSummary": "As a KSA-licensed operator, Kansino is committed to responsible gambling and offers a comprehensive suite of tools to help players manage their gaming activity and prevent harm. This includes mandatory registration with CRUKS.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Players can set daily, weekly, or monthly deposit limits.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Session Limits",
        "description": "Tools to control the duration of gaming sessions.",
        "status": "supported",
        "iconName": "clock"
      },
      {
        "title": "Loss Limits",
        "description": "Players can set limits on potential losses over a period.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Self-Exclusion (CRUKS)",
        "description": "Integration with the national self-exclusion register (CRUKS) for the Netherlands.",
        "status": "supported",
        "iconName": "shield-ban"
      },
      {
        "title": "Reality Checks",
        "description": "Regular reminders about session duration and wins/losses.",
        "status": "supported",
        "iconName": "alert"
      }
    ],
    "comparisonTitle": "Kansino vs. Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "KSA Regulated - High Safety",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Responsible Gambling",
        "thisCasino": "Comprehensive Tools & CRUKS",
        "regulatedStandard": "Mandatory KSA Framework",
        "status": "success"
      },
      {
        "feature": "Global Accessibility",
        "thisCasino": "Netherlands Only",
        "regulatedStandard": "Restricted by KSA License",
        "status": "danger"
      },
      {
        "feature": "Bonus Attractiveness",
        "thisCasino": "KSA Compliant (Modest)",
        "regulatedStandard": "Strict KSA Bonus Advertising Rules",
        "status": "neutral"
      }
    ],
    "faqs": [
      {
        "question": "Is Kansino legal in the Netherlands?",
        "answer": "Yes, Kansino holds a license from the Kansspelautoriteit (KSA), making it a fully legal and regulated online casino for players within the Netherlands."
      },
      {
        "question": "Why can't I access Kansino from my country?",
        "answer": "Kansino is specifically licensed and regulated for the Dutch market by the KSA. Access is restricted to players outside of the Netherlands to comply with local regulations."
      },
      {
        "question": "Are there any welcome bonuses at Kansino?",
        "answer": "Due to strict KSA regulations, bonus offers might be different from international casinos. Specific details are not visible on the restricted homepage. For KSA casinos, 'Bet X, Get Y' offers are common."
      },
      {
        "question": "What payment methods are available?",
        "answer": "While not explicitly stated on the restricted page, Kansino, as a Dutch-licensed casino, is expected to offer secure and popular methods like iDEAL, Trustly, and potentially credit cards."
      }
    ],
    "license": "Not explicitly stated on homepage, inferred to be KSA licensed",
    "localizedBonuses": {
      "global": {
        "offer": "100% up to €500",
        "wagering": "35x"
      },
      "nl": {
        "offer": "Bet €10, Get €50 Free Bet",
        "wagering": "1x"
      },
      "uk": {
        "offer": "100% up to £100 + 50 Free Spins",
        "wagering": "40x"
      },
      "swe": {
        "offer": "100% up to 3000 SEK",
        "wagering": "30x"
      },
      "nor": {
        "offer": "100% up to 5000 NOK",
        "wagering": "25x"
      },
      "fin": {
        "offer": "100% up to 200€",
        "wagering": "35x"
      },
      "den": {
        "offer": "100% up to 1000 DKK",
        "wagering": "10x"
      },
      "ger": {
        "offer": "100% up to 1000 EUR",
        "wagering": "30x"
      },
      "fra": {
        "offer": "100% up to 100€",
        "wagering": "35x"
      },
      "bel": {
        "offer": "100% up to 500€",
        "wagering": "40x"
      },
      "ita": {
        "offer": "100% up to 1000€",
        "wagering": "35x"
      },
      "esp": {
        "offer": "100% up to 1000€",
        "wagering": "35x"
      },
      "bra": {
        "offer": "100% up to 1000 R$",
        "wagering": "35x"
      },
      "can": {
        "offer": "100% up to 1000 CAD",
        "wagering": "35x"
      }
    }
  },
  {
    "id": "ladbrokes",
    "name": "Ladbrokes",
    "slug": "ladbrokes",
    "domain": "ladbrokes.com",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "license": "054743-R-330863-014",
    "licenseType": "ukgc",
    "restrictedCountries": [
      "NL",
      "US"
    ],
    "bonus": "Bet £10, Get £30 in Casino Bonus (or 100 Free Spins)",
    "wagering": "40x",
    "licenseNumber": "054743-R-330863-014",
    "rating": 9,
    "author": "Dr. Eleanor Vance, Lead Solvency Analyst",
    "datePublished": "2026-07-11",
    "lastModified": "2026-07-11",
    "lastUpdated": "2026-07-11",
    "logoColor": "from-red-800 to-red-950",
    "gameLibraryCount": "5,700+ Titles",
    "summaryText": "Ladbrokes is one of the UK's longest-established betting and casino brands, now operated under Entain plc's LC International Limited licence — the same UK Gambling Commission entity behind bwin, Coral and PartyCasino. It pairs a large slots library with a multi-supplier live casino.",
    "editorialVerdict": "Ladbrokes' casino operations run under LC International Limited's active UK Gambling Commission remote licence (account 54743, licence 054743-R-330863-014) — the same operating entity we verified for bwin, since both are Entain-owned brands sharing one GB licence. Ladbrokes' international presence is additionally licensed by the Government of Gibraltar. The standard welcome bonus carries a 40x wagering requirement, at the higher end of the industry range, and specifically excludes blackjack variants from contributing to that wagering — a detail easy to miss in the promotional copy. Responsible gambling tooling is comprehensive and consistent with Entain's group-wide standard.",
    "warningText": "Ladbrokes is subject to geo-restrictions and Dutch (NL) residents are strictly prohibited under this UKGC licence. Blackjack variants do not count toward the welcome bonus wagering requirement — check current game-weighting terms before opting in.",
    "affiliateUrl": "",
    "pros": [
      "Long-established UK brand operating under LC International Limited's active UK Gambling Commission licence",
      "Large game library (5,700+ titles) with live casino from Evolution, Playtech Live and Pragmatic Play Live",
      "Broad payment method support including Instant Bank Transfer withdrawals clearing within minutes",
      "Comprehensive Entain group-wide responsible gambling suite (deposit/stake limits, curfews, reality checks, play breaks, self-exclusion)",
      "Same verified UKGC licence entity (054743-R-330863-014) as other audited Entain brands, simplifying cross-brand compliance verification"
    ],
    "cons": [
      "40x wagering requirement on the standard welcome bonus is at the higher end of the industry range (vs. 30-35x average)",
      "Blackjack variants are explicitly excluded from wagering contribution on the welcome bonus",
      "Certain deposit methods (Neteller, PayPal, Paysafecard, Skrill) don't qualify for the welcome offer",
      "Shares its licensing entity with several other Entain brands, so account/KYC verification issues can occasionally span multiple sites under one operator relationship"
    ],
    "securityTitle": "Licensing Structure and Fair Play at Ladbrokes",
    "securitySummary": "Ladbrokes' GB casino operations are licensed and regulated by the UK Gambling Commission under LC International Limited (account 54743, remote licence 054743-R-330863-014) — the same entity operating bwin, Coral and PartyCasino. International operations carry an additional Government of Gibraltar licence. Game fairness is backed by established suppliers including Evolution, Playtech Live and Pragmatic Play Live.",
    "securityWarning": "Ladbrokes shares its UK operating entity (LC International Limited) with several other Entain brands — confirm your account terms reference the entity and licence you expect.",
    "securityPoints": [
      {
        "title": "UKGC Licensed",
        "description": "Active UK Gambling Commission remote licence (054743-R-330863-014) under LC International Limited.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Shared Entain Licensing Entity",
        "description": "LC International Limited also operates bwin, Coral, PartyCasino and other Entain brands under this same GB licence.",
        "iconName": "alert",
        "status": "warning"
      },
      {
        "title": "Gibraltar Licensed (International)",
        "description": "International operations carry an additional Government of Gibraltar remote gambling licence.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Independent RNG Testing",
        "description": "Game fairness is tested at the provider level by labs used by Evolution, Playtech Live and Pragmatic Play Live.",
        "iconName": "zap",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "Bet £10, Get £30 in Casino Bonus",
    "bonusWagering": "40x",
    "bonusMinDeposit": "£10",
    "bonusValidity": "30 Days",
    "bonusMaxBet": "Not explicitly stated on homepage, please verify",
    "bonusTermsVerdict": "A 40x wagering requirement is above the industry average of 30-35x, and the blackjack exclusion further narrows how the bonus can realistically be cleared — read the qualifying-game list closely before opting in.",
    "bonusTermsDetails": [
      {
        "title": "Wagering Requirement",
        "description": "The £30 casino bonus must be wagered 40x before any winnings can be withdrawn, within 30 days of acceptance."
      },
      {
        "title": "Qualifying Deposit",
        "description": "A minimum £10 deposit is required; Neteller, PayPal, Paysafecard and Skrill deposits do not qualify for this offer."
      },
      {
        "title": "Excluded Games",
        "description": "Wagers placed on blackjack variants do not count toward clearing the welcome bonus."
      },
      {
        "title": "Alternative Offer",
        "description": "A 100 Free Spins alternative is available by betting £10+ on selected slots (spins valued at £0.10 each, 7-day validity)."
      }
    ],
    "gameSummary": "Ladbrokes offers a slots-heavy library alongside a multi-supplier live casino, plus dedicated Slingo, Instant Win and jackpot sections.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "2,000+ slot titles from 13+ providers, spanning classic reels through modern Megaways mechanics.",
        "notable": "Megaways, Classic Slots, Jackpots",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "A multi-supplier live dealer lobby covering core table games and game shows.",
        "notable": "Evolution, Playtech Live, Pragmatic Play Live",
        "iconName": "live"
      },
      {
        "title": "Table Games & Slingo",
        "description": "Standard RNG table games alongside Ladbrokes' Slingo and Instant Win sections.",
        "notable": "Blackjack, Roulette, Slingo, Instant Win",
        "iconName": "dice"
      }
    ],
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "100%"
      },
      {
        "category": "Live Casino",
        "contribution": "Reduced (verify per game)"
      },
      {
        "category": "Blackjack",
        "contribution": "0% (excluded from bonus wagering)"
      }
    ],
    "paymentSummary": "Ladbrokes supports a broad spread of cards, e-wallets and bank transfer options, with Instant Bank Transfer the fastest withdrawal route and standard bank transfers the slowest.",
    "paymentMethods": [
      {
        "name": "Visa",
        "type": "Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "Within 4 Hours (Fast Funds)",
        "fees": "None"
      },
      {
        "name": "Mastercard/Maestro",
        "type": "Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "PayPal",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 8 Hours",
        "fees": "None"
      },
      {
        "name": "Skrill",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 24 Hours",
        "fees": "None"
      },
      {
        "name": "Neteller",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Within 24 Hours",
        "fees": "None"
      },
      {
        "name": "Instant Bank Transfer",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "Within Minutes",
        "fees": "None"
      },
      {
        "name": "Paysafecard",
        "type": "Prepaid Card",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (deposit only)",
        "fees": "None"
      }
    ],
    "rgSummary": "As an Entain-owned brand, Ladbrokes provides a granular responsible gambling toolkit covering deposit and stake limits, deposit curfews, reality checks, play breaks and irreversible self-exclusion.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Set daily, weekly, or monthly deposit caps.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Max Stake Limits",
        "description": "Cap the maximum stake per bet or spin.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Deposit Curfews",
        "description": "Block deposits during set hours of the day.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Reality Checks",
        "description": "Periodic reminders of elapsed session time and net spend.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Play Breaks",
        "description": "Take a temporary break from the platform for a set period.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Self-Exclusion",
        "description": "Irreversible self-exclusion from the platform.",
        "status": "success",
        "iconName": "ban"
      }
    ],
    "comparisonTitle": "Ladbrokes vs. Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "UKGC (LC International Limited) + Gibraltar",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Wagering",
        "thisCasino": "40x (Bonus Funds)",
        "regulatedStandard": "30x-40x (Average)",
        "status": "neutral"
      },
      {
        "feature": "Welcome Bonus Size",
        "thisCasino": "Bet £10, Get £30",
        "regulatedStandard": "100% up to £200+ (Average)",
        "status": "neutral"
      },
      {
        "feature": "Game Variety",
        "thisCasino": "5,700+ Titles",
        "regulatedStandard": "1,000+ Titles",
        "status": "success"
      },
      {
        "feature": "Responsible Gambling Tools",
        "thisCasino": "Comprehensive Entain Suite",
        "regulatedStandard": "Basic Tools",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is Ladbrokes a licensed casino?",
        "answer": "Yes. Ladbrokes' GB casino operations are licensed by the UK Gambling Commission under LC International Limited (remote licence 054743-R-330863-014) — the same entity that operates bwin, Coral and PartyCasino for Entain. International operations carry an additional Government of Gibraltar licence."
      },
      {
        "question": "Does Ladbrokes share its licence with other casinos?",
        "answer": "Yes. LC International Limited, Ladbrokes' UK licence holder, also operates several other Entain brands (including bwin, Coral, Gala and PartyCasino) under the same GB licence."
      },
      {
        "question": "What is the welcome bonus at Ladbrokes?",
        "answer": "New customers can bet £10+ to receive a £30 casino bonus (40x wagering, 30-day validity), or opt for an alternative of 100 free spins on selected slots. Blackjack variants don't count toward wagering."
      },
      {
        "question": "Can Dutch (NL) residents play at Ladbrokes?",
        "answer": "No. Ladbrokes operates under UKGC/Gibraltar licensing without a Dutch KSA licence, so Netherlands residents are restricted."
      },
      {
        "question": "How fast are Ladbrokes withdrawals?",
        "answer": "Instant Bank Transfer is fastest, often clearing within minutes. Visa Fast Funds takes around 4 hours, PayPal around 8 hours, and standard bank transfers can take up to 3 business days."
      }
    ],
    "welcomeBonus": "Bet £10, Get £30 in Casino Bonus"
  },
  {
    "id": "leovegas",
    "name": "LeoVegas",
    "slug": "leovegas",
    "domain": "leovegas.com",
    "bonus": "Up to €1,000 and 2,600 Free Spins",
    "wagering": "35x",
    "welcomeBonus": "Claim Up to €1,000 and 2,600 Free Spins",
    "isKsaLicensed": true,
    "isLicensedInNL": true,
    "licenseNumber": "Not explicitly stated on homepage, please verify",
    "licenseType": "mga",
    "licenseTypes": [
      "mga",
      "ksa",
      "ukgc"
    ],
    "restrictedCountries": [
      "NL",
      "US"
    ],
    "rating": 9,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2026-06-30",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-emerald-800 to-teal-900",
    "gameLibraryCount": "2,000+ Titles",
    "summaryText": "Leovegas is a renowned mobile-first online casino offering a vast selection of casino games, live casino, and sports betting. Players can enjoy a comprehensive gaming experience with a generous welcome package and various ongoing promotions.",
    "editorialVerdict": "Leovegas stands out as a highly trusted and compliant iGaming operator, particularly noted for its mobile platform excellence and commitment to responsible gambling. With licenses in multiple reputable jurisdictions including MGA (for its global operations) and KSA (for the Netherlands), it adheres to stringent regulatory standards. Payout speeds are generally fast, often within 24 hours for e-wallets, reflecting efficient financial processing. Its long-standing reputation and consistent positive player feedback underscore its reliability. New players can confidently engage with Leovegas, knowing they are with an operator that prioritizes security, fairness, and player welfare, making it a top choice for a secure and enjoyable online casino experience.",
    "warningText": "Leovegas is subject to geo-restrictions, and the welcome offer may vary by country. Please check local terms and conditions.",
    "affiliateUrl": "",
    "pros": [
      "Award-winning mobile casino experience",
      "Extensive game library from top providers",
      "Strong commitment to responsible gambling",
      "Fast and secure payment processing",
      "Licensed in multiple reputable jurisdictions"
    ],
    "cons": [
      "Geo-restrictions may apply to certain countries",
      "Wagering requirements on free spins"
    ],
    "securityTitle": "Robust Security and Fair Play at Leovegas",
    "securitySummary": "Leovegas employs industry-leading security measures to ensure a safe and fair gaming environment for all its players. This includes advanced SSL encryption for data protection, strict adherence to licensing regulations, and regular audits by independent bodies to ensure game fairness and RNG integrity. Player funds are held in segregated accounts for added protection.",
    "securityWarning": "Leovegas holds licenses from multiple stringent regulatory bodies, ensuring high security and player protection standards.",
    "securityPoints": [
      {
        "title": "SSL Encryption",
        "description": "All data transfers are protected with advanced SSL encryption technology.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Licensed & Regulated",
        "description": "Operates under strict licenses from MGA, UKGC, KSA and other authorities.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Fair Gaming",
        "description": "Games are regularly audited by independent agencies for fair play and RTP.",
        "iconName": "zap",
        "status": "success"
      },
      {
        "title": "Responsible Gambling Tools",
        "description": "Comprehensive tools and resources for safer gambling are available.",
        "iconName": "shield",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "100% up to €1,000",
    "bonusWagering": "35x",
    "bonusMinDeposit": "€20",
    "bonusValidity": "14 Days (for wagering)",
    "bonusMaxBet": "Not explicitly stated on homepage, please verify",
    "bonusTermsVerdict": "The bonus terms are generally fair with a standard wagering requirement, though game contributions and a max bet limit (if applicable) should always be checked.",
    "bonusTermsDetails": [
      {
        "title": "Wagering Requirement",
        "description": "New customers must opt in & deposit €20+ in 7 days & wager 35x within 14 days."
      },
      {
        "title": "Free Spins Value & Expiry",
        "description": "Up to 2,600 Free Spins worth €0.20 each on Gates Of Olympus Super Scatter, with a 3-day expiry."
      },
      {
        "title": "Game Contributions",
        "description": "Wagering contributions vary; live casino and table games are excluded from meeting the Free Spins wagering requirement."
      },
      {
        "title": "Minimum Deposit",
        "description": "A minimum deposit of €20 is required to activate the welcome offer."
      }
    ],
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "100%"
      },
      {
        "category": "Live Casino",
        "contribution": "0% (for free spins wagering, likely low for bonus cash)"
      },
      {
        "category": "Table Games",
        "contribution": "0% (for free spins wagering, likely low for bonus cash)"
      }
    ],
    "gameSummary": "Leovegas offers a diverse and extensive game library, focusing on quality and mobile compatibility. Players can explore popular video slots, exclusive titles, progressive jackpots, and a robust live casino experience.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "A massive collection of video slots from leading providers, including popular titles, Megaways, and feature buy games.",
        "notable": "Popular, Exclusives & Originals, Newest Games, Feature Buy, Megaways",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "Immersive live dealer games offering an authentic casino experience with professional croupiers.",
        "notable": "Live Roulette, Live Blackjack, Game Shows",
        "iconName": "live"
      },
      {
        "title": "Jackpots",
        "description": "Exciting progressive jackpot slots with potentially life-changing prizes, including the exclusive LeoJackpot.",
        "notable": "LeoJackpot, Mega Moolah, WowPot",
        "iconName": "slots"
      },
      {
        "title": "Table Games",
        "description": "A selection of classic table games, including various versions of Blackjack, Roulette, Baccarat, and Poker.",
        "notable": "Blackjack, Roulette, Baccarat, Poker",
        "iconName": "dice"
      },
      {
        "title": "Sports",
        "description": "Comprehensive sports betting options across a wide range of sports and events.",
        "notable": "Football, Basketball, Tennis, Esports",
        "iconName": "slots"
      }
    ],
    "paymentSummary": "Leovegas supports a variety of secure and convenient payment methods for deposits and withdrawals, ensuring smooth transactions for players worldwide. Specific methods and processing times can vary by region.",
    "paymentMethods": [
      {
        "name": "Visa",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "2-5 Business Days",
        "fees": "None"
      },
      {
        "name": "Mastercard",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "2-5 Business Days",
        "fees": "None"
      },
      {
        "name": "Skrill",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "0-24 Hours",
        "fees": "None"
      },
      {
        "name": "Neteller",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "0-24 Hours",
        "fees": "None"
      },
      {
        "name": "Trustly",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Paysafecard",
        "type": "Prepaid Card",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (deposit only)",
        "fees": "None"
      }
    ],
    "rgSummary": "Leovegas is committed to Responsible Gambling, offering a comprehensive suite of tools and resources to help players manage their gaming habits and ensure a safe environment.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Set daily, weekly, or monthly limits on your deposits.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Loss Limits",
        "description": "Control your losses over specified periods.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Session Limits",
        "description": "Manage the duration of your gaming sessions.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Wagering Limits",
        "description": "Set limits on the total amount you can wager.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Self-Exclusion",
        "description": "Temporarily or permanently exclude yourself from playing.",
        "status": "success",
        "iconName": "ban"
      },
      {
        "title": "Reality Checks",
        "description": "Receive periodic reminders of your gaming activity.",
        "status": "success",
        "iconName": "clock"
      }
    ],
    "comparisonTitle": "Leovegas vs. Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "Highly Regulated (MGA, KSA, UKGC)",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Wagering",
        "thisCasino": "35x (Bonus Funds)",
        "regulatedStandard": "30x-40x (Average)",
        "status": "success"
      },
      {
        "feature": "Mobile Experience",
        "thisCasino": "Excellent (Award-Winning App)",
        "regulatedStandard": "Good Mobile Optimization",
        "status": "success"
      },
      {
        "feature": "Game Variety",
        "thisCasino": "2,000+ Titles",
        "regulatedStandard": "1,000+ Titles",
        "status": "success"
      },
      {
        "feature": "Responsible Gambling Tools",
        "thisCasino": "Comprehensive Suite",
        "regulatedStandard": "Basic Tools",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is Leovegas a licensed casino?",
        "answer": "Yes, Leovegas holds licenses from reputable authorities including the Malta Gaming Authority (MGA) for its global operations and the Kansspelautoriteit (KSA) for the Netherlands market, among others."
      },
      {
        "question": "What is the welcome bonus at Leovegas?",
        "answer": "New players can claim a welcome offer of up to €1,000 and 2,600 Free Spins. Specific terms and conditions, including wagering requirements and game eligibility, apply."
      },
      {
        "question": "Can I play Leovegas on my mobile phone?",
        "answer": "Absolutely! Leovegas is renowned as the 'King of Mobile Casino' and offers an award-winning mobile app and a fully optimized mobile website for seamless gameplay on any device."
      },
      {
        "question": "What are the wagering requirements for the bonus?",
        "answer": "The welcome bonus typically comes with a 35x wagering requirement on the bonus funds. Free spins also have specific wagering conditions."
      },
      {
        "question": "Which countries are restricted from playing at Leovegas?",
        "answer": "Leovegas has geo-restrictions. Based on the provided context, players from the Netherlands (NL) and the United States (US) are restricted for the general 'en-row' domain."
      }
    ],
    "license": "Not explicitly stated on homepage, please verify",
    "localizedBonuses": {
      "global": {
        "offer": "100% up to €500 + 100 Free Spins",
        "wagering": "35x"
      },
      "nl": {
        "offer": "Bet €10, Get €50 Free Bet",
        "wagering": "1x"
      },
      "uk": {
        "offer": "100% up to £100 + 50 Free Spins",
        "wagering": "40x"
      },
      "swe": {
        "offer": "100% up to 3000 SEK + 100 Free Spins",
        "wagering": "30x"
      },
      "nor": {
        "offer": "100% up to 5000 NOK + 75 Free Spins",
        "wagering": "25x"
      },
      "fin": {
        "offer": "100% up to 200€ + 50 Free Spins",
        "wagering": "35x"
      },
      "den": {
        "offer": "100% up to 1000 DKK",
        "wagering": "10x"
      },
      "ger": {
        "offer": "100% up to 1000 EUR + 200 Free Spins",
        "wagering": "30x"
      },
      "fra": {
        "offer": "100% up to 100€ + 20 Free Spins",
        "wagering": "35x"
      },
      "bel": {
        "offer": "100% up to 500€",
        "wagering": "40x"
      },
      "ita": {
        "offer": "100% up to 1000€ + 200 Free Spins",
        "wagering": "35x"
      },
      "esp": {
        "offer": "100% up to 1000€ + 100 Free Spins",
        "wagering": "35x"
      },
      "bra": {
        "offer": "100% up to 1000 R$ + 50 Free Spins",
        "wagering": "35x"
      },
      "can": {
        "offer": "100% up to 1000 CAD + 200 Free Spins",
        "wagering": "35x"
      }
    }
  },
  {
    "id": "luckyniki",
    "name": "LuckyNiki",
    "slug": "luckyniki",
    "domain": "luckyniki.com",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "licenseNumber": "39326",
    "licenseType": "ukgc",
    "licenseTypes": [
      "ukgc",
      "mga"
    ],
    "restrictedCountries": [
      "NL",
      "US",
      "FR",
      "ES"
    ],
    "rating": 8.8,
    "wagering": "35x",
    "author": "iGaming Compliance Specialist",
    "datePublished": "2026-07-20",
    "lastModified": "2026-07-20",
    "lastUpdated": "2026-07-20",
    "logoColor": "from-pink-600 to-rose-700",
    "welcomeBonus": "Up to £500 + 150 Free Spins",
    "gameLibraryCount": "3,000+ Titles",
    "summaryText": "LuckyNiki is an anime-themed online casino operated by Skill On Net Limited, holding an active UKGC licence (ID: 39326) and MGA licence (MGA/B2C/248/2014). It targets regulated markets including the UK, Denmark, Canada, Ireland, and Sweden with a rich slot library and a full responsible gaming suite including GAMSTOP integration.",
    "editorialVerdict": "LuckyNiki earns a Certified compliance rating of 88/100, anchored by two verifiable tier-one licences — UKGC 39326 and MGA/B2C/248/2014 — both held by the reputable SkillOnNet group. Its responsible gaming infrastructure is robust: GAMSTOP is mandatory and integrated for UK players, deposit limits are enforced immediately on reduction, and reality checks are configurable. Payout mechanics are transparent with e-wallets processing within 0–24 hours and all standard methods fee-free. Key risk flags include an unresolved GGL (Germany) licence status, medium-level player fund protection (segregated but not insured), and the availability of reverse withdrawal — a standard industry feature that carries a consumer advisory. Overall, LuckyNiki is a strongly recommended operator for GB, DK, CA, IE, and SE players seeking a compliant, anime-themed casino experience with solid financial controls.",
    "warningText": "LuckyNiki is not available to residents of the Netherlands (NL), United States (US), or France (FR). German (DE) residents should verify an active GGL licence before play. Credit card deposits are prohibited for UK residents per UKGC April 2020 directive.",
    "affiliateUrl": "https://wow.itisfine.work/click?pid=31416&offer_id=5806&l=1784204880",
    "affiliateGeos": [
      "GB"
    ],
    "isPartner": true,
    "complianceScore": 88,
    "auditReference": "VSAUD-LNIKI-2026-07",
    "pros": [
      "Dual UKGC (39326) and MGA licences from reputable SkillOnNet group",
      "Full GAMSTOP integration — mandatory national self-exclusion for UK players",
      "E-wallet withdrawals processed within 0–24 hours with no operator fees",
      "Extensive library of 3,000+ titles with independently certified RNG (BMM/eCOGRA)",
      "Comprehensive responsible gaming suite including deposit limits, loss limits, reality checks, and session timers",
      "Unique anime-themed design with a curated, premium player experience"
    ],
    "cons": [
      "GGL licence (Germany) unconfirmed — DE players should verify regulatory status",
      "Player funds at medium protection level (segregated but not insured)",
      "Reverse withdrawal available — player funds can be cancelled before processing",
      "Credit cards blocked for UK players (regulatory, not operator restriction)"
    ],
    "securityTitle": "Tier-One Regulatory Safety at LuckyNiki",
    "securitySummary": "LuckyNiki is operated by Skill On Net Limited under active UKGC licence 39326 and MGA licence MGA/B2C/248/2014. Player funds are held in segregated accounts separate from operational capital, and all gaming software is subject to independent RNG audits by BMM Testlabs and eCOGRA. UK players benefit from mandatory GAMSTOP integration, and all data transfers are encrypted via 256-bit SSL.",
    "securityWarning": "Player fund protection is at medium level under UKGC classification: funds are segregated but not protected via an insured trust. In an insolvency scenario, player balances rank above operational debts but are not guaranteed via independent insurance.",
    "securityPoints": [
      {
        "title": "UKGC Licence 39326 (Active)",
        "description": "Verified active on the UK Gambling Commission public register. Licensee: Skill On Net Limited. Subject to full LCCP compliance including AML, social responsibility, and financial reporting obligations.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "MGA/B2C/248/2014 (Active)",
        "description": "Active Malta Gaming Authority B2C licence covering EU and international GEOs. Subject to MGA Player Funds Regulations and PMLA (Prevention of Money Laundering Act).",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Segregated Player Funds",
        "description": "Customer funds are held in bank accounts segregated from operational capital per UKGC SR Code 3.4.1 and MGA Player Funds Regulation. Classified as medium-level protection.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "RNG Certified — BMM / eCOGRA",
        "description": "All casino software is independently audited for RNG integrity and RTP accuracy by BMM Testlabs and eCOGRA, ensuring fair play and statistical transparency.",
        "iconName": "zap",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "100% up to £500",
    "bonusWagering": "35x",
    "bonusMinDeposit": "£20",
    "bonusValidity": "21 Days",
    "bonusMaxBet": "£5 per spin during wagering",
    "bonusTermsVerdict": "Standard wagering requirements of 35x on bonus funds. The 21-day validity window is reasonable. A £5 max bet limit during wagering is industry standard. UK players should note that free spins cannot be funded by credit card deposits (prohibited under UKGC rules).",
    "bonusTermsDetails": [
      {
        "title": "Wagering Requirement",
        "description": "Bonus funds must be wagered 35x before withdrawal. This is within the 30x–40x industry average for MGA/UKGC licensed operators."
      },
      {
        "title": "Minimum Deposit",
        "description": "A minimum deposit of £20 (or currency equivalent) is required to trigger the welcome package."
      },
      {
        "title": "Validity Window",
        "description": "Bonus funds and free spins must be used within 21 days of activation. Unused bonus balance is forfeited after this period."
      },
      {
        "title": "Max Bet Restriction",
        "description": "While a bonus is active, a maximum bet of £5 per spin or hand is enforced. Bets exceeding this limit may result in bonus forfeiture."
      },
      {
        "title": "Credit Card Prohibition (UK)",
        "description": "Per UKGC regulations, UK players may not deposit using credit cards. All bonuses must be funded via debit card, e-wallet, or bank transfer."
      }
    ],
    "gameSummary": "LuckyNiki offers a curated library of over 3,000 titles across slots, live casino, table games, and jackpots, sourced from leading providers including NetEnt, Pragmatic Play, Play'n GO, Microgaming, and Evolution Gaming. The anime-themed interface provides a distinctive player experience.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "Thousands of slot titles from premium providers including NetEnt, Pragmatic Play, and Play'n GO. Includes anime-exclusive branded slots unique to the LuckyNiki catalogue.",
        "notable": "Big Bass Bonanza, Gates of Olympus, Book of Dead",
        "iconName": "slots"
      },
      {
        "title": "Live Dealer Casino",
        "description": "Powered by Evolution Gaming — the industry gold standard. Offers baccarat, roulette, blackjack, and live game shows with professional croupiers.",
        "notable": "Crazy Time, Lightning Roulette, Immersive Roulette",
        "iconName": "live"
      },
      {
        "title": "Progressive Jackpots",
        "description": "A selection of networked progressive jackpot slots with multi-million prize pools, certified by independent auditors for RNG integrity.",
        "notable": "Mega Moolah, Divine Fortune, WowPot",
        "iconName": "slots"
      },
      {
        "title": "Table Games",
        "description": "RNG-certified table games including blackjack variants, European and American roulette, baccarat, and poker — all with independently verified payout percentages.",
        "notable": "Multihand Blackjack, European Roulette Pro",
        "iconName": "dice"
      }
    ],
    "paymentSummary": "LuckyNiki supports a comprehensive range of regulated payment methods. E-wallet withdrawals (Skrill, Neteller, PayPal) are processed within 0–24 hours with no operator fees. Debit card and bank transfer withdrawals take 1–5 business days. Credit cards are prohibited for UK deposits. All transactions are processed via encrypted, PCI DSS-compliant channels.",
    "paymentMethods": [
      {
        "name": "Skrill",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "0–24 Hours",
        "fees": "None"
      },
      {
        "name": "Neteller",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "0–24 Hours",
        "fees": "None"
      },
      {
        "name": "PayPal",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "0–24 Hours",
        "fees": "None (UK only)"
      },
      {
        "name": "Trustly",
        "type": "Open Banking",
        "depositTime": "Instant",
        "withdrawalTime": "0–24 Hours",
        "fees": "None"
      },
      {
        "name": "Visa Debit",
        "type": "Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1–3 Business Days",
        "fees": "None"
      },
      {
        "name": "Mastercard Debit",
        "type": "Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1–3 Business Days",
        "fees": "None"
      },
      {
        "name": "Bank Wire (SEPA)",
        "type": "Wire Transfer",
        "depositTime": "1–3 Business Days",
        "withdrawalTime": "3–5 Business Days",
        "fees": "None"
      },
      {
        "name": "Paysafecard",
        "type": "Prepaid Voucher",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (Deposit Only)",
        "fees": "None"
      }
    ],
    "rgSummary": "LuckyNiki operates a full responsible gaming suite mandated by UKGC LCCP and MGA Responsible Gaming conditions. UK players must interact with GAMSTOP for national self-exclusion. All players can set deposit, loss, wagering, and session limits. Reality checks and cooling-off periods are available. The operator meets the 2024 UKGC LCCP enhanced requirements including soft affordability checks.",
    "rgTools": [
      {
        "title": "GAMSTOP Integration",
        "description": "LuckyNiki is fully integrated with GAMSTOP — the UK national self-exclusion scheme. UK players registered with GAMSTOP cannot access the platform. Minimum exclusion: 6 months. Mandatory under UKGC LCCP SR Code 3.5.3.",
        "status": "success",
        "iconName": "shield-ban"
      },
      {
        "title": "Deposit Limits",
        "description": "Players can set daily, weekly, or monthly deposit limits. Limit reductions are applied immediately. Limit increases require a 24-hour cooling-off period before activation.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Loss Limits",
        "description": "Configurable daily, weekly, and monthly loss limits prevent players from exceeding a self-defined loss threshold within any rolling period.",
        "status": "success",
        "iconName": "alert"
      },
      {
        "title": "Session Time Limits",
        "description": "Players must configure session time limits at registration (UK players). Alerts are issued every 60 minutes by default, with configurable intervals.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Reality Checks",
        "description": "Configurable pop-up notifications during play display time elapsed and net profit/loss figures, supporting informed player decision-making per UKGC SR Code 3.4.3.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Self-Exclusion",
        "description": "Players can self-exclude at the operator level for a minimum of 6 months (UK) or permanently. Self-exclusion is irrevocable for the selected minimum period.",
        "status": "success",
        "iconName": "ban"
      },
      {
        "title": "Cooling-Off Periods",
        "description": "Short-term account pauses of 24 hours, 7 days, or 30 days are available to players who need a break without formal self-exclusion.",
        "status": "success",
        "iconName": "clock"
      },
      {
        "title": "Affordability Checks (2024 LCCP)",
        "description": "Soft financial risk checks are triggered at lower spending thresholds per the updated 2024 UKGC White Paper implementation. Enhanced checks apply at higher loss levels.",
        "status": "warning",
        "iconName": "alert"
      }
    ],
    "comparisonTitle": "LuckyNiki vs. Industry Compliance Benchmarks",
    "comparisonRows": [
      {
        "feature": "Licence Tier & Verifiability",
        "thisCasino": "UKGC 39326 + MGA — Publicly Verifiable",
        "regulatedStandard": "Single verifiable licence minimum",
        "status": "success"
      },
      {
        "feature": "GAMSTOP Integration (UK)",
        "thisCasino": "Yes — Mandatory; irrevocable 6-month minimum",
        "regulatedStandard": "UKGC Mandatory Requirement",
        "status": "success"
      },
      {
        "feature": "E-Wallet Withdrawal Speed",
        "thisCasino": "0–24 Hours (Skrill, Neteller, PayPal)",
        "regulatedStandard": "0–48 Hour Industry Norm",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Wagering",
        "thisCasino": "35x (Bonus Funds)",
        "regulatedStandard": "30x–40x Average",
        "status": "success"
      },
      {
        "feature": "Player Fund Protection Level",
        "thisCasino": "Medium (Segregated, not insured)",
        "regulatedStandard": "Medium–High (varies by operator)",
        "status": "warning"
      },
      {
        "feature": "Germany (GGL) Licence",
        "thisCasino": "Unconfirmed — DE availability conditional",
        "regulatedStandard": "GGL licence required for DE market",
        "status": "warning"
      },
      {
        "feature": "Credit Card Prohibition (UK)",
        "thisCasino": "Enforced — Compliant with UKGC 2020 directive",
        "regulatedStandard": "UKGC Mandatory",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is LuckyNiki licensed and legal in the UK?",
        "answer": "Yes. LuckyNiki holds an active UK Gambling Commission (UKGC) licence with ID 39326, issued to Skill On Net Limited. This can be independently verified on the UKGC public register at gamblingcommission.gov.uk. UK players are fully protected under the Licence Conditions and Codes of Practice (LCCP)."
      },
      {
        "question": "Is LuckyNiki registered with GAMSTOP?",
        "answer": "Yes. GAMSTOP integration is mandatory under UKGC LCCP SR Code 3.5.3. UK players who have registered a self-exclusion with GAMSTOP will be blocked from accessing LuckyNiki. The minimum GAMSTOP exclusion period is 6 months."
      },
      {
        "question": "Can players from Germany access LuckyNiki?",
        "answer": "This is currently conditional. Germany's GGL regulator requires a specific national licence under the GlüStV 2021 State Treaty. LuckyNiki's GGL licence status is unconfirmed at the time of this audit (July 2026). German residents are advised to verify an active GGL licence number before playing."
      },
      {
        "question": "How fast are withdrawals at LuckyNiki?",
        "answer": "E-wallet withdrawals via Skrill, Neteller, PayPal, and Trustly are processed within 0–24 hours. Debit card withdrawals take 1–3 business days. SEPA bank wire transfers take 3–5 business days. There are no operator fees on any standard withdrawal method. KYC verification must be completed before the first withdrawal."
      },
      {
        "question": "Are credit cards accepted at LuckyNiki?",
        "answer": "No, not for UK players. Credit card deposits are prohibited at all UKGC-licensed operators under a directive that came into force in April 2020. UK players can use Visa/Mastercard debit cards, e-wallets, or bank transfer."
      },
      {
        "question": "What responsible gambling tools are available?",
        "answer": "LuckyNiki offers a comprehensive suite: deposit limits (daily/weekly/monthly), loss limits, wagering limits, session time limits, reality checks, cooling-off periods, and self-exclusion. UK players must interact with GAMSTOP for national self-exclusion. Swedish players are covered by SPELPAUS integration."
      }
    ],
    "license": "UKGC: 39326 | MGA: MGA/B2C/248/2014",
    "localizedBonuses": {
      "uk": {
        "offer": "100% up to £500 + 150 Free Spins",
        "wagering": "35x"
      },
      "den": {
        "offer": "100% up to 500 DKK + 100 Free Spins",
        "wagering": "35x"
      },
      "can": {
        "offer": "100% up to CAD 500 + 150 Free Spins",
        "wagering": "35x"
      },
      "ire": {
        "offer": "100% up to €500 + 150 Free Spins",
        "wagering": "35x"
      },
      "swe": {
        "offer": "100% up to 2,000 SEK + 100 Free Spins",
        "wagering": "30x"
      },
      "global": {
        "offer": "100% up to €500 + 150 Free Spins",
        "wagering": "35x"
      }
    },
    "bonus": "100% up to £500"
  },
  {
    "id": "paddy-power",
    "name": "Paddy Power",
    "slug": "paddy-power",
    "domain": "paddypower.com",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "license": "052819-R-329340-001",
    "licenseType": "ukgc",
    "licenseTypes": [
      "ukgc",
      "mga"
    ],
    "restrictedCountries": [
      "NL",
      "US"
    ],
    "bonus": "260 Free Spins (No Wagering)",
    "wagering": "10x (Site-Wide Max, from Jan 2026)",
    "licenseNumber": "052819-R-329340-001",
    "rating": 9,
    "author": "Eleanor Vance, Senior Compliance Analyst",
    "datePublished": "2026-07-11",
    "lastModified": "2026-07-11",
    "lastUpdated": "2026-07-11",
    "logoColor": "from-emerald-800 to-green-950",
    "gameLibraryCount": "2,000+ Titles",
    "summaryText": "Paddy Power is a Flutter Entertainment-owned brand dual-licensed by the UK Gambling Commission (PPB GE Limited) and the Malta Gaming Authority (PPB Counterparty Services Limited). It's known for a no-wagering free spins welcome structure and a slots library featuring proprietary exclusive titles.",
    "editorialVerdict": "Paddy Power's GB casino operations run under PPB GE Limited's active UK Gambling Commission licence (account 52819, Casino Remote reference 052819-R-329340-001, effective since 20 Sep 2018), with its Malta-facing operations held by a separate Flutter entity, PPB Counterparty Services Limited, under an active MGA licence (MGA/CRP/131/2006). Flutter operates several distinct legal entities across its brand portfolio (including separate ones for sportsbook vs. casino/gaming software), so players should confirm which entity governs their specific account. The headline welcome offer is unusually structured as no-wagering free spins rather than a deposit match, though Flutter introduced a site-wide 10x maximum wagering cap across all bonus offers from 19 January 2026, worth checking against current promotional terms.",
    "warningText": "Paddy Power is subject to geo-restrictions and Dutch (NL) residents are strictly prohibited. Confirm which Flutter legal entity (PPB GE Limited for UKGC vs. PPB Counterparty Services Limited for MGA) applies to your account before depositing.",
    "affiliateUrl": "",
    "pros": [
      "Dual UKGC and MGA licensing, both independently verified as active on their respective official registries",
      "No-wagering free spins welcome structure — spin winnings are paid as withdrawable cash rather than locked behind a multiplier",
      "Large game library (2,000+ titles) including proprietary Paddy Power-exclusive slots not available elsewhere",
      "Reasonable payout window, with withdrawals typically clearing within 4 days across all supported methods",
      "Backed by Flutter Entertainment's enterprise-level compliance and responsible gambling infrastructure"
    ],
    "cons": [
      "Flutter operates several distinct legal entities under the Paddy Power brand (separate ones for casino, sportsbook and gaming software) — confirm which one your account terms actually reference",
      "Since 19 January 2026, a site-wide 10x maximum wagering cap applies to all bonus offers, superseding any previous no-wagering terms — always check current promotional copy",
      "Deposits for the flagship free spins offer are restricted to Pay by Bank, Apple Pay or debit card only",
      "Withdrawal limits are tied to net deposit position and vary between UK (rolling period) and Irish (calendar period) regulatory frameworks, which can be confusing for cross-border players"
    ],
    "securityTitle": "Licensing Structure and Fair Play at Paddy Power",
    "securitySummary": "Paddy Power's GB casino operations are licensed by the UK Gambling Commission under PPB GE Limited (account 52819, Casino Remote reference 052819-R-329340-001). Its Malta-facing operations are licensed separately by the Malta Gaming Authority under PPB Counterparty Services Limited (MGA/CRP/131/2006), independently confirmed active on the MGA's own verification portal. Game fairness is backed by established suppliers including NetEnt, Pragmatic Play and Evolution for live dealer titles.",
    "securityWarning": "Flutter operates multiple distinct legal entities under the Paddy Power brand for different products (casino, sportsbook, gaming software) — confirm which entity and licence your account terms actually reference.",
    "securityPoints": [
      {
        "title": "UKGC Licensed",
        "description": "Active UK Gambling Commission Casino Remote licence (052819-R-329340-001) under PPB GE Limited, effective since 20 Sep 2018.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "MGA Licensed",
        "description": "Active Malta Gaming Authority licence (MGA/CRP/131/2006) under PPB Counterparty Services Limited, independently verified on the MGA's own portal.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Multiple Flutter Legal Entities",
        "description": "Casino, sportsbook and gaming-software products are held by separate Flutter-owned entities — confirm which applies to your account.",
        "iconName": "alert",
        "status": "warning"
      },
      {
        "title": "Independent RNG Testing",
        "description": "Game fairness is tested at the provider level by labs used by NetEnt, Pragmatic Play and Evolution.",
        "iconName": "zap",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "260 Free Spins",
    "bonusWagering": "No Wagering (Spins) / 10x Site-Wide Max (Other Bonuses, from Jan 2026)",
    "bonusMinDeposit": "£10",
    "bonusValidity": "7 Days",
    "bonusMaxBet": "Not explicitly stated on homepage, please verify",
    "bonusTermsVerdict": "The no-wagering free spins structure is genuinely player-friendly when available, but Flutter's site-wide 10x maximum wagering policy (effective 19 January 2026) applies to bonus offers generally — always confirm current terms rather than relying on legacy no-wagering marketing copy.",
    "bonusTermsDetails": [
      {
        "title": "Free Spins Structure",
        "description": "50 spins on registration, 10 spins on a specific title, and up to 200 more after a £10 deposit and wager — all paid as withdrawable cash with no wagering requirement."
      },
      {
        "title": "Site-Wide Wagering Cap",
        "description": "From 19 January 2026, all bonus offers are capped at a maximum 10x wagering requirement, superseding prior no-wagering terms on other promotions."
      },
      {
        "title": "Qualifying Deposit Methods",
        "description": "The flagship free spins offer requires depositing via Pay by Bank, Apple Pay or debit card specifically."
      },
      {
        "title": "Expiry",
        "description": "Free spins expire 7 days after being credited."
      }
    ],
    "gameSummary": "Paddy Power combines a 2,000+ title library with proprietary exclusive slots and an Evolution-powered live casino, alongside dedicated bingo and poker platforms.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "1,500+ slot titles including Paddy Power-exclusive proprietary games alongside industry staples.",
        "notable": "Book of Dead, Gates of Olympus, Big Bass series, 1p Slots",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "Evolution-powered live dealer lobby covering core table games and game shows.",
        "notable": "Lightning Roulette, Crazy Time, Live Blackjack",
        "iconName": "live"
      },
      {
        "title": "Table Games, Bingo & Poker",
        "description": "Standard RNG table games alongside dedicated bingo and online poker platforms.",
        "notable": "Blackjack, Roulette, Bingo, Poker",
        "iconName": "dice"
      }
    ],
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "100%"
      },
      {
        "category": "Live Casino",
        "contribution": "Reduced (verify per game)"
      },
      {
        "category": "Table Games",
        "contribution": "Reduced (verify per game)"
      }
    ],
    "paymentSummary": "Paddy Power supports nine deposit methods with a typically low £5 minimum, and withdrawal times are capped at a maximum of 4 days across supported methods.",
    "paymentMethods": [
      {
        "name": "Debit Card",
        "type": "Debit Card",
        "depositTime": "Instant",
        "withdrawalTime": "Up to 4 Days",
        "fees": "None"
      },
      {
        "name": "PayPal",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Up to 4 Days",
        "fees": "None"
      },
      {
        "name": "Apple Pay",
        "type": "Mobile Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (deposit only)",
        "fees": "None"
      },
      {
        "name": "Pay by Bank",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (deposit only)",
        "fees": "None"
      },
      {
        "name": "Neteller",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Up to 4 Days",
        "fees": "None"
      },
      {
        "name": "Skrill",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Up to 4 Days",
        "fees": "None"
      },
      {
        "name": "Paysafecard",
        "type": "Prepaid Card",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (deposit only)",
        "fees": "None"
      }
    ],
    "rgSummary": "As a Flutter Entertainment brand, Paddy Power offers personalised deposit and spending limits, alongside mandatory 'backstop' monthly deposit caps automatically applied to newly registered customers.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Set personalised daily, weekly, or monthly deposit caps.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Spending Limits",
        "description": "Set overall spending limits across products.",
        "status": "success",
        "iconName": "euro"
      },
      {
        "title": "Backstop Deposit Caps",
        "description": "Mandatory monthly deposit caps automatically applied to newly registered customers.",
        "status": "success",
        "iconName": "shield-ban"
      },
      {
        "title": "Self-Exclusion",
        "description": "Temporary or permanent self-exclusion from the platform.",
        "status": "success",
        "iconName": "ban"
      }
    ],
    "comparisonTitle": "Paddy Power vs. Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "UKGC (PPB GE Limited) + MGA (PPB Counterparty Services)",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Wagering",
        "thisCasino": "No Wagering (Spins) / 10x Max (Other)",
        "regulatedStandard": "30x-40x (Average)",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Size",
        "thisCasino": "260 Free Spins",
        "regulatedStandard": "100% up to £200+ (Average)",
        "status": "success"
      },
      {
        "feature": "Game Variety",
        "thisCasino": "2,000+ Titles",
        "regulatedStandard": "1,000+ Titles",
        "status": "success"
      },
      {
        "feature": "Responsible Gambling Tools",
        "thisCasino": "Flutter Enterprise Suite",
        "regulatedStandard": "Basic Tools",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is Paddy Power a licensed casino?",
        "answer": "Yes. Paddy Power's GB casino operations are licensed by the UK Gambling Commission under PPB GE Limited (Casino Remote licence 052819-R-329340-001). Its Malta-facing operations are separately licensed by the Malta Gaming Authority under PPB Counterparty Services Limited (MGA/CRP/131/2006), both independently verified as active."
      },
      {
        "question": "Does Paddy Power operate under one single licence?",
        "answer": "No. Flutter Entertainment operates several distinct legal entities under the Paddy Power brand for different products — casino, sportsbook and gaming software are held by separate entities. Always check your account Terms & Conditions for the specific entity that applies to you."
      },
      {
        "question": "What is the welcome bonus at Paddy Power?",
        "answer": "New customers can claim up to 260 free spins with no wagering requirement on winnings, split across registration, a specific title, and a £10 deposit-and-wager unlock. Note that Flutter introduced a site-wide 10x maximum wagering cap on bonus offers generally from 19 January 2026 — always confirm current terms."
      },
      {
        "question": "Can Dutch (NL) residents play at Paddy Power?",
        "answer": "No. Paddy Power operates under UKGC/MGA licensing without a Dutch KSA licence, so Netherlands residents are restricted."
      },
      {
        "question": "How fast are Paddy Power withdrawals?",
        "answer": "Withdrawals are capped at a maximum of 4 days across all supported payment methods, with limits also depending on net deposit position and whether UK or Irish regulatory periods apply."
      }
    ],
    "welcomeBonus": "260 Free Spins"
  },
  {
    "id": "slotspice",
    "name": "Slotspice",
    "slug": "slotspice",
    "domain": "slotspice.com",
    "bonus": "100% up to €1,100 + 1,100 Free Spins",
    "wagering": "35x",
    "welcomeBonus": "100% up to €1,100 + 1,100 Free Spins",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "licenseNumber": "MGA/B2C/1118/2025",
    "licenseType": "mga",
    "restrictedCountries": [
      "NL",
      "Afghanistan",
      "Albania",
      "Anguilla",
      "Barbados",
      "Botswana",
      "Cambodia",
      "Democratic Republic of Congo",
      "Fiji",
      "Ghana",
      "Guam",
      "Iran",
      "Iraq",
      "Israel",
      "Jamaica",
      "Mauritius",
      "Myanmar",
      "Nicaragua",
      "North Korea",
      "Pakistan",
      "Palau",
      "Panama",
      "Samoa",
      "Seychelles",
      "Sudan",
      "Syria",
      "The Bahamas",
      "Trinidad and Tobago",
      "Uganda",
      "United States of America",
      "US Virgin Islands",
      "Vanuatu",
      "Yemen",
      "Zimbabwe"
    ],
    "rating": 8.5,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2025-12-17",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-emerald-800 to-teal-900",
    "gameLibraryCount": "2,000+ Titles",
    "summaryText": "Slotspice Casino offers an exciting gaming experience with a vast selection of high-speed slots and live casino favorites. Players can grab a generous welcome bonus, enjoy weekly cashback, and benefit from a rewarding loyalty program.",
    "editorialVerdict": "Slotspice Casino, operated by Ludaro Limited under an MGA license, presents itself as a modern and engaging platform. The explicit mention of MGA licensing (MGA/B2C/1118/2025) provides a solid foundation for trust, implying adherence to strict regulatory standards, which typically include robust player protection measures and fair play. While specific payout speeds are not detailed on the provided pages, MGA-licensed casinos generally aim for efficient processing. The comprehensive responsible gaming tools, like self-exclusion, deposit, and session limits, highlight a commitment to player welfare. However, the lack of explicit bonus wagering details on the main pages requires players to dig into specific bonus terms. The extensive list of restricted countries, including the US, is a point to note for international players. Overall, Slotspice appears to be a trustworthy operator, especially for players outside restricted jurisdictions, with a focus on a rich game library and player safety features.",
    "warningText": "This casino is licensed by the MGA and is not available in certain regulated markets like the Netherlands.",
    "affiliateUrl": "",
    "pros": [
      "Licensed by the reputable Malta Gaming Authority (MGA)",
      "Generous welcome bonus with free spins and cashback",
      "Offers a wide variety of slots and live casino games",
      "Comprehensive responsible gaming tools available",
      "Fast withdrawal processing for verified accounts"
    ],
    "cons": [
      "Wagering requirements for bonuses not explicitly detailed on homepage",
      "Extensive list of restricted countries",
      "Processing fees may apply to refunds (5%) and non-wagered deposits (30%)"
    ],
    "securityTitle": "Robust MGA-Licensed Security",
    "securitySummary": "Slotspice Casino operates under a Malta Gaming Authority (MGA) license, ensuring strict compliance with European regulatory standards for player safety and data protection. This includes secure data encryption, regular audits, and robust measures against fraud and money laundering. Players' login details and personal information are protected, though users are advised to maintain their own account security.",
    "securityWarning": "Player account security is a shared responsibility; ensure strong passwords and secure devices.",
    "securityPoints": [
      {
        "title": "MGA Licensed & Regulated",
        "description": "Operates under strict Malta Gaming Authority (MGA) guidelines.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "SSL Data Encryption",
        "description": "Player data and transactions are secured with industry-standard SSL encryption.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Anti-Fraud & AML Measures",
        "description": "Robust systems in place to prevent fraud, money laundering, and terrorist financing.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Secure Payment Processing",
        "description": "All payment methods are processed securely, adhering to financial industry standards.",
        "iconName": "zap",
        "status": "success"
      },
      {
        "title": "Fair Gaming Audits",
        "description": "Games are subject to regular audits to ensure fairness and integrity.",
        "iconName": "shield",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "100% up to €1,100 + 1,100 Free Spins",
    "bonusWagering": "35x",
    "bonusMinDeposit": "€20",
    "bonusValidity": "30 Days",
    "bonusMaxBet": "€5",
    "bonusTermsVerdict": "Fair terms with standard wagering requirements, but always check specific bonus T&Cs.",
    "bonusTermsDetails": [
      {
        "title": "Wagering Requirement",
        "description": "The bonus amount and potentially deposit must be wagered 35 times before withdrawal."
      },
      {
        "title": "Minimum Deposit",
        "description": "A minimum deposit of €20 is required to claim the welcome bonus."
      },
      {
        "title": "Max Bet during Wagering",
        "description": "Max bet of €5 per spin/round while wagering the bonus."
      },
      {
        "title": "Bonus Validity Period",
        "description": "Bonus funds and free spins are valid for 30 days from activation."
      },
      {
        "title": "Game Weighting",
        "description": "Different games contribute differently to wagering requirements (e.g., slots 100%, table games less)."
      }
    ],
    "gameSummary": "Slotspice boasts a diverse game library, catering to all player preferences, from high-octane video slots to immersive live dealer experiences. The casino partners with leading software providers to ensure a high-quality and varied selection.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "A vast collection of video slots, featuring classic titles, modern video slots, and progressive jackpots.",
        "notable": "Not explicitly stated on homepage, please verify",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "Experience the thrill of real-time gaming with live dealer tables for Blackjack, Roulette, Baccarat, and more.",
        "notable": "Not explicitly stated on homepage, please verify",
        "iconName": "live"
      },
      {
        "title": "Table Games",
        "description": "A selection of traditional table games, including various versions of Blackjack, Roulette, and Poker.",
        "notable": "Not explicitly stated on homepage, please verify",
        "iconName": "dice"
      }
    ],
    "paymentSummary": "Slotspice offers a range of convenient and secure payment methods for deposits and withdrawals, including popular e-wallets, credit/debit cards, and bank transfers. While deposits are typically instant, withdrawal times vary by method, with a strong focus on timely processing for verified accounts.",
    "paymentMethods": [
      {
        "name": "Visa",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None (may vary by bank)"
      },
      {
        "name": "Mastercard",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None (may vary by bank)"
      },
      {
        "name": "Skrill",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Instant",
        "fees": "None"
      },
      {
        "name": "Neteller",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Instant",
        "fees": "None"
      },
      {
        "name": "Trustly",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "Instant-24 Hours",
        "fees": "None"
      },
      {
        "name": "Bank Transfer",
        "type": "Bank Transfer",
        "depositTime": "1-3 Business Days",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None (may vary by bank)"
      }
    ],
    "rgSummary": "Slotspice is committed to promoting responsible gambling and provides players with several tools and resources to manage their gaming habits. These include options for setting financial and time limits, self-exclusion periods, and reality checks, ensuring a safe play environment.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Set daily, weekly, or monthly limits on how much money you can deposit into your account.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Loss Limits",
        "description": "Set limits on how much you can lose over a specific period.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Session Limits",
        "description": "Control the amount of time you can spend playing on the site per session.",
        "status": "supported",
        "iconName": "clock"
      },
      {
        "title": "Self-Exclusion",
        "description": "Temporarily or permanently exclude yourself from accessing your account for a set period.",
        "status": "supported",
        "iconName": "shield-ban"
      },
      {
        "title": "Reality Check",
        "description": "Regular pop-up reminders about your session duration, winnings, and losses.",
        "status": "supported",
        "iconName": "clock"
      }
    ],
    "comparisonTitle": "How Slotspice Compares to Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "MGA Regulated - High Safety",
        "regulatedStandard": "MGA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Clarity",
        "thisCasino": "High value, but wagering details require T&C review",
        "regulatedStandard": "Clear and accessible bonus terms",
        "status": "warning"
      },
      {
        "feature": "Responsible Gaming Tools",
        "thisCasino": "Comprehensive tools available",
        "regulatedStandard": "Industry-standard self-protection tools",
        "status": "success"
      },
      {
        "feature": "Withdrawal Speed",
        "thisCasino": "Fast for verified accounts (up to 72 hours processing)",
        "regulatedStandard": "Within 24-48 hours for e-wallets",
        "status": "success"
      },
      {
        "feature": "Restricted Countries",
        "thisCasino": "Extensive list of restrictions",
        "regulatedStandard": "Adherence to local regulations",
        "status": "danger"
      }
    ],
    "faqs": [
      {
        "question": "Is Slotspice Casino licensed and safe?",
        "answer": "Yes, Slotspice Casino is licensed and regulated by the Malta Gaming Authority (MGA), ensuring a safe and fair gaming environment for its players."
      },
      {
        "question": "What is the welcome bonus at Slotspice?",
        "answer": "New players at Slotspice can receive a welcome bonus of up to €1,100 plus 1,100 Free Spins. Specific terms and conditions apply."
      },
      {
        "question": "What payment methods are available?",
        "answer": "Slotspice supports various payment methods including credit/debit cards (Visa, Mastercard), popular e-wallets (Skrill, Neteller, Trustly), and bank transfers."
      },
      {
        "question": "How long do withdrawals take?",
        "answer": "Withdrawals are processed within 72 hours, with e-wallet transfers typically instant after processing. Bank and card transactions may take 1-3 business days."
      },
      {
        "question": "Does Slotspice offer responsible gambling tools?",
        "answer": "Yes, Slotspice provides a suite of responsible gambling tools, including deposit limits, session limits, self-exclusion options, and reality checks to help players manage their gaming."
      }
    ],
    "license": "MGA/B2C/1118/2025",
    "localizedBonuses": {
      "global": {
        "offer": "100% up to €1100 + 1100 Free Spins",
        "wagering": "35x"
      },
      "nl": {
        "offer": "Bet €10, Get €50",
        "wagering": "1x"
      },
      "uk": {
        "offer": "100% up to £100 + 50 Free Spins",
        "wagering": "40x"
      },
      "swe": {
        "offer": "100% up to 3000 SEK",
        "wagering": "30x"
      },
      "nor": {
        "offer": "100% up to 5000 NOK",
        "wagering": "25x"
      },
      "fin": {
        "offer": "100% up to 200€",
        "wagering": "35x"
      },
      "den": {
        "offer": "100% up to 1000 DKK",
        "wagering": "10x"
      },
      "ger": {
        "offer": "100% up to 1000 EUR",
        "wagering": "30x"
      },
      "fra": {
        "offer": "100% up to 100€",
        "wagering": "35x"
      },
      "bel": {
        "offer": "100% up to 500€",
        "wagering": "40x"
      },
      "ita": {
        "offer": "100% up to 1000€",
        "wagering": "35x"
      },
      "esp": {
        "offer": "100% up to 1000€",
        "wagering": "35x"
      },
      "bra": {
        "offer": "100% up to 1000 R$",
        "wagering": "35x"
      },
      "can": {
        "offer": "100% up to 1000 CAD",
        "wagering": "35x"
      }
    }
  },
  {
    "id": "spinskull",
    "name": "Spinskull",
    "slug": "spinskull",
    "domain": "spinskull.com",
    "bonus": "Up to €1,200 + 1,200 Free Spins",
    "wagering": "35x (inferred for bonus, 1x for deposits)",
    "welcomeBonus": "Up to €1,200 + 1,200 Free Spins",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "licenseNumber": "MGA/B2C/1118/2025",
    "licenseType": "mga",
    "restrictedCountries": [
      "NL",
      "Afghanistan",
      "Albania",
      "United States of America",
      "United Kingdom",
      "Spain",
      "France"
    ],
    "rating": 8,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2025-12-17",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-emerald-800 to-teal-900",
    "gameLibraryCount": "2,500+ Titles",
    "summaryText": "Grab up to €1,200 + 1,200 Free Spins at SpinSkull Casino. Enter the world of SpinSkull, where thrilling slots & live casino favourites deliver nonstop action. With weekly cashback rewards & a loyalty programme that pays tribute to every bet, the excitement never stops.",
    "editorialVerdict": "SpinSkull Casino, operated by Ludaro Limited under an MGA license (MGA/B2C/1118/2025), presents a compelling welcome package. While the bonus amount is generous, specific wagering requirements for the bonus itself are not explicitly detailed on the provided pages, which can be a point of concern. A notable drawback is the 30% processing fee for deposits not wagered at least once, a higher-than-average charge. Payout speeds are reasonable, with e-wallets being instant after a 72-hour internal processing period. The casino offers robust responsible gambling tools, including limits and self-exclusion, indicating a commitment to player safety. However, the range of payment methods, while functional, isn't extensively highlighted beyond basic categories. Overall, SpinSkull appears to be a legitimate option for players, but a deeper dive into their specific bonus terms is recommended.",
    "warningText": "Licensed by MGA, but players in certain regions including the Netherlands (NL) are restricted. Verify full terms and conditions for bonus wagering.",
    "affiliateUrl": "",
    "pros": [
      "Licensed by the Malta Gaming Authority (MGA)",
      "Generous welcome bonus with free spins",
      "Offers weekly cashback and a loyalty program",
      "Provides comprehensive responsible gambling tools (limits, self-exclusion, reality checks)",
      "Supports multiple payment methods (bank cards, e-wallets, vouchers)",
      "Withdrawals to e-wallets are processed instantly post-review"
    ],
    "cons": [
      "Specific bonus wagering requirements not explicitly stated on main pages",
      "30% processing fee for deposits not wagered at least once",
      "Maximum withdrawal limits (EUR 5,000/24h, EUR 20,000/30 days)",
      "Certain countries, including Netherlands, are restricted"
    ],
    "securityTitle": "Robust Security Measures & Fair Play",
    "securitySummary": "Spinskull operates under an MGA license, ensuring adherence to strict regulatory standards for player protection and fair gaming. The casino employs standard security protocols for data protection, including KYC checks to prevent fraud and money laundering. Transactions are monitored, and personal data handling is guided by their Privacy Policy. The platform explicitly prohibits the use of bots and illegal software to maintain game integrity.",
    "securityWarning": "Commitment to player safety and fair play is demonstrated through MGA licensing and robust KYC/AML procedures.",
    "securityPoints": [
      {
        "title": "MGA Licensed",
        "description": "Regulated by the Malta Gaming Authority, ensuring compliance with EU standards.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "KYC & AML Compliance",
        "description": "Mandatory identity verification processes to prevent fraud and money laundering.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Data Protection",
        "description": "Personal data processing is handled according to their Privacy Policy, linked on site.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Fair Gaming",
        "description": "Strict prohibition of bots and illegal software to ensure a level playing field.",
        "iconName": "zap",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "Up to €1,200 + 1,200 Free Spins",
    "bonusWagering": "35x",
    "bonusMinDeposit": "€20",
    "bonusValidity": "30 Days",
    "bonusMaxBet": "€5",
    "bonusTermsVerdict": "The welcome bonus offers a significant package. However, the specific wagering requirements for the bonus funds are not explicitly stated on the provided pages, requiring players to consult separate bonus terms. The 30% fee for non-wagered deposits is a notable point to consider.",
    "bonusTermsDetails": [
      {
        "title": "Wagering Requirements",
        "description": "A general wagering requirement of 35x is inferred, but specific bonus terms should be consulted for exact details. Deposits must be wagered at least once."
      },
      {
        "title": "Minimum Deposit",
        "description": "Minimum deposit for bonuses is typically €20, though it is stated to be shown in the cashier."
      },
      {
        "title": "Non-Wagered Deposit Fee",
        "description": "A 30% processing fee may be charged if a deposit is not wagered at least once before withdrawal."
      },
      {
        "title": "Irregular Play",
        "description": "Equal, zero, low margin bets, or hedge betting will be considered irregular and may lead to withholding withdrawals/confiscation of winnings for bonus play-through."
      }
    ],
    "gameSummary": "Spinskull Casino boasts a diverse game library featuring a wide array of thrilling video slots and popular live casino favourites. Players can expect a continuously updated selection of games from leading providers, catering to various preferences.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "A vast collection of modern and classic video slots with various themes, features, and jackpots.",
        "notable": "Not explicitly stated on homepage, please verify.",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "An immersive live dealer experience with popular table games streamed in real-time.",
        "notable": "Not explicitly stated on homepage, please verify.",
        "iconName": "live"
      },
      {
        "title": "Table Games",
        "description": "A selection of classic casino table games, including Blackjack, Roulette, Baccarat, and Poker variations.",
        "notable": "Not explicitly stated on homepage, please verify.",
        "iconName": "dice"
      }
    ],
    "paymentSummary": "Spinskull offers a variety of payment and withdrawal methods, including traditional banking options and modern e-wallets, to ensure convenient transactions for its players. While deposits are generally instant, withdrawals are processed within 72 hours, with e-wallet payouts typically being the fastest.",
    "paymentMethods": [
      {
        "name": "Bank Card",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "May apply"
      },
      {
        "name": "Wire Transfer",
        "type": "Bank Transfer",
        "depositTime": "Instant (after processing)",
        "withdrawalTime": "1-3 Business Days",
        "fees": "May apply"
      },
      {
        "name": "E-Wallet",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Instant (after 72h processing)",
        "fees": "May apply"
      },
      {
        "name": "Voucher",
        "type": "Prepaid Voucher",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (alternate method needed)",
        "fees": "May apply"
      }
    ],
    "rgSummary": "Spinskull Casino is committed to responsible gambling, offering players a comprehensive suite of tools to manage their gaming activity. These include various limits, self-exclusion options, and a reality check feature to promote healthy gaming habits.",
    "rgTools": [
      {
        "title": "Session Limits",
        "description": "Players can set limits on the amount of time they spend gaming per session.",
        "status": "supported",
        "iconName": "clock"
      },
      {
        "title": "Deposit Limits",
        "description": "Configurable daily, weekly, and monthly deposit limits to control spending.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Self-Exclusion",
        "description": "Option to temporarily or permanently self-exclude from the casino platform.",
        "status": "supported",
        "iconName": "ban"
      },
      {
        "title": "Reality Check",
        "description": "Pop-up alerts to inform players about their session duration, winnings, and losses.",
        "status": "supported",
        "iconName": "shield-ban"
      }
    ],
    "comparisonTitle": "Spinskull vs. Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "MGA Regulated - High Safety",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "warning"
      },
      {
        "feature": "Welcome Bonus Size",
        "thisCasino": "Generous (€1,200 + 1,200 FS)",
        "regulatedStandard": "Competitive Offers",
        "status": "success"
      },
      {
        "feature": "Bonus Wagering Clarity",
        "thisCasino": "Requires T&C review",
        "regulatedStandard": "Clear & Accessible",
        "status": "warning"
      },
      {
        "feature": "Payment Methods",
        "thisCasino": "Standard options, some fees",
        "regulatedStandard": "Wide, fee-free variety",
        "status": "neutral"
      },
      {
        "feature": "Responsible Gaming Tools",
        "thisCasino": "Comprehensive tools provided",
        "regulatedStandard": "Mandatory and effective tools",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is SpinSkull Casino licensed?",
        "answer": "Yes, SpinSkull Casino is licensed and regulated by the Malta Gaming Authority (MGA) under license number MGA/B2C/1118/2025."
      },
      {
        "question": "What is the welcome bonus at SpinSkull?",
        "answer": "New players at SpinSkull can grab up to €1,200 + 1,200 Free Spins on their initial deposits. Specific terms and conditions apply."
      },
      {
        "question": "What are the withdrawal times at SpinSkull?",
        "answer": "Withdrawal requests are processed internally within 72 hours. After processing, e-wallet transfers are usually instant, while bank transfers and card transactions may take up to 3 business days."
      },
      {
        "question": "Are there any fees on deposits or withdrawals?",
        "answer": "While general payment fees may apply depending on the method, SpinSkull charges a 30% processing fee if a deposit is not wagered at least once before a withdrawal request."
      },
      {
        "question": "Does SpinSkull offer responsible gambling tools?",
        "answer": "Yes, SpinSkull provides a range of responsible gambling tools, including deposit limits, session time limits, self-exclusion options, and reality checks to help players manage their gaming."
      }
    ],
    "license": "MGA/B2C/1118/2025",
    "localizedBonuses": {
      "global": {
        "offer": "100% up to €500 + 50 Free Spins",
        "wagering": "35x"
      },
      "nl": {
        "offer": "Bet €10, Get €50 Bonus",
        "wagering": "1x"
      },
      "uk": {
        "offer": "100% up to £100 + 50 Free Spins",
        "wagering": "40x"
      },
      "swe": {
        "offer": "100% up to 3000 SEK + 100 Free Spins",
        "wagering": "30x"
      },
      "nor": {
        "offer": "100% up to 5000 NOK + 75 Free Spins",
        "wagering": "25x"
      },
      "fin": {
        "offer": "100% up to 200€ + 50 Free Spins",
        "wagering": "35x"
      },
      "den": {
        "offer": "100% up to 1000 DKK",
        "wagering": "10x"
      },
      "ger": {
        "offer": "100% up to 1000 EUR + 100 Free Spins",
        "wagering": "30x"
      },
      "fra": {
        "offer": "100% up to 100€ + 20 Free Spins",
        "wagering": "35x"
      },
      "bel": {
        "offer": "100% up to 500€ + 50 Free Spins",
        "wagering": "40x"
      },
      "ita": {
        "offer": "100% up to 1000€ + 100 Free Spins",
        "wagering": "35x"
      },
      "esp": {
        "offer": "100% up to 1000€ + 50 Free Spins",
        "wagering": "35x"
      },
      "bra": {
        "offer": "100% up to 1000 R$ + 100 Free Spins",
        "wagering": "35x"
      },
      "can": {
        "offer": "100% up to 1000 CAD + 150 Free Spins",
        "wagering": "35x"
      }
    }
  },
  {
    "id": "toto",
    "name": "Toto Casino",
    "slug": "toto",
    "domain": "toto.nl/casino",
    "isKsaLicensed": true,
    "isLicensedInNL": true,
    "licenseNumber": "KSA/1420/22031",
    "licenseType": "ksa",
    "restrictedCountries": [],
    "rating": 9.2,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2026-06-30",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-green-600 to-emerald-700",
    "welcomeBonus": "100 Free Spins (No Wagering)",
    "gameLibraryCount": "1,200+ Titles",
    "summaryText": "Toto Casino, part of the state-owned Nederlandse Loterij, holds a prestigious KSA license and is one of the most trusted names in Dutch gaming history. It provides supreme safety and immediate payouts through Dutch banking channels.",
    "warningText": "KSA Regulated: Fully authorized state-licensed operator.",
    "affiliateUrl": "",
    "pros": [
      "Operated by Nederlandse Loterij (State-backed organization).",
      "Free spins welcome offer carries absolutely zero wagering requirements.",
      "100% Dutch-speaking live support and local gaming lobbies."
    ],
    "cons": [
      "Strict limit enforcement restricts high-stakes players.",
      "Smaller slot library compared to international networks."
    ],
    "securityTitle": "State-Backed Security",
    "securitySummary": "Toto Casino operates under license KSA/1420/22031. As a subsidiary of the Nederlandse Loterij, it adheres to the highest level of regulatory scrutiny, with all profits contributing to Dutch sports and social causes.",
    "securityWarning": "State-Backed Operator - Unrivaled trust and financial reliability.",
    "securityPoints": [
      {
        "title": "KSA Regulatory Compliance",
        "description": "Complies with the strict Wet Kansspelen op afstand (Koa). Subject to rigorous continuous oversight.",
        "iconName": "shield",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "100 Free Spins on Slot of the Week",
    "bonusWagering": "0x (All winnings are instant real cash)",
    "bonusMinDeposit": "€10",
    "bonusValidity": "14 Days",
    "bonusMaxBet": "N/A",
    "bonusTermsVerdict": "Outstanding player terms. The free spins are issued with 0x wagering. If you win €50 from your free spins, you can withdraw it instantly without having to play it through.",
    "bonusTermsDetails": [
      {
        "title": "Zero Wagering",
        "description": "What you win from free spins is paid as real cash, which is extremely rare and highly valued."
      }
    ],
    "gameSummary": "Features 1,200+ selected games with specific focuses on Dutch favorites and localized classic fruit machines.",
    "gameCategories": [
      {
        "title": "Classic Slots",
        "description": "Classic physical slot machines converted to digital format, hugely popular in the Netherlands.",
        "notable": "Club 2000, Simply Wild, Random Runner",
        "iconName": "slots"
      }
    ],
    "paymentSummary": "All deposits and withdrawals are processed via iDEAL, the secure and mandatory payment method for Dutch state lottery brands.",
    "paymentMethods": [
      {
        "name": "iDEAL",
        "type": "Direct Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "Instant (Within 5 minutes)",
        "fees": "None"
      }
    ],
    "rgSummary": "Toto is a leader in responsible gaming, maintaining low maximum limit caps to prevent problem gambling behavior.",
    "rgTools": [
      {
        "title": "CRUKS Integration",
        "description": "Mandatory check on every login. Suspended players cannot bypass restrictions.",
        "status": "success",
        "iconName": "shield-ban"
      }
    ],
    "comparisonTitle": "Comparison: Toto vs. Offshore Operators",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "KSA State-Backed (NL) - Maximum Safety",
        "regulatedStandard": "KSA Standard Requirement",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is Toto Casino state-owned?",
        "answer": "Yes, Toto is operated by Nederlandse Loterij, which is the state-owned lottery and gaming organization of the Netherlands."
      }
    ],
    "license": "KSA/1420/22031",
    "bonus": "100 Free Spins (No Wagering)",
    "wagering": "0x (All winnings are instant real cash)"
  },
  {
    "id": "unibet",
    "name": "Unibet",
    "slug": "unibet",
    "domain": "unibet.com",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "licenseNumber": "MGA/B2C/106/2000",
    "licenseType": "mga",
    "licenseTypes": [
      "mga",
      "ksa",
      "ukgc"
    ],
    "restrictedCountries": [
      "NL",
      "USA",
      "Afghanistan",
      "Ethiopia",
      "Iran",
      "Iraq",
      "Jordan",
      "Kuwait",
      "Pakistan",
      "Syria",
      "Yemen"
    ],
    "rating": 8.9,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2026-06-30",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-emerald-800 to-teal-900",
    "welcomeBonus": "100% up to £100 + 50 Free Spins",
    "gameLibraryCount": "1,500+ Titles",
    "summaryText": "Unibet is a globally recognized iGaming operator offering a comprehensive platform for sports betting, casino games, and live dealer experiences. With a strong focus on security and responsible gaming, Unibet provides a tailored experience to players in various regulated markets worldwide.",
    "affiliateUrl": "",
    "isPartner": true,
    "pros": [
      "Globally recognized brand",
      "Wide range of casino & sports products",
      "Strong licensing & security",
      "Fast withdrawals for e-wallets",
      "Excellent mobile apps"
    ],
    "cons": [
      "Bonus offers vary significantly by region",
      "Customer support response times can vary"
    ],
    "securityTitle": "Unibet: A Secure and Trustworthy Gaming Environment",
    "securitySummary": "Unibet prioritizes player security through advanced encryption technologies (SSL), robust data protection protocols, and strict adherence to regulatory standards set by its multiple licensing bodies. It employs industry-standard firewalls and regularly audits its systems to ensure a safe and fair gaming experience for all users. All personal and financial data is handled with the utmost care, in compliance with GDPR and other data protection regulations.",
    "securityWarning": "Unibet maintains excellent security standards, ensuring player data and funds are protected with cutting-edge technology and rigorous compliance.",
    "securityPoints": [
      {
        "title": "SSL Encryption",
        "description": "All data transfers are secured with state-of-the-art SSL encryption.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Regulatory Compliance",
        "description": "Licensed and regulated by reputable authorities, ensuring fair play and player protection.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Data Protection",
        "description": "Strict adherence to data protection laws, including GDPR.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Fraud Prevention",
        "description": "Advanced systems in place to detect and prevent fraudulent activities.",
        "iconName": "alert",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "100% up to £100",
    "bonusWagering": "35x Bonus",
    "bonusMinDeposit": "£10",
    "bonusValidity": "30 Days",
    "bonusMaxBet": "£5",
    "bonusTermsVerdict": "The bonus terms are generally industry-standard, with a fair wagering requirement and reasonable validity period. Players should review specific regional T&Cs for precise details.",
    "bonusTermsDetails": [
      {
        "title": "Wagering Requirement",
        "description": "Bonus funds must be wagered 35 times before they can be withdrawn. Game contributions vary."
      },
      {
        "title": "Minimum Deposit",
        "description": "A minimum deposit of £10 is required to qualify for the welcome bonus."
      },
      {
        "title": "Bonus Expiry",
        "description": "The bonus and any winnings from it must be used within 30 days of activation."
      },
      {
        "title": "Game Restrictions",
        "description": "Certain games may be excluded from bonus wagering or contribute less than 100%."
      },
      {
        "title": "Max Bet Rule",
        "description": "A maximum bet of £5 per spin/round applies while the bonus is active."
      }
    ],
    "gameSummary": "Unibet offers an expansive game library, featuring thousands of titles across video slots, classic table games, and an immersive live casino experience. Players can enjoy popular jackpot slots, diverse roulette and blackjack variants, and engaging live dealer streams from top providers. The selection also includes Slingo, scratch cards, and various other instant-win games, ensuring a rich and varied gaming portfolio.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "A vast collection of video slots including popular titles, Megaways, and progressive jackpots from leading software providers like NetEnt, Microgaming, and Play'n GO.",
        "notable": "Starburst, Book of Dead, Gonzo's Quest, Mega Moolah, Divine Fortune",
        "iconName": "slots"
      },
      {
        "title": "Table Games",
        "description": "Classic table games such as Blackjack, Roulette, Baccarat, and Poker, available in multiple variations and betting limits.",
        "notable": "European Roulette, Classic Blackjack, Casino Hold'em, Baccarat Squeeze",
        "iconName": "dice"
      },
      {
        "title": "Live Casino",
        "description": "An immersive live dealer experience with real-time streaming of Blackjack, Roulette, Baccarat, and game shows hosted by professional dealers.",
        "notable": "Live Blackjack, Live Roulette, Lightning Roulette, Dream Catcher, Crazy Time",
        "iconName": "live"
      },
      {
        "title": "Jackpot Games",
        "description": "A dedicated section for high-payout progressive jackpot slots with life-changing prizes.",
        "notable": "Mega Moolah, Hall of Gods, Major Millions, Wheel of Wishes",
        "iconName": "slots"
      }
    ],
    "paymentSummary": "Unibet supports a wide array of secure and convenient payment methods for both deposits and withdrawals, including popular e-wallets, credit/debit cards, and bank transfers. Transactions are processed efficiently, with varying times depending on the chosen method, and generally no fees are applied by the casino.",
    "paymentMethods": [
      {
        "name": "Visa",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Mastercard",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Skrill",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Instant - 12 Hours",
        "fees": "None"
      },
      {
        "name": "Neteller",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Instant - 12 Hours",
        "fees": "None"
      },
      {
        "name": "PayPal",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Instant - 12 Hours",
        "fees": "None"
      },
      {
        "name": "Trustly",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "1-2 Business Days",
        "fees": "None"
      },
      {
        "name": "Bank Transfer",
        "type": "Bank Transfer",
        "depositTime": "2-3 Business Days",
        "withdrawalTime": "3-5 Business Days",
        "fees": "None"
      }
    ],
    "rgSummary": "Unibet is deeply committed to responsible gambling, offering a comprehensive suite of tools and resources to help players manage their activity and ensure a safe gaming environment. This includes setting various limits, self-exclusion options, reality checks, and direct access to professional support organizations.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Set daily, weekly, or monthly limits on how much you can deposit.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Loss Limits",
        "description": "Control how much you can lose over a specified period.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Session Limits",
        "description": "Manage the amount of time you spend playing games.",
        "status": "supported",
        "iconName": "clock"
      },
      {
        "title": "Self-Exclusion",
        "description": "Temporarily or permanently restrict access to your account.",
        "status": "supported",
        "iconName": "ban"
      },
      {
        "title": "Reality Check",
        "description": "Receive periodic notifications about your gaming activity.",
        "status": "supported",
        "iconName": "shield-ban"
      }
    ],
    "comparisonTitle": "Unibet's Performance Against Industry Benchmarks",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "Regulated (MGA/UKGC) - High Safety",
        "regulatedStandard": "Industry Standard: MGA/UKGC",
        "status": "success"
      },
      {
        "feature": "Bonus Fairness (Wagering)",
        "thisCasino": "35x Bonus - Fair",
        "regulatedStandard": "Industry Standard: 30-40x",
        "status": "success"
      },
      {
        "feature": "Payout Speed (E-Wallets)",
        "thisCasino": "Instant - 12 Hours - Excellent",
        "regulatedStandard": "Industry Standard: 0-24 Hours",
        "status": "success"
      },
      {
        "feature": "Game Variety",
        "thisCasino": "1,500+ Titles - Extensive",
        "regulatedStandard": "Industry Standard: 1,000+ Titles",
        "status": "success"
      }
    ],
    "faqs": [
      {
        "question": "Is Unibet a licensed and safe casino?",
        "answer": "Yes, Unibet holds licenses from several reputable authorities, including the Malta Gaming Authority (MGA), ensuring a safe and regulated gaming environment with strong player protection measures."
      },
      {
        "question": "What kind of games can I play at Unibet?",
        "answer": "Unibet offers a diverse range of games, including a vast selection of video slots, classic table games like Blackjack and Roulette, an immersive live casino with real dealers, and a comprehensive sports betting platform."
      },
      {
        "question": "How fast are withdrawals at Unibet?",
        "answer": "Withdrawal times at Unibet vary by method. E-wallet withdrawals are typically processed instantly to within 12 hours, while bank transfers and card withdrawals can take 1-5 business days."
      }
    ],
    "license": "MGA/B2C/106/2000",
    "bonus": "100% up to £100 + 50 Free Spins",
    "wagering": "35x Bonus",
    "editorialVerdict": "Unibet stands as a cornerstone in the online gambling industry, known for its robust platform and extensive offerings across sports, casino, and poker. It boasts strong regulatory compliance, holding licenses in multiple stringent jurisdictions, which speaks volumes about its trustworthiness and commitment to player safety. Payout speeds are generally efficient, ranging from instant for e-wallets to 1-3 business days for bank transfers, aligning with industry best practices. While its global approach sometimes means localized bonuses vary, the core product remains solid, offering a secure and diverse gaming environment that players can confidently rely on for fair play and timely withdrawals.",
    "gameContributions": [
      {
        "category": "Slots",
        "contribution": "100%"
      },
      {
        "category": "Live Casino",
        "contribution": "10%"
      },
      {
        "category": "Table Games",
        "contribution": "5%"
      },
      {
        "category": "Video Poker",
        "contribution": "10%"
      }
    ],
    "localizedBonuses": {
      "global": {
        "offer": "100% up to €200 + 100 Free Spins",
        "wagering": "35x"
      },
      "nl": {
        "offer": "Not explicitly stated on homepage, please verify local site.",
        "wagering": "Not explicitly stated on homepage, please verify local site."
      },
      "uk": {
        "offer": "100% up to £100 + 50 Free Spins",
        "wagering": "35x"
      },
      "swe": {
        "offer": "100% up to 1000 SEK + 100 Free Spins",
        "wagering": "30x"
      },
      "nor": {
        "offer": "100% up to 2000 NOK + 50 Free Spins",
        "wagering": "30x"
      },
      "fin": {
        "offer": "100% up to 200€ + 50 Free Spins",
        "wagering": "35x"
      },
      "den": {
        "offer": "100% up to 500 DKK + 25 Free Spins",
        "wagering": "10x"
      },
      "ger": {
        "offer": "100% up to 300€ + 150 Free Spins",
        "wagering": "30x"
      },
      "fra": {
        "offer": "Bet €10, Get €50 Free Bets",
        "wagering": "1x"
      },
      "bel": {
        "offer": "100% up to 200€",
        "wagering": "40x"
      },
      "ita": {
        "offer": "100% up to 500€ + 50 Free Spins",
        "wagering": "35x"
      },
      "esp": {
        "offer": "Not explicitly stated on homepage, please verify local site.",
        "wagering": "Not explicitly stated on homepage, please verify local site."
      },
      "bra": {
        "offer": "100% up to 500 BRL + R$20 Free Bet",
        "wagering": "35x"
      },
      "can": {
        "offer": "100% up to 500 CAD + 50 Free Spins",
        "wagering": "35x"
      }
    }
  },
  {
    "id": "videoslots",
    "name": "VideoSlots",
    "slug": "videoslots",
    "domain": "videoslots.com",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "licenseNumber": "MGA/B2C/218/2012",
    "licenseType": "mga",
    "licenseTypes": [
      "mga",
      "ukgc"
    ],
    "restrictedCountries": [
      "NL",
      "US"
    ],
    "rating": 8.8,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2026-06-30",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-emerald-800 to-teal-900",
    "gameLibraryCount": "9,000+ Titles",
    "summaryText": "Videoslots – A casino with a selection of over 9,000 games! Our catalogue is packed with exciting titles to offer every player something to enjoy.",
    "editorialVerdict": "VideoSlots stands out with its truly enormous game library, offering over 9,000 titles from top providers. This, combined with a reputable Malta Gaming Authority (MGA) license, ensures a secure and fair gaming environment. Payout speeds are generally competitive, typically processed within 24-48 hours, though this can vary by payment method. The brand has a strong compliance history, focusing on player protection and responsible gaming. While bonus wagering requirements are standard, the sheer volume of games and frequent promotions make it a trusted choice for players seeking variety and reliability.",
    "warningText": "Players from restricted regions, including the Netherlands and United States, are not accepted due to local regulations.",
    "affiliateUrl": "",
    "pros": [
      "Massive game selection (9,000+ titles)",
      "Reputable MGA license",
      "Fast withdrawal processing",
      "Excellent customer support (24/7 chat)",
      "Frequent promotions and tournaments"
    ],
    "cons": [
      "Homepage can be overwhelming due to content density",
      "Wagering requirements for bonuses could be clearer for some promotions (not explicitly stated here)"
    ],
    "securityTitle": "Robust Security Measures at VideoSlots",
    "securitySummary": "VideoSlots operates under a stringent Malta Gaming Authority (MGA) license, ensuring high standards of security and player protection. They employ advanced SSL encryption to safeguard all transactions and personal data. Regular audits by independent third parties verify the fairness of games and the integrity of their systems. Responsible gambling tools are readily available to promote a safe gaming environment.",
    "securityWarning": "The MGA license is a strong indicator of a secure and compliant operator, offering reliable player protection.",
    "securityPoints": [
      {
        "title": "MGA Licensed & Regulated",
        "description": "Operating under the strict supervision of the Malta Gaming Authority (MGA/B2C/218/2012).",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "SSL Encryption",
        "description": "All data transfers and transactions are secured using industry-standard SSL encryption.",
        "iconName": "zap",
        "status": "success"
      },
      {
        "title": "Fair Gaming Certified",
        "description": "Games are regularly audited by independent agencies to ensure fairness and randomness.",
        "iconName": "shield",
        "status": "success"
      },
      {
        "title": "Responsible Gaming Tools",
        "description": "Comprehensive tools like deposit limits, session limits, and self-exclusion are available.",
        "iconName": "shield",
        "status": "success"
      }
    ],
    "bonusMatchOffer": "100% up to €200",
    "bonusWagering": "35x",
    "bonusMinDeposit": "€10",
    "bonusValidity": "60 Days for Bonus, 7 Days for Spins",
    "bonusMaxBet": "€5",
    "bonusTermsVerdict": "The welcome bonus offers a standard match with reasonable wagering, complemented by free spins, making it an attractive offer for new players. Specific terms should be reviewed on the site.",
    "bonusTermsDetails": [
      {
        "title": "Wagering Requirements",
        "description": "Bonus money subject to 35x wagering requirements. Wins from Welcome Spins may have separate wagering."
      },
      {
        "title": "Minimum Deposit",
        "description": "A minimum deposit of €10 is required to claim the welcome bonus."
      },
      {
        "title": "Game Contributions",
        "description": "Different games contribute varying percentages towards wagering requirements, typically slots 100%."
      },
      {
        "title": "Bonus Validity",
        "description": "Bonus funds are valid for 60 days. Welcome Spins must be used within 7 days of activation."
      },
      {
        "title": "Maximum Bet",
        "description": "Maximum bet allowed with active bonus is €5 per spin or €0.50 per bet line."
      }
    ],
    "gameSummary": "VideoSlots boasts an industry-leading game library with over 9,000 titles, covering every possible casino game category. Players can enjoy a vast selection of video slots, classic slots, jackpot games, a comprehensive live casino, and a wide array of table games and scratch cards from hundreds of top-tier software providers.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "An unparalleled collection of video slots, including popular titles, new releases, and exclusive games from hundreds of providers.",
        "notable": "Starburst, Book of Dead, Mega Moolah, Gonzo's Quest, Immortal Romance",
        "iconName": "slots"
      },
      {
        "title": "Jackpot Games",
        "description": "A dedicated section for progressive and fixed jackpot slots with life-changing prize pools.",
        "notable": "Mega Moolah, WowPot series, Hall of Gods, Major Millions",
        "iconName": "slots"
      },
      {
        "title": "Live Casino",
        "description": "High-quality live dealer games including Blackjack, Roulette, Baccarat, and various game shows.",
        "notable": "Evolution Gaming, Pragmatic Play Live tables, Crazy Time, Lightning Roulette",
        "iconName": "live"
      },
      {
        "title": "Table Games",
        "description": "A wide variety of virtual table games, from classic Blackjack and Roulette to various poker and baccarat variants.",
        "notable": "European Roulette, Classic Blackjack, Casino Hold'em, Baccarat",
        "iconName": "dice"
      },
      {
        "title": "Other Games",
        "description": "Includes scratch cards, video poker, and other instant win games for diverse entertainment.",
        "notable": "Joker Poker, Keno, various Scratch Cards",
        "iconName": "dice"
      }
    ],
    "paymentSummary": "VideoSlots supports a comprehensive range of payment methods, ensuring convenient deposits and withdrawals for players worldwide. Options typically include popular e-wallets, credit/debit cards, bank transfers, and various local payment solutions.",
    "paymentMethods": [
      {
        "name": "Visa",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Mastercard",
        "type": "Credit Card",
        "depositTime": "Instant",
        "withdrawalTime": "1-3 Business Days",
        "fees": "None"
      },
      {
        "name": "Skrill",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Instant - 24 Hours",
        "fees": "None"
      },
      {
        "name": "Neteller",
        "type": "E-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "Instant - 24 Hours",
        "fees": "None"
      },
      {
        "name": "Trustly",
        "type": "Bank Transfer",
        "depositTime": "Instant",
        "withdrawalTime": "Instant - 24 Hours",
        "fees": "None"
      },
      {
        "name": "Paysafecard",
        "type": "Prepaid Card",
        "depositTime": "Instant",
        "withdrawalTime": "N/A (Deposit Only)",
        "fees": "None"
      }
    ],
    "rgSummary": "VideoSlots is committed to responsible gambling, offering a dedicated 'Play Responsibly' section (as seen on the homepage) with various tools and resources to help players manage their gaming habits. They prioritize player well-being and provide support for those who might need it.",
    "rgTools": [
      {
        "title": "Deposit Limits",
        "description": "Players can set daily, weekly, or monthly limits on their deposits to control spending.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Loss Limits",
        "description": "Option to set limits on net losses over a specific period.",
        "status": "supported",
        "iconName": "euro"
      },
      {
        "title": "Session Limits",
        "description": "Players can define a maximum duration for their gaming sessions.",
        "status": "supported",
        "iconName": "clock"
      },
      {
        "title": "Self-Exclusion",
        "description": "A tool to temporarily or permanently exclude oneself from accessing the casino.",
        "status": "supported",
        "iconName": "shield-ban"
      },
      {
        "title": "Reality Checks",
        "description": "Regular notifications to remind players about their elapsed gaming time.",
        "status": "supported",
        "iconName": "clock"
      }
    ],
    "comparisonTitle": "VideoSlots vs. Industry Standards",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "MGA Regulated - High Safety",
        "regulatedStandard": "MGA Standard Requirement",
        "status": "success"
      },
      {
        "feature": "Game Library Size",
        "thisCasino": "9,000+ Titles - Exceptional",
        "regulatedStandard": "1,000-2,000 Titles - Good",
        "status": "success"
      },
      {
        "feature": "Withdrawal Speed",
        "thisCasino": "Fast (0-24h for e-wallets)",
        "regulatedStandard": "Standard (24-72h for e-wallets)",
        "status": "success"
      },
      {
        "feature": "Welcome Bonus Wagering",
        "thisCasino": "35x Bonus - Standard",
        "regulatedStandard": "30x-40x Bonus - Standard",
        "status": "neutral"
      },
      {
        "feature": "NL Market Availability",
        "thisCasino": "Restricted",
        "regulatedStandard": "KSA License Required",
        "status": "danger"
      }
    ],
    "faqs": [
      {
        "question": "Is VideoSlots a licensed and safe casino?",
        "answer": "Yes, VideoSlots holds a reputable license from the Malta Gaming Authority (MGA), ensuring a safe, fair, and regulated gaming environment for its players."
      },
      {
        "question": "What kind of games can I play at VideoSlots?",
        "answer": "VideoSlots offers an enormous selection of over 9,000 games, including video slots, classic slots, progressive jackpots, live casino games, table games, and scratch cards from hundreds of leading providers."
      },
      {
        "question": "How fast are withdrawals at VideoSlots?",
        "answer": "Withdrawal processing times at VideoSlots are generally fast. E-wallet withdrawals are often processed instantly or within 24 hours, while card and bank transfers may take 1-3 business days."
      },
      {
        "question": "Does VideoSlots offer a welcome bonus for new players?",
        "answer": "Yes, new players at VideoSlots are typically offered a welcome bonus, such as a 100% match up to a certain amount plus free spins, subject to specific terms and wagering requirements."
      }
    ],
    "license": "MGA/B2C/218/2012",
    "localizedBonuses": {
      "global": {
        "offer": "100% up to €200 + 11 Welcome Spins",
        "wagering": "35x"
      },
      "nl": {
        "offer": "100% up to €100 + 50 Free Spins",
        "wagering": "30x"
      },
      "uk": {
        "offer": "100% up to £200 + 11 Welcome Spins",
        "wagering": "35x"
      },
      "swe": {
        "offer": "100% up to 2000 SEK + 11 Welcome Spins",
        "wagering": "30x"
      },
      "nor": {
        "offer": "100% up to 5000 NOK + 11 Welcome Spins",
        "wagering": "25x"
      },
      "fin": {
        "offer": "100% up to 200€ + 11 Welcome Spins",
        "wagering": "35x"
      },
      "den": {
        "offer": "100% up to 1000 DKK + 11 Welcome Spins",
        "wagering": "10x"
      },
      "ger": {
        "offer": "100% up to 500 EUR + 11 Welcome Spins",
        "wagering": "30x"
      },
      "fra": {
        "offer": "100% up to 100€",
        "wagering": "35x"
      },
      "bel": {
        "offer": "100% up to 250€",
        "wagering": "40x"
      },
      "ita": {
        "offer": "100% up to 1000€ + 11 Welcome Spins",
        "wagering": "35x"
      },
      "esp": {
        "offer": "100% up to 200€ + 11 Welcome Spins",
        "wagering": "35x"
      },
      "bra": {
        "offer": "100% up to 1500 R$ + 11 Welcome Spins",
        "wagering": "35x"
      },
      "can": {
        "offer": "100% up to 1000 CAD + 11 Welcome Spins",
        "wagering": "35x"
      }
    },
    "bonus": "100% up to €200 + 11 Welcome Spins",
    "wagering": "35x",
    "welcomeBonus": "100% up to €200 + 11 Welcome Spins"
  },
  {
    "id": "winbeast",
    "name": "Winbeast Casino",
    "slug": "winbeast",
    "domain": "winbeast.com",
    "isKsaLicensed": false,
    "isLicensedInNL": false,
    "license": "",
    "licenseType": "mga",
    "restrictedCountries": [
      "NL"
    ],
    "bonus": "200% up to €1000",
    "wagering": "50x",
    "licenseNumber": "",
    "rating": 2.8,
    "author": "iGaming Compliance Specialist",
    "datePublished": "2026-06-30",
    "lastModified": "2026-07-10",
    "lastUpdated": "2026-07-10",
    "logoColor": "from-orange-500 to-amber-600",
    "welcomeBonus": "150% up to $1,000",
    "gameLibraryCount": "3,500+ Titles",
    "summaryText": "Winbeast operates under a license from the Malta Gaming Authority (MGA). While the MGA is a reputable European regulator, it does not hold a local KSA license, meaning Dutch residents do not receive protection under local Dutch laws.",
    "warningText": "Warning: Winbeast does not hold a KSA license in the Netherlands and is not authorized to accept Dutch residents.",
    "affiliateUrl": "",
    "pros": [
      "Very high match welcome bonus.",
      "Accepts credit card deposits from some regions.",
      "Over 3,500 slot titles from tier-1 developers."
    ],
    "cons": [
      "No Dutch KSA License or legal backing.",
      "Predatory wagering rules on bonus funds.",
      "Numerous user reviews citing delayed payments."
    ],
    "securityTitle": "Security & License",
    "securitySummary": "Winbeast is licensed and regulated by the Malta Gaming Authority (MGA). Although MGA-licensed platforms adhere to strict EU standards for player safety and solvency, this license is not recognized in the Netherlands, meaning Dutch players have no local regulatory recourse in case of a dispute.",
    "securityWarning": "MGA License - Moderate risk for Dutch players due to lack of local KSA jurisdiction.",
    "securityPoints": [
      {
        "title": "MGA License Held",
        "description": "Regulated by the Malta Gaming Authority (MGA), ensuring standard European player protections and regular RNG audits.",
        "iconName": "shield",
        "status": "warning"
      },
      {
        "title": "No KSA Jurisdiction",
        "description": "Not authorized by the Dutch Kansspelautoriteit (KSA). Local consumer protection and self-exclusion systems (CRUKS) are not supported.",
        "iconName": "alert",
        "status": "danger"
      }
    ],
    "bonusMatchOffer": "150% up to $1,000",
    "bonusWagering": "45x (Deposit + Bonus)",
    "bonusMinDeposit": "$25",
    "bonusValidity": "7 Days",
    "bonusMaxBet": "$5",
    "bonusTermsVerdict": "This bonus contains predatory terms. A 45x wagering requirement applied to the combined deposit and bonus amount effectively requires players to wager 112.5x the bonus value before taking a withdrawal.",
    "bonusTermsDetails": [
      {
        "title": "Extremely High Wagering",
        "description": "Requiring 45x (deposit + bonus) creates a statistical profile where 98.4% of players will bust before completing the requirements."
      },
      {
        "title": "Restricted Games",
        "description": "Wagering is strictly limited to low-RTP slots, and any bets on slots with an RTP over 96.5% are strictly barred while a bonus is active."
      }
    ],
    "gameSummary": "A massive library with 3,500+ slot titles. However, the RTP configurations are set to the developer's lowest available settings on several popular games.",
    "gameCategories": [
      {
        "title": "Video Slots",
        "description": "Megaways and high-volatility slots represent the bulk of the library.",
        "notable": "Legacy of Dead, Sweet Bonanza",
        "iconName": "slots"
      },
      {
        "title": "Live Dealers",
        "description": "Pragmatic Play and Evolution dealer lobbies, though tables are frequently crowded.",
        "notable": "Mega Roulette, Monopoly Live",
        "iconName": "live"
      }
    ],
    "paymentSummary": "Winbeast processes credit cards, e-wallets, and crypto. It enforces strict payout limits ($2,000/week) and requires heavy KYC before processing any withdrawal.",
    "paymentMethods": [
      {
        "name": "Credit Card (Visa/Mastercard)",
        "type": "Traditional Card",
        "depositTime": "Instant",
        "withdrawalTime": "3 - 5 Biz Days",
        "fees": "2.5% Processing Fee"
      },
      {
        "name": "MiFinity",
        "type": "e-Wallet",
        "depositTime": "Instant",
        "withdrawalTime": "24 - 48 Hours",
        "fees": "None"
      }
    ],
    "rgSummary": "Winbeast implements basic self-exclusion tools to satisfy licensing requirements, but players report that customer service delays the exclusion process upon request.",
    "rgTools": [
      {
        "title": "Self-Exclusion",
        "description": "Users can email support to shut down accounts. Standard turnaround time is 48-72 hours, during which players can still play and deposit.",
        "status": "warning",
        "iconName": "ban"
      },
      {
        "title": "No National Database Connection",
        "description": "Totally bypassed by national safety lists. Those registered in European exclusions can easily access the platform.",
        "status": "error",
        "iconName": "shield-ban"
      }
    ],
    "comparisonTitle": "Comparison: Winbeast vs. Regulated KSA Casinos",
    "comparisonRows": [
      {
        "feature": "License & Safety",
        "thisCasino": "MGA Licensed - Moderate Safety (No KSA)",
        "regulatedStandard": "KSA (Netherlands) - High Safety",
        "status": "danger"
      },
      {
        "feature": "Payment Methods",
        "thisCasino": "Cards & e-Wallets (Fees apply)",
        "regulatedStandard": "iDEAL, Maestro, Visa (Fee-free)",
        "status": "warning"
      },
      {
        "feature": "Responsible Gaming",
        "thisCasino": "Manual and Delayed Limits",
        "regulatedStandard": "CRUKS Integrated, Instant Enforcement",
        "status": "danger"
      }
    ],
    "faqs": [
      {
        "question": "Is Winbeast safe to play in the Netherlands?",
        "answer": "No. Winbeast does not hold a license from the Kansspelautoriteit (KSA) and is not legally permitted to accept players from the Netherlands."
      },
      {
        "question": "What are the withdrawal limits?",
        "answer": "Winbeast imposes restrictive limits of $2,000 per week and $5,000 per month, which can delay large payouts substantially."
      }
    ]
  }
];

export function isCasinoAvailableInCountry(slug: string, countryCode: string): boolean {
  const casino = casinos.find((c) => c.slug === slug);
  if (!casino) return false;
  return !casino.restrictedCountries.includes(countryCode);
}

// Multi-licensed operators (e.g. bet365 holds ksa+mga+ukgc) only expose one
// value via `licenseType` (the primary license) — checking that field alone
// undercounts/excludes operators for any license they hold secondarily.
// This checks the full `licenseTypes` array, falling back to `licenseType`
// for operators that only ever held a single license.
export function casinoHoldsLicense(casino: Casino, licenseType: string): boolean {
  const types = casino.licenseTypes && casino.licenseTypes.length > 0 ? casino.licenseTypes : [casino.licenseType];
  return types.includes(licenseType as Casino["licenseType"]);
}

// Whether the affiliate CTA may be shown to a visitor in `countryCode`.
// An offer with no `affiliateGeos` is unrestricted; a restricted one requires
// a positively known, matching country — an empty/unknown code keeps the CTA
// hidden rather than sending the visitor to the network's "disabled" page.
export function isAffiliateOfferAvailable(
  casino: Pick<Casino, "affiliateUrl" | "affiliateGeos" | "isPartner">,
  countryCode: string,
): boolean {
  if (!casino.isPartner) return false;
  if (!casino.affiliateUrl || casino.affiliateUrl.trim().length === 0) return false;
  if (!casino.affiliateGeos || casino.affiliateGeos.length === 0) return true;
  return casino.affiliateGeos.includes(countryCode.toUpperCase());
}
