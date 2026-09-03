'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { WifiOff, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function NetworkGuard() {
  const [isOffline, setIsOffline] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Check actual network connectivity by pinging a lightweight static asset
  const checkConnection = useCallback(async () => {
    setIsChecking(true);
    try {
      if (!navigator.onLine) {
        setIsOffline(true);
        setIsChecking(false);
        return false;
      }

      // Ping a static asset with a timestamp to bypass cache
      const res = await fetch(`/favicon.ico?_t=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
      });

      if (res.ok || res.status === 200 || res.status === 304) {
        setIsOffline(false);
        toast.success('Connection restored! You are back online.');
        setIsChecking(false);
        return true;
      } else {
        setIsOffline(true);
        setIsChecking(false);
        return false;
      }
    } catch {
      setIsOffline(true);
      setIsChecking(false);
      return false;
    }
  }, []);

  useEffect(() => {
    // Initial check on mount
    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);
    }

    const handleOffline = () => {
      setIsOffline(true);
    };

    const handleOnline = () => {
      // Re-check to confirm real internet connectivity
      checkConnection();
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [checkConnection]);

  // Lock body scroll when offline to prevent any interaction
  useEffect(() => {
    if (isOffline) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOffline]);

  if (!isOffline) {
    return null;
  }

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label="No Internet Connection"
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-[420px] bg-white rounded-[24px] p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl border border-[#EFEFEF] outline-none">
        {/* Glowing Status Icon Badge */}
        <div className="w-[64px] h-[64px] rounded-full bg-[#FEF0E9] flex items-center justify-center relative mb-2 shadow-xs">
          <div className="w-[48px] h-[48px] rounded-full bg-[#F36922]/15 flex items-center justify-center text-[#F36922]">
            <WifiOff className="w-6 h-6 text-[#F36922] stroke-[2.2] animate-pulse" />
          </div>
        </div>

        {/* Offline Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-[#C81E1E] text-[12px] font-rubik font-medium mb-3">
          <span className="w-2 h-2 rounded-full bg-[#C81E1E] animate-ping" />
          <span>Offline</span>
        </div>

        {/* Title */}
        <h2 className="font-rubik font-bold text-[22px] sm:text-[24px] leading-[28px] text-[#121111]">
          No Internet Connection
        </h2>

        {/* Description */}
        <p className="font-rubik font-normal text-[14px] sm:text-[14.5px] leading-[22px] text-[#565656] max-w-[340px] mt-2 mb-6">
          You are currently offline. Please check your Wi-Fi or mobile network connection. The app will automatically resume once your connection is restored.
        </p>

        {/* Try Again / Check Connection Action */}
        <button
          type="button"
          onClick={checkConnection}
          disabled={isChecking}
          className="w-full h-[48px] bg-[#F36922] hover:bg-[#e05813] disabled:opacity-75 text-white font-rubik font-semibold text-[15px] rounded-[12px] transition-all cursor-pointer border-none shadow-sm flex items-center justify-center gap-2"
        >
          <RefreshCw
            className={`w-4 h-4 text-white ${isChecking ? 'animate-spin' : ''}`}
          />
          <span>{isChecking ? 'Checking Connection...' : 'Try Again'}</span>
        </button>

        {/* Help Tip */}
        <div className="flex items-center gap-1.5 text-[12px] font-rubik text-[#727272] mt-4">
          <AlertCircle className="w-3.5 h-3.5 text-[#727272] shrink-0" />
          <span>Interaction is paused until connection returns</span>
        </div>
      </div>
    </div>
  );
}
