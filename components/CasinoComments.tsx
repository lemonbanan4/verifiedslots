"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";
import {
  type CasinoComment,
  fetchApprovedComments,
  submitComment,
  validateComment,
} from "@/src/lib/comments";

interface CasinoCommentsProps {
  casinoSlug: string;
  casinoName: string;
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function CasinoComments({ casinoSlug, casinoName }: CasinoCommentsProps) {
  const [comments, setComments] = useState<CasinoComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchApprovedComments(casinoSlug).then((c) => {
      if (!cancelled) {
        setComments(c);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [casinoSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validateComment(authorName, text);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitComment(casinoSlug, authorName, text);
      setSubmitted(true);
      setAuthorName("");
      setText("");
    } catch {
      setError("Something went wrong submitting your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-2 rounded-lg text-indigo-400">
          <MessageSquare size={20} />
        </div>
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
          Player Comments {comments.length > 0 && `(${comments.length})`}
        </h2>
      </div>

      {loading ? (
        <div className="space-y-3 mb-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-slate-900/50 border border-white/5 rounded-xl p-5 h-16 animate-pulse" />
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4 mb-6">
          {comments.map((c) => (
            <div key={c.id} className="bg-slate-900/50 border border-white/5 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">{c.authorName}</span>
                <span className="text-[10px] text-slate-500">{formatDate(c.createdAt)}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap">{c.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500 mb-6">
          No comments yet — be the first to share your experience with {casinoName}.
        </p>
      )}

      {submitted ? (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-xs text-emerald-400">
          <CheckCircle2 size={16} className="shrink-0" />
          Thanks — your comment is submitted and will appear once it's been reviewed.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name"
            maxLength={60}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Share your experience with ${casinoName}...`}
            maxLength={1000}
            rows={3}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          {error && <p className="text-[11px] text-rose-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-450 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            {submitting ? "Submitting..." : "Post Comment"} <Send size={12} />
          </button>
          <p className="text-[10px] text-slate-500">
            Comments are moderated before appearing publicly. No links allowed.
          </p>
        </form>
      )}
    </section>
  );
}
