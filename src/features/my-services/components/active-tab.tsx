'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Info, Star, Clock, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { ActiveJobItem, ActiveJobsSubTab } from '../types/my-services.types';

const MOCK_ACTIVE_JOBS: ActiveJobItem[] = [
  {
    id: 'act-1',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    priceRange: '$35-$50',
    budgetRange: '$200 - $300',
    description:
      "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
    time: '12:00 PM',
    date: '12 Dec 23',
    location: 'San Juan, Texas',
    distance: '14 miles away',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
    type: 'upcoming',
  },
  {
    id: 'act-2',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    priceRange: '$35-$50',
    budgetRange: '$200 - $300',
    description:
      "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
    time: '12:00 PM',
    date: '12 Dec 23',
    location: 'San Juan, Texas',
    distance: '14 miles away',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
    type: 'ongoing',
  },
  {
    id: 'act-3',
    category: 'Elderly Care',
    priceRange: '$50',
    description:
      "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
    time: '12:00 PM',
    date: '12 Dec 23',
    location: 'San Juan, Texas',
    distance: '14 miles away',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
    type: 'ongoing',
  },
];

interface ActiveTabProps {
  subTab: ActiveJobsSubTab;
  onSubTabChange: (subTab: ActiveJobsSubTab) => void;
  searchQuery?: string;
}

export function ActiveTab({
  subTab,
  onSubTabChange,
  searchQuery = '',
}: ActiveTabProps) {
  const router = useRouter();
  const [activeJobs, setActiveJobs] = useState<ActiveJobItem[]>(MOCK_ACTIVE_JOBS);

  const handleCancelJob = (id: string) => {
    setActiveJobs((prev) => prev.filter((j) => j.id !== id));
    toast.info('Job booking cancelled.');
  };

  const filteredActiveJobs = activeJobs
    .filter((j) => j.type === subTab)
    .filter((j) =>
      (j.title || j.category).toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Info Banner */}
      <div className="flex items-center gap-2 font-rubik font-semibold text-[15px] leading-[20px] text-[#121111]">
        <Info className="w-4 h-4 text-[#121111] shrink-0" />
        <span>View and manage your current care services.</span>
      </div>

      {/* Sub-Tab Switcher (Upcoming / Ongoing) */}
      <div className="flex items-center gap-3.5 mt-1">
        <button
          type="button"
          onClick={() => onSubTabChange('upcoming')}
          className={`h-[48px] px-8 rounded-full font-rubik font-medium text-[16px] transition cursor-pointer border-none shadow-xs ${
            subTab === 'upcoming'
              ? 'bg-[#0A0A6E] text-white shadow-sm'
              : 'bg-white text-[#121111] hover:bg-[#F8F9FF]'
          }`}
        >
          Upcoming
        </button>
        <button
          type="button"
          onClick={() => onSubTabChange('ongoing')}
          className={`h-[48px] px-8 rounded-full font-rubik font-medium text-[16px] transition cursor-pointer border-none shadow-xs ${
            subTab === 'ongoing'
              ? 'bg-[#0A0A6E] text-white shadow-sm'
              : 'bg-white text-[#121111] hover:bg-[#F8F9FF]'
          }`}
        >
          Ongoing
        </button>
      </div>

      {/* Active Jobs Cards List */}
      <div className="flex flex-col gap-4 w-full mt-2">
        {filteredActiveJobs.length > 0 ? (
          filteredActiveJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-[20px] p-6 shadow-sm border border-[#EFEFEF] flex flex-col gap-3.5 w-full hover:shadow-md transition-shadow"
            >
              {/* Header Row: Title/Category & Price Badge */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  {job.title ? (
                    <>
                      <h4
                        onClick={() => router.push(`/my-jobs/${job.id}?status=${job.type || subTab}`)}
                        className="font-rubik font-bold text-[16px] text-[#121111] hover:text-[#F36922] transition cursor-pointer"
                      >
                        {job.title}
                      </h4>
                      <span className="font-rubik text-[13px] text-[#565656]">
                        {job.category}
                      </span>
                    </>
                  ) : (
                    <h4
                      onClick={() => router.push(`/my-jobs/${job.id}?status=${job.type || subTab}`)}
                      className="font-rubik font-bold text-[16px] text-[#121111] hover:text-[#F36922] transition cursor-pointer"
                    >
                      {job.category}
                    </h4>
                  )}
                </div>

                <div className="bg-[#F8F9FF] border border-[#EFEFEF] rounded-[8px] px-3 py-1 font-rubik font-bold text-[16px] text-[#121111] shrink-0">
                  {job.priceRange}
                </div>
              </div>

              {/* Description */}
              <p className="font-rubik font-normal text-[13px] leading-[20px] text-[#565656]">
                {job.description}
              </p>

              {/* Metadata Details Row */}
              <div className="flex flex-wrap items-center gap-4 text-[13px] font-rubik text-[#565656]">
                {job.budgetRange && (
                  <span className="font-rubik font-medium text-[#121111]">
                    {job.budgetRange}
                  </span>
                )}
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#727272]" />
                  <span>{job.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#727272]" />
                  <span>{job.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#727272]" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#727272]" />
                  <span>{job.distance}</span>
                </div>
              </div>

              {/* Caregiver Profile Row */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-full relative overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                  <Image
                    src={job.seekerAvatar}
                    alt={job.seekerName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-rubik font-semibold text-[14px] text-[#121111]">
                    {job.seekerName}
                  </span>
                  <div className="flex items-center gap-1.5 font-rubik text-[12px] text-[#565656]">
                    <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                    <span className="font-medium text-[#121111]">
                      {job.seekerRating.toFixed(1)} ({job.seekerReviews})
                    </span>
                    <span>| {job.seekerServices} Services</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-[#F4F4F5]">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => router.push('/chat')}
                    className="h-[38px] px-6 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[13px] rounded-full transition cursor-pointer border-none shadow-2xs"
                  >
                    Open chat
                  </button>

                  {job.type === 'upcoming' && (
                    <button
                      type="button"
                      onClick={() => handleCancelJob(job.id)}
                      className="h-[38px] px-5 bg-[#F4F4F5] hover:bg-neutral-200 text-[#121111] font-rubik font-medium text-[13px] rounded-full transition cursor-pointer border-none shadow-2xs"
                    >
                      Cancel Job
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => router.push(`/my-jobs/${job.id}?status=${job.type || subTab}`)}
                  className="h-[38px] px-5 bg-[#0A0A6E] hover:bg-[#080856] text-white font-rubik font-medium text-[13px] rounded-full transition cursor-pointer border-none flex items-center gap-1.5 shadow-2xs"
                >
                  <span>View Job Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-[20px] p-12 text-center text-[#565656] font-rubik text-[14px] border border-[#EFEFEF] shadow-xs">
            No {subTab} jobs found.
          </div>
        )}
      </div>
    </div>
  );
}
