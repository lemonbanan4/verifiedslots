import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
import { initializeApp, applicationDefault, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
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

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;

if (!projectId) {
  log.error("FIREBASE_PROJECT_ID is missing. Please add it to your .env.local file.");
  process.exit(1);
}

// This is a trusted, server-side maintenance script — it uses the Admin SDK
// (which bypasses Firestore security rules entirely) rather than the client
// SDK, since firestore.rules intentionally denies client writes to casinos/
// insights. Picks up credentials from GOOGLE_APPLICATION_CREDENTIALS if set,
// otherwise falls back to gcloud's Application Default Credentials.
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (getApps().length === 0) {
  initializeApp({
    credential: serviceAccountPath && fs.existsSync(serviceAccountPath)
      ? cert(serviceAccountPath)
      : applicationDefault(),
    projectId,
  });
}

const db = getFirestore();

async function seed() {
  log.info(`Starting to seed ${casinos.length} casinos to Firestore...`);

  for (const casino of casinos) {
    try {
      log.info(`Uploading ${casino.name} (${casino.slug})...`);
      await db.collection("casinos").doc(casino.slug).set(casino);
      log.info(`Successfully uploaded ${casino.name}!`);
    } catch (e) {
      log.error(`Failed to upload ${casino.name}`, { error: e });
    }
  }

  log.info("Seeding complete!");
}

seed().catch((error) => log.error("Seeding failed", { error }));
