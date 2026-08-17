'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Locate,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { ImageCarouselModal } from './image-carousel-modal';

interface ApplicantJobCard {
  id: string;
  caregiverId: string;
  title: string;
  category: string;
  budget: string;
  description: string;
  payRange: string;
  time: string;
  date: string;
  location: string;
  distance: string;
  applicantsCount: number;
  avatars: string[];
}

const APPLICANTS_JOBS: ApplicantJobCard[] = [
  {
    id: 'app-1',
    caregiverId: 'john-doe',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    budget: '$35-$50',
    description: "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
    payRange: '$200 - $300',
    time: '12:00 PM',
    date: '12 Dec 23',
    location: 'San Juan, Texas',
    distance: '14 miles away',
    applicantsCount: 2,
    avatars: ['/images/avatar.webp', '/images/giver.webp'],
  },
  {
    id: 'app-2',
    caregiverId: 'nandi-bolard',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    budget: '$35-$50',
    description: "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
    payRange: '$200 - $300',
    time: '12:00 PM',
    date: '12 Dec 23',
    location: 'San Juan, Texas',
    distance: '14 miles away',
    applicantsCount: 5,
    avatars: ['/images/avatar.webp', '/images/giver.webp', '/images/home/profile.webp'],
  },
];

export function ApplicantsTab() {
  const router = useRouter();
  const [carouselState, setCarouselState] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
  }>({
    isOpen: false,
    images: [],
    index: 0,
  });

  return (
    <div className="w-full h-full overflow-y-auto pr-2 pb-8 scrollbar-thin flex flex-col gap-[20px]">
      {APPLICANTS_JOBS.map((job) => (
        <div
          key={job.id}
          className="w-full max-w-[1076px] mx-auto bg-white rounded-[12px] shadow-[2px_2px_50px_rgba(0,0,0,0.1)] border border-[#EFEFEF]/86 p-[20px] flex flex-col gap-[16px]"
        >
          {/* Row 1: Title & Budget Tag */}
          <div className="flex flex-row justify-between items-start w-full border-b border-[#EFEFEF]/86 pb-[16px]">
            <div className="flex flex-col gap-[6px]">
              <h3 className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
                {job.title}
              </h3>
              <span className="font-rubik font-normal text-[13px] text-[#121111]/70">
                {job.category}
              </span>
            </div>

            {/* Budget Tag */}
            <div className="h-[48px] px-[20px] bg-[#F1F5F9] rounded-full flex items-center justify-center gap-2 border border-transparent">
              <DollarSign className="w-5 h-5 text-[#121111] shrink-0" />
              <span className="font-rubik font-medium text-[24px] text-[#121111] leading-[28px] tracking-tight">
                {job.budget}
              </span>
            </div>
          </div>

          {/* Row 2: Description */}
          <p className="font-sans font-medium text-[14px] text-[#181818] leading-[19px] text-left">
            {job.description}
          </p>

          {/* Row 3: Meta Info Row */}
          <div className="flex flex-row flex-wrap items-center gap-[24px] text-[#181818] text-[14px] font-medium leading-[19px] border-b border-[#EFEFEF]/86 pb-[16px]">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#181818] shrink-0" />
              <span>{job.payRange}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#181818] shrink-0" />
              <span>{job.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-[#181818] shrink-0" />
              <span>{job.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#181818] shrink-0" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Locate className="w-4 h-4 text-[#181818] shrink-0" />
              <span>{job.distance}</span>
            </div>
          </div>

          {/* Row 4: Overlapping Avatars & View Details CTA */}
          <div className="flex flex-row justify-between items-center w-full">
            {/* Overlapping Avatars & Count */}
            <div className="flex flex-row items-center gap-[12px]">
              <div className="flex flex-row items-center">
                {job.avatars.map((avatar, idx) => (
                  <div
                    key={idx}
                    className={`w-[43px] h-[43px] rounded-full overflow-hidden border-2 border-white shadow-sm relative bg-[#FEF0E9] ${
                      idx > 0 ? '-ml-[16px]' : ''
                    }`}
                  >
                    <Image src={avatar} alt="Applicant" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <span className="font-rubik font-semibold text-[16px] text-[#121111]">
                {job.applicantsCount} Applicants
              </span>
            </div>

            {/* View Details Button */}
            <button
              type="button"
              onClick={() => router.push(`/my-jobs/applications/${job.id}`)}
              className="h-[48px] px-[24px] bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-full flex items-center justify-center gap-2 font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none shadow-sm"
            >
              <span>View Details</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      ))}

      {/* Image Carousel Modal */}
      <ImageCarouselModal
        isOpen={carouselState.isOpen}
        onClose={() => setCarouselState((prev) => ({ ...prev, isOpen: false }))}
        images={carouselState.images}
        initialIndex={carouselState.index}
      />
    </div>
  );
}
