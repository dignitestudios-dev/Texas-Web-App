'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  User,
  UserX,
  Bell,
  MessageSquareText,
} from 'lucide-react';
import AccountTab from './account-tab';
import BlockedUsersTab from './blocked-users-tab';
import NotificationTab from './notification-tab';
import ReviewsTab from './reviews-tab';

export function SeekerProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'account' | 'blocked' | 'notifications' | 'reviews'>('account');

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full select-none">
      {/* Container */}
      <div className="w-full flex flex-col items-center px-4 sm:px-8 lg:px-[80px] pt-[30px] pb-[80px] gap-[30px]">
        
        {/* Top Header: Back Arrow & Breadcrumbs */}
        <div className="w-full max-w-[1280px] flex items-center gap-[16px] h-[48px]">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none shadow-sm"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
            <Link href="/" className="hover:text-[#F36922] transition">
              Home
            </Link>
            <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
            <span className="font-normal text-[#3D3D3D]">Profile</span>
          </div>
        </div>

        {/* Main 2-Column Section */}
        <div className="w-full max-w-[1280px] flex flex-col lg:flex-row items-start gap-[30px]">
          
          {/* Left Sidebar */}
          <div className="flex flex-col gap-[30px] w-full lg:w-[323px] shrink-0 pt-2 lg:pt-[20px]">
            {/* Title & Subtitle */}
            <div className="flex flex-col gap-[10px] pl-2 lg:pl-[20px]">
              <h1 className="font-rubik font-semibold text-[24px] leading-[28px] tracking-[-0.408px] text-[#121111]">
                Account
              </h1>
              <p className="font-rubik font-light text-[16px] leading-[19px] tracking-[-0.408px] text-[#121111]">
                Manage your account
              </p>
            </div>

            {/* Sidebar Nav Buttons */}
            <div className="flex flex-col gap-[20px] w-full max-w-[213px]">
              {/* Account Nav Item */}
              <button
                type="button"
                onClick={() => setActiveTab('account')}
                className={`w-[213px] h-[54px] rounded-[32px] p-[6px_12px_6px_6px] flex items-center gap-[8px] cursor-pointer transition border-none text-left ${
                  activeTab === 'account'
                    ? 'bg-[#0A0A6E] border border-[#0A0A6E] shadow-sm'
                    : 'bg-[#F8F9FF] hover:bg-neutral-100'
                }`}
              >
                <div className="w-[42px] h-[42px] bg-[#F36922] rounded-[21.5px] flex items-center justify-center shrink-0">
                  <User className="w-[18px] h-[18px] text-white" />
                </div>
                <span
                  className={`font-rubik text-[15px] leading-[18px] tracking-[-0.005em] ${
                    activeTab === 'account' ? 'font-semibold text-white' : 'font-normal text-[#121111]'
                  }`}
                >
                  Account
                </span>
              </button>

              {/* Blocked Users Nav Item */}
              <button
                type="button"
                onClick={() => setActiveTab('blocked')}
                className={`w-[213px] h-[56px] rounded-[32px] p-[6px_12px_6px_6px] flex items-center gap-[8px] cursor-pointer transition border-none text-left ${
                  activeTab === 'blocked'
                    ? 'bg-[#0A0A6E] border border-[#0A0A6E] shadow-sm'
                    : 'bg-[#F8F9FF] hover:bg-neutral-100'
                }`}
              >
                <div className="w-[44px] h-[44px] bg-[#F36922] rounded-[21.5px] flex items-center justify-center shrink-0">
                  <UserX className="w-[20px] h-[20px] text-white" />
                </div>
                <span
                  className={`font-rubik text-[14px] leading-[17px] capitalize ${
                    activeTab === 'blocked' ? 'font-semibold text-white' : 'font-normal text-[#121111]'
                  }`}
                >
                  Blocked Users
                </span>
              </button>

              {/* Notification Nav Item */}
              <button
                type="button"
                onClick={() => setActiveTab('notifications')}
                className={`w-[213px] h-[54px] rounded-[32px] p-[6px_12px_6px_6px] flex items-center gap-[8px] cursor-pointer transition border-none text-left ${
                  activeTab === 'notifications'
                    ? 'bg-[#0A0A6E] border border-[#0A0A6E] shadow-sm'
                    : 'bg-[#F8F9FF] hover:bg-neutral-100'
                }`}
              >
                <div className="w-[42px] h-[42px] bg-[#F36922] rounded-[21.5px] flex items-center justify-center shrink-0">
                  <Bell className="w-[18px] h-[18px] text-white" />
                </div>
                <span
                  className={`font-rubik text-[14px] leading-[17px] capitalize ${
                    activeTab === 'notifications' ? 'font-semibold text-white' : 'font-normal text-[#121111]'
                  }`}
                >
                  Notification
                </span>
              </button>

              {/* Reviews By Care Giver Nav Item */}
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`w-[213px] h-[54px] rounded-[32px] p-[6px_12px_6px_6px] flex items-center gap-[8px] cursor-pointer transition border-none text-left ${
                  activeTab === 'reviews'
                    ? 'bg-[#0A0A6E] border border-[#0A0A6E] shadow-sm'
                    : 'bg-[#F8F9FF] hover:bg-neutral-100'
                }`}
              >
                <div className="w-[42px] h-[42px] bg-[#F36922] rounded-[21.5px] flex items-center justify-center shrink-0">
                  <MessageSquareText className="w-[18px] h-[18px] text-white" />
                </div>
                <span
                  className={`font-rubik text-[14px] leading-[17px] capitalize ${
                    activeTab === 'reviews' ? 'font-semibold text-white' : 'font-normal text-[#121111]'
                  }`}
                >
                  Reviews By Care Giver
                </span>
              </button>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-[1px] self-stretch bg-[rgba(10,10,110,0.2)] shrink-0 min-h-[600px]" />

          {/* Right Main Content area delegating to sub-components */}
          <div className="flex-1 w-full max-w-[781px] flex flex-col gap-[20px]">
            {activeTab === 'account' && <AccountTab />}
            {activeTab === 'blocked' && <BlockedUsersTab />}
            {activeTab === 'notifications' && <NotificationTab />}
            {activeTab === 'reviews' && <ReviewsTab />}
          </div>

        </div>
      </div>
    </div>
  );
}
