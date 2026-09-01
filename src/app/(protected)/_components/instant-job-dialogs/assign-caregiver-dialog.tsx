'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface AssignCaregiverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  onContinueToPayment: () => void;
}

export function AssignCaregiverDialog({
  open,
  onOpenChange,
  onCancel,
  onContinueToPayment,
}: AssignCaregiverDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[430px] max-w-[92vw] bg-white rounded-[24px] p-7 sm:p-8 flex flex-col items-center text-center shadow-2xl border border-[#EFEFEF] outline-none select-none"
      >
        {/* Orange Custom Assign Door/Arrow Icon */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-[36px] h-[48px] bg-[#F36922] rounded-[12px] relative flex items-center justify-center">
            {/* Arrow protruding out to the right */}
            <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12H19M19 12L12 5M19 12L12 19"
                  stroke="#F36922"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <DialogTitle className="font-rubik font-bold text-[25px] leading-[32px] text-[#121111] mb-2.5">
          Assign Caregiver?
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="font-poppins font-normal text-[14.5px] leading-[22px] text-[#565656] max-w-[340px] mb-6">
          Are you sure you want to assign this caregiver to your Instant Job? A $10 service fee will apply to this request.
        </DialogDescription>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-[48px] bg-[#FFF0E8] hover:bg-[#FFE5D8] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[14px] transition cursor-pointer border-none flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onContinueToPayment}
            className="flex-1 h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[15px] rounded-[14px] transition cursor-pointer border-none shadow-xs flex items-center justify-center whitespace-nowrap px-3"
          >
            Continue to Payment
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
