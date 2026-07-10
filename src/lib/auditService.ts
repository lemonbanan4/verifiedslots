import { db, isFirebaseConfigured } from "./firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { casinos as localCasinos, Casino } from "@/src/data/casinos";
import { createLogger } from "@/src/utils/logging";

const log = createLogger("audit-service");

// The Firebase JS client SDK requires a browser environment with an active
// auth session. Server Components (Node.js) have neither, so we guard all
// Firestore calls behind this check and fall through to static local data.
const isBrowser = typeof window !== "undefined";

export async function fetchCasinoBySlug(slug: string): Promise<Casino | null> {
  if (isBrowser && isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "casinos", slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Casino;
      }
    } catch (error) {
      log.error(`Error fetching casino "${slug}" from Firestore`, { error });
    }
  }

  // Fallback to local static database
  const local = localCasinos.find(c => c.slug === slug);
  return local || null;
}

export async function fetchAllCasinos(): Promise<Casino[]> {
  if (isBrowser && isFirebaseConfigured && db) {
    try {
      const querySnapshot = await getDocs(collection(db, "casinos"));
      const list: Casino[] = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data() as Casino);
      });
      if (list.length > 0) {
        return list;
      }
    } catch (error) {
      log.error("Error fetching casinos list from Firestore", { error });
    }
  }

  // Fallback to local static database
  return localCasinos;
}
