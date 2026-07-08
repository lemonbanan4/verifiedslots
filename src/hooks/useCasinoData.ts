import { useState, useEffect } from "react";
import { casinos, Casino } from "@/src/data/casinos";

// Server-side / static helper
export function getCasinoBySlug(slug: string): Casino | undefined {
  return casinos.find(c => c.slug === slug);
}

// Listing helper
export function getAllCasinos(): Casino[] {
  return casinos;
}

// Client-side React hook
export function useCasinoData(slug: string) {
  const [casino, setCasino] = useState<Casino | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const found = casinos.find(c => c.slug === slug);
      if (found) {
        setCasino(found);
      } else {
        setError(`Casino with slug "${slug}" not found`);
      }
    } catch (e: any) {
      setError(e.message || "Failed to load casino data");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  return { casino, loading, error };
}
