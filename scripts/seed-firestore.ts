import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { casinos } from "../src/data/casinos";
import { createLogger } from "@/src/utils/logging";

const log = createLogger("seed-firestore");

// Load environment variables from .env.local
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envConfig = dotenv.config({ path: envLocalPath });
  if (envConfig.error) {
    log.warn("Failed to parse .env.local", { error: envConfig.error });
  } else {
    log.info("Loaded environment variables from .env.local");
  }
} else {
  log.info(".env.local not found, using system environment variables");
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  log.error("Firebase configuration keys are missing. Please add them to your .env.local file.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  log.info(`Starting to seed ${casinos.length} casinos to Firestore...`);

  for (const casino of casinos) {
    try {
      log.info(`Uploading ${casino.name} (${casino.slug})...`);
      const docRef = doc(db, "casinos", casino.slug);
      await setDoc(docRef, casino);
      log.info(`Successfully uploaded ${casino.name}!`);
    } catch (e) {
      log.error(`Failed to upload ${casino.name}`, { error: e });
    }
  }

  log.info("Seeding complete!");
}

seed().catch((error) => log.error("Seeding failed", { error }));
