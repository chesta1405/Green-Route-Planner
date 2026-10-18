import React from 'react';
import { Loader2, Leaf } from 'lucide-react';

export default function LoadingState({ message = 'Calculating eco-optimized routes and carbon footprints...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-forest-100 shadow-soft text-center animate-in fade-in duration-300">
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-full border-4 border-forest-100 border-t-emerald-600 animate-spin flex items-center justify-center"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className="w-5 h-5 text-emerald-600 animate-pulse" />
        </div>
      </div>
      <h4 className="text-base font-bold text-forest-900 mb-1">Optimizing Green Path</h4>
      <p className="text-xs text-slate-500 max-w-sm">{message}</p>
    </div>
  );
}
