'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Users,
  Eye,
  Check,
} from 'lucide-react';
import { GiverActiveTab, GiverJobSubTab } from './giver-active-tab';

export function GiverMyJobsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'my-jobs' | 'requests' | 'applied'>('my-jobs');
  const [activeSubTab, setActiveSubTab] = useState<GiverJobSubTab>('upcoming');

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col relative w-full pb-16 items-center">
      {/* Main Container */}
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-[30px] flex flex-col gap-6 items-center">
        {/* Header Breadcrumbs Row */}
        <div className="w-full max-w-[1280px] flex items-center justify-between">
          <div className="flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
            <button
              onClick={() => router.back()}
              className="w-[24px] h-[24px] flex items-center justify-center text-[#121111] hover:opacity-80 transition cursor-pointer border-none bg-transparent mr-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Link href="/" className="hover:text-[#F36922] transition text-[#3D3D3D]">
              Home
            </Link>
            <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
            <span className="font-normal text-[#121111]">My Jobs</span>
          </div>
        </div>

        {/* Content Layout Row (Left Sidebar Navigation + Main Content View) */}
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row items-start gap-8 mt-2">
          {/* Left Navigation Sidebar */}
          <div className="w-full md:w-[180px] flex flex-row md:flex-col items-start gap-4 shrink-0">
            {/* My Jobs Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('my-jobs')}
              className={`flex flex-row items-center p-[6px_12px_6px_6px] gap-2.5 w-[148px] h-[56px] rounded-[32px] cursor-pointer border transition shadow-xs ${
                activeTab === 'my-jobs'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#EEF0F8]'
              }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px]">
                My Jobs
              </span>
            </button>

            {/* Requests Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('requests')}
              className={`flex flex-row items-center p-[6px_12px_6px_6px] gap-2.5 w-[148px] h-[56px] rounded-[32px] cursor-pointer border transition shadow-xs ${
                activeTab === 'requests'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#EEF0F8]'
              }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px]">
                Requests
              </span>
            </button>

            {/* Applied Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('applied')}
              className={`flex flex-row items-center p-[6px_12px_6px_6px] gap-2.5 w-[148px] h-[56px] rounded-[32px] cursor-pointer border transition shadow-xs ${
                activeTab === 'applied'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#EEF0F8]'
              }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <Eye className="w-5 h-5" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px]">
                Applied
              </span>
            </button>
          </div>

          {/* Main Tab Content Area */}
          <div className="flex-1 w-full bg-transparent">
            {activeTab === 'my-jobs' && (
              <GiverActiveTab
                activeSubTab={activeSubTab}
                onSubTabChange={(tab) => setActiveSubTab(tab)}
              />
            )}
            {activeTab === 'requests' && (
              <div className="bg-white border border-[#EFEFEF] rounded-[12px] p-8 text-center font-rubik text-gray-600">
                No active requests found.
              </div>
            )}
            {activeTab === 'applied' && (
              <div className="bg-white border border-[#EFEFEF] rounded-[12px] p-8 text-center font-rubik text-gray-600">
                No applied jobs found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
