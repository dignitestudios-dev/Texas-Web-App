'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface AuthGuardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  loginRedirect?: string;
  signupRedirect?: string;
}

export function AuthGuardDialog({
  isOpen,
  onClose,
  title = 'Sign Up To Continue!',
  description = "You're currently browsing as a guest. Please sign up or log in to continue with this action.",
  loginRedirect = '/login',
  signupRedirect = '/role',
}: AuthGuardDialogProps) {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push(loginRedirect);
  };

  const handleSignUp = () => {
    onClose();
    router.push(signupRedirect);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="w-[400px] max-w-[92vw] bg-white rounded-[24px] p-6 sm:p-8 flex flex-col items-center text-center shadow-xl border border-[#EFEFEF] outline-none select-none"
      >
        {/* Top Warning/Info Droplet Icon */}
        <div className="w-[52px] h-[48px] relative flex items-center justify-center mb-1">
          <svg
            width="52"
            height="48"
            viewBox="0 0 52 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Orange rounded soft triangle/droplet */}
            <path
              d="M21.7582 5.0442C23.6366 1.70498 28.3634 1.70499 30.2418 5.04421L49.1916 38.7327C51.0427 42.0235 48.6534 46.125 44.9498 46.125H7.05021C3.34661 46.125 0.957279 42.0235 2.80838 38.7327L21.7582 5.0442Z"
              fill="#F36922"
            />
            {/* White info 'i' icon */}
            <circle cx="26" cy="19" r="2.5" fill="white" />
            <path
              d="M24.75 25.5C24.75 24.9477 25.1977 24.5 25.75 24.5H26.25C26.8023 24.5 27.25 24.9477 27.25 25.5V35.5C27.25 36.0523 26.8023 36.5 26.25 36.5H25.75C25.1977 36.5 24.75 36.0523 24.75 35.5V25.5Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Title */}
        <DialogTitle className="font-rubik font-bold text-[22px] sm:text-[24px] leading-[28px] text-[#121111] mt-2">
          {title}
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="font-rubik font-normal text-[14px] leading-[21px] text-[#565656] max-w-[300px] mt-2 mb-6 text-center">
          {description}
        </DialogDescription>

        {/* Buttons Row: Log In & Sign Up */}
        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={handleLogin}
            className="flex-1 h-[48px] bg-[#FFF0E8] hover:bg-[#FFE5D8] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none flex items-center justify-center"
          >
            Log In
          </button>

          <button
            type="button"
            onClick={handleSignUp}
            className="flex-1 h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none shadow-xs flex items-center justify-center"
          >
            Sign Up
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
