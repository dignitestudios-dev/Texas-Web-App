'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ChevronDown, Upload } from 'lucide-react';

// Time slot data — status: 'selected' | 'available' | 'booked'
const TIME_SLOTS = [
  { start: '09:00AM', end: '10:00AM', status: 'selected' },
  { start: '10:00AM', end: '11:00AM', status: 'available' },
  { start: '11:00AM', end: '12:00AM', status: 'booked' },
  { start: '12:00AM', end: '1:00PM',  status: 'available' },
  { start: '01:00PM', end: '02:00PM', status: 'available' },
  { start: '02:00PM', end: '03:00PM', status: 'booked' },
  { start: '03:00PM', end: '04:00PM', status: 'available' },
  { start: '04:00PM', end: '05:00PM', status: 'available' },
] as const;

type SlotStatus = 'selected' | 'available' | 'booked';

interface TimeSlot {
  start: string;
  end: string;
  status: SlotStatus;
}

export default function BookingPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  const getSlotStyle = (slot: TimeSlot, idx: number): string => {
    const isActive = idx === activeSlot;
    if (isActive || slot.status === 'selected') {
      return 'bg-[#F36922] border-[#CDCDCD] text-white font-medium';
    }
    if (slot.status === 'booked') {
      return 'bg-[rgba(238,49,49,0.12)] border-[#CDCDCD] text-[#181818] cursor-not-allowed';
    }
    return 'bg-white border-[#CDCDCD] text-[#181818] hover:border-[#F36922] hover:bg-[#FFF0E8] transition cursor-pointer';
  };

  return (
    <div className="min-h-screen bg-[rgba(243,105,34,0.1)] flex flex-col w-full">

      {/* ── Main Content ── */}
      <div className="w-full flex flex-col items-center px-8 lg:px-[80px] pt-[30px] pb-[60px] gap-[20px]">

        {/* Page Header */}
        <div className="w-full max-w-[1280px] flex items-center gap-[20px]">
          <button
            onClick={() => router.back()}
            className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </button>
          <h1 className="font-rubik font-medium text-[24px] leading-[28px] tracking-[-0.005em] text-[#121111]">
            Send Requests
          </h1>
        </div>

        <div className="w-full max-w-[1280px] flex flex-col gap-[20px]">

          {/* ── RATES & DATE CARD ── */}
          <div className="w-full bg-white rounded-[12px] flex flex-col">
            {/* Card Header */}
            <div className="w-full px-[15px] py-[12px] border-b border-[#EFEFEF]/86">
              <span className="font-rubik font-medium text-[18px] leading-[21px] tracking-[-0.005em] text-[#121111]">
                Rates &amp; Date
              </span>
            </div>

            {/* Card Body */}
            <div className="flex flex-col gap-[20px] p-[15px]">

              {/* Date row */}
              <div className="flex flex-col gap-[5px] w-full">
                <label className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Date
                </label>
                <div className="relative w-full">
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full h-[48px] bg-[#F1F5F9] rounded-[12px] px-[15px] pr-[40px] font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] appearance-none border-none outline-none cursor-pointer"
                  >
                    <option value="">Select Date</option>
                    <option value="2026-08-11">Monday, Aug 11</option>
                    <option value="2026-08-12">Tuesday, Aug 12</option>
                    <option value="2026-08-13">Wednesday, Aug 13</option>
                    <option value="2026-08-14">Thursday, Aug 14</option>
                    <option value="2026-08-15">Friday, Aug 15</option>
                  </select>
                  <ChevronDown className="absolute right-[15px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#121111] pointer-events-none" />
                </div>
              </div>

              {/* Time slots */}
              <div className="flex flex-col gap-[5px] w-full">
                <label className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Select time
                </label>
                <div className="flex flex-row flex-wrap gap-[10px] w-full">
                  {TIME_SLOTS.map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={slot.status === 'booked'}
                      onClick={() => slot.status !== 'booked' && setActiveSlot(idx)}
                      className={`flex flex-row justify-center items-center px-[14px] gap-[10px] h-[44px] min-w-[156px] border border-[0.89px] rounded-[100px] font-inter font-medium text-[13px] leading-[16px] tracking-[-0.018em] capitalize ${getSlotStyle(slot, idx)}`}
                    >
                      <span>{slot.start}</span>
                      <span>{slot.end}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-[5px] w-full">
                <label className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Location
                </label>
                <div className="relative w-full">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full h-[48px] bg-[#F1F5F9] rounded-[12px] px-[15px] pr-[40px] font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] appearance-none border-none outline-none cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option value="san-juan">San Juan, Texas (TX)</option>
                    <option value="mcallen">McAllen, Texas (TX)</option>
                    <option value="edinburg">Edinburg, Texas (TX)</option>
                    <option value="mission">Mission, Texas (TX)</option>
                  </select>
                  <ChevronDown className="absolute right-[15px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#121111] pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

          {/* ── JOB DETAILS CARD ── */}
          <div className="w-full bg-white rounded-[12px] flex flex-col">
            {/* Card Header */}
            <div className="w-full px-[15px] py-[12px] border-b border-[#EFEFEF]/86">
              <span className="font-rubik font-medium text-[18px] leading-[21px] tracking-[-0.005em] text-[#121111]">
                Job Details
              </span>
            </div>

            {/* Card Body */}
            <div className="flex flex-col gap-[16px] p-[15px]">

              {/* Title */}
              <div className="flex flex-col gap-[5px] w-full">
                <label className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Title
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter text here!"
                    className="w-full h-[48px] bg-[#F1F5F9] rounded-[12px] px-[15px] pr-[40px] font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] placeholder-[#121111] border-none outline-none"
                  />
                  <ChevronDown className="absolute right-[15px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#121111] pointer-events-none" />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-[8px] w-full">
                <label className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Description
                </label>
                <div className="relative w-full">
                  <textarea
                    value={description}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) setDescription(e.target.value);
                    }}
                    placeholder="Description"
                    rows={4}
                    className="w-full bg-[#F1F5F9] rounded-[12px] px-[15px] py-[10px] font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] placeholder-[#121111] border-none outline-none resize-none"
                  />
                  <span className="absolute right-[15px] bottom-[10px] font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#3D3D3D]">
                    {200 - description.length} Characters
                  </span>
                </div>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-[5px] w-full">
                <label className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Budget
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter your Budget"
                  className="w-full h-[48px] bg-[#F1F5F9] rounded-[12px] px-[15px] font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] placeholder-[#121111] border-none outline-none"
                />
              </div>

              {/* Images (Optional) */}
              <div className="flex flex-col gap-[8px] w-full pb-[12px]">
                <label className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Images (Optional)
                </label>

                {/* Drop zone */}
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`w-full h-[56px] bg-[#F1F5F9] border border-dashed border-[#121111] rounded-[12px] flex items-center justify-center gap-[8px] cursor-pointer transition ${isDragging ? 'bg-[#e8edf2]' : ''}`}
                >
                  {uploadedFile ? (
                    <span className="font-rubik font-normal text-[14px] text-[#121111]">
                      {uploadedFile.name}
                    </span>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-[#121111]" />
                      <span className="font-rubik font-normal text-[16px] leading-[19px] tracking-[-0.408px] underline capitalize text-[#121111]">
                        Drop Or Upload Picture
                      </span>
                    </>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && setUploadedFile(e.target.files[0])}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row items-center gap-[10px]">
                <button
                  type="button"
                  className="flex flex-row justify-center items-center px-[20px] py-[8px] gap-[5px] h-[54px] min-w-[150px] bg-[#F36922] hover:bg-[#e05813] rounded-[100px] font-rubik font-normal text-[15px] leading-[24px] capitalize text-white cursor-pointer border-none transition"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex flex-row justify-center items-center px-[20px] py-[5px] gap-[5px] h-[54px] min-w-[150px] bg-[#F1F5F9] border border-[#EFEFEF]/86 hover:bg-neutral-200 rounded-[100px] font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] cursor-pointer transition"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
