'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Compass,
  ArrowRight,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface InstantJobItem {
  id: string;
  posterName: string;
  posterAvatar: string;
  location: string;
  distance: string;
  title: string;
  description: string;
}

const MOCK_INSTANT_JOBS: InstantJobItem[] = [
  {
    id: '1',
    posterName: 'Nandi Bolard',
    posterAvatar: '/images/avatar.webp',
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    title: 'I need house cleaning service.',
    description:
      "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.",
  },
  {
    id: '2',
    posterName: 'Nandi Bolard',
    posterAvatar: '/images/avatar.webp',
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    title: 'I need house cleaning service.',
    description:
      "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.",
  },
  {
    id: '3',
    posterName: 'Nandi Bolard',
    posterAvatar: '/images/avatar.webp',
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    title: 'I need house cleaning service.',
    description:
      "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.",
  },
];

export default function InstantJobsDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSendProposal = (jobId: string) => {

    router.push(`/find-care`);
  };

  return (
    <div className="w-full flex justify-end mt-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        {/* Card Trigger (Matches Screenshot 1 - Placed below Switch Card) */}
        <PopoverTrigger>
          <div
            className="w-[500px] bg-white rounded-[16px] p-3.5 sm:p-8 border border-[#FF3B30] shadow-[0px_0px_25px_rgba(255,59,48,0.35)] flex items-center justify-between gap-3 cursor-pointer hover:scale-[1.01] transition-transform select-none"
          >
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-rubik font-semibold text-[15px] sm:text-[24px] leading-[20px] text-[#FF0004]">
                  New Instant Jobs
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF0004] shrink-0 animate-pulse" />
              </div>
              <span className="font-rubik font-light text-[11px] sm:text-[14px] mt-1 leading-[15px] text-[#565656] mt-0.5">
                Review nearby requests and respond in real time.
              </span>
            </div>

            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              {isOpen ? (
                <ChevronDown className="w-5 h-5 text-[#F36922]" />
              ) : (
                <ChevronUp className="w-5 h-5 text-[#F36922]" />
              )}
            </div>
          </div>
        </PopoverTrigger>

        {/* Expanded Dropdown Content (Matches Screenshot 2) */}
        <PopoverContent
          side="top"
          align="end"
          sideOffset={12}
          className="w-[340px] sm:w-[370px] bg-white rounded-[24px] p-4 sm:p-5 shadow-[0px_10px_50px_rgba(0,0,0,0.18)] border border-neutral-100 flex flex-col gap-3.5 max-h-[560px] overflow-hidden z-50"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between w-full pb-1">
            <div className="flex items-center gap-1.5">
              <h2 className="font-rubik font-bold text-[22px] sm:text-[24px] leading-[28px] text-[#121111]">
                New Instant Jobs
              </h2>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E02424] shrink-0" />
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 flex items-center justify-center text-[#F36922] hover:opacity-80 transition cursor-pointer border-none bg-transparent"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Job List */}
          <div className="flex flex-col gap-3 overflow-y-auto pr-1 max-h-[480px] scrollbar-thin">
            {MOCK_INSTANT_JOBS.map((job, idx) => (
              <div
                key={`${job.id}-${idx}`}
                className="w-full bg-[#F8F9FF] border border-[#EFEFEF] rounded-[16px] p-3.5 flex flex-col gap-2.5 shadow-xs"
              >
                {/* Profile Header */}
                <div className="flex items-center gap-3">
                  <div className="w-[54px] h-[54px] rounded-[14px] overflow-hidden relative shrink-0 bg-neutral-100 border border-neutral-200">
                    <Image
                      src={job.posterAvatar}
                      alt={job.posterName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-rubik font-semibold text-[14px] leading-[18px] text-[#121111]">
                      {job.posterName}
                    </span>
                    <div className="flex items-center gap-1 text-[11.5px] text-[#565656] font-medium font-rubik">
                      <MapPin className="w-3 h-3 text-[#565656] shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11.5px] text-[#565656] font-medium font-rubik">
                      <Compass className="w-3 h-3 text-[#565656] shrink-0" />
                      <span>{job.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Job Title & Description */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-rubik font-semibold text-[13.5px] leading-[17px] text-[#121111]">
                    {job.title}
                  </h3>
                  <p className="font-rubik font-normal text-[12px] leading-[16px] text-[#565656] line-clamp-3">
                    {job.description}
                  </p>
                </div>

                {/* Send Proposal CTA */}
                <button
                  type="button"
                  onClick={() => handleSendProposal(job.id)}
                  className="w-full h-[36px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[10px] font-rubik font-medium text-[13px] transition cursor-pointer border-none shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Send Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
