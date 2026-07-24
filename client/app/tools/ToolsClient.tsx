'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { apiClient } from '@/lib/api';
import type { Tool } from '@/lib/types';

export default function ToolsClient() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getTools();
      setTools(data);
      setError('');
    } catch {
      setError('Failed to load tools. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="flex items-center gap-3 font-mono text-sm text-slate">
          <Loader2 className="h-5 w-5 animate-spin text-abyss" aria-hidden="true" />
          Loading tools&hellip;
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 max-w-lg border border-slate/30 p-8">
        <AlertCircle className="h-8 w-8 text-abyss" aria-hidden="true" />
        <h2 className="mt-4 font-display text-xl font-semibold text-ink">Connection error</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{error}</p>
        <button
          onClick={fetchTools}
          className="mt-4 border border-abyss px-4 py-2 font-mono text-xs tracking-wide text-abyss transition-colors hover:bg-abyss hover:text-paper"
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="mt-8 max-w-lg border border-slate/30 p-8">
        <p className="text-sm leading-relaxed text-ink/75">
          No tools returned by the backend right now. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {tools.map((tool) => (
        <div
          key={tool.id}
          className={`border border-slate/25 p-6 transition-colors ${
            tool.status === 'active' ? 'hover:border-abyss' : 'opacity-60'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-ink">{tool.name}</h2>
            {tool.status === 'coming-soon' && (
              <span className="font-mono text-[0.65rem] tracking-wide text-slate">COMING SOON</span>
            )}
          </div>

          <p className="mt-2 text-sm leading-relaxed text-ink/75">{tool.description}</p>

          {tool.methods && tool.methods.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tool.methods.map((method) => (
                <span key={method} className="font-mono text-[0.65rem] tracking-wide text-slate">
                  {method}
                </span>
              ))}
            </div>
          )}

          {tool.status === 'active' && (
            <Link
              href={`/tools/${tool.id}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-abyss hover:gap-3 transition-all"
            >
              Try it
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
