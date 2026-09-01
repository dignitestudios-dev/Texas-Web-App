'use client';

import React, { useState } from 'react';
import { ChevronDown, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface ServiceEntry {
  id: string;
  category: string;
  description: string;
}

const CATEGORY_OPTIONS = [
  'Elderly Assistance',
  'Nursing Care',
  'Babysitting & Child Care',
  'Special Needs Care',
  'Post-Surgery Care',
  'Disability Support',
  'Hospice Support',
  'Meal Preparation',
  'Housekeeping & Cleaning',
];

export function GiverDetailsTab() {
  const [serviceRadius, setServiceRadius] = useState('15 Miles');
  const [services, setServices] = useState<ServiceEntry[]>([
    {
      id: '1',
      category: 'Elderly Assistance',
      description:
        '• Mobility Support\n• Hygiene Assistance\n• Meal Preparation\n• Companionship',
    },
  ]);

  const handleAddService = () => {
    const newService: ServiceEntry = {
      id: Date.now().toString(),
      category: 'Nursing Care',
      description: '• Medication Management\n• Vital Monitoring\n• Wound Care',
    };
    setServices((prev) => [...prev, newService]);
    toast.success('New service category added');
  };

  const handleRemoveService = (id: string) => {
    if (services.length === 1) {
      toast.error('You must keep at least one service category');
      return;
    }
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success('Service category removed');
  };

  const handleCategoryChange = (id: string, newCategory: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, category: newCategory } : s))
    );
  };

  const handleDescriptionChange = (id: string, newDesc: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, description: newDesc } : s))
    );
  };

  const handleSave = () => {
    toast.success('Services updated successfully!');
  };

  return (
    <div className="flex flex-col gap-[40px] w-full">
      {/* Header Section (Frame 2147227329) */}
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-rubik font-medium text-[24px] leading-[28px] capitalize text-[#121111]">
          Services
        </h2>
        <p className="font-rubik font-light text-[14px] leading-[17px] capitalize text-[#3D3D3D]">
          Manage your services provided here.
        </p>
      </div>

      {/* Service Radius Input (Frame 2147227346) */}
      <div className="w-full h-[48px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] px-[20px] flex items-center">
        <input
          type="text"
          value={serviceRadius}
          onChange={(e) => setServiceRadius(e.target.value)}
          placeholder="Service Radius (e.g. 15 Miles)"
          className="w-full bg-transparent font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] outline-none border-none placeholder:text-[#3D3D3D]/60"
        />
      </div>

      {/* Services List Dashed Container (Frame 2147227494) */}
      <div className="w-full border border-dashed border-[#E4E4E7] rounded-[12px] p-[15px] flex flex-col gap-[20px]">
        {services.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-[15px] pb-[15px] border-b border-[#E4E4E7]/60 last:border-b-0 last:pb-0"
          >
            {/* Category Dropdown Row (Frame 2147227490 & 2147227496) */}
            <div className="flex flex-col gap-[5px] w-full">
              <label className="font-rubik font-medium text-[14px] leading-[17px] capitalize text-[#121111]">
                Service Category
              </label>

              <div className="flex items-center gap-[20px] w-full">
                {/* Category Select Box */}
                <div className="relative flex-1 h-[48px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] px-[20px] flex items-center justify-between">
                  <select
                    value={item.category}
                    onChange={(e) => handleCategoryChange(item.id, e.target.value)}
                    className="w-full h-full bg-transparent font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] outline-none border-none cursor-pointer appearance-none pr-8"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#121111] absolute right-[20px] pointer-events-none" />
                </div>

                {/* Delete Button (Buttons Frame) */}
                <button
                  type="button"
                  onClick={() => handleRemoveService(item.id)}
                  className="w-[48px] h-[48px] bg-[#F8F9FF] hover:bg-red-50 border border-[#C81E1E] rounded-[12px] flex items-center justify-center text-[#C81E1E] transition cursor-pointer shrink-0 shadow-2xs"
                  title="Remove Service"
                >
                  <Trash2 className="w-4 h-4 text-[#C81E1E]" />
                </button>
              </div>
            </div>

            {/* Description Textarea (Frame 2147227489 & 2147227347) */}
            <div className="flex flex-col gap-[5px] w-full">
              <label className="font-rubik font-medium text-[14px] leading-[17px] capitalize text-[#121111]">
                Service Description
              </label>

              <div className="w-full bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] p-[20px]">
                <textarea
                  rows={4}
                  value={item.description}
                  onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                  className="w-full bg-transparent font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.408px] text-[#121111] outline-none border-none resize-none"
                  placeholder="Describe the services and responsibilities included..."
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Service Button (Buttons: 910px x 48px, dashed, text: #046C4E) */}
        <button
          type="button"
          onClick={handleAddService}
          className="w-full h-[48px] bg-[#F8F9FF] hover:bg-[#EEF7F2] border border-dashed border-[#E4E4E7] rounded-[12px] flex items-center justify-center text-[#046C4E] font-rubik font-medium text-[15px] leading-[135%] capitalize transition cursor-pointer gap-1.5 shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Save Button Footer (Frame 2147227333) */}
      <div className="flex justify-end w-full">
        <button
          type="button"
          onClick={handleSave}
          className="w-[71px] h-[36px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] font-rubik font-medium text-[15px] leading-[135%] capitalize flex items-center justify-center transition cursor-pointer border-none shadow-2xs"
        >
          Save
        </button>
      </div>
    </div>
  );
}
