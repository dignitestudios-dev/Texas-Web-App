'use client';

import React, { useRef } from 'react';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  ChevronDown,
} from 'lucide-react';
import { CareRequestFormData } from '../types/care-request.types';

interface StepCreateDetailsProps {
  data: CareRequestFormData;
  onChange: (fields: Partial<CareRequestFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepCreateDetails({
  data,
  onChange,
  onNext,
  onBack,
}: StepCreateDetailsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      onChange({ images: [...data.images, ...newImages] });
    }
  };

  return (
    <div className="w-full flex flex-col bg-white min-h-screen">
      <div className="w-full max-w-[840px] mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6 text-left">
        
        {/* ── Top Header Row ── */}
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onBack}
            className="w-[46px] h-[46px] rounded-full bg-[#0A0A6E] text-white flex items-center justify-center hover:scale-105 transition cursor-pointer border-none shadow-sm shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="font-rubik font-bold text-[22px] sm:text-[26px] text-[#121111]">
            Create Care Request
          </h1>
        </div>

        {/* ── Upload Images Area ── */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] hover:bg-neutral-50/80 rounded-[16px] p-8 flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <span className="font-rubik font-semibold text-[15px] text-[#121111]">
            Upload Images
          </span>
          <span className="font-rubik text-[12.5px] text-[#64748B]">
            Upto 20mbs JPG, PNG
          </span>

          {data.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {data.images.map((img, idx) => (
                <span
                  key={idx}
                  className="bg-white border border-neutral-200 text-xs px-2.5 py-1 rounded-md text-[#475569]"
                >
                  Image {idx + 1}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Form Fields ── */}
        <div className="flex flex-col gap-5 w-full">
          
          {/* Row 1: Service Title & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <label className="font-rubik font-medium text-[14px] text-[#121111]">
                Service Title
              </label>
              <input
                type="text"
                value={data.serviceTitle}
                onChange={(e) => onChange({ serviceTitle: e.target.value })}
                placeholder="Enter service title"
                className="w-full h-[50px] bg-white rounded-[12px] px-4 font-rubik text-[14.5px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-rubik font-medium text-[14px] text-[#121111]">
                Location
              </label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => onChange({ location: e.target.value })}
                placeholder="San Juan, Texas(TX)"
                className="w-full h-[50px] bg-white rounded-[12px] px-4 font-rubik text-[14.5px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
              />
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="font-rubik font-medium text-[14px] text-[#121111]">
              Description
            </label>
            <textarea
              value={data.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Description"
              className="w-full h-[120px] bg-white rounded-[12px] p-4 font-rubik text-[14.5px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none resize-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
            />
          </div>

          {/* Row 3: Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <label className="font-rubik font-medium text-[14px] text-[#121111]">
                Date
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={data.date}
                  onChange={(e) => onChange({ date: e.target.value })}
                  placeholder="Date"
                  className="w-full h-[50px] bg-white rounded-[12px] pl-4 pr-11 font-rubik text-[14.5px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
                />
                <CalendarIcon className="w-5 h-5 text-[#94A3B8] absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-rubik font-medium text-[14px] text-[#121111]">
                Time
              </label>
              <div className="grid grid-cols-2 gap-2 w-full">
                <input
                  type="text"
                  value={data.startTime}
                  onChange={(e) => onChange({ startTime: e.target.value })}
                  placeholder="Start Time"
                  className="w-full h-[50px] bg-white rounded-[12px] px-3 font-rubik text-[14.5px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
                />
                <input
                  type="text"
                  value={data.endTime}
                  onChange={(e) => onChange({ endTime: e.target.value })}
                  placeholder="End Time"
                  className="w-full h-[50px] bg-white rounded-[12px] px-3 font-rubik text-[14.5px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Pay Range */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="font-rubik font-medium text-[14px] text-[#121111]">
              Pay Range
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <input
                type="text"
                value={data.minPrice}
                onChange={(e) => onChange({ minPrice: e.target.value })}
                placeholder="Min Price"
                className="w-full h-[50px] bg-white rounded-[12px] px-4 font-rubik text-[14.5px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
              />
              <input
                type="text"
                value={data.maxPrice}
                onChange={(e) => onChange({ maxPrice: e.target.value })}
                placeholder="Max Price"
                className="w-full h-[50px] bg-white rounded-[12px] px-4 font-rubik text-[14.5px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
              />
            </div>
          </div>

          {/* Row 5: Experience & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <label className="font-rubik font-medium text-[14px] text-[#121111]">
                Experience
              </label>
              <input
                type="text"
                value={data.experience}
                onChange={(e) => onChange({ experience: e.target.value })}
                placeholder="Experience"
                className="w-full h-[50px] bg-white rounded-[12px] px-4 font-rubik text-[14.5px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-rubik font-medium text-[14px] text-[#121111]">
                Language
              </label>
              <div className="relative flex items-center">
                <select
                  value={data.language}
                  onChange={(e) => onChange({ language: e.target.value })}
                  className="w-full h-[50px] bg-white rounded-[12px] pl-4 pr-10 font-rubik text-[14.5px] text-[#121111] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition appearance-none cursor-pointer shadow-2xs"
                >
                  <option value="Language">Language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Arabic">Arabic</option>
                </select>
                <ChevronDown className="w-5 h-5 text-[#94A3B8] absolute right-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 6: Radius Slider */}
          <div className="flex flex-col gap-2 w-full pt-1">
            <div className="flex items-center justify-between font-rubik text-[13.5px] text-[#64748B]">
              <span>0</span>
              <span className="bg-[#FFF0E8] text-[#F36922] font-semibold text-[13px] px-3.5 py-1 rounded-full shadow-2xs">
                {data.radius} Miles
              </span>
              <span>50</span>
            </div>

            <input
              type="range"
              min={0}
              max={50}
              value={data.radius}
              onChange={(e) => onChange({ radius: Number(e.target.value) })}
              className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#F36922]"
            />
          </div>

          {/* Row 7: Certificates */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="font-rubik font-medium text-[14px] text-[#121111]">
              Certificates
            </label>
            <input
              type="text"
              value={data.certificates}
              onChange={(e) => onChange({ certificates: e.target.value })}
              placeholder="Enter Certificate"
              className="w-full h-[50px] bg-white rounded-[12px] px-4 font-rubik text-[14.5px] text-[#121111] placeholder:text-[#94A3B8] border border-neutral-200 outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition shadow-2xs"
            />
          </div>

        </div>

        {/* Continue Button */}
        <div className="w-full pt-3">
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
