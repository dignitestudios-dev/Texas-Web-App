'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Search,
  Sliders,
  Users,
  Eye,
  Briefcase,
  Check,
  Calendar as CalendarIcon,
  X,
  Navigation,
  CheckSquare,
  Square,
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
import { format } from 'date-fns';

import { GiverExploreTab } from './giver-explore-tab';
import { GiverAppliedTab } from './giver-applied-tab';
import { GiverActiveTab, GiverJobSubTab } from './giver-active-tab';
import { GiverHistoryTab } from './giver-history-tab';
import { getToken } from '@/lib/cookies';

export function GiverMyJobsPage() {
  const router = useRouter();
  const isLoggedIn = !!getToken()
  const [activeTab, setActiveTab] = useState<'explore' | 'applied' | 'active' | 'history'>('explore');
  const [activeSubTab, setActiveSubTab] = useState<GiverJobSubTab>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');


  // Filters State
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
  const [selectedEducations, setSelectedEducations] = useState<string[]>(['Diploma']);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>(['CPR Certified']);

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const toggleEducation = (edu: string) => {
    if (selectedEducations.includes(edu)) {
      setSelectedEducations(selectedEducations.filter((e) => e !== edu));
    } else {
      setSelectedEducations([...selectedEducations, edu]);
    }
  };

  const toggleCertificate = (cert: string) => {
    if (selectedCertificates.includes(cert)) {
      setSelectedCertificates(selectedCertificates.filter((c) => c !== cert));
    } else {
      setSelectedCertificates([...selectedCertificates, cert]);
    }
  };

  const allCategories = [
    'Elderly Care',
    'Nursing Care',
    'Babysitting',
    'Child Care',
    'Special Needs Care',
    'Disability Support',
    'Post-Surgery Care',
    'Newborn Care',
    'Hospice Support',
    'Respite Care',
    'Homework Assistance',
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FEF0E9] flex flex-col relative w-full pb-16 items-center">
      {/* Main Container */}
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-[30px] flex flex-col gap-6 items-center">
        
        {/* Header Controls Block */}
        <div className="w-full max-w-[1280px] flex flex-col gap-5 shrink-0 bg-transparent">
          {/* Row 1: Back arrow + Breadcrumbs (Left) and Filters Button (Right) */}
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex items-center gap-[16px] h-[48px]">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer border-none shadow-xs shrink-0"
              >
                <ArrowLeft className="text-white w-5 h-5" />
              </button>
              <div className="flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
                <Link href="/" className="hover:text-[#F36922] transition">
                  Home
                </Link>
                <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
                <span className="font-normal text-[#121111]">Find &amp; Manage Jobs</span>
              </div>
            </div>

            {/* Right Buttons: View Your Calendar & Filters */}
            <div className="flex items-center gap-3">
              <Link
                href="/my-jobs/calendar"
                className="box-border flex flex-row justify-center items-center py-3 px-[18px] gap-2 h-[48px] rounded-[12px] bg-[#F36922] hover:bg-[#e05813] text-white cursor-pointer transition shrink-0 shadow-sm"
              >
                <span className="font-rubik font-medium text-[14px] leading-[17px] capitalize">
                  View Your Calendar
                </span>
                <CalendarIcon className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(true)}
                className="box-border flex flex-row justify-center items-center py-3 px-[18px] gap-2 h-[48px] rounded-[12px] bg-[#F36922] hover:bg-[#e05813] border border-[#F36922] text-white cursor-pointer transition shrink-0 shadow-sm"
              >
                <span className="font-rubik font-medium text-[14px] leading-[17px] capitalize">
                  Filters
                </span>
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Row 2: Search Input */}
          <div className="flex flex-row items-center w-full">
            <div className="box-border flex flex-row justify-between items-center pl-4 pr-1.5 h-[48px] bg-white border border-[#EFEFEF]/86 rounded-[12px] w-full sm:max-w-[420px] shadow-xs">
              <input
                type="text"
                placeholder="Search for care services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="font-rubik font-light text-[14px] text-[#1A2E35] placeholder-[#1A2E35]/60 bg-transparent border-none outline-none flex-1 pr-2"
              />
              <button
                type="button"
                className="w-[38px] h-[38px] bg-[#F36922] hover:bg-[#e05813] transition rounded-[8px] flex items-center justify-center cursor-pointer border-none text-white shrink-0"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout Row (Sidebar Navigation + Separator + Tab Content) */}
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row items-start gap-0 mt-2 bg-transparent">
          {/* Left Navigation Sidebar */}
          <div className="w-full md:w-[150px] flex flex-row md:flex-col items-start gap-[18px] shrink-0 p-0 mb-6 md:mb-0 overflow-x-auto pb-2 md:pb-0">
            {/* Explore Tab (Always visible) */}
            <button
              type="button"
              onClick={() => setActiveTab('explore')}
              className={`box-border flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition shadow-xs shrink-0 ${
                activeTab === 'explore'
                  ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                  : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#EEF0F8]'
              }`}
            >
              <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                Explore
              </span>
            </button>

            {/* Other Tabs: Only rendered when user is logged in */}
            {isLoggedIn && (
              <>
                {/* Applied Tab */}
                <button
                  type="button"
                  onClick={() => setActiveTab('applied')}
                  className={`box-border flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition shadow-xs shrink-0 ${
                    activeTab === 'applied'
                      ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                      : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#EEF0F8]'
                  }`}
                >
                  <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                    Applied
                  </span>
                </button>

                {/* Active Tab */}
                <button
                  type="button"
                  onClick={() => setActiveTab('active')}
                  className={`box-border flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition shadow-xs shrink-0 ${
                    activeTab === 'active'
                      ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                      : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#EEF0F8]'
                  }`}
                >
                  <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                    <Eye className="w-5 h-5" />
                  </div>
                  <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                    Active
                  </span>
                </button>

                {/* History Tab */}
                <button
                  type="button"
                  onClick={() => setActiveTab('history')}
                  className={`box-border flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition shadow-xs shrink-0 ${
                    activeTab === 'history'
                      ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white'
                      : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#EEF0F8]'
                  }`}
                >
                  <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                    History
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Vertical Separator Line */}
          <div className="hidden md:block w-[1px] bg-[#0A0A6E]/20 self-stretch mx-[40px]" />

          {/* Main Tab Content Area */}
          <div className="flex-1 w-full bg-transparent">
            {activeTab === 'explore' && (
              <GiverExploreTab searchQuery={searchQuery} />
            )}

            {activeTab === 'applied' && (
              <GiverAppliedTab />
            )}

            {activeTab === 'active' && (
              <GiverActiveTab
                activeSubTab={activeSubTab}
                onSubTabChange={(tab) => setActiveSubTab(tab)}
              />
            )}

            {activeTab === 'history' && (
              <GiverHistoryTab />
            )}
          </div>
        </div>
      </div>

      {/* Filters Sheet Drawer (Frame 2147228899) */}
      <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <SheetContent
          showCloseButton={false}
          side="right"
          className="w-full sm:max-w-[455px] p-0 bg-white border-l border-[#EFEFEF] rounded-tl-[16px] overflow-hidden"
        >
          <div className="flex flex-col h-full bg-white relative">
            {/* Header (Frame 2147227511) */}
            <div className="flex flex-row justify-between items-center px-8 pt-8 pb-4 bg-white">
              <h2 className="font-rubik font-semibold text-[32px] leading-[38px] tracking-[-0.408px] text-[#121111]">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#121111] hover:bg-neutral-100 transition cursor-pointer border-none bg-transparent"
              >
                <X className="w-7 h-7 stroke-[2.5]" />
              </button>
            </div>

            {/* Scrollable Body (Frame 2147227512) */}
            <div className="flex-1 overflow-y-auto px-8 py-2 flex flex-col gap-6 scrollbar-thin">
              {/* 1. Location Section */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-sans font-medium text-[14px] leading-[19px] text-[#181818] capitalize">
                  Location
                </label>
                <div className="w-full h-[44px] bg-[#F1F5F9] rounded-[4px] px-4 flex items-center">
                  <input
                    type="text"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="font-sans font-normal text-[14px] text-[#181818] bg-transparent outline-none flex-1"
                  />
                </div>

                {/* Map Preview Box (Frame 2147227464) */}
                <div className="w-full h-[102px] rounded-[16px] relative overflow-hidden bg-slate-200 border border-neutral-100 mt-1">
                  <Image
                    src="/images/texas_map.png"
                    alt="Map Location Preview"
                    fill
                    className="object-cover"
                  />
                  {/* Floating Direction Icon Button (ri:direction-fill) */}
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[42px] h-[42px] bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:scale-105 transition">
                    <Navigation className="w-5 h-5 text-[#0A0A6E] fill-[#0A0A6E]" />
                  </div>
                </div>
              </div>

              {/* 2. Radius Section (Frame 2147227274) */}
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex justify-between items-center w-full">
                  <label className="font-sans font-medium text-[14px] leading-[19px] text-[#181818] capitalize">
                    Radius
                  </label>
                  {/* Radius Badge (Frame 48096155) */}
                  <span className="px-2.5 py-0.5 bg-[#0A0A6E]/10 rounded-full font-sans font-normal text-[14px] leading-[19px] text-[#0A0A6E]">
                    {filterRadius} Miles
                  </span>
                </div>

                {/* Min / Max labels */}
                <div className="flex justify-between items-center text-[14px] font-sans text-[#181818] px-0.5">
                  <span>0</span>
                  <span>50</span>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={filterRadius}
                  onChange={(e) => setFilterRadius(Number(e.target.value))}
                  className="w-full accent-[#0A0A6E] cursor-pointer h-1.5 bg-[#E7E7E7] rounded-sm"
                />
              </div>

              {/* 3. Category Section (Frame 2147227276) */}
              <div className="flex flex-col gap-2.5 w-full">
                <label className="font-sans font-medium text-[14px] leading-[19px] text-[#181818] capitalize">
                  Category
                </label>
                <div className="flex flex-wrap gap-2 w-full">
                  {allCategories.map((cat) => {
                    const isSel = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`h-[32px] px-3 rounded-full font-sans font-medium text-[12px] leading-[16px] text-center capitalize transition cursor-pointer flex items-center justify-center ${
                          isSel
                            ? 'bg-[#F1F5F9] border border-[#0A0A6E] text-[#0A0A6E]'
                            : 'bg-white border border-[#D1D1D1] text-[#181818]/80 hover:bg-neutral-50'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Pay Range Section */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-sans font-medium text-[14px] leading-[19px] text-[#181818] capitalize">
                  Pay Range
                </label>
                <div className="flex gap-2.5 items-center w-full">
                  <div className="w-1/2 h-[44px] bg-[#F1F5F9] rounded-[4px] px-4 flex items-center">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full font-sans font-normal text-[14px] text-[#181818] placeholder-[#727272] bg-transparent outline-none"
                    />
                  </div>
                  <div className="w-1/2 h-[44px] bg-[#F1F5F9] rounded-[4px] px-4 flex items-center">
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full font-sans font-normal text-[14px] text-[#181818] placeholder-[#727272] bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Available Date Section */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-sans font-medium text-[14px] leading-[19px] text-[#181818] capitalize">
                  Available Date
                </label>
                <Popover>
                  <PopoverTrigger>
                    <button
                      type="button"
                      className="w-full h-[44px] bg-[#F1F5F9] rounded-[4px] px-4 flex items-center justify-between border-none text-left cursor-pointer"
                    >
                      <span className="font-sans font-normal text-[14px] text-[#181818]">
                        {filterDate ? format(filterDate, 'PPP') : 'Date'}
                      </span>
                      <CalendarIcon className="w-4 h-4 text-[#0A0A6E]" />
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

              {/* 6. Language Section (Frame 2147227465 / Group 1171277304) */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-rubik font-medium text-[14px] leading-[17px] text-[#0E0E0E]">
                  Language
                </label>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-black">
                  {['Arabic', 'Spanish', 'French', 'German', 'English'].map((lang) => {
                    const isChecked = selectedLanguages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 text-[#000000] font-normal text-[14px]"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#0A0A6E]" />
                        ) : (
                          <Square className="w-4 h-4 text-[#727272]" />
                        )}
                        <span>{lang}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7. Education Section (Group 1171277305) */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-rubik font-medium text-[14px] leading-[17px] text-[#0E0E0E]">
                  Education
                </label>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-black">
                  {['High School', 'Diploma', 'Bachelor', 'Master'].map((edu) => {
                    const isChecked = selectedEducations.includes(edu);
                    return (
                      <button
                        key={edu}
                        type="button"
                        onClick={() => toggleEducation(edu)}
                        className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 text-[#000000] font-normal text-[14px]"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#0A0A6E]" />
                        ) : (
                          <Square className="w-4 h-4 text-[#727272]" />
                        )}
                        <span>{edu}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 8. Certificate Section (Group 1171277303) */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-rubik font-medium text-[14px] leading-[17px] text-[#0E0E0E]">
                  Certificate
                </label>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[14px] text-black">
                  {[
                    'CPR Certified',
                    'Licensed Professional',
                    'Specialized Training',
                    'First Aid Certified',
                  ].map((cert) => {
                    const isChecked = selectedCertificates.includes(cert);
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => toggleCertificate(cert)}
                        className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 text-[#000000] font-normal text-[14px]"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#0A0A6E]" />
                        ) : (
                          <Square className="w-4 h-4 text-[#727272]" />
                        )}
                        <span>{cert}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Action Button (Frame 2147228899 Button) */}
            <div className="p-8 pt-4 bg-white border-t border-[#EFEFEF]">
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="w-full h-[48px] bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-[12px] font-rubik font-medium text-[15px] leading-[20px] transition cursor-pointer border-none shadow-xs flex items-center justify-center capitalize"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
