'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface ManagedService {
  id: string;
  title: string;
  image: string;
  impressions: number;
  orders: number;
  cancellations: number;
  status: 'active' | 'inactive';
}

const MOCK_MANAGED_SERVICES: ManagedService[] = [
  {
    id: '1',
    title: 'Professional Home Cleaning ServicesMaking Your Home Sparkle',
    image: '/images/home/search.webp',
    impressions: 20,
    orders: 0,
    cancellations: 0,
    status: 'active',
  },
  {
    id: '2',
    title: 'Professional Home Cleaning ServicesMaking Your Home Sparkle',
    image: '/images/home/search.webp',
    impressions: 20,
    orders: 0,
    cancellations: 0,
    status: 'active',
  },
];

export default function MyServicesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');

  const filteredServices = MOCK_MANAGED_SERVICES.filter(
    (svc) => svc.status === activeTab
  );

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center">
      {/* Top Header & Breadcrumbs Area */}
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-[30px] flex flex-col gap-[30px]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-[10px] font-rubik text-[16px] leading-[21px] tracking-[-0.02em] text-[#3D3D3D]">
          <button
            onClick={() => router.back()}
            type="button"
            className="w-[24px] h-[24px] flex items-center justify-center text-[#121111] hover:opacity-80 transition cursor-pointer border-none bg-transparent mr-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Link href="/" className="hover:text-[#F36922] transition text-[#3D3D3D]">
            Home
          </Link>
          <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
          <span className="font-normal text-[#121111]">My Services</span>
        </div>

        {/* Page Title */}
        <div className="w-full max-w-[1280px]">
          <h1 className="font-rubik font-semibold text-[18px] leading-[21px] tracking-[-0.408px] text-[#121111]">
            Manage your Services
          </h1>
        </div>

        {/* Controls Section: Active/Inactive Tabs & Create New Service Button */}
        <div className="w-full max-w-[1280px] flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Booking Tabs Container */}
          <div className="w-[400px] max-w-full h-[48px] bg-white rounded-[12px] p-[5px] flex items-center gap-[10px]">
            <button
              type="button"
              onClick={() => setActiveTab('active')}
              className={`flex-1 h-[38px] rounded-[12px] font-rubik text-[15px] font-normal transition cursor-pointer flex items-center justify-center ${
                activeTab === 'active'
                  ? 'bg-[#0A0A6E] text-white shadow-xs'
                  : 'bg-transparent text-[#121111] hover:bg-neutral-50'
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('inactive')}
              className={`flex-1 h-[38px] rounded-[12px] font-rubik text-[15px] font-normal transition cursor-pointer flex items-center justify-center ${
                activeTab === 'inactive'
                  ? 'bg-[#0A0A6E] text-white shadow-xs'
                  : 'bg-transparent text-[#121111] hover:bg-neutral-50'
              }`}
            >
              Inactive
            </button>
          </div>

          {/* Create New Service Button */}
          <Link
            href="/create-job"
            className="h-[48px] px-[16px] py-[14px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[15px] leading-[135%] rounded-[8px] flex items-center justify-center transition cursor-pointer shadow-xs border-none"
          >
            Create New Service
          </Link>
        </div>

        {/* Services Table Card */}
        <div className="w-full max-w-[1280px] bg-white border border-[#E4E4E7] rounded-[12px] py-[15px] flex flex-col gap-[10px] mb-16 shadow-xs overflow-x-auto">
          {/* Card Header Title */}
          <div className="px-[15px] pb-[12px] border-b border-[#E4E4E7]">
            <h2 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
              {activeTab === 'active' ? 'Active Services' : 'Inactive Services'}
            </h2>
          </div>

          {/* Table Header Row */}
          <div className="px-[15px] py-[10px] border-b border-[#E4E4E7] min-w-[800px]">
            <div className="flex items-center justify-between text-[#3D3D3D] font-rubik text-[14px] leading-[18px]">
              <div className="w-[350px] font-normal text-left tracking-[-0.005em]">
                Service
              </div>
              <div className="w-[250px] font-normal text-center tracking-[-0.005em]">
                Impressions
              </div>
              <div className="w-[250px] font-normal text-center tracking-[-0.005em]">
                Orders
              </div>
              <div className="w-[250px] font-normal text-center tracking-[-0.005em]">
                Cancellations
              </div>
              <div className="w-[150px] text-right font-normal tracking-[-0.005em]" />
            </div>
          </div>

          {/* Table Data Rows */}
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div
                key={service.id}
                className={`px-[15px] py-[15px] min-w-[800px] flex items-center justify-between ${
                  index !== filteredServices.length - 1 ? 'border-b border-[#E4E4E7]' : ''
                }`}
              >
                {/* Service thumbnail & title */}
                <div className="w-[350px] flex items-center gap-[15px]">
                  <div className="w-[76px] h-[50px] relative rounded-[8px] overflow-hidden shrink-0 bg-neutral-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-rubik font-normal text-[15px] leading-[18px] tracking-[-0.005em] text-[#121111]">
                    {service.title}
                  </span>
                </div>

                {/* Impressions */}
                <div className="w-[250px] text-center font-rubik font-medium text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                  {service.impressions}
                </div>

                {/* Orders */}
                <div className="w-[250px] text-center font-rubik font-medium text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                  {service.orders}
                </div>

                {/* Cancellations */}
                <div className="w-[250px] text-center font-rubik font-medium text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                  {service.cancellations}
                </div>

                {/* Edit Action Button */}
                <div className="w-[150px] flex justify-end">
                  <button
                    type="button"
                    onClick={() => router.push(`/create-job?edit=${service.id}`)}
                    className="w-[65px] h-[32px] border border-[#E4E4E7] rounded-[8px] text-[#0A0A6E] font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] flex items-center justify-center hover:bg-[#0A0A6E]/5 transition cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-neutral-500 font-rubik text-[14px]">
              No {activeTab} services found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
