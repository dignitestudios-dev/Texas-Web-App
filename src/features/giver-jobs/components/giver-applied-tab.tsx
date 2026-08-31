'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Info,
  Clock,
  Calendar,
  MapPin,
  Navigation,
  ArrowRight,
  BadgeDollarSign,
} from 'lucide-react';

export interface AppliedJobItem {
  id: string;
  title: string;
  category: string;
  price: string;
  budgetRange: string;
  description: string;
  time: string;
  date: string;
  location: string;
  distance: string;
  status: 'Pending' | 'Declined';
}

const MOCK_APPLIED_JOBS: AppliedJobItem[] = [
  {
    id: 'app-1',
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
    status: 'Pending',
  },
  {
    id: 'app-2',
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
    status: 'Declined',
  },
];

export function GiverAppliedTab() {
  const router = useRouter();
  const [subTab, setSubTab] = useState<'All' | 'Pending' | 'Declined'>('All');

  const filteredJobs = MOCK_APPLIED_JOBS.filter((job) => {
    if (subTab === 'All') return true;
    return job.status === subTab;
  });

  return (
    <div className="w-full flex flex-col gap-6 items-start pb-8">
      {/* Sub-tabs row */}
      <div className="flex items-center gap-3">
        {(['All', 'Pending', 'Declined'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSubTab(t)}
            className={`h-[44px] px-8 rounded-full font-rubik font-medium text-[15px] transition cursor-pointer border-none outline-none shadow-xs ${
              subTab === t
                ? 'bg-[#0A0A6E] text-white'
                : 'bg-white text-[#121111] hover:bg-neutral-50 border border-neutral-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Info Notice Banner */}
      <div className="flex items-center gap-2 font-rubik font-medium text-[16px] text-[#121111]">
        <Info className="w-5 h-5 text-[#121111]/70 shrink-0" />
        <span>See your requests which you have applied.</span>
      </div>

      {/* Applied List */}
      <div className="w-full flex flex-col gap-5">
        {filteredJobs.map((item) => (
          <div
            key={item.id}
            className="w-full max-w-[1080px] bg-white rounded-[16px] p-6 shadow-sm border border-[#EFEFEF]/86 flex flex-col gap-4"
          >
            {/* Top row: Title, Subtitle, Price Tag & Status Badge */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
              <div className="flex flex-col gap-0.5">
                <h3 className="font-rubik font-semibold text-[18px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                  {item.title}
                </h3>
                <span className="font-rubik font-normal text-[14px] leading-[17px] text-[#727272]">
                  {item.category}
                </span>
              </div>

              {/* Price Tag & Status Badge */}
              <div className="flex items-center gap-2.5 self-start sm:self-center">
                <div className="bg-[#F1F5F9] rounded-[8px] px-3.5 py-1.5 flex items-center gap-1.5 shrink-0">
                  <BadgeDollarSign className="w-5 h-5 text-[#181818]" />
                  <span className="font-rubik font-bold text-[20px] leading-[24px] text-[#181818]">
                    {item.price}
                  </span>
                </div>

                <span
                  className={`text-[13px] font-medium font-rubik px-4 py-1.5 rounded-full ${
                    item.status === 'Pending'
                      ? 'bg-[#FEF6E6] text-[#D97706]'
                      : 'bg-[#FCE8E6] text-[#C5221F]'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
              {item.description}
            </p>

            {/* Metadata Row */}
            <div className="flex items-center gap-x-6 gap-y-2 flex-wrap font-rubik text-[13px] text-[#181818]">
              <div className="flex items-center gap-1.5">
                <BadgeDollarSign className="w-4 h-4 text-[#181818] shrink-0" />
                <span>{item.budgetRange}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#181818] shrink-0" />
                <span>{item.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#181818] shrink-0" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#181818] shrink-0" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-[#181818] shrink-0" />
                <span>{item.distance}</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex justify-end items-center w-full pt-1">
              <button
                type="button"
                onClick={() => router.push(`/my-jobs/${item.id}`)}
                className="h-[40px] px-6 bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-full font-rubik font-medium text-[14px] leading-[18px] transition cursor-pointer border-none shadow-xs flex items-center justify-center gap-2"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
