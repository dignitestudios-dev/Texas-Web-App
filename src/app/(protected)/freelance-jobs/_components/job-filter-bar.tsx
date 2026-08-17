'use client';

import React, { useState } from 'react';
import { ChevronDown, Check, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface FilterState {
  categories: string[];
  radius: string;
  religion: string[];
  gender: string[];
  payRange: [number, number];
  datePosted: string;
  timeSlot?: string;
  location: string;
}

interface JobFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

// Fixed data for histogram visualization in Pay Range dropdown
const HISTOGRAM_BARS = [
  25, 45, 30, 60, 40, 75, 55, 35, 25, 40,
  50, 20, 35, 85, 60, 40, 25, 65, 45, 30,
  35, 55, 45, 20, 30, 50, 60, 40, 25, 50,
  75, 45, 60, 50, 70, 45, 65, 35, 60, 45,
  30, 50
];

const CATEGORY_OPTIONS = [
  'Plumber',
  'Carpenter',
  'Electrician',
  'Cleaning',
  'AC Repair',
];

const RADIUS_OPTIONS = [
  '<10Km',
  '10km - 25km',
  '25km - 50km',
  '50km - 100km',
  '>100km',
];

const RELIGION_OPTIONS = [
  'Christianity',
  'Hinduism',
  'Islam',
  'Buddhism',
  'Judaism',
];

const GENDER_OPTIONS = ['Male', 'Female', 'Non-Binary', 'Other'];

const TIMESLOT_OPTIONS = [
  '12:00pm -2:00pm',
  '12:00pm -2:00pm',
  '12:00pm -2:00pm',
  '12:00pm -2:00pm',
  '12:00pm -2:00pm',
  '12:00pm -2:00pm',
  '12:00pm -2:00pm',
  '12:00pm -2:00pm',
];

export function JobFilterBar({ filters, onFilterChange }: JobFilterBarProps) {
  // Open popover tracking state
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  // Temporary local states for each popover
  const [tempCategories, setTempCategories] = useState<string[]>(filters.categories);
  const [tempRadius, setTempRadius] = useState<string>(filters.radius);
  const [tempReligion, setTempReligion] = useState<string[]>(filters.religion);
  const [tempGender, setTempGender] = useState<string[]>(filters.gender);
  const [tempPayRange, setTempPayRange] = useState<[number, number]>(filters.payRange);
  const [tempDate, setTempDate] = useState<string>(filters.datePosted);
  const [tempLocation, setTempLocation] = useState<string>(filters.location);

  // Calendar specific temporary state
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(5); // 5 = June
  const [selectedDay, setSelectedDay] = useState<number | null>(19);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('12:00pm -2:00pm');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Sync temp state when popover opens
  const handleOpenChange = (popoverName: string, isOpen: boolean) => {
    if (isOpen) {
      setOpenPopover(popoverName);
      if (popoverName === 'Categories') setTempCategories([...filters.categories]);
      if (popoverName === 'Radius') setTempRadius(filters.radius);
      if (popoverName === 'Religion') setTempReligion([...filters.religion]);
      if (popoverName === 'Gender') setTempGender([...filters.gender]);
      if (popoverName === 'Pay Range') setTempPayRange([...filters.payRange]);
      if (popoverName === 'Date') setTempDate(filters.datePosted);
      if (popoverName === 'Location') setTempLocation(filters.location);
    } else {
      setOpenPopover(null);
    }
  };

  // Helper to toggle checkbox in array
  const toggleArrayItem = (list: string[], item: string) => {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
  };

  const handlePrevMonth = () => {
    if (currentMonthIdx === 0) {
      setCurrentMonthIdx(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonthIdx(currentMonthIdx - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIdx === 11) {
      setCurrentMonthIdx(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonthIdx(currentMonthIdx + 1);
    }
  };

  // Generate calendar days for June 2026 (matching screenshot)
  const calendarDays = [
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
      {/* 1. CATEGORIES FILTER */}
      <Popover
        open={openPopover === 'Categories'}
        onOpenChange={(open) => handleOpenChange('Categories', open)}
      >
        <PopoverTrigger
          className={`h-[40px] px-4 bg-white border rounded-[12px] font-rubik font-normal text-[14px] flex items-center gap-2 shrink-0 transition cursor-pointer outline-none shadow-xs ${
            filters.categories.length > 0
              ? 'border-[#F36922] text-[#121111] font-medium bg-[#F36922]/5'
              : 'border-[#E4E4E7] text-[#565656] hover:bg-neutral-50'
          }`}
        >
          <span>
            {filters.categories.length > 0
              ? `Categories (${filters.categories.length})`
              : 'Categories'}
          </span>
          <ChevronDown className={`w-4 h-4 text-[#565656] transition-transform ${openPopover === 'Categories' ? 'rotate-180' : ''}`} />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[300px] p-5 rounded-[12px] bg-white border-none shadow-[0_16px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5 flex flex-col"
        >
          <h3 className="font-rubik text-[15px] font-light text-[#565656] mb-3 px-1">
            Categories
          </h3>
          <div className="flex flex-col gap-1 mb-4">
            {CATEGORY_OPTIONS.map((cat) => {
              const isChecked = tempCategories.includes(cat);
              return (
                <div
                  key={cat}
                  onClick={() =>
                    setTempCategories((prev) => toggleArrayItem(prev, cat))
                  }
                  className={`flex items-center gap-3.5 px-3 py-2.5 rounded-[12px] cursor-pointer transition-colors ${
                    isChecked ? 'bg-[#F7F8FC]' : 'hover:bg-[#F7F8FC]'
                  }`}
                >
                  <div
                    className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-[#F36922] text-white border border-[#F36922]'
                        : 'bg-white border border-[#E2E8F0]'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="font-rubik font-semibold text-[15px] text-[#121111]">
                    {cat}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mt-auto pt-2">
            <button
              type="button"
              onClick={() => setTempCategories([])}
              className="flex-1 h-[42px] bg-[#F7F8FC] hover:bg-[#EEF0F8] border border-[#E4E4E7] text-[#121111] font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                onFilterChange({ ...filters, categories: tempCategories });
                setOpenPopover(null);
              }}
              className="flex-1 h-[42px] bg-[#121111] hover:bg-[#000000] text-white font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer shadow-xs"
            >
              Apply
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* 2. RADIUS FILTER */}
      <Popover
        open={openPopover === 'Radius'}
        onOpenChange={(open) => handleOpenChange('Radius', open)}
      >
        <PopoverTrigger
          className={`h-[40px] px-4 bg-white border rounded-[12px] font-rubik font-normal text-[14px] flex items-center gap-2 shrink-0 transition cursor-pointer outline-none shadow-xs ${
            filters.radius
              ? 'border-[#F36922] text-[#121111] font-medium bg-[#F36922]/5'
              : 'border-[#E4E4E7] text-[#565656] hover:bg-neutral-50'
          }`}
        >
          <span>{filters.radius ? `Radius: ${filters.radius}` : 'Radius'}</span>
          <ChevronDown className={`w-4 h-4 text-[#565656] transition-transform ${openPopover === 'Radius' ? 'rotate-180' : ''}`} />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[300px] p-5 rounded-[12px] bg-white border-none shadow-[0_16px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5 flex flex-col"
        >
          <h3 className="font-rubik text-[15px] font-light text-[#565656] mb-3 px-1">
            Radius
          </h3>
          <div className="flex flex-col gap-1 mb-4">
            {RADIUS_OPTIONS.map((rad) => {
              const isSelected = tempRadius === rad;
              return (
                <div
                  key={rad}
                  onClick={() => setTempRadius(isSelected ? '' : rad)}
                  className={`flex items-center gap-3.5 px-3 py-2.5 rounded-[12px] cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#F7F8FC]' : 'hover:bg-[#F7F8FC]'
                  }`}
                >
                  <div
                    className={`w-[22px] h-[22px] rounded-full shrink-0 transition-colors ${
                      isSelected
                        ? 'border-[6.5px] border-[#F36922] bg-white'
                        : 'border border-[#E2E8F0] bg-white'
                    }`}
                  />
                  <span className="font-rubik font-semibold text-[15px] text-[#121111]">
                    {rad}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mt-auto pt-2">
            <button
              type="button"
              onClick={() => setTempRadius('')}
              className="flex-1 h-[42px] bg-[#F7F8FC] hover:bg-[#EEF0F8] border border-[#E4E4E7] text-[#121111] font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                onFilterChange({ ...filters, radius: tempRadius });
                setOpenPopover(null);
              }}
              className="flex-1 h-[42px] bg-[#121111] hover:bg-[#000000] text-white font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer shadow-xs"
            >
              Apply
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* 3. RELIGION FILTER */}
      <Popover
        open={openPopover === 'Religion'}
        onOpenChange={(open) => handleOpenChange('Religion', open)}
      >
        <PopoverTrigger
          className={`h-[40px] px-4 bg-white border rounded-[12px] font-rubik font-normal text-[14px] flex items-center gap-2 shrink-0 transition cursor-pointer outline-none shadow-xs ${
            filters.religion.length > 0
              ? 'border-[#F36922] text-[#121111] font-medium bg-[#F36922]/5'
              : 'border-[#E4E4E7] text-[#565656] hover:bg-neutral-50'
          }`}
        >
          <span>
            {filters.religion.length > 0
              ? `Religion (${filters.religion.length})`
              : 'Religion'}
          </span>
          <ChevronDown className={`w-4 h-4 text-[#565656] transition-transform ${openPopover === 'Religion' ? 'rotate-180' : ''}`} />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[300px] p-5 rounded-[12px] bg-white border-none shadow-[0_16px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5 flex flex-col"
        >
          <h3 className="font-rubik text-[15px] font-light text-[#565656] mb-3 px-1">
            Religion
          </h3>
          <div className="flex flex-col gap-1 mb-4">
            {RELIGION_OPTIONS.map((rel) => {
              const isChecked = tempReligion.includes(rel);
              return (
                <div
                  key={rel}
                  onClick={() =>
                    setTempReligion((prev) => toggleArrayItem(prev, rel))
                  }
                  className={`flex items-center gap-3.5 px-3 py-2.5 rounded-[12px] cursor-pointer transition-colors ${
                    isChecked ? 'bg-[#F7F8FC]' : 'hover:bg-[#F7F8FC]'
                  }`}
                >
                  <div
                    className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-[#F36922] text-white border border-[#F36922]'
                        : 'bg-white border border-[#E2E8F0]'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="font-rubik font-semibold text-[15px] text-[#121111]">
                    {rel}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mt-auto pt-2">
            <button
              type="button"
              onClick={() => setTempReligion([])}
              className="flex-1 h-[42px] bg-[#F7F8FC] hover:bg-[#EEF0F8] border border-[#E4E4E7] text-[#121111] font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                onFilterChange({ ...filters, religion: tempReligion });
                setOpenPopover(null);
              }}
              className="flex-1 h-[42px] bg-[#121111] hover:bg-[#000000] text-white font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer shadow-xs"
            >
              Apply
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* 4. GENDER FILTER */}
      <Popover
        open={openPopover === 'Gender'}
        onOpenChange={(open) => handleOpenChange('Gender', open)}
      >
        <PopoverTrigger
          className={`h-[40px] px-4 bg-white border rounded-[12px] font-rubik font-normal text-[14px] flex items-center gap-2 shrink-0 transition cursor-pointer outline-none shadow-xs ${
            filters.gender.length > 0
              ? 'border-[#F36922] text-[#121111] font-medium bg-[#F36922]/5'
              : 'border-[#E4E4E7] text-[#565656] hover:bg-neutral-50'
          }`}
        >
          <span>
            {filters.gender.length > 0
              ? `Gender (${filters.gender.length})`
              : 'Gender'}
          </span>
          <ChevronDown className={`w-4 h-4 text-[#565656] transition-transform ${openPopover === 'Gender' ? 'rotate-180' : ''}`} />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[300px] p-5 rounded-[12px] bg-white border-none shadow-[0_16px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5 flex flex-col"
        >
          <h3 className="font-rubik text-[15px] font-light text-[#565656] mb-3 px-1">
            Gender
          </h3>
          <div className="flex flex-col gap-1 mb-4">
            {GENDER_OPTIONS.map((gnd) => {
              const isChecked = tempGender.includes(gnd);
              return (
                <div
                  key={gnd}
                  onClick={() =>
                    setTempGender((prev) => toggleArrayItem(prev, gnd))
                  }
                  className={`flex items-center gap-3.5 px-3 py-2.5 rounded-[12px] cursor-pointer transition-colors ${
                    isChecked ? 'bg-[#F7F8FC]' : 'hover:bg-[#F7F8FC]'
                  }`}
                >
                  <div
                    className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-[#F36922] text-white border border-[#F36922]'
                        : 'bg-white border border-[#E2E8F0]'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="font-rubik font-semibold text-[15px] text-[#121111]">
                    {gnd}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mt-auto pt-2">
            <button
              type="button"
              onClick={() => setTempGender([])}
              className="flex-1 h-[42px] bg-[#F7F8FC] hover:bg-[#EEF0F8] border border-[#E4E4E7] text-[#121111] font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                onFilterChange({ ...filters, gender: tempGender });
                setOpenPopover(null);
              }}
              className="flex-1 h-[42px] bg-[#121111] hover:bg-[#000000] text-white font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer shadow-xs"
            >
              Apply
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* 5. PAY RANGE FILTER */}
      <Popover
        open={openPopover === 'Pay Range'}
        onOpenChange={(open) => handleOpenChange('Pay Range', open)}
      >
        <PopoverTrigger
          className={`h-[40px] px-4 bg-white border rounded-[12px] font-rubik font-normal text-[14px] flex items-center gap-2 shrink-0 transition cursor-pointer outline-none shadow-xs ${
            filters.payRange[0] > 0 || filters.payRange[1] < 500
              ? 'border-[#F36922] text-[#121111] font-medium bg-[#F36922]/5'
              : 'border-[#E4E4E7] text-[#565656] hover:bg-neutral-50'
          }`}
        >
          <span>
            {filters.payRange[0] > 0 || filters.payRange[1] < 500
              ? `$${filters.payRange[0]} - $${filters.payRange[1]}`
              : 'Pay Range'}
          </span>
          <ChevronDown className={`w-4 h-4 text-[#565656] transition-transform ${openPopover === 'Pay Range' ? 'rotate-180' : ''}`} />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[310px] p-5 rounded-[12px] bg-white border-none shadow-[0_16px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5 flex flex-col"
        >
          <h3 className="font-rubik text-[15px] font-light text-[#565656] mb-4 px-1">
            Pay Range
          </h3>

          {/* Histogram Bar Chart */}
          <div className="w-full mb-3 px-1">
            <div className="h-[60px] flex items-end justify-between gap-[2px] w-full mb-1 px-1">
              {HISTOGRAM_BARS.map((heightPct, idx) => {
                const barVal = (idx / (HISTOGRAM_BARS.length - 1)) * 500;
                const isInRange =
                  barVal >= tempPayRange[0] && barVal <= tempPayRange[1];
                return (
                  <div
                    key={idx}
                    className={`w-[4px] rounded-full transition-all duration-150 ${
                      isInRange ? 'bg-[#F36922]' : 'bg-[#E5E7EB]'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                );
              })}
            </div>

            {/* Slider track line with thumb handles */}
            <div className="relative w-full h-6 flex items-center">
              <div className="absolute w-full h-[2px] bg-[#F36922]" />
              
              {/* Dual Range Inputs overlaid */}
              <input
                type="range"
                min={0}
                max={500}
                value={tempPayRange[0]}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), tempPayRange[1] - 10);
                  setTempPayRange([val, tempPayRange[1]]);
                }}
                className="absolute w-full appearance-none bg-transparent pointer-events-none z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#E4E4E7] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab"
              />
              <input
                type="range"
                min={0}
                max={500}
                value={tempPayRange[1]}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), tempPayRange[0] + 10);
                  setTempPayRange([tempPayRange[0], val]);
                }}
                className="absolute w-full appearance-none bg-transparent pointer-events-none z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#E4E4E7] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab"
              />
            </div>
          </div>

          {/* Input values row */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="flex flex-col">
              <label className="font-rubik text-[13px] font-light text-[#565656] mb-1.5 px-0.5">
                Minimum
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={`$${tempPayRange[0]}`}
                  onChange={(e) => {
                    const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                    if (!isNaN(val)) {
                      setTempPayRange([val, tempPayRange[1]]);
                    }
                  }}
                  className="w-full h-[40px] bg-white border border-[#E4E4E7] rounded-[12px] text-center font-rubik font-semibold text-[15px] text-[#121111] outline-none focus:border-[#F36922]"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-rubik text-[13px] font-light text-[#565656] mb-1.5 px-0.5">
                Maximum
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={`$${tempPayRange[1]}`}
                  onChange={(e) => {
                    const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                    if (!isNaN(val)) {
                      setTempPayRange([tempPayRange[0], val]);
                    }
                  }}
                  className="w-full h-[40px] bg-white border border-[#E4E4E7] rounded-[12px] text-center font-rubik font-semibold text-[15px] text-[#121111] outline-none focus:border-[#F36922]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-auto pt-2">
            <button
              type="button"
              onClick={() => setTempPayRange([0, 500])}
              className="flex-1 h-[42px] bg-[#F7F8FC] hover:bg-[#EEF0F8] border border-[#E4E4E7] text-[#121111] font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                onFilterChange({ ...filters, payRange: tempPayRange });
                setOpenPopover(null);
              }}
              className="flex-1 h-[42px] bg-[#121111] hover:bg-[#000000] text-white font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer shadow-xs"
            >
              Apply
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* 6. DATE FILTER WITH CALENDAR & TIMESLOTS */}
      <Popover
        open={openPopover === 'Date'}
        onOpenChange={(open) => handleOpenChange('Date', open)}
      >
        <PopoverTrigger
          className={`h-[40px] px-4 bg-white border rounded-[12px] font-rubik font-normal text-[14px] flex items-center gap-2 shrink-0 transition cursor-pointer outline-none shadow-xs ${
            filters.datePosted && filters.datePosted !== 'Anytime'
              ? 'border-[#F36922] text-[#121111] font-medium bg-[#F36922]/5'
              : 'border-[#E4E4E7] text-[#565656] hover:bg-neutral-50'
          }`}
        >
          <span>
            {filters.datePosted && filters.datePosted !== 'Anytime'
              ? filters.datePosted
              : 'Date'}
          </span>
          <ChevronDown className={`w-4 h-4 text-[#565656] transition-transform ${openPopover === 'Date' ? 'rotate-180' : ''}`} />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[340px] p-5 rounded-[12px] bg-white border-none shadow-[0_16px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5 flex flex-col"
        >
          {/* Calendar Header with Navigation */}
          <div className="flex items-center justify-between mb-4 px-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-7 h-7 flex items-center justify-center text-[#121111] hover:bg-neutral-100 rounded-full transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <h3 className="font-rubik font-semibold text-[16px] text-[#121111]">
              {monthNames[currentMonthIdx]} {currentYear}
            </h3>
            <button
              type="button"
              onClick={handleNextMonth}
              className="w-7 h-7 flex items-center justify-center text-[#121111] hover:bg-neutral-100 rounded-full transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Weekday headers: M T W T F S S */}
          <div className="grid grid-cols-7 text-center mb-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <span
                key={idx}
                className="font-rubik font-medium text-[13px] text-[#8E8E93]"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-1 text-center mb-3">
            {calendarDays.map((item, idx) => {
              const isSelected = item.isCurrentMonth && selectedDay === item.day;
              const formattedDay = item.day < 10 ? `0${item.day}` : `${item.day}`;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (item.isCurrentMonth) {
                      setSelectedDay(item.day);
                    }
                  }}
                  className={`w-9 h-9 mx-auto flex items-center justify-center font-rubik font-semibold text-[14px] transition-colors rounded-[10px] cursor-pointer ${
                    isSelected
                      ? 'bg-[#F36922] text-white shadow-xs'
                      : item.isCurrentMonth
                      ? 'text-[#121111] hover:bg-[#F7F8FC]'
                      : 'text-[#8E8E93]/60'
                  }`}
                >
                  {formattedDay}
                </button>
              );
            })}
          </div>

          {/* Separator Line */}
          <div className="border-t border-[#EFEFEF] my-3" />

          {/* Timeslots Header */}
          <h4 className="font-rubik text-[15px] font-light text-[#565656] mb-3 px-1">
            Timeslots
          </h4>

          {/* Timeslots 2-Column Grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {TIMESLOT_OPTIONS.map((slot, idx) => {
              const isSlotSelected = selectedTimeSlot === slot && idx === 0;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`h-[42px] rounded-[12px] font-rubik font-medium text-[13px] transition flex items-center justify-center cursor-pointer ${
                    isSlotSelected
                      ? 'bg-[#F36922] text-white border border-[#F36922] shadow-xs'
                      : 'bg-white text-[#121111] border border-[#E4E4E7] hover:bg-[#F7F8FC]'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-2 mt-auto pt-2">
            <button
              type="button"
              onClick={() => {
                setSelectedDay(null);
                setSelectedTimeSlot('');
                setTempDate('Anytime');
              }}
              className="flex-1 h-[42px] bg-[#F7F8FC] hover:bg-[#EEF0F8] border border-[#E4E4E7] text-[#121111] font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const formatted = selectedDay
                  ? `${monthNames[currentMonthIdx].slice(0, 3)} ${selectedDay}`
                  : 'Anytime';
                onFilterChange({
                  ...filters,
                  datePosted: formatted,
                  timeSlot: selectedTimeSlot,
                });
                setOpenPopover(null);
              }}
              className="flex-1 h-[42px] bg-[#121111] hover:bg-[#000000] text-white font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer shadow-xs"
            >
              Apply
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* 7. LOCATION FILTER */}
      <Popover
        open={openPopover === 'Location'}
        onOpenChange={(open) => handleOpenChange('Location', open)}
      >
        <PopoverTrigger
          className={`h-[40px] px-4 bg-white border rounded-[12px] font-rubik font-normal text-[14px] flex items-center gap-2 shrink-0 transition cursor-pointer outline-none shadow-xs ${
            filters.location
              ? 'border-[#F36922] text-[#121111] font-medium bg-[#F36922]/5'
              : 'border-[#E4E4E7] text-[#565656] hover:bg-neutral-50'
          }`}
        >
          <span>{filters.location ? `Location: ${filters.location}` : 'Location'}</span>
          <ChevronDown className={`w-4 h-4 text-[#565656] transition-transform ${openPopover === 'Location' ? 'rotate-180' : ''}`} />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[300px] p-5 rounded-[12px] bg-white border-none shadow-[0_16px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5 flex flex-col"
        >
          <h3 className="font-rubik text-[15px] font-light text-[#565656] mb-3 px-1">
            Location
          </h3>
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="City, State, or Zip"
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
              className="w-full h-[42px] px-3.5 bg-white border border-[#E4E4E7] rounded-[12px] font-rubik font-normal text-[14px] text-[#121111] placeholder:text-[#565656]/60 outline-none focus:border-[#F36922]"
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            {['Austin, TX', 'Houston, TX', 'Dallas, TX', 'San Antonio, TX'].map((loc) => (
              <div
                key={loc}
                onClick={() => setTempLocation(loc)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-[10px] cursor-pointer transition-colors ${
                  tempLocation === loc ? 'bg-[#F7F8FC]' : 'hover:bg-[#F7F8FC]'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#F36922]" />
                <span className="font-rubik font-medium text-[14px] text-[#121111]">
                  {loc}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-auto pt-2">
            <button
              type="button"
              onClick={() => setTempLocation('')}
              className="flex-1 h-[42px] bg-[#F7F8FC] hover:bg-[#EEF0F8] border border-[#E4E4E7] text-[#121111] font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                onFilterChange({ ...filters, location: tempLocation });
                setOpenPopover(null);
              }}
              className="flex-1 h-[42px] bg-[#121111] hover:bg-[#000000] text-white font-rubik font-medium text-[14px] rounded-[12px] transition flex items-center justify-center cursor-pointer shadow-xs"
            >
              Apply
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
