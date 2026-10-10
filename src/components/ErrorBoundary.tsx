import React, { Component, ErrorInfo, ReactNode } from 'react';
import { getAssetUrl } from '../utils';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = (): void => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore storage access errors
    }
    const base = import.meta.env?.BASE_URL || '/enreach-salon-main/';
    window.location.href = base;
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F7] flex flex-col items-center justify-center p-4 selection:bg-[#F0EAE1]/20 selection:text-white font-sans">
          <div className="max-w-md w-full bg-[#181818] border border-white/10 rounded-2xl p-6 sm:p-8 text-center shadow-2xl">
            {/* Salon Logo */}
            <div className="flex justify-center mb-4">
              <img
                src={getAssetUrl('logo.png')}
                alt="Enreach Unisex Salon"
                className="h-14 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] uppercase font-bold tracking-widest text-[#F0EAE1] mb-3">
              Enreach Unisex Salon
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
              Temporary Display Glitch
            </h1>

            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              We encountered an unexpected rendering error. Your appointment booking and menu items can be recovered instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F0EAE1] hover:bg-white text-[#0D0D0D] font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#252525] hover:bg-[#303030] text-zinc-300 hover:text-white border border-white/10 font-medium text-sm transition-all active:scale-95 cursor-pointer"
              >
                Reset Salon Menu
              </button>
            </div>

            {this.state.error && (
              <details className="text-left mt-4 border-t border-white/10 pt-4 text-xs text-zinc-500">
                <summary className="cursor-pointer text-zinc-400 hover:text-zinc-300">
                  Technical Diagnostics
                </summary>
                <pre className="mt-2 p-3 bg-black/60 rounded-lg overflow-x-auto text-[11px] font-mono text-red-400/90 whitespace-pre-wrap break-all">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
