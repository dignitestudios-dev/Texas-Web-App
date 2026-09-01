'use client';

import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Heart, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { saveRole, UserRole } from '@/lib/cookies';

interface GuestRoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
}

export function GuestRoleDialog({
  isOpen,
  onClose,
  onSelectRole,
}: GuestRoleDialogProps) {
  const handleRoleClick = (role: UserRole) => {
    saveRole(role);
    onSelectRole(role);
    window.dispatchEvent(new Event('roleChange'));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="w-[95%] max-w-[480px] p-6 sm:p-8 bg-white rounded-[24px] border border-[#EFEFEF] shadow-2xl flex flex-col items-center gap-6 text-center select-none outline-none"
        showCloseButton={false}
      >
        {/* Brand Icon Badge */}
        <div className="w-[64px] h-[64px] rounded-full bg-[#FFF0E8] flex items-center justify-center relative shadow-xs">
          <div className="w-[48px] h-[48px] rounded-full bg-gradient-to-tr from-[#0A0A6E] to-[#F36922] flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col items-center gap-2">
          <DialogTitle className="font-rubik font-bold text-[22px] sm:text-[24px] text-[#121111] leading-tight">
            You are viewing in Guest Mode
          </DialogTitle>
          <DialogDescription className="font-rubik font-normal text-[14px] sm:text-[15px] leading-[22px] text-[#565656] max-w-[380px]">
            Welcome to Texas Caregiver Alliance! Choose how you would like to explore the platform:
          </DialogDescription>
        </div>

        {/* Two Role Selection Action Cards */}
        <div className="flex flex-col gap-3.5 w-full">
          {/* Card 1: View as Care Seeker */}
          <button
            type="button"
            onClick={() => handleRoleClick('seeker')}
            className="group w-full p-4 rounded-[18px] bg-gradient-to-r from-[#0A0A6E] to-[#121285] hover:to-[#1a1a9e] text-white flex items-center justify-between transition-all duration-200 cursor-pointer border-none shadow-md hover:shadow-lg hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-[44px] h-[44px] rounded-full bg-white/15 flex items-center justify-center text-white shrink-0 group-hover:bg-white/25 transition">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-rubik font-semibold text-[16px] text-white">
                  View as Care Seeker
                </span>
                <span className="font-rubik text-[12.5px] text-white/80 leading-tight">
                  Find trusted caregivers & care services
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0 ml-2" />
          </button>

          {/* Card 2: View as Caregiver */}
          <button
            type="button"
            onClick={() => handleRoleClick('giver')}
            className="group w-full p-4 rounded-[18px] bg-gradient-to-r from-[#F36922] to-[#ff7d3b] hover:to-[#ff8e52] text-white flex items-center justify-between transition-all duration-200 cursor-pointer border-none shadow-md hover:shadow-lg hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-[44px] h-[44px] rounded-full bg-white/15 flex items-center justify-center text-white shrink-0 group-hover:bg-white/25 transition">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-rubik font-semibold text-[16px] text-white">
                  View as Caregiver
                </span>
                <span className="font-rubik text-[12.5px] text-white/80 leading-tight">
                  Offer services, find jobs & manage schedules
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0 ml-2" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
