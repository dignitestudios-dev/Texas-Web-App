'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Info,
  Clock,
  Calendar,
  MapPin,
  Navigation,
  Star,
  ArrowRight,
  BadgeDollarSign,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export type GiverJobSubTab = 'upcoming' | 'ongoing';

interface GiverActiveTabProps {
  activeSubTab?: GiverJobSubTab;
  onSubTabChange?: (tab: GiverJobSubTab) => void;
  onSelectJob?: (jobId: string) => void;
}

export interface ActiveJobItem {
  id: string;
  badge?: string;
  title: string;
  category: string;
  price: string;
  budgetRange?: string;
  description: string;
  time: string;
  date: string;
  location: string;
  distance: string;
  seekerName: string;
  seekerAvatar: string;
  seekerRating: number;
  seekerReviews: number;
  seekerServices: number;
}

const UPCOMING_JOBS: ActiveJobItem[] = [
  {
    id: 'up-1',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    price: '$35-$50',
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
  },
];

const ONGOING_JOBS: ActiveJobItem[] = [
  {
    id: 'on-1',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    price: '$35-$50',
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
  },
  {
    id: 'on-2',
    badge: 'Instant Job',
    title: 'Instant Caregiver Request',
    category: 'Elderly Care',
    price: '$50',
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
  },
];

