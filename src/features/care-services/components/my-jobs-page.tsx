'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Users,
  Eye,
  History,
  Check,
  Calendar as CalendarIcon,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { ApplicantsTab } from './applicants-tab';
import { ViewedTab } from './viewed-tab';
import { MyJobsActiveTab } from './my-jobs-active-tab';
import { HistoryTab } from './history-tab';

export type MyJobsTab = 'active' | 'applicants' | 'viewed' | 'history';
export type ActiveSubTab = 'ongoing' | 'upcoming';
export type HistorySubTab = 'completed' | 'cancelled';

export default function MyJobsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Cancel Modal Flow (3-Step Flow)
  const [cancelModalStep, setCancelModalStep] = useState<number>(0);
  const [cancelReason, setCancelReason] = useState<string>('');

  // Primary tab from URL search params
  const rawTab = searchParams.get('tab') as MyJobsTab | null;
  const activeTab: MyJobsTab =
    rawTab && ['active', 'applicants', 'viewed', 'history'].includes(rawTab)
      ? rawTab
      : 'active';

  // Inner sub-tabs from URL search params
  const rawSubTab = searchParams.get('subTab');

  const activeSubTab: ActiveSubTab =
    activeTab === 'active' && rawSubTab === 'upcoming' ? 'upcoming' : 'ongoing';

  const historySubTab: HistorySubTab =
    activeTab === 'history' && rawSubTab === 'cancelled' ? 'cancelled' : 'completed';

  // Handle side tab changes and update URL
  const handleTabChange = (newTab: MyJobsTab) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('tab', newTab);
    if (newTab === 'active') {
      params.set('subTab', activeSubTab);
    } else if (newTab === 'history') {
      params.set('subTab', historySubTab);
    } else {
      params.delete('subTab');
    }
    router.push(`/my-jobs?${params.toString()}`);
  };

  // Handle active inner subtab change
  const handleActiveSubTabChange = (subTab: ActiveSubTab) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('tab', 'active');
    params.set('subTab', subTab);
    router.push(`/my-jobs?${params.toString()}`);
  };

  // Handle history inner subtab change
  const handleHistorySubTabChange = (subTab: HistorySubTab) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('tab', 'history');
    params.set('subTab', subTab);
    router.push(`/my-jobs?${params.toString()}`);
  };

  // Dynamic Breadcrumb Label
  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'active':
        return activeSubTab === 'upcoming' ? 'Active Job - Upcoming' : 'Active Job - Ongoing';
      case 'applicants':
        return 'Applicants';
      case 'viewed':
        return 'Viewed';
      case 'history':
        return historySubTab === 'cancelled' ? 'History - Cancelled' : 'History - Completed';
      default:
        return 'My Jobs';
    }
  };

  return (
    <div className="h-[calc(100vh-0px)] bg-[#FFF6F0]/20 flex flex-col relative w-full overflow-hidden">
      {/* Peach Background Wrapper */}
      <div className="absolute inset-0 bg-[#F36922]/1 pointer-events-none z-0" />

      {/* Main content container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center pt-[30px] px-8 lg:px-[150px] gap-[30px] pb-6 overflow-hidden">

        {/* Header Controls Block */}
        <div className="w-full max-w-[1280px] flex flex-col gap-[20px] shrink-0 bg-transparent">

          {/* Row 1: Back arrow + Breadcrumbs (Left) and Action Buttons (Right) */}
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex items-center gap-[16px] h-[48px]">
              <button
                onClick={() => router.back()}
                className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none shadow-sm"
              >
                <ArrowLeft className="text-white w-6 h-6" />
              </button>
              <div className="flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
                <Link href="/" className="hover:text-[#F36922] transition">Home</Link>
                <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
                <span className="font-normal text-[#3D3D3D]">
                  {getBreadcrumb()}
                </span>
              </div>
            </div>

            {/* Right Button: Post A Care Request */}
            <Link
              href="/care-request"
              className="h-[48px] px-[20px] bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-[8px] flex items-center justify-center font-rubik font-medium text-[14px] leading-[24px] capitalize cursor-pointer transition border-none shadow-sm"
            >
              Post A Care Request
            </Link>
          </div>

        </div>

        {/* Content Layout Column (Sidebar + Separator + Cards list) */}
        <div className="w-full max-w-[1280px] flex-1 flex flex-col md:flex-row items-stretch gap-0 mt-2 bg-transparent overflow-hidden">

          {/* Left Navigation Sidebar */}
          <div className="w-full md:w-[160px] flex flex-row md:flex-col items-start gap-[18px] shrink-0 p-0 mb-6 md:mb-0">
            {/* Active Button */}
            <button
              onClick={() => handleTabChange('active')}
              className={`box-sizing-border-box flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition ${activeTab === 'active'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white shadow-sm'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#eaecef]'
                }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                Active
              </span>
            </button>

            {/* Applicants Button */}
            <button
              onClick={() => handleTabChange('applicants')}
              className={`box-sizing-border-box flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition ${activeTab === 'applicants'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white shadow-sm'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#eaecef]'
                }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                Applicants
              </span>
            </button>

            {/* Viewed Button */}
            <button
              onClick={() => handleTabChange('viewed')}
              className={`box-sizing-border-box flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition ${activeTab === 'viewed'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white shadow-sm'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#eaecef]'
                }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <Eye className="w-5 h-5" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                Viewed
              </span>
            </button>

            {/* History Button */}
            <button
              onClick={() => handleTabChange('history')}
              className={`box-sizing-border-box flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition ${activeTab === 'history'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white shadow-sm'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#eaecef]'
                }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <History className="w-5 h-5" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                History
              </span>
            </button>
          </div>

          {/* Vertical Separator Line */}
          <div className="hidden md:block w-[1px] bg-[#0A0A6E]/20 self-stretch mx-[40px]" />

          {/* Main Tab Content Area */}
          <div className="flex-1 h-full overflow-hidden bg-transparent">
            {activeTab === 'active' && (
              <MyJobsActiveTab
                activeSubTab={activeSubTab}
                onSubTabChange={handleActiveSubTabChange}
                onCancelOngoingClick={() => setCancelModalStep(1)}
              />
            )}

            {activeTab === 'applicants' && (
              <ApplicantsTab />
            )}

            {activeTab === 'viewed' && (
              <ViewedTab />
            )}

            {activeTab === 'history' && (
              <HistoryTab
                historySubTab={historySubTab}
                onSubTabChange={handleHistorySubTabChange}
                showCalendarButton={true}
              />
            )}
          </div>

        </div>

      </div>

      {/* Cancel Service Modal 3-Step Flow (Pixel-Perfect Matching Screenshots) */}
      <Dialog open={cancelModalStep > 0} onOpenChange={(open) => !open && setCancelModalStep(0)}>
        {/* Step 1: Cancel This Job? */}
        {cancelModalStep === 1 && (
          <DialogContent showCloseButton={false} className="sm:max-w-[390px] bg-white rounded-[28px] p-7 border-none shadow-2xl flex flex-col items-center text-center">
            {/* Red Door Exit Icon */}
            <div className="w-[56px] h-[50px] relative flex items-center justify-center mb-1">
              <svg width="56" height="50" viewBox="0 0 56 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="26" height="40" rx="9" fill="#D32F2F" />
                <path d="M18 25H48M48 25L39 16M48 25L39 34" stroke="#D32F2F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 25H30" stroke="white" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>

            <DialogTitle className="font-rubik font-bold text-[24px] sm:text-[26px] text-[#121111] text-center mt-1">
              Cancel This Job?
            </DialogTitle>
            <DialogDescription className="font-rubik font-normal text-[15px] sm:text-[16px] text-[#565656] text-center max-w-[280px] mx-auto mt-2 leading-[22px]">
              Are you sure you want to cancel Job?
            </DialogDescription>

            <div className="flex items-center gap-3 w-full mt-6">
              <button
                type="button"
                onClick={() => setCancelModalStep(2)}
                className="flex-1 h-[52px] bg-[#FFF0E8] hover:bg-[#FFE5D8] text-[#F36922] font-rubik font-semibold text-[16px] rounded-[16px] transition cursor-pointer border-none flex items-center justify-center"
              >
                Cancel Job
              </button>
              <button
                type="button"
                onClick={() => setCancelModalStep(0)}
                className="flex-1 h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[16px] rounded-[16px] transition cursor-pointer border-none shadow-sm flex items-center justify-center"
              >
                Keep Job
              </button>
            </div>
          </DialogContent>
        )}

        {/* Step 2: Cancellation Reason Textarea */}
        {cancelModalStep === 2 && (
          <DialogContent showCloseButton={false} className="sm:max-w-[440px] bg-[#FEF0E9] rounded-[28px] p-6 sm:p-7 border-none shadow-2xl flex flex-col text-left">
            <div className="flex items-center justify-between w-full pb-3">
              <DialogTitle className="font-rubik font-bold text-[22px] text-[#121111]">
                Cancellation Reason
              </DialogTitle>
              <button
                type="button"
                onClick={() => setCancelModalStep(0)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition cursor-pointer border-none text-[#121111]"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason"
              className="w-full h-[150px] bg-white rounded-[18px] p-4 font-rubik text-[15px] text-[#121111] placeholder:text-[#A1A1AA] border border-neutral-100 outline-none resize-none focus:ring-1 focus:ring-[#F36922] shadow-2xs"
            />

            <button
              type="button"
              onClick={() => {
                setCancelModalStep(3);
                toast.error('Booking has been cancelled.');
              }}
              className="w-full h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[16px] rounded-[16px] shadow-sm transition cursor-pointer border-none flex items-center justify-center mt-5"
            >
              Submit
            </button>
          </DialogContent>
        )}

        {/* Step 3: Job Cancel Confirmation */}
        {cancelModalStep === 3 && (
          <DialogContent showCloseButton={false} className="sm:max-w-[400px] bg-white rounded-[28px] p-8 border-none shadow-2xl flex flex-col items-center text-center">
            {/* Orange Square with White Checkmark */}
            <div className="w-[56px] h-[56px] rounded-[16px] bg-[#F36922] flex items-center justify-center mb-2 shadow-xs">
              <Check className="w-8 h-8 text-white stroke-[3.5]" />
            </div>

            <DialogTitle className="font-rubik font-bold text-[24px] sm:text-[26px] text-[#121111] text-center mt-1">
              Job Cancel
            </DialogTitle>
            <DialogDescription className="font-rubik font-normal text-[15px] sm:text-[16px] text-[#565656] text-center max-w-[340px] mx-auto mt-2 leading-[24px]">
              Job has been cancelled... You have 2 cancel jobs remaining. After that no request or booking for almost 24 hrs.
            </DialogDescription>

            <div className="w-full mt-6">
              <button
                type="button"
                onClick={() => setCancelModalStep(0)}
                className="w-full h-[48px] bg-[#F8F9FF] hover:bg-neutral-100 text-[#121111] font-rubik font-medium text-[15px] rounded-[14px] transition cursor-pointer border border-[#EFEFEF] flex items-center justify-center"
              >
                Close
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
