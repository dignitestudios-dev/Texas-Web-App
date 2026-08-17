'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface JobDialogsProps {
  showCancelJobModal: boolean;
  setShowCancelJobModal: (show: boolean) => void;
  showAssignModal: boolean;
  setShowAssignModal: (show: boolean) => void;
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
  onCancelJobConfirm: () => void;
  onAssignConfirm: () => void;
  onSuccessClose: () => void;
}

export default function JobDialogs({
  showCancelJobModal,
  setShowCancelJobModal,
  showAssignModal,
  setShowAssignModal,
  showSuccessModal,
  setShowSuccessModal,
  onCancelJobConfirm,
  onAssignConfirm,
  onSuccessClose,
}: JobDialogsProps) {
  return (
    <>
      {/* Cancel Job Confirmation */}
      <Dialog open={showCancelJobModal} onOpenChange={setShowCancelJobModal}>
        <DialogContent showCloseButton={false} className="w-[370px] h-[251px] p-6 flex flex-col items-center justify-between bg-white border border-neutral-100 rounded-[16px] shadow-lg select-none">
          {/* Info Icon in Orange */}
          <div className="w-[42px] h-[42px] bg-transparent flex items-center justify-center shrink-0">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 4L37 32C38 33.7 37 36 35 36H7C5 36 4 33.7 5 32L21 4Z" fill="#F36922" />
              <circle cx="21" cy="18" r="2.5" fill="white" />
              <path d="M21 22V29" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="flex flex-col items-center gap-[8px] text-center">
            <h3 className="font-sans font-semibold text-[23.1px] leading-[31px] text-[#181818] capitalize">
              Cancel Job
            </h3>
            <p className="font-poppins font-normal text-[16px] leading-[24px] text-[#565656]">
              Are you sure you want to cancel this job?
            </p>
          </div>

          <div className="flex gap-[8px] w-full mt-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowCancelJobModal(false)}
              className="flex-1 h-[44px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] font-sans font-medium text-[15px] capitalize transition cursor-pointer border-none flex items-center justify-center outline-none"
            >
              Keep
            </button>
            <button
              type="button"
              onClick={onCancelJobConfirm}
              className="flex-1 h-[44px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] rounded-[12px] font-sans font-medium text-[15px] capitalize transition cursor-pointer border-none flex items-center justify-center outline-none"
            >
              Cancel Job
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Caregiver Confirmation */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent showCloseButton={false} className="w-[370px] h-[251px] p-6 flex flex-col items-center justify-between bg-white border border-neutral-100 rounded-[16px] shadow-lg select-none">
          <div className="w-[42px] h-[42px] bg-[#F36922] rounded-[10px] flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 16L21 12M21 12L17 8M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="flex flex-col items-center gap-[8px] text-center">
            <h3 className="font-sans font-semibold text-[23.1px] leading-[31px] text-[#181818] capitalize">
              Assign This Caregiver?
            </h3>
            <p className="font-poppins font-normal text-[16px] leading-[24px] text-[#565656]">
              Are you sure you want to Assign Job?
            </p>
          </div>

          <div className="flex gap-[8px] w-full mt-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowAssignModal(false)}
              className="flex-1 h-[44px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] rounded-[12px] font-sans font-medium text-[15px] capitalize transition cursor-pointer border-none flex items-center justify-center outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onAssignConfirm}
              className="flex-1 h-[44px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] font-poppins font-semibold text-[12px] uppercase tracking-wider transition cursor-pointer border-none flex items-center justify-center outline-none"
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent showCloseButton={false} className="w-[370px] h-[251px] p-6 flex flex-col items-center justify-between bg-white border border-neutral-100 rounded-[16px] shadow-lg select-none">
          <div className="w-[42px] h-[42px] bg-[#F36922] rounded-[10px] flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="flex flex-col items-center gap-[8px] text-center">
            <h3 className="font-sans font-semibold text-[23px] leading-[31px] text-[#181818]">
              Instant Job Created!
            </h3>
            <p className="font-poppins font-normal text-[16px] leading-[24px] text-[#565656]">
              Your job has been created successfully.
            </p>
          </div>

          <button
            type="button"
            onClick={onSuccessClose}
            className="w-full h-[44px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] font-poppins font-semibold text-[14px] transition cursor-pointer border-none flex items-center justify-center outline-none shrink-0"
          >
            Back to Home
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
