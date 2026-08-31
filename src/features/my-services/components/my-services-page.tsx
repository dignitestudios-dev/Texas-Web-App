'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronRight, Search, Calendar } from 'lucide-react';
import { MyServicesSidebar } from './my-services-sidebar';
import { ServicesTab } from './services-tab';
import { RequestsTab } from './requests-tab';
import { ActiveTab } from './active-tab';
import { HistoryTab } from './history-tab';
import {
  SidebarTab,
  ServicesSubTab,
  ActiveJobsSubTab,
  HistorySubTab,
} from '../types/my-services.types';

export function MyServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Primary side-tab from URL search params
  const rawTab = searchParams.get('tab') as SidebarTab | null;
  const currentTab: SidebarTab =
    rawTab && ['services', 'requests', 'active', 'history'].includes(rawTab)
      ? rawTab
      : 'services';

  // Inner sub-tab from URL search params
  const rawSubTab = searchParams.get('subTab');

  // Compute active inner sub-tabs for each category
  const servicesSubTab: ServicesSubTab =
    currentTab === 'services' && rawSubTab === 'inactive' ? 'inactive' : 'active';

  const activeJobsSubTab: ActiveJobsSubTab =
    currentTab === 'active' && rawSubTab === 'ongoing' ? 'ongoing' : 'upcoming';

  const historySubTab: HistorySubTab =
    currentTab === 'history' && rawSubTab === 'canceled' ? 'canceled' : 'completed';

  const [searchQuery, setSearchQuery] = useState('');

  // Handle side tab changes and update URL
  const handleTabChange = (newTab: SidebarTab) => {
    let defaultSubTab = '';
    if (newTab === 'services') defaultSubTab = 'active';
    else if (newTab === 'active') defaultSubTab = 'upcoming';
    else if (newTab === 'history') defaultSubTab = 'completed';

    const params = new URLSearchParams();
    params.set('tab', newTab);
    if (defaultSubTab) {
      params.set('subTab', defaultSubTab);
    }
    router.push(`/my-services?${params.toString()}`);
  };

  // Handle inner sub-tab changes and update URL
  const handleSubTabChange = (newSubTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', currentTab);
    params.set('subTab', newSubTab);
    router.push(`/my-services?${params.toString()}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FEF0E9] flex flex-col relative w-full pb-20 items-center">
      {/* Main Container */}
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-[30px] flex flex-col gap-6 items-center">
        
        {/* Header Controls Block */}
        <div className="w-full max-w-[1280px] flex flex-col gap-5 shrink-0 bg-transparent">
          
          {/* Row 1: Back arrow + Breadcrumbs (Left) and Action Button (Right) */}
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
                <span className="font-normal text-[#121111]">Manage Your Services</span>
              </div>
            </div>

            {/* Right Action Button: Create New Service on Services tab, View Your Calendar on other tabs */}
            {currentTab === 'services' ? (
              <Link
                href="/create-job"
                className="box-border flex flex-row justify-center items-center py-3 px-6 h-[48px] rounded-[12px] bg-[#F36922] hover:bg-[#e05813] text-white cursor-pointer transition shrink-0 shadow-sm font-rubik font-medium text-[15px]"
              >
                Create New Service
              </Link>
            ) : (
              <Link
                href="/my-schedule"
                className="box-border flex flex-row justify-center items-center py-3 px-6 h-[48px] rounded-[12px] bg-[#F36922] hover:bg-[#e05813] text-white cursor-pointer transition shrink-0 shadow-sm font-rubik font-medium text-[15px] gap-2"
              >
                <span>View Your Calendar</span>
                <Calendar className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Row 2: Search Input */}
          <div className="flex flex-row items-center w-full">
            <div className="box-border flex flex-row justify-between items-center pl-4 pr-1.5 h-[48px] bg-white border border-[#EFEFEF]/86 rounded-[12px] w-full sm:max-w-[420px] shadow-xs">
              <input
                type="text"
                placeholder="Search for care requests"
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
          <MyServicesSidebar
            currentTab={currentTab}
            onTabChange={handleTabChange}
          />

          {/* Vertical Separator Line */}
          <div className="hidden md:block w-[1px] bg-[#0A0A6E]/20 self-stretch mx-[40px]" />

          {/* Right Main Content Area */}
          <div className="flex-1 w-full bg-transparent flex flex-col gap-4">
            {currentTab === 'services' && (
              <ServicesTab
                subTab={servicesSubTab}
                onSubTabChange={(st) => handleSubTabChange(st)}
                searchQuery={searchQuery}
              />
            )}

            {currentTab === 'requests' && (
              <RequestsTab searchQuery={searchQuery} />
            )}

            {currentTab === 'active' && (
              <ActiveTab
                subTab={activeJobsSubTab}
                onSubTabChange={(st) => handleSubTabChange(st)}
                searchQuery={searchQuery}
              />
            )}

            {currentTab === 'history' && (
              <HistoryTab
                subTab={historySubTab}
                onSubTabChange={(st) => handleSubTabChange(st)}
                searchQuery={searchQuery}
              />
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
