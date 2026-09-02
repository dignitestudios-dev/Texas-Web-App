'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import {
  CareRequestFormData,
  CARE_SERVICE_CATEGORIES,
} from '../types/care-request.types';

interface StepCategorySelectProps {
  data: CareRequestFormData;
  onChange: (fields: Partial<CareRequestFormData>) => void;
  onNext: () => void;
}

export function StepCategorySelect({
  data,
  onChange,
  onNext,
}: StepCategorySelectProps) {
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    onChange({ category });
  };

  return (
    <div className="w-full flex flex-col bg-white min-h-screen">
      {/* ── Top Hero Banner (Matching Home / Page Style) ── */}
      <div className="relative w-full h-[280px] sm:h-[420px] -mt-40 flex flex-col items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(247.2deg, #0A0A6E -13.06%, #F36922 111.27%)' }}
        />
        {/* Banner Texture with Overlay */}
        <div
          className="absolute inset-0 z-10 opacity-80 bg-no-repeat"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(102, 102, 102, 0) 0%, #000000 100%), url(/images/home/banner.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 flex pt-28 flex-col items-center justify-center w-full max-w-[800px] text-center gap-3 px-4">
          <h1 className="font-rubik font-semibold text-[34px] sm:text-[46px] md:text-[50px] leading-[1.2] tracking-[-0.408px] text-white">
            Post a Care Request
          </h1>
          <p className="font-rubik font-light text-[16px] sm:text-[20px] md:text-[22px] leading-[1.3] tracking-[-0.408px] text-white max-w-[620px]">
            Tell caregivers what care you need and find the right match for you.
          </p>
        </div>
      </div>

      {/* ── Main Form Section ── */}
      <div className="w-full max-w-[840px] mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6 text-left">
        {/* Back Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[46px] h-[46px] rounded-full bg-[#0A0A6E] text-white flex items-center justify-center hover:scale-105 transition cursor-pointer border-none shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Section 1: Select Service Category */}
        <div className="flex flex-col gap-3.5">
          <h3 className="font-rubik font-bold text-[16px] sm:text-[17px] text-[#121111]">
            Select Service Category
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
            {CARE_SERVICE_CATEGORIES.map((cat) => {
              const isSelected = data.category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`h-[54px] px-4 rounded-[12px] bg-white border flex items-center gap-3.5 cursor-pointer transition text-left shadow-2xs ${isSelected
                      ? 'border-[#0A0A6E] bg-neutral-50/50 ring-1 ring-[#0A0A6E]/20'
                      : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                >
                  {/* Custom Radio Circle */}
                  <div
                    className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 transition ${isSelected
                        ? 'border-[#0A0A6E] bg-[#0A0A6E]'
                        : 'border-[#CBD5E1] bg-white'
                      }`}
                  >
                    {isSelected && (
                      <div className="w-[6px] h-[6px] rounded-full bg-white" />
                    )}
                  </div>

                  <span
                    className={`font-rubik text-[14.5px] leading-[18px] ${isSelected
                        ? 'font-medium text-[#121111]'
                        : 'font-normal text-[#475569]'
                      }`}
                  >
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-[#E2E8F0] my-2" />

        {/* Section 2: Mention Subcategory */}
        <div className="flex flex-col gap-2.5">
          <h3 className="font-rubik font-bold text-[16px] sm:text-[17px] text-[#121111]">
            Mention Subcategory
          </h3>
          <input
            type="text"
            value={data.subCategory}
            onChange={(e) => onChange({ subCategory: e.target.value })}
            placeholder="Enter you subcategory"
            className="w-full h-[52px] bg-white rounded-[12px] px-4 font-rubik text-[15px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
          />
        </div>

        {/* Continue Button */}
        <div className="w-full pt-4">
          <button
            type="button"
            onClick={onNext}
            className="w-full h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[16px] rounded-[14px] shadow-sm transition cursor-pointer border-none flex items-center justify-center"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
