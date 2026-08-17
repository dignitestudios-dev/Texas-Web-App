'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Users,
  Eye,
  History,
  Check,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ApplicantsTab } from './applicants-tab';
import { ViewedTab } from './viewed-tab';
import { ActiveTab } from './active-tab';
import { HistoryTab } from './history-tab';
import { CancelJobModal, MarkAsDoneModal } from './job-action-modals';

interface ServiceItem {
  id: string;
  caregiverId: string;
  caregiverName: string;
  caregiverAvatar: string;
  caregiverRating: number;
  caregiverReviews: number;
  caregiverServices: number;
  location: string;
  distance: string;
  featured: boolean;
  serviceTitle: string;
  serviceDescription: string;
  serviceImage: string;
  price: string;
  category: string;
}

const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 'svc-1',
    caregiverId: 'john-doe',
    caregiverName: 'John Doe',
    caregiverAvatar: '/images/avatar.webp',
    caregiverRating: 5.0,
    caregiverReviews: 48,
    caregiverServices: 98,
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    featured: true,
    serviceTitle: 'Get Cleaning Services',
    serviceDescription: "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him...",
    serviceImage: '/images/home/search.webp',
    price: '$10',
    category: 'Disability Support',
  },
  {
    id: 'svc-2',
    caregiverId: 'nandi-bolard',
    caregiverName: 'Nandi Bolard',
    caregiverAvatar: '/images/avatar.webp',
    caregiverRating: 5.0,
    caregiverReviews: 48,
    caregiverServices: 98,
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    featured: true,
    serviceTitle: 'Get Cleaning Services',
    serviceDescription: "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him...",
    serviceImage: '/images/home/search.webp',
    price: '$10',
    category: 'Nursing Care',
  },
  {
    id: 'svc-3',
    caregiverId: 'mark-taylor',
    caregiverName: 'Mark Taylor',
    caregiverAvatar: '/images/avatar.webp',
    caregiverRating: 5.0,
    caregiverReviews: 48,
    caregiverServices: 98,
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    featured: false,
    serviceTitle: 'Get Cleaning Services',
    serviceDescription: "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him...",
    serviceImage: '/images/home/search.webp',
    price: '$10',
    category: 'Elderly Care',
  },
  {
    id: 'svc-4',
    caregiverId: 'james-brown',
    caregiverName: 'James Brown',
    caregiverAvatar: '/images/giver.webp',
    caregiverRating: 5.0,
    caregiverReviews: 48,
    caregiverServices: 98,
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    featured: false,
    serviceTitle: 'Get Cleaning Services',
    serviceDescription: "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him...",
    serviceImage: '/images/home/search.webp',
    price: '$10',
    category: 'Child Care',
  },
];

export default function MyJobsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'requests' | 'explore' | 'history'>('active');

  // Requests Section interactive state
  const [requestStatus, setRequestStatus] = useState<'Pending' | 'Completed' | 'Cancelled'>('Pending');
  const [cancelModalStep, setCancelModalStep] = useState<number>(0);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Active Tab Sub-States
  const [activeSubTab, setActiveSubTab] = useState<'ongoing' | 'upcoming'>('ongoing');
  const [ongoingStatus, setOngoingStatus] = useState<'Active' | 'Completed' | 'Cancelled'>('Active');
  const [cancelTarget, setCancelTarget] = useState<'requests' | 'ongoing'>('requests');
  const [isMarkDoneOpen, setIsMarkDoneOpen] = useState(false);
  const [markDoneTargetId, setMarkDoneTargetId] = useState('john-doe');
  const [historySubTab, setHistorySubTab] = useState<'completed' | 'cancelled'>('completed');

  return (
    <div className="h-[calc(100vh-0px)] bg-[#FFF6F0]/20 flex flex-col relative w-full overflow-hidden">
      {/* Peach Background Wrapper */}
      <div className="absolute inset-0 bg-[#F36922]/1 pointer-events-none z-0" />

      {/* Main content container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center pt-[30px] px-8 lg:px-[150px] gap-[30px] pb-6 overflow-hidden">

        {/* Header Controls Block */}
        <div className="w-full max-w-[1280px] flex flex-col gap-[20px] shrink-0 bg-transparent">

          {/* Row 1: Back arrow + Breadcrumbs (Left) and Post A Care Request Button (Right) */}
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
                <span className="font-normal text-[#3D3D3D]">My Jobs</span>
              </div>
            </div>

            {/* Post A Care Request Button */}
            <Link
              href="/create-job"
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
              onClick={() => setActiveTab('active')}
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
              onClick={() => setActiveTab('requests')}
              className={`box-sizing-border-box flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition ${activeTab === 'requests'
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
              onClick={() => setActiveTab('explore')}
              className={`box-sizing-border-box flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition ${activeTab === 'explore'
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
              onClick={() => setActiveTab('history')}
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
              <ActiveTab
                activeSubTab={activeSubTab}
                onSubTabChange={setActiveSubTab}
                ongoingStatus={ongoingStatus}
                onCancelOngoingClick={() => {
                  setCancelTarget('ongoing');
                  setCancelModalStep(1);
                }}
                onMarkDoneClick={() => {
                  setMarkDoneTargetId('john-doe');
                  setIsMarkDoneOpen(true);
                }}
              />
            )}

            {activeTab === 'requests' && (
              <ApplicantsTab />
            )}

            {activeTab === 'explore' && (
              <ViewedTab />
            )}

            {activeTab === 'history' && (
              <HistoryTab
                historySubTab={historySubTab}
                onSubTabChange={setHistorySubTab}
              />
            )}
          </div>

        </div>

      </div>

      {/* Cancel Request / Ongoing Modal Flow */}
      <CancelJobModal
        open={isCancelModalOpen || cancelModalStep > 0}
        onOpenChange={(val) => {
          setIsCancelModalOpen(val);
          if (!val) setCancelModalStep(0);
        }}
        onSuccessClose={() => {
          if (cancelTarget === 'requests') setRequestStatus('Cancelled');
          else setOngoingStatus('Cancelled');
        }}
      />

      {/* Mark Job As Done Modal */}
      <MarkAsDoneModal
        open={isMarkDoneOpen}
        onOpenChange={setIsMarkDoneOpen}
        onConfirm={() => {
          setOngoingStatus('Completed');
          setIsMarkDoneOpen(false);
          router.push(`/review/${markDoneTargetId}`);
        }}
      />
    </div>
  );
}
