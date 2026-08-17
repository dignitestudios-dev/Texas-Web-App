'use client';

import React from 'react';
import Image from 'next/image';

export interface Proposal {
  name: string;
  avatar: string;
  price: string;
  description: string;
  time: string;
  progress: number;
  hasBadge?: boolean;
  message: string;
}

interface ProposalSectionProps {
  jobCreated: boolean;
  isSubmitting: boolean;
  proposalsCount: number;
  selectedCaregiver: Proposal | null;
  setSelectedCaregiver: (caregiver: Proposal | null) => void;
  setShowAssignModal: (show: boolean) => void;
  proposalsData: Proposal[];
}

export default function ProposalSection({
  jobCreated,
  isSubmitting,
  proposalsCount,
  selectedCaregiver,
  setSelectedCaregiver,
  setShowAssignModal,
  proposalsData,
}: ProposalSectionProps) {
  return (
    <div className={`w-full h-[373px] border-[3px] border-white rounded-[24px] p-[16px_24px] flex flex-col shadow-sm shrink-0 transition-colors duration-300 ${
      jobCreated ? 'bg-[#FEF0E9]' : 'bg-[#F1F5F9]'
    }`}>
      {selectedCaregiver ? (
        /* Caregiver Detail View */
        <div className="flex-grow flex flex-col justify-between h-full">
          {/* Header Row */}
          <div className="flex justify-between items-center w-full pb-2 shrink-0">
            <div className="flex items-center gap-[8px]">
              <button
                type="button"
                onClick={() => setSelectedCaregiver(null)}
                className="text-[#F36922] hover:scale-110 transition cursor-pointer border-none bg-transparent outline-none flex items-center justify-center"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19L8 12L15 5" stroke="#F36922" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-neutral-200 shrink-0">
                <Image src={selectedCaregiver.avatar} alt={selectedCaregiver.name} width={40} height={40} className="object-cover w-full h-full" unoptimized />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-medium text-[14px] leading-[20px] text-black">{selectedCaregiver.name}</span>
                <div className="flex items-center gap-[4px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
                  <span className="font-sans text-[13px] leading-[18px] text-neutral-500">Online</span>
                </div>
              </div>
            </div>
            <span className="font-sans font-semibold text-[24px] leading-[32px] text-black">
              {selectedCaregiver.price}
            </span>
          </div>

          {/* Message Bubble Container */}
          <div className="flex-1 flex flex-col justify-between pt-1 overflow-hidden">
            <div className="flex flex-col gap-[2px] overflow-y-auto max-h-[190px] pr-1">
              <div className="bg-white rounded-[15px] p-[12px_16px] flex flex-col gap-2 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] select-text relative">
                <strong className="font-sans font-semibold text-[14px] leading-[19px] text-black">Hello,</strong>
                <p className="font-sans font-normal text-[14px] leading-[19px] text-black">
                  {selectedCaregiver.message}
                </p>
              </div>
              <span className="text-[14px] font-sans font-medium text-[#8A8A8A] text-right block w-full mt-1">
                2:32 PM
              </span>
            </div>

            {/* Assign Job Button */}
            <button
              type="button"
              onClick={() => setShowAssignModal(true)}
              className="w-full h-[40px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] flex items-center justify-center font-sans font-medium text-[14px] capitalize transition duration-200 outline-none cursor-pointer border-none shadow-sm mt-2 shrink-0"
            >
              Assign Job
            </button>
          </div>
        </div>
      ) : (
        /* Proposals list or searching / no-job state */
        <div className="flex-grow flex flex-col gap-[20px] h-full overflow-hidden">
          <div className="flex justify-between items-start w-full shrink-0">
            <span className="font-sans font-medium text-[24px] leading-[32px] text-[#181818] capitalize">Proposals</span>
            <span className="font-sans font-medium text-[24px] leading-[32px] text-[#181818]">
              {proposalsCount < 10 ? `0${proposalsCount}` : proposalsCount}
            </span>
          </div>

          {isSubmitting ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-[24px]">
              <div className="relative w-[50px] h-[50px]">
                <div className="absolute inset-0 rounded-full border-4 border-[#F36922]/20 border-t-[#F36922] animate-spin" />
              </div>
              <span className="font-sans font-normal text-[14px] leading-[24px] tracking-[-0.24px] text-center text-[#181818]">
                Submitting your request...
              </span>
            </div>
          ) : jobCreated && proposalsCount === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-[24px]">
              <div className="relative w-[40px] h-[40px] flex items-center justify-center">
                <div className="absolute w-[40px] h-[40px] rounded-full bg-[#FEF0E9] animate-ping opacity-75" />
                <div className="relative w-[40px] h-[40px] rounded-full bg-[#FEF0E9] flex items-center justify-center">
                  <Image src="/images/timer.webp" alt="timer" width={40} height={40} className="object-contain" unoptimized />
                </div>
              </div>
              <span className="font-sans font-normal text-[14px] leading-[24px] tracking-[-0.24px] text-center text-black">
                Finding nearby caregivers for your request. Please hold on while we connect you with available professionals.
              </span>
            </div>
          ) : jobCreated && proposalsCount > 0 ? (
            <div className="flex-grow overflow-y-auto flex flex-col gap-5 pr-1">
              {proposalsData.map((proposal, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCaregiver(proposal)}
                  className="w-full flex flex-col gap-2 cursor-pointer hover:bg-black/5 p-1 rounded-xl transition"
                >
                  {/* Progress Bar */}
                  <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex-1 h-[2px] bg-[#0A0A6E]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F36922] rounded-full transition-all duration-[2000ms]" style={{ width: `${proposal.progress}%` }} />
                    </div>
                    <span className="text-[12px] font-rubik text-neutral-400">{proposal.time}</span>
                  </div>
                  {/* Info Row */}
                  <div className="w-full flex items-center justify-between gap-3">
                    {/* Avatar & Text */}
                    <div className="flex items-center gap-3">
                      <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0 border border-neutral-200">
                        <Image src={proposal.avatar} alt={proposal.name} width={40} height={40} className="object-cover w-full h-full" unoptimized />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-rubik font-semibold text-[15px] leading-[18px] text-[#121111]">{proposal.name}</span>
                        <span className="font-rubik font-light text-[12px] leading-[15px] text-neutral-500 line-clamp-1">{proposal.description}</span>
                      </div>
                    </div>
                    {/* Price & Badge */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="font-rubik font-semibold text-[15px] leading-[18px] text-[#121111]">{proposal.price}</span>
                      {proposal.hasBadge ? (
                        <div className="w-[18px] h-[18px] rounded-full bg-[#F36922] flex items-center justify-center text-white font-rubik text-[10px] font-bold">
                          1
                        </div>
                      ) : (
                        <div className="w-[18px] h-[18px] opacity-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center gap-[24px]">
              <div className="w-[40px] h-[40px] rounded-full bg-neutral-200 flex items-center justify-center">
                <Image src="/images/timer.webp" alt="timer" width={40} height={40} className="object-contain" unoptimized />
              </div>
              <span className="font-sans font-normal text-[14px] leading-[24px] tracking-[-0.24px] text-center text-neutral-500">
                No Job Created
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
