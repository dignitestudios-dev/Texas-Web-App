'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Users, Eye, Briefcase, Check } from 'lucide-react';
import { SidebarTab } from '../types/my-services.types';
import { getRole, UserRole } from '@/lib/cookies';

interface MyServicesSidebarProps {
  currentTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  role?: UserRole;
}

export function MyServicesSidebar({
  currentTab,
  onTabChange,
  role: initialRole,
}: MyServicesSidebarProps) {
  const [role, setRole] = useState<UserRole>(initialRole || 'seeker');

  useEffect(() => {
    const updateRole = () => {
      const r = getRole() || 'seeker';
      setRole(r);
    };
    updateRole();
    window.addEventListener('roleChange', updateRole);
    return () => window.removeEventListener('roleChange', updateRole);
  }, []);

  const isSeeker = role === 'seeker';

  const tabs = [
    {
      id: (isSeeker ? 'explore' : 'services') as SidebarTab,
      label: isSeeker ? 'Explore' : 'Services',
      icon: isSeeker ? Check : Layers,
      hasDot: false,
    },
    {
      id: 'requests' as SidebarTab,
      label: 'Requests',
      icon: Users,
      hasDot: false,
    },
    {
      id: 'active' as SidebarTab,
      label: 'Active',
      icon: Eye,
      hasDot: false,
    },
    {
      id: 'history' as SidebarTab,
      label: 'History',
      icon: Briefcase,
      hasDot: true,
    },
  ];

  return (
    <div className="w-full md:w-[160px] flex flex-row md:flex-col items-start gap-[18px] shrink-0 p-0 mb-6 md:mb-0 overflow-x-auto pb-2 md:pb-0 scrollbar-none sticky top-24 z-10 select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`box-border flex flex-row items-center p-[6px_14px_6px_6px] gap-2.5 w-[145px] h-[56px] rounded-[32px] cursor-pointer border transition shadow-xs shrink-0 relative ${
              isActive
                ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white shadow-sm'
                : 'bg-white border-transparent text-[#121111] hover:bg-[#F8F9FF]'
            }`}
          >
            <div className="w-[44px] h-[44px] bg-[#F36922] rounded-full flex items-center justify-center shrink-0 text-white shadow-2xs">
              <Icon className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em]">
                {tab.label}
              </span>
              {tab.hasDot && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E02424] shrink-0" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
