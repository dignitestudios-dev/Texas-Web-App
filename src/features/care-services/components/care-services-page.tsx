'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/cookies';
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
  Navigation,
  X,
  AlertTriangle,
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
import { toast } from 'sonner';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      const logged = !!getToken();
      setIsLoggedIn(logged);
      if (!logged && activeTab !== 'explore') {
        setActiveTab('explore');
      }
    };
    updateAuth();
    window.addEventListener('authChange', updateAuth);
    window.addEventListener('roleChange', updateAuth);
    return () => {
      window.removeEventListener('authChange', updateAuth);
      window.removeEventListener('roleChange', updateAuth);
    };
  }, [activeTab]);

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
  const [cancelReason, setCancelReason] = useState<string>('');

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

            {/* Action Buttons: View Your Calendar + Filters */}
            <div className="flex items-center gap-2.5">
              {activeTab !== 'explore' && isLoggedIn && (
                <button
                  type="button"
                  onClick={() => router.push('/calendar')}
                  className="box-sizing-border-box flex flex-row justify-center items-center py-3 px-[18px] gap-2 h-[48px] rounded-[12px] bg-[#F36922] hover:bg-[#e05813] border border-[#F36922] text-white cursor-pointer transition shrink-0 shadow-sm"
                >
                  <span className="font-rubik font-medium text-[14px] leading-[17px] tracking-[-0.408px]">
                    View Your Calendar
                  </span>
                  <CalendarIcon className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsFiltersOpen(true)}
                className="box-sizing-border-box flex flex-row justify-center items-center py-3 px-[18px] gap-1.5 h-[48px] rounded-[12px] bg-[#F36922] hover:bg-[#e05813] border border-[#F36922] text-white cursor-pointer transition shrink-0 shadow-sm"
              >
                <span className="font-rubik font-medium text-[14px] leading-[17px] tracking-[-0.408px] capitalize">
                  Filters
                </span>
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Row 2: Search Input */}
          <div className="flex flex-row items-center w-full">
            <div className="box-sizing-border-box flex flex-row justify-between items-center pl-4 pr-1 h-[48px] bg-white border border-[#EFEFEF]/86 rounded-[12px] w-full sm:max-w-[500px] shadow-sm">
              <input
                type="text"
                placeholder="Search for care services"
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

            {/* Only show Requests, Active, and History buttons if logged in */}
            {isLoggedIn && (
              <>
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
              </>
            )}
          </div>

          {/* Vertical Separator Line */}
          <div className="hidden md:block w-[1px] bg-[#0A0A6E]/20 self-stretch mx-[40px]" />

          {/* Main Tab Content Area */}
          <div className="flex h-full overflow-hidden bg-transparent">
            {activeTab === 'explore' && (
              <ExploreTab searchQuery={searchQuery} />
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

      {/* Filters Sheet Modal (Pixel-Perfect Matching Design) */}
      <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <SheetContent
          showCloseButton={false}
          side="right"
          className="w-full sm:max-w-[440px] p-0 bg-white border-l border-[#EFEFEF] overflow-hidden overflow-x-hidden"
        >
          <div className="flex flex-col h-full bg-white relative w-full overflow-x-hidden">
            {/* Header: Single Filters title and close X button */}
            <div className="flex flex-row justify-between items-center py-5 px-6 border-b border-[#F0F0F0] w-full">
              <span className="font-rubik font-bold text-[26px] text-[#121111]">
                Filters
              </span>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition cursor-pointer border-none text-[#121111]"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Scrollable Form Body without horizontal overflow */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-5 flex flex-col gap-5 scrollbar-thin w-full max-w-full">
              {/* Field 1: Location */}
              <div className="flex flex-col gap-2">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Location
                </label>
                <input
                  type="text"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  placeholder="San Juan, Texas(TX)"
                  className="w-full h-[46px] bg-[#F2F4F8] rounded-[10px] px-3.5 font-rubik text-[14px] text-[#121111] placeholder:text-[#8E8E93] border-none outline-none focus:ring-1 focus:ring-[#0A0A6E]"
                />
                {/* Map Preview with Navigation Badge */}
                <div className="w-full h-[110px] rounded-[14px] overflow-hidden relative border border-neutral-200 shadow-2xs mt-1">
                  <Image
                    src="/images/texas_central_map.jpg"
                    alt="Dallas Texas Location Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute right-3 bottom-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#0A0A6E]">
                    <Navigation className="w-4 h-4 fill-[#0A0A6E] text-[#0A0A6E] rotate-45" />
                  </div>
                </div>
              </div>

              {/* Field 2: Radius */}
              <div className="flex flex-col gap-2">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Radius
                </label>
                <div className="flex items-center justify-between text-[13px] font-rubik text-[#121111] px-0.5">
                  <span>0</span>
                  <span className="bg-[#E8EBF8] text-[#0A0A6E] font-medium text-[12px] px-3 py-0.5 rounded-full">
                    {filterRadius} Miles
                  </span>
                  <span>50</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={filterRadius}
                  onChange={(e) => setFilterRadius(Number(e.target.value))}
                  className="w-full accent-[#0A0A6E] cursor-pointer h-2 bg-[#E4E4E7] rounded-lg appearance-none"
                />
              </div>

              {/* Field 3: Pay Range */}
              <div className="flex flex-col gap-2">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Pay Range
                </label>
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="flex-1 h-[46px] bg-[#F2F4F8] rounded-[10px] px-3.5 font-rubik text-[14px] text-[#121111] placeholder:text-[#8E8E93] border-none outline-none focus:ring-1 focus:ring-[#0A0A6E]"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="flex-1 h-[46px] bg-[#F2F4F8] rounded-[10px] px-3.5 font-rubik text-[14px] text-[#121111] placeholder:text-[#8E8E93] border-none outline-none focus:ring-1 focus:ring-[#0A0A6E]"
                  />
                </div>
              </div>

              {/* Field 4: Available Date */}
              <div className="flex flex-col gap-2">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Available Date
                </label>
                <Popover>
                  <PopoverTrigger className="w-full">
                    <div className="w-full h-[46px] bg-[#F2F4F8] rounded-[10px] px-3.5 flex items-center justify-between text-[14px] text-[#121111] font-rubik cursor-pointer">
                      <span className={filterDate ? 'text-[#121111]' : 'text-[#8E8E93]'}>
                        {filterDate ? format(filterDate, 'dd/MM/yyyy') : 'Date'}
                      </span>
                      <CalendarIcon className="w-5 h-5 text-[#0A0A6E]" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white shadow-xl rounded-xl" align="start">
                    <Calendar
                      mode="single"
                      selected={filterDate}
                      onSelect={setFilterDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Field 5: Language */}
              <div className="flex flex-col gap-2">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Language
                </label>
                <div className="flex flex-wrap gap-x-4 gap-y-2.5">
                  {['Arabic', 'Spanish', 'French', 'German', 'English'].map((lang) => {
                    const checked = selectedLanguages.includes(lang);
                    return (
                      <label
                        key={lang}
                        className="flex items-center gap-2 cursor-pointer text-[13.5px] font-rubik text-[#121111]"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
                            } else {
                              setSelectedLanguages([...selectedLanguages, lang]);
                            }
                          }}
                          className="w-4 h-4 rounded border-neutral-300 accent-[#0A0A6E] cursor-pointer"
                        />
                        <span>{lang}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Field 6: Education */}
              <div className="flex flex-col gap-2">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Education
                </label>
                <div className="flex flex-wrap gap-x-4 gap-y-2.5">
                  {['High School', 'Diploma', 'Bachelor', 'Master'].map((edu) => {
                    const checked = selectedEducations.includes(edu);
                    return (
                      <label
                        key={edu}
                        className="flex items-center gap-2 cursor-pointer text-[13.5px] font-rubik text-[#121111]"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              setSelectedEducations(selectedEducations.filter((e) => e !== edu));
                            } else {
                              setSelectedEducations([...selectedEducations, edu]);
                            }
                          }}
                          className="w-4 h-4 rounded border-neutral-300 accent-[#0A0A6E] cursor-pointer"
                        />
                        <span>{edu}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Field 7: Certificate */}
              <div className="flex flex-col gap-2">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Certificate
                </label>
                <div className="flex flex-wrap gap-x-4 gap-y-2.5">
                  {['CPR Certified', 'Licensed Professional', 'Specialized Training', 'First Aid'].map((cert) => {
                    const checked = selectedCertificates.includes(cert);
                    return (
                      <label
                        key={cert}
                        className="flex items-center gap-2 cursor-pointer text-[13.5px] font-rubik text-[#121111]"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              setSelectedCertificates(selectedCertificates.filter((c) => c !== cert));
                            } else {
                              setSelectedCertificates([...selectedCertificates, cert]);
                            }
                          }}
                          className="w-4 h-4 rounded border-neutral-300 accent-[#0A0A6E] cursor-pointer"
                        />
                        <span>{cert}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Buttons: Reset Filter & Apply Filter */}
            <div className="p-5 border-t border-[#F0F0F0] flex flex-col gap-2.5 bg-white">
              <button
                type="button"
                onClick={() => {
                  setIsFiltersOpen(false);
                  toast.success('Filters applied successfully.');
                }}
                className="w-full h-[48px] bg-[#0A0A6E] hover:bg-[#06064B] text-white font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none shadow-sm flex items-center justify-center"
              >
                Apply Filter
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterLocation('San Juan, Texas(TX)');
                  setFilterRadius(15);
                  setSelectedCategories([]);
                  setMinPrice('');
                  setMaxPrice('');
                  setFilterDate(undefined);
                  setSelectedLanguages(['English']);
                  setSelectedEducations([]);
                  setSelectedCertificates([]);
                  toast.info('Filters have been reset.');
                }}
                className="w-full h-[42px] bg-[#F2F4F8] hover:bg-neutral-200 text-[#121111] font-rubik font-medium text-[13.5px] rounded-[12px] transition cursor-pointer border-none flex items-center justify-center"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Cancel Service Modal 3-Step Flow (Pixel-Perfect Matching Screenshots) */}
      <Dialog open={cancelModalStep > 0} onOpenChange={(open) => !open && setCancelModalStep(0)}>
        {/* Step 1: Cancel This Job? */}
        {cancelModalStep === 1 && (
          <DialogContent className="sm:max-w-[390px] bg-white rounded-[28px] p-7 border-none shadow-2xl flex flex-col items-center text-center">
            {/* Red Door Exit Icon Matching Screenshot */}
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
          <DialogContent className="sm:max-w-[440px] bg-[#FEF0E9] rounded-[28px] p-6 sm:p-7 border-none shadow-2xl flex flex-col text-left">
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
                if (cancelTarget === 'requests') setRequestStatus('Cancelled');
                else setOngoingStatus('Cancelled');
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
          <DialogContent className="sm:max-w-[400px] bg-white rounded-[28px] p-8 border-none shadow-2xl flex flex-col items-center text-center">
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

      {/* Mark Job As Done Modal (Pixel-Perfect Matching Screenshot) */}
      <Dialog open={isMarkDoneOpen} onOpenChange={setIsMarkDoneOpen}>
        <DialogContent className="sm:max-w-[390px] bg-white rounded-[28px] p-7 border-none shadow-2xl flex flex-col items-center text-center">
          {/* Custom Orange Icon Matching Screenshot */}
          <div className="w-[56px] h-[50px] relative flex items-center justify-center mb-1">
            <svg width="56" height="50" viewBox="0 0 56 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="26" height="40" rx="9" fill="#F36922" />
              <path d="M18 25H48M48 25L39 16M48 25L39 34" stroke="#F36922" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 25H30" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          <DialogTitle className="font-rubik font-bold text-[24px] sm:text-[26px] text-[#121111] text-center mt-1">
            Mark As Done
          </DialogTitle>
          <DialogDescription className="font-rubik font-normal text-[15px] sm:text-[16px] text-[#565656] text-center max-w-[280px] mx-auto mt-2 leading-[22px]">
            Are you sure your caregver was completed?
          </DialogDescription>

          <div className="flex items-center gap-3 w-full mt-6">
            <button
              type="button"
              onClick={() => setIsMarkDoneOpen(false)}
              className="flex-1 h-[52px] bg-[#FFF0E8] hover:bg-[#FFE5D8] text-[#F36922] font-rubik font-semibold text-[16px] rounded-[16px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setOngoingStatus('Completed');
                setIsMarkDoneOpen(false);
                toast.success('Service marked as completed!');
              }}
              className="flex-1 h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[16px] rounded-[16px] transition cursor-pointer border-none shadow-sm flex items-center justify-center"
            >
              Yes
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
