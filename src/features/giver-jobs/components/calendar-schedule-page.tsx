'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { getToken } from '@/lib/cookies';

export function CalendarSchedulePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('Week 1');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!getToken());
    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  // Days of week header for grid
  const daysHeader = [
    { label: 'Mon 01', day: 'Mon', date: '01' },
    { label: 'Tue 02', day: 'Tue', date: '02' },
    { label: 'Wed 03', day: 'Wed', date: '03' },
    { label: 'Thur 04', day: 'Thur', date: '04' },
    { label: 'Fri 05', day: 'Fri', date: '05' },
    { label: 'Sat 06', day: 'Sat', date: '06' },
    { label: 'Sun 07', day: 'Sun', date: '07' },
  ];

  // Time grid slots
  const timeSlots = [
    '00:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col w-full items-center pb-16 select-none">
      {/* Container */}
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-start min-h-[900px]">
        {/* Left Sidebar (280px) */}
        <div className="w-full lg:w-[280px] bg-[#F1F5F9] border-r border-[#E4E4E7] p-4 flex flex-col gap-6 shrink-0">
          {/* Header Row */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-6 h-6 flex items-center justify-center text-[#121111] hover:opacity-80 transition cursor-pointer border-none bg-transparent"
            >
              <ArrowLeft className="w-5 h-5 text-[#121111]" />
            </button>
            <h1 className="font-poppins font-medium text-[18px] text-[#121111]">
              January
            </h1>
          </div>

          {/* Mini Calendar Box */}
          <div className="w-full flex flex-col gap-2 bg-white/50 p-3 rounded-[12px] border border-[#E4E4E7]/60 shadow-xs">
            {/* Days Header */}
            <div className="grid grid-cols-7 text-center font-poppins font-medium text-[10px] text-[#121111] opacity-70 pb-1">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-7 gap-y-2 text-center font-poppins text-[10px] font-medium text-[#121111]">
              {/* Row 1 */}
              <span className="py-1">01</span>
              <div className="flex items-center justify-center">
                {isLoggedIn ? (
                  <span className="w-6 h-6 rounded-full bg-[#4253F0] text-white flex items-center justify-center font-medium shadow-xs">
                    02
                  </span>
                ) : (
                  <span className="py-1">02</span>
                )}
              </div>
              <span className="py-1">03</span>
              <div className="flex flex-col items-center justify-center py-1">
                <span>04</span>
                {isLoggedIn && <span className="w-1 h-1 bg-[#F36922] rounded-full mt-0.5" />}
              </div>
              <span className="py-1">05</span>
              <span className="py-1">06</span>
              <span className="py-1">07</span>

              {/* Row 2 */}
              <span className="py-1">08</span>
              <span className="py-1">09</span>
              <span className="py-1">10</span>
              <span className="py-1">11</span>
              <span className="py-1">12</span>
              <span className="py-1">13</span>
              <span className="py-1">14</span>

              {/* Row 3 */}
              <span className="py-1">15</span>
              <span className="py-1">16</span>
              <span className="py-1">17</span>
              <div className="flex flex-col items-center justify-center py-1">
                <span>18</span>
                {isLoggedIn && <span className="w-1 h-1 bg-[#F36922] rounded-full mt-0.5" />}
              </div>
              <span className="py-1">19</span>
              <span className="py-1">20</span>
              <span className="py-1">21</span>

              {/* Row 4 */}
              <span className="py-1">22</span>
              <span className="py-1">23</span>
              <span className="py-1">24</span>
              <span className="py-1">25</span>
              <span className="py-1">26</span>
              <span className="py-1">27</span>
              <span className="py-1">28</span>

              {/* Row 5 */}
              <span className="py-1">29</span>
              <span className="py-1">30</span>
              <span className="py-1">31</span>
              <span className="py-1 text-black/30">01</span>
              <span className="py-1 text-black/30">02</span>
              <span className="py-1 text-black/30">03</span>
              <span className="py-1 text-black/30">04</span>
            </div>
          </div>

          {/* Upcoming Events / Auth Guard Notice */}
          {isLoggedIn ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <h2 className="font-poppins font-medium text-[14px] text-[#121111]">
                  Upcoming Events
                </h2>
                <p className="font-poppins font-light text-[12px] text-[#565656]">
                  Your all upcoming events are below
                </p>
              </div>

              {/* Event Group 1 */}
              <div className="flex flex-col gap-2">
                <div className="bg-[#FEF0E9] rounded-[8px] px-3 py-1.5 flex items-center justify-between font-poppins font-medium text-[12px] text-[#121111]">
                  <span>01 Jan</span>
                  <span>MON</span>
                </div>

                <div className="bg-white/70 rounded-[8px] p-2.5 flex flex-col gap-1 border border-[#E4E4E7]/60 shadow-xs">
                  <span className="font-poppins font-normal text-[13px] text-[#121111] leading-tight">
                    I'm searching for a meal prep service.
                  </span>
                  <span className="font-poppins font-light text-[12px] text-[#565656]">
                    8:00am - 10:00am
                  </span>
                </div>

                <div className="bg-white/70 rounded-[8px] p-2.5 flex flex-col gap-1 border border-[#E4E4E7]/60 shadow-xs">
                  <span className="font-poppins font-normal text-[13px] text-[#121111] leading-tight">
                    I'm searching for a meal prep service.
                  </span>
                  <span className="font-poppins font-light text-[12px] text-[#565656]">
                    14:00pm - 18:00pm
                  </span>
                </div>
              </div>

              {/* Event Group 2 */}
              <div className="flex flex-col gap-2">
                <div className="bg-[#FEF0E9] rounded-[8px] px-3 py-1.5 flex items-center justify-between font-poppins font-medium text-[12px] text-[#121111]">
                  <span>04 Jan</span>
                  <span>THU</span>
                </div>

                <div className="bg-white/70 rounded-[8px] p-2.5 flex flex-col gap-1 border border-[#E4E4E7]/60 shadow-xs">
                  <span className="font-poppins font-normal text-[13px] text-[#121111] leading-tight">
                    I'm searching for a meal prep service.
                  </span>
                  <span className="font-poppins font-light text-[12px] text-[#565656]">
                    8:00am - 10:00am
                  </span>
                </div>

                <div className="bg-white/70 rounded-[8px] p-2.5 flex flex-col gap-1 border border-[#E4E4E7]/60 shadow-xs">
                  <span className="font-poppins font-normal text-[13px] text-[#121111] leading-tight">
                    I'm searching for a meal prep service.
                  </span>
                  <span className="font-poppins font-light text-[12px] text-[#565656]">
                    14:00pm - 18:00pm
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Guest State Prompt */
            <div className="flex flex-col items-center text-center p-4 bg-white rounded-[16px] border border-[#E4E4E7] shadow-xs gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FEF0E9] flex items-center justify-center text-[#F36922]">
                <CalendarIcon className="w-5 h-5 text-[#F36922]" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-rubik font-semibold text-[15px] text-[#121111]">
                  Log In to Access Schedule
                </h3>
                <p className="font-rubik font-normal text-[12px] text-[#565656] leading-[17px]">
                  Please log in to view your booked services, upcoming jobs, and schedule events.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full mt-1">
                <Link
                  href="/login"
                  className="w-full h-[38px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[13px] rounded-[10px] flex items-center justify-center transition cursor-pointer"
                >
                  Log In
                </Link>
                <Link
                  href="/role"
                  className="w-full h-[36px] bg-white hover:bg-neutral-50 border border-[#E4E4E7] text-[#121111] font-rubik font-medium text-[13px] rounded-[10px] flex items-center justify-center transition cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Schedule View Area (Flex 1) */}
        <div className="flex-1 bg-white flex flex-col w-full min-h-[900px] border-l border-[#E4E4E7] shadow-xs">
          {/* Top Control Bar */}
          <div className="w-full px-6 py-4 border-b border-[#EFEFEF] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Left Controls */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="button"
                className="h-[36px] px-4 bg-white border border-[#EFEFEF] rounded-[8px] font-poppins font-normal text-[13px] text-[#121111] shadow-xs cursor-pointer hover:bg-neutral-50 transition"
              >
                {selectedWeek}
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="w-8 h-8 rounded-[8px] hover:bg-neutral-100 flex items-center justify-center cursor-pointer transition border-none bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5 text-[#121111]" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-[8px] hover:bg-neutral-100 flex items-center justify-center cursor-pointer transition border-none bg-transparent"
                >
                  <ChevronRight className="w-5 h-5 text-[#121111]" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 font-poppins font-medium text-[16px] text-[#121111] cursor-pointer">
                <span>01 January 2026</span>
                <ChevronDown className="w-4 h-4 text-[#121111]" />
              </div>
            </div>

            {/* Right Search Input */}
            <div className="relative w-full sm:w-[220px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full h-[36px] bg-[#F8F9FF] border border-[#EFEFEF] rounded-[12px] pl-4 pr-9 text-[13px] text-[#121111] placeholder:text-[#727272] focus:outline-none focus:ring-1 focus:ring-[#F36922]"
              />
              <Search className="w-4 h-4 text-[#727272] absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Schedule Table Header */}
          <div className="w-full grid grid-cols-8 border-b border-[#EFEFEF] bg-[#FDFDFD]">
            <div className="w-[60px] sm:w-[70px] border-r border-[#EFEFEF]" />
            {daysHeader.map((d, idx) => (
              <div
                key={idx}
                className="py-3 text-center font-poppins font-medium text-[13px] text-[#121111] border-r border-[#EFEFEF] last:border-r-0"
              >
                {d.label}
              </div>
            ))}
          </div>

          {/* Schedule Time Grid */}
          <div className="w-full flex-1 grid grid-cols-8 relative bg-white min-h-[750px]">
            {/* Time Column (60px) */}
            <div className="w-[60px] sm:w-[70px] flex flex-col border-r border-[#EFEFEF] py-2">
              {timeSlots.map((t, idx) => (
                <div
                  key={idx}
                  className="h-[60px] font-poppins font-normal text-[12px] text-[#121111] opacity-70 pr-3 text-right flex items-start justify-end"
                >
                  {t}
                </div>
              ))}
            </div>

            {/* Day 1 (Mon 01) Grid */}
            <div className="border-r border-[#EFEFEF] relative h-full">
              {/* Grid Lines */}
              {timeSlots.map((_, idx) => (
                <div key={idx} className="h-[60px] border-b border-[#EFEFEF]/50 w-full" />
              ))}

              {/* Event 1 & 2: Only show when logged in */}
              {isLoggedIn && (
                <>
                  <div className="absolute top-[60px] left-1 right-1 h-[110px] bg-[#EEF2FF] border-l-[4px] border-l-[#F36922] rounded-r-[8px] p-3 shadow-xs flex flex-col justify-center gap-1 hover:shadow-md transition cursor-pointer z-10">
                    <span className="font-poppins font-medium text-[13px] text-[#121111] leading-tight">
                      I'm searching for a meal prep service.
                    </span>
                    <span className="font-poppins font-light text-[12px] text-[#565656]">
                      8:00am - 10:00am
                    </span>
                  </div>

                  <div className="absolute top-[420px] left-1 right-1 h-[220px] bg-[#EEF2FF] border-l-[4px] border-l-[#F36922] rounded-r-[8px] p-3 shadow-xs flex flex-col gap-1 hover:shadow-md transition cursor-pointer z-10">
                    <span className="font-poppins font-medium text-[13px] text-[#121111] leading-tight">
                      I'm searching for a meal prep service.
                    </span>
                    <span className="font-poppins font-light text-[12px] text-[#565656]">
                      14:00pm - 18:00pm
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Day 2 (Tue 02) Grid */}
            <div className="border-r border-[#EFEFEF] relative h-full">
              {timeSlots.map((_, idx) => (
                <div key={idx} className="h-[60px] border-b border-[#EFEFEF]/50 w-full" />
              ))}
            </div>

            {/* Day 3 (Wed 03) Grid */}
            <div className="border-r border-[#EFEFEF] relative h-full">
              {timeSlots.map((_, idx) => (
                <div key={idx} className="h-[60px] border-b border-[#EFEFEF]/50 w-full" />
              ))}
            </div>

            {/* Day 4 (Thur 04) Grid */}
            <div className="border-r border-[#EFEFEF] relative h-full">
              {timeSlots.map((_, idx) => (
                <div key={idx} className="h-[60px] border-b border-[#EFEFEF]/50 w-full" />
              ))}

              {/* Event: Only show when logged in */}
              {isLoggedIn && (
                <div className="absolute top-[180px] left-1 right-1 h-[340px] bg-[#EEF2FF] border-l-[4px] border-l-[#F36922] rounded-r-[8px] p-3 shadow-xs flex flex-col gap-1 hover:shadow-md transition cursor-pointer z-10">
                  <span className="font-poppins font-medium text-[13px] text-[#121111] leading-tight">
                    I'm searching for a meal prep service.
                  </span>
                  <span className="font-poppins font-light text-[12px] text-[#565656]">
                    10:00am - 16:30pm
                  </span>
                </div>
              )}
            </div>

            {/* Day 5 (Fri 05) Grid */}
            <div className="border-r border-[#EFEFEF] relative h-full">
              {timeSlots.map((_, idx) => (
                <div key={idx} className="h-[60px] border-b border-[#EFEFEF]/50 w-full" />
              ))}
            </div>

            {/* Day 6 (Sat 06) Grid */}
            <div className="border-r border-[#EFEFEF] relative h-full">
              {timeSlots.map((_, idx) => (
                <div key={idx} className="h-[60px] border-b border-[#EFEFEF]/50 w-full" />
              ))}
            </div>

            {/* Day 7 (Sun 07) Grid */}
            <div className="relative h-full">
              {timeSlots.map((_, idx) => (
                <div key={idx} className="h-[60px] border-b border-[#EFEFEF]/50 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
