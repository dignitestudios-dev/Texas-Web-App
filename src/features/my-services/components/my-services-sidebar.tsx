'use client';

import React from 'react';
import { Layers, Users, Eye, Briefcase } from 'lucide-react';
import { SidebarTab } from '../types/my-services.types';

interface MyServicesSidebarProps {
  currentTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
}

export function MyServicesSidebar({
  currentTab,
  onTabChange,
}: MyServicesSidebarProps) {
  const tabs = [
    {
      id: 'services' as SidebarTab,
      label: 'Services',
      icon: Layers,
    },
    {
      id: 'requests' as SidebarTab,
      label: 'Requests',
      icon: Users,
    },
    {
      id: 'active' as SidebarTab,
      label: 'Active',
      icon: Eye,
    },
    {
      id: 'history' as SidebarTab,
      label: 'History',
      icon: Briefcase,
    },
  ];

  return (
    <div className="w-full md:w-[160px] flex flex-row md:flex-col items-start gap-[18px] shrink-0 p-0 mb-6 md:mb-0 overflow-x-auto pb-2 md:pb-0 scrollbar-none sticky top-24 z-10">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`box-border flex flex-row items-center p-[6px_12px_6px_6px] gap-2 w-[140px] h-[56px] rounded-[32px] cursor-pointer border transition shadow-xs shrink-0 ${
              isActive
                ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white shadow-sm'
                : 'bg-[#F8F9FF] border-transparent text-[#121111] hover:bg-[#EEF0F8]'
            }`}
          >
            <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white shadow-2xs">
              <Icon className="w-5 h-5" />
            </div>
            <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
