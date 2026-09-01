'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CaregiverAssignedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caregiverName?: string;
  onMessageCaregiver?: () => void;
  onViewJob?: () => void;
}

export function CaregiverAssignedDialog({
  open,
  onOpenChange,
  caregiverName = 'Caregiver',
  onMessageCaregiver,
  onViewJob,
}: CaregiverAssignedDialogProps) {
  const router = useRouter();

  const handleMessage = () => {
    onOpenChange(false);
    if (onMessageCaregiver) {
      onMessageCaregiver();
    } else {
      router.push('/chat');
    }
  };

  const handleView = () => {
    onOpenChange(false);
    if (onViewJob) {
      onViewJob();
    } else {
      router.push('/my-jobs/act-1?status=ongoing');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[430px] max-w-[92vw] bg-white rounded-[24px] p-7 sm:p-8 flex flex-col items-center text-center shadow-2xl border border-[#EFEFEF] outline-none select-none"
      >
        {/* Orange squircle with checkmark */}
        <div className="w-[56px] h-[56px] rounded-[18px] bg-[#F36922] flex items-center justify-center text-white mb-4 shadow-sm">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Title */}
        <DialogTitle className="font-rubik font-bold text-[26px] leading-[32px] text-[#121111] mb-2">
          Caregiver Assigned!
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="font-poppins font-normal text-[14.5px] leading-[22px] text-[#565656] max-w-[340px] mb-3">
          Your Instant Job has been successfully assigned to{' '}
          <span className="font-medium text-[#121111]">{caregiverName}</span>.
          You can now view the booking details and communicate with your caregiver.
        </DialogDescription>

        {/* Fee Paid Highlight */}
        <div className="font-rubik font-bold text-[16px] text-[#121111] my-1 mb-6">
          Instant Request Fee Paid: $10.00
        </div>

        {/* Buttons Row */}
        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={handleMessage}
            className="flex-1 h-[48px] bg-[#FFF0E8] hover:bg-[#FFE5D8] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[14px] transition cursor-pointer border-none flex items-center justify-center"
          >
            Message Caregiver
          </button>
          <button
            type="button"
            onClick={handleView}
            className="flex-1 h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[15px] rounded-[14px] transition cursor-pointer border-none shadow-xs flex items-center justify-center"
          >
            View Job
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
