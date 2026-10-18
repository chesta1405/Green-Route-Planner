import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ title = 'Error', message, onRetry }) {
  return (
    <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 shadow-xs flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h5 className="text-sm font-semibold text-rose-800">{title}</h5>
        <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-rose-300 text-rose-700 hover:bg-rose-100 rounded-md text-xs font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
