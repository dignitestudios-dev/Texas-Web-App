'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export const IdentityVerification = () => {
  const router = useRouter();

  const handleVerify = () => {
    // Redirect to home page
    router.replace('/');
  };

  const handleSkip = () => {
    // Continue without verification - Redirect to home page
    router.replace('/');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[820px] mx-auto py-10 px-4">
      {/* 2-Card Choice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
        
        {/* Card 1: Verify your identification */}
        <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_30px_rgba(0,0,0,0.06)] border border-[#EFEFEF] flex flex-col items-center text-center justify-between min-h-[380px] hover:shadow-[0px_10px_40px_rgba(0,0,0,0.09)] transition-shadow">
          {/* Top Icon & Text Container */}
          <div className="flex flex-col items-center">
            {/* Green Shield Icon */}
            <div className="w-[54px] h-[54px] flex items-center justify-center mb-4">
              <svg width="44" height="50" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L3 5V12C3 18.25 6.84 24.08 12 25.5C17.16 24.08 21 18.25 21 12V5L12 1Z" fill="#0E7048" />
                <path d="M8.5 12.5L11 15L15.5 10.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="font-rubik font-semibold text-[20px] leading-[26px] text-[#121111] mb-2.5">
              Verify your identification
            </h2>

            {/* Subtitle */}
            <p className="font-rubik font-normal text-[13px] leading-[20px] text-[#565656] max-w-[280px]">
              Verify your identity using Veriff to get your account verified. This helps build trust and ensures a safer experience for everyone.
            </p>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleVerify}
            className="w-full h-[48px] bg-[#0A0A6E] hover:bg-[#080856] active:scale-[0.99] text-white font-rubik font-medium text-[15px] rounded-[12px] transition cursor-pointer border-none shadow-sm flex items-center justify-center mt-6"
          >
            Verify Now
          </button>
        </div>

        {/* Card 2: Continue without Verification */}
        <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_30px_rgba(0,0,0,0.06)] border border-[#EFEFEF] flex flex-col items-center text-center justify-between min-h-[380px] hover:shadow-[0px_10px_40px_rgba(0,0,0,0.09)] transition-shadow">
          {/* Top Icon & Text Container */}
          <div className="flex flex-col items-center">
            {/* Red Shield Icon */}
            <div className="w-[54px] h-[54px] flex items-center justify-center mb-4">
              <svg width="44" height="50" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L3 5V12C3 18.25 6.84 24.08 12 25.5C17.16 24.08 21 18.25 21 12V5L12 1Z" fill="#C5221F" />
                <path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="font-rubik font-semibold text-[20px] leading-[26px] text-[#121111] mb-2.5">
              Continue without Verification
            </h2>

            {/* Subtitle */}
            <p className="font-rubik font-normal text-[13px] leading-[20px] text-[#565656] max-w-[280px]">
              Without verification, you will have limited access to features and some actions on the website will be unavailable.
            </p>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleSkip}
            className="w-full h-[48px] bg-[#F2F6FF] hover:bg-[#E5EEFF] active:scale-[0.99] text-[#121111] font-rubik font-medium text-[15px] rounded-[12px] transition cursor-pointer border-none shadow-xs flex items-center justify-center mt-6"
          >
            Continue without Verification
          </button>
        </div>

      </div>
    </div>
  );
};
