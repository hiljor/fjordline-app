"use client";

import { useState } from "react";
import DepartureCard from "./DepartureCard";
import { ChevronDown } from "lucide-react";
import { Departure } from "@/app/types/departure";

interface DepartureListProps {
  items: Departure[];
  accentColor?: string;
}

export default function DepartureList({ items, accentColor, type }: DepartureListProps & { type: string }) {
  
  // Show 3 items initially
  const [visibleCount, setVisibleCount] = useState(3);
  
  const hasMore = visibleCount < items.length;

  const showMore = () => {
    setVisibleCount(items.length); 
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
{items.slice(0, visibleCount).map((dep) => (
        <DepartureCard key={dep.id} departure={dep} accentColor={accentColor} type={type} />
      ))}
      </div>

      {hasMore && (
        <button
          onClick={showMore}
          className="w-full mt-4 py-4 bg-brandLight border border-slate-200 rounded-2xl text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-[0.99]"
        >
          Vis flere avganger ({items.length - visibleCount} til)
          <ChevronDown size={18} />
        </button>
      )}
    </div>
  );
}