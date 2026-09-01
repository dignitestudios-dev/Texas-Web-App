'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  MapPin,
  Locate,
  Languages,
  Check,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { CareRequestFormData } from '../types/care-request.types';

interface StepFeatureRequestProps {
  data: CareRequestFormData;
  onChange: (fields: Partial<CareRequestFormData>) => void;
  onBack: () => void;
}

export function StepFeatureRequest({
  data,
  onChange,
  onBack,
}: StepFeatureRequestProps) {
  const router = useRouter();

  const handleFinish = (plan?: '1-day' | '7-days' | '30-days') => {
    if (plan) {
      onChange({ selectedPlan: plan });
      toast.success(`Care request published with ${plan === '7-days' ? '7 Days Featured' : plan === '30-days' ? '30 Days Featured' : '1 Day Featured'} boost!`);
    } else {
      toast.success('Care request published successfully!');
    }
    router.push('/my-jobs');
  };

  return (
    <div className="w-full flex flex-col bg-white min-h-screen">
      <div className="w-full max-w-[840px] mx-auto px-4 sm:px-8 py-8 flex flex-col gap-7 text-left">
        
        {/* ── Top Header Row ── */}
        <div className="flex items-center justify-between w-full relative">
          <button
            type="button"
            onClick={onBack}
            className="w-[46px] h-[46px] rounded-full bg-[#0A0A6E] text-white flex items-center justify-center hover:scale-105 transition cursor-pointer border-none shadow-sm shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex-1 flex flex-col items-center text-center px-2">
            <h1 className="font-rubik font-bold text-[22px] sm:text-[28px] text-[#121111]">
              Feature Your Care Request
            </h1>
            <p className="font-rubik text-[14px] sm:text-[15px] text-[#565656] mt-0.5">
              Boost visibility and find the right caregiver faster
            </p>
          </div>

          <div className="w-[46px] shrink-0" />
        </div>

        {/* ── Card Preview (Matching Screenshot 3) ── */}
        <div className="w-full bg-white rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-3 text-left">
          {/* Title & Budget */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
            <div className="flex flex-col gap-0.5">
              <h4 className="font-rubik font-semibold text-[17px] sm:text-[18px] text-[#121111]">
                {data.serviceTitle || 'Elderly Care Assistant Seeking'}
              </h4>
              <span className="text-[13.5px] font-rubik text-[#565656]">
                {data.category}
              </span>
            </div>
            <div className="bg-[#F0F4FA] rounded-full px-3.5 py-1.5 flex items-center gap-1 font-rubik font-bold text-[18px] text-[#121111]">
              <span className="text-[15px] font-medium text-[#565656]">$</span>
              <span>
                ${data.minPrice || '35'}-${data.maxPrice || '50'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="font-rubik font-normal text-[14px] leading-[22px] text-[#565656]">
            {data.description ||
              "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic."}
          </p>

          {/* Metadata & Post Ready Badge */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full pt-1">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#565656] text-[13px] font-rubik">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-[#565656] shrink-0" />
                <span>{data.date || '12 Dec 23'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#565656] shrink-0" />
                <span>{data.location || 'San Juan, Texas'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Locate className="w-4 h-4 text-[#565656] shrink-0" />
                <span>{data.radius || 14} miles away</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-[#565656] shrink-0" />
                <span>{data.language || 'English'}</span>
              </div>
            </div>

            <div className="bg-[#DCFCE7] text-[#16A34A] rounded-full px-4 py-1.5 font-rubik font-medium text-[13px] flex items-center gap-1.5 shrink-0">
              <span>Post Ready</span>
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* ── Navy Feature Callout Banner ── */}
        <div className="w-full bg-[#050854] text-white rounded-[18px] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden shadow-md">
          {/* Rocket Icon in Gradient Tile */}
          <div className="w-[48px] h-[48px] rounded-[14px] bg-gradient-to-tr from-[#2563EB] to-[#F97316] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Rocket className="w-6 h-6 transform -rotate-45" />
          </div>

          <div className="flex flex-col gap-0.5 text-left">
            <h3 className="font-rubik font-bold text-[17px] sm:text-[18px] text-white leading-snug">
              Featured posts get 5× more caregiver responses
            </h3>
            <p className="font-rubik text-white/80 text-[13.5px] leading-[20px]">
              Move to the top of search results and get discovered by verified caregivers in your area faster.
            </p>
          </div>
        </div>

        {/* ── 3 Highlight Metric Badges ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
          <div className="bg-white rounded-[16px] border border-neutral-200 p-4 flex flex-col items-center text-center gap-1 shadow-2xs relative overflow-hidden">
            <div className="w-12 h-1 bg-[#F36922] rounded-full mb-1" />
            <span className="font-rubik font-bold text-[24px] text-[#F36922]">5x</span>
            <span className="font-rubik text-[12.5px] text-[#565656] leading-tight">
              More responses vs regular posts
            </span>
          </div>

          <div className="bg-white rounded-[16px] border border-neutral-200 p-4 flex flex-col items-center text-center gap-1 shadow-2xs relative overflow-hidden">
            <div className="w-12 h-1 bg-[#F36922] rounded-full mb-1" />
            <span className="font-rubik font-bold text-[24px] text-[#F36922]">Top</span>
            <span className="font-rubik text-[12.5px] text-[#565656] leading-tight">
              Pinned in caregiver search
            </span>
          </div>

          <div className="bg-white rounded-[16px] border border-neutral-200 p-4 flex flex-col items-center text-center gap-1 shadow-2xs relative overflow-hidden">
            <div className="w-12 h-1 bg-[#F36922] rounded-full mb-1" />
            <span className="font-rubik font-bold text-[24px] text-[#F36922]">48h</span>
            <span className="font-rubik text-[12.5px] text-[#565656] leading-tight">
              Avg. match time when featured
            </span>
          </div>
        </div>

        {/* ── Choose a Plan Section ── */}
        <div className="flex flex-col gap-4 w-full pt-1">
          <h3 className="font-rubik font-bold text-[18px] text-[#121111]">
            Choose a Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full items-stretch">
            
            {/* PLAN 1: 1 Day */}
            <div
              onClick={() => handleFinish('1-day')}
              className="bg-white rounded-[20px] p-6 border border-neutral-200 hover:border-[#F36922] transition cursor-pointer flex flex-col items-center text-center gap-3 shadow-xs hover:shadow-md"
            >
              <span className="font-rubik font-medium text-[14px] text-[#121111]">1 Day</span>
              <span className="font-rubik font-bold text-[26px] text-[#121111]">$2/day</span>
              
              <div className="w-full flex flex-col gap-2 pt-2 text-left text-[13px] font-rubik text-[#565656]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F36922] shrink-0 stroke-[3]" />
                  <span>Top of search for 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F36922] stroke-[3] shrink-0" />
                  <span>Featured badge on post</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F36922] stroke-[3] shrink-0" />
                  <span>Priority notifications</span>
                </div>
              </div>
            </div>

            {/* PLAN 2: 7 Days (Most Popular) */}
            <div
              onClick={() => handleFinish('7-days')}
              className="bg-gradient-to-b from-[#EA580C] to-[#2E1065] text-white rounded-[20px] p-6 relative flex flex-col items-center text-center gap-3 shadow-xl cursor-pointer hover:scale-[1.02] transition"
            >
              {/* Most Popular Badge */}
              <div className="absolute -top-3.5 bg-[#EA580C] text-white text-[12px] font-bold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-white" />
                <span>Most Popular</span>
              </div>

              <span className="text-white/90 font-rubik font-medium text-[14px] mt-1">7 Days</span>
              <span className="font-rubik font-bold text-[28px] text-white">$9/week</span>

              <span className="bg-white/20 text-white text-[12px] font-semibold px-3 py-0.5 rounded-full">
                Save 35%
              </span>

              <div className="w-full flex flex-col gap-2 pt-2 text-left text-[13px] font-rubik text-white/90">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white shrink-0 stroke-[3]" />
                  <span>Top of search for 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white shrink-0 stroke-[3]" />
                  <span>Featured badge on post</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white shrink-0 stroke-[3]" />
                  <span>Priority notifications</span>
                </div>
              </div>
            </div>

            {/* PLAN 3: 30 Days */}
            <div
              onClick={() => handleFinish('30-days')}
              className="bg-white rounded-[20px] p-6 border border-neutral-200 hover:border-[#F36922] transition cursor-pointer flex flex-col items-center text-center gap-3 shadow-xs hover:shadow-md"
            >
              <span className="font-rubik font-medium text-[14px] text-[#121111]">30 Days</span>
              <span className="font-rubik font-bold text-[26px] text-[#121111]">$25/mo</span>

              <span className="bg-[#FFF0E8] text-[#F36922] text-[12px] font-semibold px-3 py-0.5 rounded-full">
                Save 58%
              </span>

              <div className="w-full flex flex-col gap-2 pt-2 text-left text-[13px] font-rubik text-[#565656]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F36922] stroke-[3] shrink-0" />
                  <span>Top of search for 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F36922] stroke-[3] shrink-0" />
                  <span>Featured badge on post</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F36922] stroke-[3] shrink-0" />
                  <span>Priority notifications</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Skip Button ── */}
        <div className="flex justify-center w-full pt-1 pb-4">
          <button
            type="button"
            onClick={() => handleFinish()}
            className="font-rubik font-semibold text-[15px] text-[#121111] hover:text-[#F36922] transition cursor-pointer border-none bg-transparent"
          >
            Skip
          </button>
        </div>

      </div>
    </div>
  );
}
