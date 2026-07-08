"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  User,
  Clock,
  Shield,
  HelpCircle,
  ShieldCheck,
  Coins,
  Flame,
} from "lucide-react";
import type { Audit, AuditCategory, AuditSection } from "@/src/types/audit";
import { ComplianceSeal } from "./ComplianceSeal";

interface AuditModalProps {
  audit: Audit | null;
  onClose: () => void;
}

const categoryIconMap: Record<
  AuditCategory,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  "Math & RNG Auditing": Coins,
  "Strategy & Solvency": Flame,
  "Regulatory Compliance & Risk Management": Shield,
  "Regulatory Oversight & Wagering Liability": ShieldCheck,
};

const categoryColorMap: Record<AuditCategory, string> = {
  "Math & RNG Auditing": "text-amber-400",
  "Strategy & Solvency": "text-rose-400",
  "Regulatory Compliance & Risk Management": "text-amber-500",
  "Regulatory Oversight & Wagering Liability": "text-emerald-400",
};

export function AuditModal({ audit, onClose }: AuditModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!audit) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [audit]);

  useEffect(() => {
    if (!audit) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [audit, onClose]);

  if (!mounted || !audit) return null;

  const CategoryIcon = categoryIconMap[audit.category] ?? HelpCircle;
  const categoryColor = categoryColorMap[audit.category] ?? "text-blue-400";
  const approved = audit.status === "Editorial Approved";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={audit.title}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(8px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/*
       * Card — uses a CSS Grid with two rows: auto (header) + 1fr (body).
       * Grid is the most reliable way to give the body "all remaining height"
       * without flexbox min-h-0 quirks. maxHeight caps the whole card.
       */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "42rem",        /* max-w-2xl */
          maxHeight: "82vh",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          background: "rgb(15 23 42)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "1rem",
          boxShadow: "0 25px 60px -10px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Row 1: Sticky header (auto height) ───────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgb(15 23 42)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#60a5fa",
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.15)",
                padding: "0.25rem 0.625rem",
                borderRadius: "0.5rem",
              }}
            >
              <CategoryIcon size={11} className={categoryColor} />
              {audit.category}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.625rem",
                fontWeight: 600,
                color: "#64748b",
              }}
            >
              <Clock size={10} />
              {audit.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close audit"
            style={{
              flexShrink: 0,
              color: "#94a3b8",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "0.5rem",
              padding: "0.375rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.15s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#f1f5f9")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Row 2: Scrollable body (1fr — fills remaining space) ─── */}
        <div
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
            padding: "1.5rem",
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.3,
              marginBottom: "1rem",
            }}
          >
            {audit.title}
          </h2>

          {/* Author block */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              marginBottom: "1.5rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: "rgb(30 41 59)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#60a5fa",
                flexShrink: 0,
              }}
            >
              <User size={14} />
            </div>
            <div style={{ fontSize: "0.6875rem", lineHeight: 1.4 }}>
              <p style={{ color: "#e2e8f0", fontWeight: 700, margin: 0 }}>{audit.author}</p>
              <p style={{ color: "#64748b", fontWeight: 500, margin: 0 }}>{audit.authorRole}</p>
            </div>
            <span style={{ marginLeft: "auto", fontSize: "0.6875rem", color: "#94a3b8", fontWeight: 600, flexShrink: 0 }}>
              {audit.date}
            </span>
          </div>

          {/* Audit sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {audit.sections.map((section: AuditSection, idx: number) => (
              <div key={idx}>
                {section.heading && (
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "#f1f5f9",
                      marginBottom: "0.5rem",
                      lineHeight: 1.4,
                    }}
                  >
                    <Shield
                      size={15}
                      style={{ color: "#60a5fa", flexShrink: 0, marginTop: "0.125rem" }}
                    />
                    {section.heading}
                  </h3>
                )}
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "#cbd5e1",
                    lineHeight: 1.7,
                    fontWeight: 450,
                    margin: 0,
                  }}
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
              </div>
            ))}
          </div>

          {/* Footer inside scroll area */}
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {audit.complianceScore !== undefined && (
              <ComplianceSeal score={audit.complianceScore} size="lg" className="w-full" />
            )}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {approved ? (
                  <>
                    <span style={{ color: "#34d399", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <ShieldCheck size={13} /> Editorial Approved
                    </span>
                    <span>• Verification Active</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: "#fbbf24", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Clock size={13} /> Pending Editorial Review
                    </span>
                    <span>• Under Assessment</span>
                  </>
                )}
              </div>
              <button
                onClick={onClose}
                style={{
                  padding: "0.625rem 1.5rem",
                  background: "#4f46e5",
                  border: "1px solid rgba(99,102,241,0.3)",
                  borderRadius: "0.75rem",
                  color: "#fff",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#4338ca")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#4f46e5")}
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
