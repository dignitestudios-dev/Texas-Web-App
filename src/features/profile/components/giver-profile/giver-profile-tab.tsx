'use client';

import React, { useState } from 'react';
import { GiverDetailsTab } from './giver-details-tab';
import { GiverDocumentsTab } from './giver-documents-tab';
import { GiverAvailabilityTab } from './giver-availability-tab';

export type GiverProfileSubTab = 'details' | 'documents' | 'availability';

export function GiverProfileTab() {
  const [activeSubTab, setActiveSubTab] = useState<GiverProfileSubTab>('details');

  return (
    <div className="w-full max-w-[980px] bg-white rounded-[16px] p-[20px] flex flex-col gap-[20px] shadow-xs border border-[#EFEFEF]/60">
      
      {/* Top Profile Sub-Tabs (Frame 2147227176 .. 2147227180: width 940px, height 48px) */}
      <div className="w-full h-[48px] bg-[#F8F9FF] rounded-[12px] p-[5px] flex items-center gap-[10px]">
        {/* Details Tab */}
        <button
          type="button"
          onClick={() => setActiveSubTab('details')}
          className={`flex-1 h-[38px] rounded-[12px] flex items-center justify-center font-rubik text-[15px] leading-[18px] tracking-[-0.005em] transition cursor-pointer border-none ${
            activeSubTab === 'details'
              ? 'bg-[#0A0A6E] text-white shadow-xs font-medium'
              : 'bg-transparent text-[#121111] hover:bg-[#EEF0F8] font-normal'
          }`}
        >
          Details
        </button>

        {/* Documents Tab */}
        <button
          type="button"
          onClick={() => setActiveSubTab('documents')}
          className={`flex-1 h-[38px] rounded-[12px] flex items-center justify-center font-rubik text-[15px] leading-[18px] tracking-[-0.005em] transition cursor-pointer border-none ${
            activeSubTab === 'documents'
              ? 'bg-[#0A0A6E] text-white shadow-xs font-medium'
              : 'bg-transparent text-[#121111] hover:bg-[#EEF0F8] font-normal'
          }`}
        >
          Documents
        </button>

        {/* Availability Tab */}
        <button
          type="button"
          onClick={() => setActiveSubTab('availability')}
          className={`flex-1 h-[38px] rounded-[12px] flex items-center justify-center font-rubik text-[15px] leading-[18px] tracking-[-0.005em] transition cursor-pointer border-none ${
            activeSubTab === 'availability'
              ? 'bg-[#0A0A6E] text-white shadow-xs font-medium'
              : 'bg-transparent text-[#121111] hover:bg-[#EEF0F8] font-normal'
          }`}
        >
          Availability
        </button>
      </div>

      {/* Sub-Tab Content Rendering */}
      <div className="w-full pt-2">
        {activeSubTab === 'details' && <GiverDetailsTab />}
        {activeSubTab === 'documents' && <GiverDocumentsTab />}
        {activeSubTab === 'availability' && <GiverAvailabilityTab />}
      </div>

    </div>
  );
}
