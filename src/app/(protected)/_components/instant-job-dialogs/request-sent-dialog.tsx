'use client';

import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Check } from 'lucide-react';

interface RequestSentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  autoCloseMs?: number;
  onComplete?: () => void;
}

export function RequestSentDialog({
  open,
  onOpenChange,
  autoCloseMs = 2000,
  onComplete,
}: RequestSentDialogProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onOpenChange(false);
      onComplete?.();
    }, autoCloseMs);
    return () => clearTimeout(timer);
  }, [open, autoCloseMs, onOpenChange, onComplete]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[420px] max-w-[92vw] bg-white rounded-[24px] p-8 flex flex-col items-center text-center shadow-2xl border border-[#EFEFEF] outline-none select-none"
      >
        {/* Orange squircle with checkmark */}
        <div className="w-[56px] h-[56px] rounded-[18px] bg-[#F36922] flex items-center justify-center text-white mb-4 shadow-sm">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Title */}
        <DialogTitle className="font-rubik font-bold text-[26px] leading-[32px] text-[#121111] mb-2">
          Request Sent!
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="font-poppins font-normal text-[14.5px] leading-[22px] text-[#565656] max-w-[340px]">
          Your Instant Job Request has been sent to available caregivers. You&apos;ll receive responses as they become available.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
