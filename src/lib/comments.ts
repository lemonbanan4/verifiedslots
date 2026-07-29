import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { createLogger } from "@/src/utils/logging";

const log = createLogger("comments");

export interface CasinoComment {
  id: string;
  casinoSlug: string;
  authorName: string;
  text: string;
  createdAt: Date | null;
}

const AUTHOR_MAX = 60;
const TEXT_MAX = 1000;
const URL_PATTERN = /(https?:\/\/|www\.)/i;

export function validateComment(authorName: string, text: string): string | null {
  if (!authorName.trim()) return "Please enter a name.";
  if (authorName.length > AUTHOR_MAX) return `Name must be under ${AUTHOR_MAX} characters.`;
  if (!text.trim()) return "Please enter a comment.";
  if (text.length > TEXT_MAX) return `Comment must be under ${TEXT_MAX} characters.`;
  if (URL_PATTERN.test(text)) return "Links aren't allowed in comments.";
  return null;
}

// Fetches only already-approved comments — Firestore rules reject any query
// that could return a pending one, so this shape is load-bearing, not just
// a display filter.
export async function fetchApprovedComments(casinoSlug: string): Promise<CasinoComment[]> {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(
      collection(db, "comments"),
      where("casinoSlug", "==", casinoSlug),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null;
      return {
        id: d.id,
        casinoSlug: data.casinoSlug,
        authorName: data.authorName,
        text: data.text,
        createdAt,
      };
    });
  } catch (error) {
    log.error(`Error fetching comments for "${casinoSlug}"`, { error });
    return [];
  }
}

// Every comment is created as "pending" and stays invisible to all clients
// (including the submitter) until manually approved in the Firebase console
// — see firestore.rules. There is no logged-in state to bypass that.
export async function submitComment(
  casinoSlug: string,
  authorName: string,
  text: string,
): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Comments are temporarily unavailable.");
  }
  await addDoc(collection(db, "comments"), {
    casinoSlug,
    authorName: authorName.trim(),
    text: text.trim(),
    status: "pending",
    createdAt: serverTimestamp(),
  });
}
