import React from 'react';
import { Leaf, Award, AlertCircle } from 'lucide-react';

export default function EcoScoreBadge({ score = 0, size = 'md', showLabel = true }) {
  let colorStyles = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  let badgeLabel = 'Ultra Green';
  let ringColor = 'text-emerald-500';

  if (score >= 90) {
    colorStyles = 'bg-emerald-50 text-emerald-900 border-emerald-300';
    badgeLabel = 'SDG 13 Champion';
    ringColor = 'text-emerald-600';
  } else if (score >= 70) {
    colorStyles = 'bg-forest-50 text-forest-800 border-forest-300';
    badgeLabel = 'Eco-Friendly';
    ringColor = 'text-forest-600';
  } else if (score >= 50) {
    colorStyles = 'bg-amber-50 text-amber-800 border-amber-300';
    badgeLabel = 'Moderate Impact';
    ringColor = 'text-amber-500';
  } else {
    colorStyles = 'bg-rose-50 text-rose-800 border-rose-300';
    badgeLabel = 'High Emissions';
    ringColor = 'text-rose-500';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3.5 py-1.5 font-bold',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border font-semibold shadow-xs ${colorStyles} ${sizeClasses[size] || sizeClasses.md}`}>
      <Leaf className="w-3.5 h-3.5 shrink-0" />
      <span>{score}/100</span>
      {showLabel && (
        <span className="text-[11px] font-medium opacity-90 border-l border-current/25 pl-1.5">
          {badgeLabel}
        </span>
      )}
    </div>
  );
}
