'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface NoCaregiversDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onKeepWaiting: () => void;
  onIncreaseRadius: () => void;
}

export function NoCaregiversDialog({
  open,
  onOpenChange,
  onKeepWaiting,
  onIncreaseRadius,
}: NoCaregiversDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[440px] max-w-[92vw] bg-white rounded-[24px] p-7 sm:p-8 flex flex-col items-center text-center shadow-2xl border border-[#EFEFEF] outline-none select-none"
      >
        {/* Orange squircle with info 'i' */}
        <div className="w-[54px] h-[54px] rounded-[16px] bg-[#F36922] flex items-center justify-center text-white mb-4 shadow-sm">
          <span className="font-rubik font-bold text-[28px] leading-none">i</span>
        </div>

        {/* Title */}
        <DialogTitle className="font-rubik font-bold text-[24px] leading-[30px] text-[#121111] mb-2.5">
          No Caregivers Found Nearby
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="font-poppins font-normal text-[14px] leading-[22px] text-[#565656] max-w-[360px] mb-6">
          We couldn&apos;t find any available caregivers within your current search area. You can expand your search radius to reach more caregivers or continue waiting for someone nearby to become available.
        </DialogDescription>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onKeepWaiting}
            className="flex-1 h-[48px] bg-[#FFF0E8] hover:bg-[#FFE5D8] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[14px] transition cursor-pointer border-none flex items-center justify-center"
          >
            Keep Waiting
          </button>
          <button
            type="button"
            onClick={onIncreaseRadius}
            className="flex-1 h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[15px] rounded-[14px] transition cursor-pointer border-none shadow-xs flex items-center justify-center whitespace-nowrap px-3"
          >
            Increase Search Radius
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
