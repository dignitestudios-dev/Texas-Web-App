'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Locate,
  DollarSign,
  ArrowRight,
  Info,
} from 'lucide-react';

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
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    ],
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
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    ],
  },
];

export function ApplicantsTab() {
  const router = useRouter();

  return (
    <div className="w-full h-full overflow-y-auto pr-1 pb-10 scrollbar-thin select-none">
      <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto text-left">
        
        {/* Info Banner Row */}
        <div className="flex items-center gap-2 text-[#121111] font-rubik font-medium text-[14px] sm:text-[15px] leading-[20px]">
          <Info className="w-4 h-4 text-[#121111] shrink-0" />
          <span>See caregivers who have applied to your requests.</span>
        </div>

        {/* List of Job Cards */}
        <div className="flex flex-col gap-6 w-full">
          {APPLICANTS_JOBS.map((job) => (
            <div
              key={job.id}
              className="w-full bg-white rounded-[20px]  border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-4 text-left"
            >
              {/* Title & Budget */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-rubik font-semibold text-[17px] sm:text-[18px] text-[#121111]">
                    {job.title}
                  </h4>
                  <span className="text-[13.5px] font-rubik text-[#565656]">
                    {job.category}
                  </span>
                </div>
                <div className="bg-[#F0F4FA] rounded-full px-3.5 py-1.5 flex items-center gap-1 font-rubik font-bold text-[18px] text-[#121111]">
                  <span className="text-[15px] font-medium text-[#565656]">$</span>
                  <span>{job.budget}</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-rubik font-normal text-[14px] leading-[22px] text-[#565656]">
                {job.description}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#565656] text-[13px] font-rubik">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>{job.payRange}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>{job.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>{job.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Locate className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>{job.distance}</span>
                </div>
              </div>

              {/* Bottom Row: Overlapping Avatars & View Details Button */}
              <div className="flex items-center justify-between w-full border-t border-[#F0F0F0] pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {job.avatars.map((avatar, idx) => (
                      <div
                        key={idx}
                        className="w-[36px] h-[36px] rounded-full overflow-hidden border-2 border-white shadow-xs relative bg-[#F8F9FF] -ml-2.5 first:ml-0"
                      >
                        <Image
                          src={avatar}
                          alt="Applicant"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                  <span className="font-rubik font-semibold text-[15px] sm:text-[16px] text-[#121111]">
                    {job.applicantsCount} Applicants
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => router.push(`/my-jobs/applications/${job.id}`)}
                  className="h-[42px] px-6 bg-[#0A0A6E] hover:bg-[#06064B] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs flex items-center gap-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
