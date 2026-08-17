'use client';

import React, { useState } from 'react';
import { LogOut, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface MarkAsDoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function MarkAsDoneModal({ open, onOpenChange, onConfirm }: MarkAsDoneModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[380px] bg-white rounded-[24px] p-6 border-none shadow-2xl flex flex-col items-center text-center gap-3">
        {/* Orange Exit Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#F36922] flex items-center justify-center text-white shadow-sm mb-1">
          <LogOut className="w-7 h-7 text-white" />
        </div>

        <DialogTitle className="font-rubik font-bold text-[24px] text-[#121111] leading-tight">
          Mark As Done
        </DialogTitle>
        <DialogDescription className="font-rubik font-normal text-[15px] text-[#3D3D3D]">
          Are you sure your caregver was completed?
        </DialogDescription>

        <div className="flex gap-3 w-full mt-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-[52px] bg-[#FFF4ED] hover:bg-[#ffe8d9] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[16px] transition cursor-pointer border-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[15px] rounded-[16px] transition cursor-pointer border-none shadow-sm"
          >
            Yes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CancelJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccessClose?: () => void;
}

export function CancelJobModal({ open, onOpenChange, onSuccessClose }: CancelJobModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [reason, setReason] = useState('');

  const handleReset = () => {
    setStep(1);
    setReason('');
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(handleReset, 300);
  };

  const handleFinalSubmit = () => {
    setStep(3);
    setTimeout(() => {
      handleClose();
      if (onSuccessClose) onSuccessClose();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) handleClose(); }}>
      {/* ── STEP 1: Cancel This Job? ── */}
      {step === 1 && (
        <DialogContent className="sm:max-w-[380px] bg-white rounded-[24px] p-6 border-none shadow-2xl flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#D32F2F] flex items-center justify-center text-white shadow-sm mb-1">
            <LogOut className="w-7 h-7 text-white" />
          </div>

          <DialogTitle className="font-rubik font-bold text-[24px] text-[#121111] leading-tight">
            Cancel This Job?
          </DialogTitle>
          <DialogDescription className="font-rubik font-normal text-[15px] text-[#3D3D3D]">
            Are you sure you want to cancel Job?
          </DialogDescription>

          <div className="flex gap-3 w-full mt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 h-[52px] bg-[#FFF4ED] hover:bg-[#ffe8d9] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[16px] transition cursor-pointer border-none"
            >
              Cancel Job
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[15px] rounded-[16px] transition cursor-pointer border-none shadow-sm"
            >
              Keep Job
            </button>
          </div>
        </DialogContent>
      )}

      {/* ── STEP 2: Cancellation Reason ── */}
      {step === 2 && (
        <DialogContent className="sm:max-w-[440px] bg-[#FFF4ED] rounded-[24px] p-6 border-none shadow-2xl flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <DialogTitle className="font-rubik font-semibold text-[20px] text-[#121111]">
              Cancellation Reason
            </DialogTitle>
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#121111] hover:bg-black/5 transition border-none bg-transparent cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <Textarea
            rows={5}
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-white rounded-[16px] p-4 font-rubik text-[14px] text-[#121111] placeholder-[#3D3D3D]/50 border-none outline-none resize-none focus-visible:ring-0 shadow-sm"
          />

          <button
            type="button"
            onClick={handleFinalSubmit}
            className="w-full h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[16px] rounded-[16px] transition cursor-pointer border-none shadow-sm mt-2"
          >
            Submit
          </button>
        </DialogContent>
      )}

      {/* ── STEP 3: Job Cancel Success ── */}
      {step === 3 && (
        <DialogContent className="sm:max-w-[380px] bg-white rounded-[24px] p-6 border-none shadow-2xl flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#F36922] flex items-center justify-center text-white shadow-sm mb-1">
            <Check className="w-8 h-8 stroke-[3] text-white" />
          </div>

          <DialogTitle className="font-rubik font-bold text-[24px] text-[#121111] leading-tight">
            Job Cancel
          </DialogTitle>
          <DialogDescription className="font-rubik font-normal text-[15px] text-[#3D3D3D] leading-relaxed">
            Job has been cancelled... You have 2 cancel jobs remaining. After that no request or booking for almost 24 hrs.
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  );
}
