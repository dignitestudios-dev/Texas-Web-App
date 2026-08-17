'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Search,
  Sliders,
  Users,
  Eye,
  History,
  Check,
  Calendar as CalendarIcon,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ExploreTab } from './explore-tab';
import { RequestsTab } from './requests-tab';
import { ActiveTab } from './active-tab';
import { HistoryTab } from './history-tab';

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
  {
    id: 'svc-5',
    caregiverId: 'sara-wilson',
    caregiverName: 'Sara Wilson',
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
    category: 'Hospice Support',
  },
  {
    id: 'svc-6',
    caregiverId: 'maria-garcia',
    caregiverName: 'Maria Garcia',
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
    category: 'Homework Assistance',
  },
];

export default function CareServicesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'explore' | 'requests' | 'active' | 'history'>('explore');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter States
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filterLocation, setFilterLocation] = useState('San Juan, Texas(TX)');
  const [filterRadius, setFilterRadius] = useState(15);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Nursing Care',
    'Child Care',
    'Disability Support',
    'Hospice Support',
    'Homework Assistance',
  ]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);

  // Requests Section interactive state
  const [requestStatus, setRequestStatus] = useState<'Pending' | 'Completed' | 'Cancelled'>('Pending');
  const [cancelModalStep, setCancelModalStep] = useState<number>(0);

  // Active Tab Sub-States
  const [activeSubTab, setActiveSubTab] = useState<'ongoing' | 'upcoming'>('ongoing');
  const [ongoingStatus, setOngoingStatus] = useState<'Active' | 'Completed' | 'Cancelled'>('Active');
  const [cancelTarget, setCancelTarget] = useState<'requests' | 'ongoing'>('requests');
  const [isMarkDoneOpen, setIsMarkDoneOpen] = useState(false);
  const [markDoneTargetId, setMarkDoneTargetId] = useState('john-doe');
  const [historySubTab, setHistorySubTab] = useState<'completed' | 'cancelled'>('completed');

  const filteredServices = MOCK_SERVICES.filter((svc) => {
    const matchesSearch =
      svc.caregiverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.serviceDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(svc.category);

    const priceNum = parseInt(svc.price.replace('$', ''), 10);
    const matchesMinPrice = !minPrice || priceNum >= parseInt(minPrice, 10);
    const matchesMaxPrice = !maxPrice || priceNum <= parseInt(maxPrice, 10);

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="h-[calc(100vh-0px)] bg-[#FFF6F0]/20 flex flex-col relative w-full overflow-hidden">
      {/* Peach Background Wrapper */}
      <div className="absolute inset-0 bg-[#F36922]/1 pointer-events-none z-0" />

      {/* Main content container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center pt-[30px] px-8 lg:px-[150px] gap-[30px] pb-6 overflow-hidden">

        {/* Header Controls Block */}
        <div className="w-full max-w-[1280px] flex flex-col gap-[20px] shrink-0 bg-transparent">

          {/* Row 1: Back arrow + Breadcrumbs (Left) and Filters Button (Right) */}
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex items-center gap-[16px] h-[48px]">
              <button
                onClick={() => router.back()}
                className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none"
              >
                <ArrowLeft className="text-white w-6 h-6" />
              </button>
              <div className="flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
                <Link href="/" className="hover:text-[#F36922] transition">Home</Link>
                <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
                <span className="font-normal text-[#3D3D3D]">Care Services</span>
              </div>
            </div>

            {/* Filters Button */}
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="box-sizing-border-box flex flex-row justify-center items-center py-3 px-[15px] gap-1.5 h-[48px] rounded-[12px] bg-[#F36922] hover:bg-[#e05813] border border-[#F36922] text-white cursor-pointer transition shrink-0 shadow-sm"
            >
              <span className="font-rubik font-medium text-[14px] leading-[17px] tracking-[-0.408px] capitalize">
                Filters
              </span>
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          {/* Row 2: Search Input */}
          <div className="flex flex-row items-center w-full">
            <div className="box-sizing-border-box flex flex-row justify-between items-center pl-4 pr-1 h-[48px] bg-white border border-[#EFEFEF]/86 rounded-[12px] w-full sm:max-w-[500px] shadow-sm">
              <input
                type="text"
                placeholder="Search for job"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="font-rubik font-light text-[14px] text-[#1A2E35] placeholder-[#1A2E35]/60 bg-transparent border-none outline-none flex-1 pr-2"
              />
              <button className="w-[38px] h-[38px] bg-[#F36922] hover:bg-[#e05813] transition rounded-[8px] flex items-center justify-center cursor-pointer border-none text-white">
                <Search className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>

        </div>

        {/* Content Layout Column (Sidebar + Separator + Cards list) */}
        <div className="w-full max-w-[1280px] flex-1 flex flex-col md:flex-row items-stretch gap-0 mt-2 bg-transparent overflow-hidden">

          {/* Left Navigation Sidebar */}
          <div className="w-full md:w-[160px] flex flex-row md:flex-col items-start gap-[18px] shrink-0 p-0 mb-6 md:mb-0">
            {/* Explore Button */}
            <button
              onClick={() => setActiveTab('explore')}
              className={`box-sizing-border-box flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition ${activeTab === 'explore'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#eaecef]'
                }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                Explore
              </span>
            </button>

            {/* Requests Button */}
            <button
              onClick={() => setActiveTab('requests')}
              className={`box-sizing-border-box flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition ${activeTab === 'requests'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#eaecef]'
                }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                Requests
              </span>
            </button>

            {/* Active Button */}
            <button
              onClick={() => setActiveTab('active')}
              className={`box-sizing-border-box flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition ${activeTab === 'active'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#eaecef]'
                }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <Eye className="w-5 h-5" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                Active
              </span>
            </button>

            {/* History Button */}
            <button
              onClick={() => setActiveTab('history')}
              className={`box-sizing-border-box flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition ${activeTab === 'history'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#eaecef]'
                }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <History className="w-5 h-5" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                History
              </span>
              <div className="w-2 h-2 bg-[#C81E1E] rounded-full ml-auto mr-1" />
            </button>
          </div>

          {/* Vertical Separator Line */}
          <div className="hidden md:block w-[1px] bg-[#0A0A6E]/20 self-stretch mx-[40px]" />

          {/* Main Tab Content Area */}
          <div className="flex-1 h-full overflow-hidden bg-transparent">
            {activeTab === 'explore' && (
              <ExploreTab filteredServices={filteredServices} />
            )}

            {activeTab === 'requests' && (
              <RequestsTab
                requestStatus={requestStatus}
                onCancelClick={() => {
                  setCancelTarget('requests');
                  setCancelModalStep(1);
                }}
                onResetRequest={() => setRequestStatus('Pending')}
              />
            )}

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

            {activeTab === 'history' && (
              <HistoryTab
                historySubTab={historySubTab}
                onSubTabChange={setHistorySubTab}
              />
            )}
          </div>

        </div>

      </div>

      {/* Filters Sheet Modal */}
      <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[450px] p-0 bg-white border-l border-[#EFEFEF]">
          <div className="flex flex-col h-full bg-white relative">
            {/* Header */}
            <div className="flex flex-row justify-between items-center py-[20px] px-[25px] border-b border-[#EFEFEF]">
              <span className="font-rubik font-medium text-[20px] text-[#121111]">
                Filter By
              </span>
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F8F9FF] flex items-center justify-center hover:bg-neutral-100 transition cursor-pointer border-none"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-[25px] flex flex-col gap-[24px]">
              {/* Location */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-rubik font-medium text-[15px] text-[#121111]">Location</label>
                <div className="h-[48px] bg-[#F8F9FF] rounded-[10px] px-[15px] flex items-center justify-between border border-[#EFEFEF]">
                  <input
                    type="text"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="font-rubik text-[14px] text-[#121111] bg-transparent outline-none flex-1"
                  />
                  <span className="text-[12px] text-[#F36922] cursor-pointer font-medium">Change</span>
                </div>
              </div>

              {/* Radius */}
              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between items-center">
                  <label className="font-rubik font-medium text-[15px] text-[#121111]">Radius</label>
                  <span className="font-rubik text-[14px] text-[#F36922] font-medium">{filterRadius} miles</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={filterRadius}
                  onChange={(e) => setFilterRadius(Number(e.target.value))}
                  className="w-full accent-[#F36922] cursor-pointer"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-rubik font-medium text-[15px] text-[#121111]">Care Categories</label>
                <div className="flex flex-wrap gap-[8px]">
                  {[
                    'Nursing Care',
                    'Elderly Care',
                    'Child Care',
                    'Disability Support',
                    'Hospice Support',
                    'Homework Assistance',
                  ].map((cat) => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedCategories(selectedCategories.filter((c) => c !== cat));
                          } else {
                            setSelectedCategories([...selectedCategories, cat]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full text-[13px] font-rubik transition border cursor-pointer ${isSelected
                            ? 'bg-[#F36922] text-white border-[#F36922]'
                            : 'bg-[#F8F9FF] text-[#121111] border-[#EFEFEF] hover:bg-neutral-100'
                          }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-rubik font-medium text-[15px] text-[#121111]">Price Range ($/hr)</label>
                <div className="flex gap-[12px] items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 h-[44px] bg-[#F8F9FF] rounded-[10px] px-[12px] font-rubik text-[14px] border border-[#EFEFEF] outline-none"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 h-[44px] bg-[#F8F9FF] rounded-[10px] px-[12px] font-rubik text-[14px] border border-[#EFEFEF] outline-none"
                  />
                </div>
              </div>

              {/* Availability Date */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-rubik font-medium text-[15px] text-[#121111]">Date Needed</label>
                <Popover>
                  <PopoverTrigger>
                    <button className="w-full h-[48px] bg-[#F8F9FF] rounded-[10px] px-[15px] flex items-center justify-between border border-[#EFEFEF] text-left cursor-pointer">
                      <span className="font-rubik text-[14px] text-[#121111]">
                        {filterDate ? format(filterDate, 'PPP') : 'Select Date'}
                      </span>
                      <CalendarIcon className="w-4 h-4 text-[#121111]" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={filterDate}
                      onSelect={setFilterDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Languages */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-rubik font-medium text-[15px] text-[#121111]">Languages Spoken</label>
                <div className="flex flex-wrap gap-[8px]">
                  {['English', 'Spanish', 'French', 'German'].map((lang) => {
                    const isSel = selectedLanguages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          if (isSel) setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
                          else setSelectedLanguages([...selectedLanguages, lang]);
                        }}
                        className={`px-3 py-1.5 rounded-full text-[13px] font-rubik transition border cursor-pointer ${isSel
                            ? 'bg-[#0A0A6E] text-white border-[#0A0A6E]'
                            : 'bg-[#F8F9FF] text-[#121111] border-[#EFEFEF]'
                          }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-[20px] border-t border-[#EFEFEF] flex gap-[12px] bg-white">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategories([]);
                  setMinPrice('');
                  setMaxPrice('');
                  setFilterDate(undefined);
                }}
                className="flex-1 h-[48px] rounded-[10px] border border-[#EFEFEF] font-rubik font-medium text-[14px] text-[#121111] hover:bg-neutral-50 transition cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="flex-1 h-[48px] rounded-[10px] bg-[#F36922] hover:bg-[#e05813] font-rubik font-medium text-[14px] text-white transition cursor-pointer border-none shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Cancel Request / Ongoing Modal Flow */}
      <Dialog open={cancelModalStep > 0} onOpenChange={(open) => !open && setCancelModalStep(0)}>
        <DialogContent className="sm:max-w-[420px] bg-white rounded-2xl p-6 border-none shadow-xl">
          <DialogTitle className="font-rubik font-semibold text-[18px] text-[#121111] text-center">
            {cancelModalStep === 1 ? 'Cancel Confirmation' : 'Request Cancelled'}
          </DialogTitle>
          <DialogDescription className="font-rubik font-light text-[14px] text-[#3D3D3D] text-center mt-2">
            {cancelModalStep === 1
              ? 'Are you sure you want to cancel this booking request? This action cannot be undone.'
              : 'Your booking request has been successfully cancelled.'}
          </DialogDescription>

          <div className="flex gap-3 justify-center mt-6">
            {cancelModalStep === 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => setCancelModalStep(0)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 font-rubik text-[14px] hover:bg-neutral-50 transition cursor-pointer"
                >
                  Keep Request
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (cancelTarget === 'requests') setRequestStatus('Cancelled');
                    else setOngoingStatus('Cancelled');
                    setCancelModalStep(2);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#C81E1E] text-white font-rubik text-[14px] hover:bg-red-700 transition cursor-pointer border-none"
                >
                  Confirm Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setCancelModalStep(0)}
                className="px-6 py-2.5 rounded-xl bg-[#0A0A6E] text-white font-rubik text-[14px] hover:bg-[#080856] transition cursor-pointer border-none"
              >
                Close
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Mark Job As Done Modal */}
      <Dialog open={isMarkDoneOpen} onOpenChange={setIsMarkDoneOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white rounded-2xl p-6 border-none shadow-xl">
          <DialogTitle className="font-rubik font-semibold text-[18px] text-[#121111] text-center">
            Mark Job As Completed
          </DialogTitle>
          <DialogDescription className="font-rubik font-light text-[14px] text-[#3D3D3D] text-center mt-2">
            Have you completed the required care services with John Doe? Marking as done will update the job status to Completed.
          </DialogDescription>

          <div className="flex gap-3 justify-center mt-6">
            <button
              type="button"
              onClick={() => setIsMarkDoneOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-neutral-200 font-rubik text-[14px] hover:bg-neutral-50 transition cursor-pointer"
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={() => {
                setOngoingStatus('Completed');
                setIsMarkDoneOpen(false);
                router.push(`/review/${markDoneTargetId}`);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#F36922] text-white font-rubik text-[14px] hover:bg-[#e05813] transition cursor-pointer border-none shadow-sm"
            >
              Complete &amp; Leave Review
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