export function GiverActiveTab({
  activeSubTab: externalSubTab,
  onSubTabChange,
  onSelectJob,
}: GiverActiveTabProps) {
  const router = useRouter();
  const [internalSubTab, setInternalSubTab] = useState<GiverJobSubTab>('upcoming');
  const [cancelModalStep, setCancelModalStep] = useState<number>(0);
  const [targetCancelJobId, setTargetCancelJobId] = useState<string | null>(null);

  const currentTab = externalSubTab || internalSubTab;

  const handleTabChange = (tab: GiverJobSubTab) => {
    if (onSubTabChange) {
      onSubTabChange(tab);
    } else {
      setInternalSubTab(tab);
    }
  };

  const currentJobs = currentTab === 'upcoming' ? UPCOMING_JOBS : ONGOING_JOBS;

  return (
    <div className="flex flex-col gap-6 w-full items-start pb-8">
      {/* Top Sub-tabs Pill Selector Row */}
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={() => handleTabChange('upcoming')}
          className={`h-[48px] px-8 rounded-full font-rubik font-medium text-[16px] transition cursor-pointer border-none outline-none shadow-xs ${
            currentTab === 'upcoming'
              ? 'bg-[#0A0A6E] text-white shadow-sm'
              : 'bg-white text-[#121111] hover:bg-[#F8F9FF]'
          }`}
        >
          Upcoming
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('ongoing')}
          className={`h-[48px] px-8 rounded-full font-rubik font-medium text-[16px] transition cursor-pointer border-none outline-none shadow-xs ${
            currentTab === 'ongoing'
              ? 'bg-[#0A0A6E] text-white shadow-sm'
              : 'bg-white text-[#121111] hover:bg-[#F8F9FF]'
          }`}
        >
          Ongoing
        </button>
      </div>

      {/* Info Notice Banner */}
      <div className="flex items-center gap-2 font-rubik font-medium text-[16px] text-[#121111]">
        <Info className="w-5 h-5 text-[#121111]/70 shrink-0" />
        <span>View and manage your current care requests.</span>
      </div>

      {/* Jobs List Container */}
      <div className="w-full flex flex-col gap-5">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="w-full max-w-[1080px] bg-white rounded-[16px] p-6 shadow-sm border border-[#EFEFEF]/86 flex flex-col gap-4"
          >
            {/* Top Row: Title, Subtitle / Badges & Price Tag */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
              <div className="flex flex-col gap-1">
                {job.badge ? (
                  <span className="w-fit bg-[#1D68FF] text-white text-[13px] font-medium font-rubik px-3.5 py-1 rounded-full">
                    {job.badge}
                  </span>
                ) : (
                  <h3 className="font-rubik font-semibold text-[18px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                    {job.title}
                  </h3>
                )}
                <span className="font-rubik font-normal text-[14px] leading-[17px] text-[#727272]">
                  {job.category}
                </span>
              </div>

              {/* Price Badge Box */}
              <div className="bg-[#F1F5F9] rounded-[8px] px-3.5 py-1.5 flex items-center gap-1.5 shrink-0">
                <BadgeDollarSign className="w-5 h-5 text-[#181818]" />
                <span className="font-rubik font-bold text-[20px] leading-[24px] text-[#181818]">
                  {job.price}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
              {job.description}
            </p>

            {/* Metadata Badges Row */}
            <div className="flex items-center gap-x-6 gap-y-2 flex-wrap font-rubik text-[13px] text-[#181818]">
              {job.budgetRange && (
                <div className="flex items-center gap-1.5">
                  <BadgeDollarSign className="w-4 h-4 text-[#181818] shrink-0" />
                  <span>{job.budgetRange}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#181818] shrink-0" />
                <span>{job.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#181818] shrink-0" />
                <span>{job.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#181818] shrink-0" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-[#181818] shrink-0" />
                <span>{job.distance}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#EFEFEF]" />

            {/* Careseeker Information Row */}
            <div className="flex items-center gap-3">
              <div className="w-[38px] h-[38px] rounded-full overflow-hidden relative bg-neutral-100 shrink-0">
                <Image src={job.seekerAvatar} alt={job.seekerName} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-rubik font-medium text-[15px] leading-[18px] text-[#121111]">
                  {job.seekerName}
                </span>
                <div className="flex items-center gap-1.5 font-rubik text-[13px] text-[#565656]">
                  <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                  <span className="font-normal text-[#121111]">{job.seekerRating.toFixed(1)}</span>
                  <span>({job.seekerReviews})</span>
                  <span>|</span>
                  <span>{job.seekerServices} Services</span>
                </div>
              </div>
            </div>

            {/* Bottom Row Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
              {/* Left Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/chat')}
                  className="h-[40px] px-6 bg-[#F36922] hover:bg-[#e05813] text-white rounded-full font-rubik font-medium text-[14px] leading-[18px] transition cursor-pointer border-none shadow-xs flex items-center justify-center"
                >
                  Open chat
                </button>
                {currentTab === 'upcoming' && (
                  <button
                    type="button"
                    onClick={() => {
                      setTargetCancelJobId(job.id);
                      setCancelModalStep(1);
                    }}
                    className="h-[40px] px-6 bg-[#F8F9FF] hover:bg-neutral-100 text-[#121111] rounded-full font-rubik font-medium text-[14px] leading-[18px] transition cursor-pointer border border-[#EFEFEF] flex items-center justify-center"
                  >
                    Cancel Job
                  </button>
                )}
              </div>

              {/* Right Action Button */}
              <button
                type="button"
                onClick={() => {
                  if (onSelectJob) {
                    onSelectJob(job.id);
                  } else {
                    router.push(`/my-jobs/${job.id}?status=${currentTab}`);
                  }
                }}
                className="h-[40px] px-6 bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-full font-rubik font-medium text-[14px] leading-[18px] transition cursor-pointer border-none shadow-xs flex items-center justify-center gap-2 shrink-0"
              >
                <span>View Job Details</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelModalStep > 0} onOpenChange={(open) => !open && setCancelModalStep(0)}>
        <DialogContent className="sm:max-w-[420px] bg-white rounded-2xl p-6 border-none shadow-xl">
          <DialogTitle className="font-rubik font-semibold text-[18px] text-[#121111] text-center">
            {cancelModalStep === 1 ? 'Cancel Job Confirmation' : 'Job Cancelled'}
          </DialogTitle>
          <DialogDescription className="font-rubik font-light text-[14px] text-[#3D3D3D] text-center mt-2">
            {cancelModalStep === 1
              ? 'Are you sure you want to cancel this scheduled upcoming job? The careseeker will be notified.'
              : 'The upcoming job has been successfully cancelled.'}
          </DialogDescription>

          <div className="flex gap-3 justify-center mt-6">
            {cancelModalStep === 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => setCancelModalStep(0)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 font-rubik text-[14px] hover:bg-neutral-50 transition cursor-pointer"
                >
                  Keep Job
                </button>
                <button
                  type="button"
                  onClick={() => setCancelModalStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-[#C81E1E] text-white font-rubik text-[14px] hover:bg-red-700 transition cursor-pointer border-none"
                >
                  Confirm Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setCancelModalStep(0)}
                className="px-6 py-2.5 rounded-xl bg-[#0A0A6E] text-white font-rubik text-[14px] hover:bg-[#080856] transition cursor-pointer border-none"
              >
                Close
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
