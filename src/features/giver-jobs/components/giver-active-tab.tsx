'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  DollarSign,
  Star,
  CheckCircle2,
  Navigation,
} from 'lucide-react';

export type GiverJobSubTab = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

interface GiverActiveTabProps {
  activeSubTab: GiverJobSubTab;
  onSubTabChange: (tab: GiverJobSubTab) => void;
  onSelectJob?: (jobId: string) => void;
}

interface JobPostItem {
  id: string;
  title: string;
  subtitle: string;
  badges: { text: string; isDark?: boolean }[];
  price: string;
  isCompleted?: boolean;
  caregiverName: string;
  caregiverAvatar: string;
  rating: number;
  reviewsCount: number;
  servicesCount: number;
}

const JOBS_DATA: Record<GiverJobSubTab, JobPostItem[]> = {
  upcoming: [
    {
      id: 'job-1',
      title: 'I need house cleaning service.',
      subtitle: 'Upcoming in 2 days',
      badges: [{ text: 'House Cleaning' }, { text: 'NEW' }],
      price: '$14',
      caregiverName: 'Nandi Bolard',
      caregiverAvatar: '/images/avatar.webp',
      rating: 5.0,
      reviewsCount: 48,
      servicesCount: 98,
    },
    {
      id: 'job-2',
      title: 'I need house cleaning service.',
      subtitle: 'Upcoming in 2 days',
      badges: [{ text: 'Instant Job', isDark: true }],
      price: '$14',
      caregiverName: 'Nandi Bolard',
      caregiverAvatar: '/images/avatar.webp',
      rating: 5.0,
      reviewsCount: 48,
      servicesCount: 98,
    },
    {
      id: 'job-3',
      title: 'Seeking a personal chef.',
      subtitle: 'Upcoming in 3 days',
      badges: [{ text: 'House Cleaning' }, { text: 'NEW' }],
      price: '$25',
      caregiverName: 'Sophia Chang',
      caregiverAvatar: '/images/giver.webp',
      rating: 4.9,
      reviewsCount: 22,
      servicesCount: 50,
    },
    {
      id: 'job-4',
      title: 'Looking for a dog walker.',
      subtitle: 'Scheduled for next week',
      badges: [{ text: 'House Cleaning' }, { text: 'NEW' }],
      price: '$12',
      caregiverName: 'Liam Johnson',
      caregiverAvatar: '/images/avatar.webp',
      rating: 4.8,
      reviewsCount: 32,
      servicesCount: 75,
    },
  ],
  ongoing: [
    {
      id: 'job-5',
      title: 'I need house cleaning service.',
      subtitle: 'Ongoing - Day 1',
      badges: [{ text: 'House Cleaning' }, { text: 'In Progress', isDark: true }],
      price: '$14',
      caregiverName: 'Nandi Bolard',
      caregiverAvatar: '/images/avatar.webp',
      rating: 5.0,
      reviewsCount: 48,
      servicesCount: 98,
    },
  ],
  completed: [
    {
      id: 'job-6',
      title: 'I need yard maintenance service.',
      subtitle: 'Completed on 15 Jan 2026',
      badges: [{ text: 'House Cleaning' }, { text: 'NEW' }],
      price: '$150',
      isCompleted: true,
      caregiverName: 'Renee Packer',
      caregiverAvatar: '/images/avatar.webp',
      rating: 4.8,
      reviewsCount: 32,
      servicesCount: 75,
    },
    {
      id: 'job-7',
      title: 'Deep House Cleaning.',
      subtitle: 'Completed on 10 Aug 2026',
      badges: [{ text: 'House Cleaning' }],
      price: '$200',
      isCompleted: true,
      caregiverName: 'Sophia Chang',
      caregiverAvatar: '/images/giver.webp',
      rating: 5.0,
      reviewsCount: 50,
      servicesCount: 98,
    },
  ],
  cancelled: [
    {
      id: 'job-8',
      title: 'Pet Sitting Service.',
      subtitle: 'Cancelled',
      badges: [{ text: 'Pet Care' }],
      price: '$15',
      caregiverName: 'Liam Johnson',
      caregiverAvatar: '/images/avatar.webp',
      rating: 4.8,
      reviewsCount: 32,
      servicesCount: 75,
    },
  ],
};

