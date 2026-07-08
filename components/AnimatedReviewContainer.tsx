"use client";

import React from "react";
import { motion, Variants } from "motion/react";

interface AnimatedReviewContainerProps {
  children: React.ReactNode;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function AnimatedReviewContainer({ children }: AnimatedReviewContainerProps) {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex-1 flex flex-col gap-6 mt-6 pb-20 relative optimize-gpu"
    >
      {children}
    </motion.main>
  );
}
