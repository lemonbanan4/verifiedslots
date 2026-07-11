/**
 * Normalizes a casino rating to a 0-10 scale for consistent "x/10" display.
 * All current source data already sits in 0-10, but scores are hand-entered
 * (and AI-assisted via fetch-casino.ts) with no hard scale constraint, so
 * this defends against a future 0-100 style value slipping through rather
 * than rendering something like "94/10".
 */
export function normalizeRating(rating: number): number {
  const scaled = rating > 10 ? rating / 10 : rating;
  const clamped = Math.min(10, Math.max(0, scaled));
  return Math.round(clamped * 10) / 10;
}