export function GiverActiveTab({
  activeSubTab,
  onSubTabChange,
  onSelectJob,
}: GiverActiveTabProps) {
  const router = useRouter();
  const currentJobs = JOBS_DATA[activeSubTab] || JOBS_DATA.upcoming;

  const getSubTabHeading = () => {
    switch (activeSubTab) {
      case 'upcoming':
        return 'Upcoming Jobs';
      case 'ongoing':
        return 'Ongoing Jobs';
      case 'completed':
        return 'Completed Jobs';
      case 'cancelled':
        return 'Cancelled Jobs';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full items-start">
      {/* Top Sub-tabs Pill Selector Row */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => onSubTabChange('upcoming')}
          className={`h-[42px] px-6 rounded-[32px] font-rubik font-medium text-[15px] transition cursor-pointer border-none outline-none ${
            activeSubTab === 'upcoming'
              ? 'bg-[#0A0A6E] text-white shadow-xs'
              : 'bg-[#F8F9FF] text-[#121111] hover:bg-[#EEF0F8]'
          }`}
        >
          Upcoming
        </button>
        <button
          type="button"
          onClick={() => onSubTabChange('ongoing')}
          className={`h-[42px] px-6 rounded-[32px] font-rubik font-medium text-[15px] transition cursor-pointer border-none outline-none ${
            activeSubTab === 'ongoing'
              ? 'bg-[#0A0A6E] text-white shadow-xs'
              : 'bg-[#F8F9FF] text-[#121111] hover:bg-[#EEF0F8]'
          }`}
        >
          Ongoing
        </button>
        <button
          type="button"
          onClick={() => onSubTabChange('completed')}
          className={`h-[42px] px-6 rounded-[32px] font-rubik font-medium text-[15px] transition cursor-pointer border-none outline-none ${
            activeSubTab === 'completed'
              ? 'bg-[#0A0A6E] text-white shadow-xs'
              : 'bg-[#F8F9FF] text-[#121111] hover:bg-[#EEF0F8]'
          }`}
        >
          Completed
        </button>
        <button
          type="button"
          onClick={() => onSubTabChange('cancelled')}
          className={`h-[42px] px-6 rounded-[32px] font-rubik font-medium text-[15px] transition cursor-pointer border-none outline-none ${
            activeSubTab === 'cancelled'
              ? 'bg-[#0A0A6E] text-white shadow-xs'
              : 'bg-[#F8F9FF] text-[#121111] hover:bg-[#EEF0F8]'
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Section Heading */}
      <h2 className="font-rubik font-medium text-[24px] leading-[28px] tracking-[-0.005em] text-[#121111]">
        {getSubTabHeading()}
      </h2>

      {/* Jobs List Container */}
      <div className="w-full flex flex-col gap-[15px]">
        {currentJobs.map((job) => {
          const isCompletedCard = activeSubTab === 'completed' || job.isCompleted;

          return (
            <div
              key={job.id}
              className="w-full bg-white border border-[#EFEFEF] rounded-[12px] p-5 flex flex-col gap-4 shadow-xs"
            >
              {/* Top Row: Title, Subtitle, Badges & Price Tag */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-[#EFEFEF]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                      {job.title}
                    </h3>
                    {job.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className={`h-[28px] px-3 rounded-[8px] font-inter font-medium text-[12px] flex items-center justify-center ${
                          badge.isDark
                            ? 'bg-[#0A0A6E] text-white'
                            : 'bg-[#FEF0E9] border border-[#EFEFEF] text-[#121111]'
                        }`}
                      >
                        {badge.text}
                      </span>
                    ))}
                  </div>
                  <span className="font-rubik font-normal text-[13px] leading-[15px] tracking-[-0.005em] text-[#121111]">
                    {job.subtitle}
                  </span>
                  {!isCompletedCard && (
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectJob) {
                          onSelectJob(job.id);
                        } else {
                          router.push(`/my-jobs/${job.id}`);
                        }
                      }}
                      className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] underline hover:text-[#F36922] transition text-left cursor-pointer border-none bg-transparent p-0 w-fit"
                    >
                      View Job
                    </button>
                  )}
                </div>

                {/* Price Container */}
                <div className="h-[48px] px-4 bg-[#FEF0E9] rounded-[8px] flex items-center justify-center gap-1.5 shrink-0">
                  <DollarSign className="w-5 h-5 text-[#121111]" />
                  <span className="font-rubik font-bold text-[24px] leading-[28px] tracking-[-0.005em] text-[#121111]">
                    {job.price.replace('$', '')}
                  </span>
                  {!isCompletedCard && (
                    <span className="font-rubik font-normal text-[14px] text-[#121111]">
                      /Hr
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Row: Caregiver Profile & Optional Map Location Link */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                {/* Caregiver Info */}
                <div className="flex items-center gap-3">
                  <div className="w-[43px] h-[43px] rounded-full relative overflow-hidden bg-neutral-100 shrink-0">
                    <Image
                      src={job.caregiverAvatar}
                      alt={job.caregiverName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-rubik font-medium text-[16px] text-[#121111]">
                        {job.caregiverName}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-[#4253F0] fill-[#4253F0] text-white" />
                    </div>
                    <div className="flex items-center gap-2 font-rubik text-[14px] text-[#121111]">
                      <span className="flex items-center gap-1 border-r border-[#121111] pr-2">
                        <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                        <span className="font-light">{job.rating.toFixed(1)} ({job.reviewsCount})</span>
                      </span>
                      <span className="font-light">{job.servicesCount} Services</span>
                    </div>
                  </div>
                </div>

                {/* View Location Link (Only for non-completed jobs) */}
                {!isCompletedCard && (
                  <button
                    type="button"
                    onClick={() => router.push('/freelance-jobs')}
                    className="h-[28px] px-2.5 bg-[#F8F9FF] rounded-[8px] font-rubik font-normal text-[15px] text-[#0A0A6E] underline flex items-center gap-1.5 hover:opacity-80 transition cursor-pointer border-none"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#0A0A6E]" />
                    <span>View Location on Map</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
