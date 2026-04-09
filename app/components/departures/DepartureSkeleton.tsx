"use client";

import { motion } from "motion/react";
import type { Easing } from "motion";

const skeletonVariants = {
  initial: { opacity: 0.5 },
  animate: { 
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as Easing
    }
  }
};

export function DepartureSkeleton() {
  return (
    <motion.div 
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
      className="w-full bg-white rounded-3xl border border-slate-100 p-5 md:p-7 flex flex-col md:flex-row gap-6 items-center shadow-sm"
    >
      {/* Time & Vessel Info */}
      <div className="flex flex-col items-center md:items-start min-w-[150px] space-y-3">
        {/* Time range block */}
        <div className="h-8 w-32 bg-slate-200 rounded-lg" />
        {/* Vessel name block */}
        <div className="h-3 w-20 bg-slate-100 rounded-md" />
      </div>

      {/* Dashed Line Spacer */}
      <div className="flex-1 hidden md:block border-b border-dashed border-slate-100" />

      {/* Price & Button area */}
      <div className="flex items-center gap-6">
        <div className="text-right space-y-2">
          <div className="h-3 w-8 bg-slate-100 rounded ml-auto" />
          <div className="h-8 w-20 bg-slate-200 rounded-lg" />
        </div>
        {/* Arrow icon placeholder */}
        <div className="w-10 h-10 bg-slate-50 rounded-full" />
      </div>
    </motion.div>
  );
}

export function DepartureListSkeleton() {
  return (
    <div className="space-y-4">
      {/* Staggering these slightly manually or via variants makes it look even better */}
      <DepartureSkeleton />
      <DepartureSkeleton />
      <DepartureSkeleton />
    </div>
  );
}