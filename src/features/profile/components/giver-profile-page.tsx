'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  User,
  UserCircle,
  UserX,
  Bell,
  AtSign,
} from 'lucide-react';
import { toast } from 'sonner';
import BlockedUsersTab from './blocked-users-tab';
import NotificationTab from './notification-tab';
import { GiverProfileTab } from './giver-profile/giver-profile-tab';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export function GiverProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'blocked' | 'notifications'>('profile');

  // Account Tab State
  const [name, setName] = useState('Nandi Bolard');
  const [email, setEmail] = useState('NandiBolard@gmail.com');
  const [phone, setPhone] = useState('11511126888412');
  const [avatarUrl, setAvatarUrl] = useState('/images/avatar.webp');

  // Delete Account Confirmation Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSaveGeneralInfo = () => {
    toast.success('General info updated successfully!');
  };

  const handleSavePhone = () => {
    toast.success('Verification OTP sent to your new phone number.');
  };

  const handleDeleteAccount = () => {
    setIsDeleteDialogOpen(false);
    toast.success('Your account has been deleted.');
    router.replace('/login');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB limit');
        return;
      }
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      toast.success('Profile image uploaded successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center pb-24 select-none">
      {/* Container */}
      <div className="w-full max-w-[1440px] px-4 sm:px-8 lg:px-[80px] pt-[30px] flex flex-col gap-6 items-center">
        
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
            <span className="font-normal text-[#121111]">
              {activeTab === 'profile' ? 'Profile' : 'Account'}
            </span>
          </div>
        </div>

        {/* Main 2-Column Section (Frame 2147227338) */}
        <div className="w-full max-w-[1280px] flex flex-col lg:flex-row items-start gap-[40px] lg:gap-[60px] mt-4">
          
          {/* Left Column (Frame 2147227336: 300px) */}
          <div className="flex flex-col gap-[40px] w-full lg:w-[220px] shrink-0">
            {/* Header: Account + Manage your account */}
            <div className="flex flex-col gap-1">
              <h1 className="font-rubik font-semibold text-[24px] leading-[28px] tracking-[-0.408px] text-[#121111]">
                Account
              </h1>
              <p className="font-rubik font-light text-[16px] leading-[19px] tracking-[-0.408px] text-[#121111]">
                Manage your account
              </p>
            </div>

            {/* Profile Nav (Frame 2147226978: 161px) */}
            <div className="flex flex-col gap-[14px] w-full max-w-[161px]">
              
              {/* Profile Nav Item (Frame 2147226918) */}
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`h-[44px] px-[20px] rounded-[8px] flex items-center gap-[10px] cursor-pointer transition border-none text-left w-full ${
                  activeTab === 'profile'
                    ? 'bg-[#0A0A6E] text-white shadow-xs font-normal'
                    : 'bg-transparent text-[#121111] hover:bg-neutral-100/60 font-normal'
                }`}
              >
                <UserCircle className={`w-[18px] h-[18px] shrink-0 ${activeTab === 'profile' ? 'text-white' : 'text-[#121111]'}`} />
                <span className="font-rubik text-[14px] leading-[17px] capitalize">
                  Profile
                </span>
              </button>

              {/* Account Nav Item (Frame 2147226922) */}
              <button
                type="button"
                onClick={() => setActiveTab('account')}
                className={`h-[44px] px-[20px] rounded-[8px] flex items-center gap-[10px] cursor-pointer transition border-none text-left w-full ${
                  activeTab === 'account'
                    ? 'bg-[#0A0A6E] text-white shadow-xs font-normal'
                    : 'bg-transparent text-[#121111] hover:bg-neutral-100/60 font-normal'
                }`}
              >
                <User className={`w-[18px] h-[18px] shrink-0 ${activeTab === 'account' ? 'text-white' : 'text-[#121111]'}`} />
                <span className="font-rubik text-[14px] leading-[17px] capitalize">
                  Account
                </span>
              </button>

              {/* Blocked Users Nav Item (Frame 2147226921) */}
              <button
                type="button"
                onClick={() => setActiveTab('blocked')}
                className={`h-[44px] px-[20px] rounded-[8px] flex items-center gap-[10px] cursor-pointer transition border-none text-left w-full ${
                  activeTab === 'blocked'
                    ? 'bg-[#0A0A6E] text-white shadow-xs font-normal'
                    : 'bg-transparent text-[#121111] hover:bg-neutral-100/60 font-normal'
                }`}
              >
                <UserX className={`w-[18px] h-[18px] shrink-0 ${activeTab === 'blocked' ? 'text-white' : 'text-[#121111]'}`} />
                <span className="font-rubik text-[14px] leading-[17px] capitalize">
                  Blocked Users
                </span>
              </button>

              {/* Notification Nav Item (Frame 2147226919) */}
              <button
                type="button"
                onClick={() => setActiveTab('notifications')}
                className={`h-[44px] px-[20px] rounded-[8px] flex items-center gap-[10px] cursor-pointer transition border-none text-left w-full ${
                  activeTab === 'notifications'
                    ? 'bg-[#0A0A6E] text-white shadow-xs font-normal'
                    : 'bg-transparent text-[#121111] hover:bg-neutral-100/60 font-normal'
                }`}
              >
                <Bell className={`w-[18px] h-[18px] shrink-0 ${activeTab === 'notifications' ? 'text-white' : 'text-[#121111]'}`} />
                <span className="font-rubik text-[14px] leading-[17px] capitalize">
                  Notification
                </span>
              </button>

            </div>
          </div>

          {/* Right Column (Frame 2147227337) */}
          <div className="flex-1 w-full flex flex-col gap-[20px]">
            
            {/* Profile Tab View: Details, Documents, Availability */}
            {activeTab === 'profile' && <GiverProfileTab />}

            {/* Account Tab Content (Frame 2147227334 / 2147227335 / 2147227336) */}
            {activeTab === 'account' && (
              <div className="w-full max-w-[600px] flex flex-col gap-[20px]">
                {/* Card 1: General Info (Frame 2147227334: 600px x 427px) */}
                <div className="w-full bg-white rounded-[16px] p-[20px] flex flex-col gap-[20px] shadow-xs border border-[#EFEFEF]/60">
                  
                  {/* Card Header */}
                  <div className="flex flex-col gap-[8px]">
                    <h2 className="font-rubik font-medium text-[18px] leading-[21px] capitalize text-[#121111]">
                      General Info
                    </h2>
                    <p className="font-rubik font-light text-[14px] leading-[17px] text-[#3D3D3D]">
                      This is your email &amp; name that will be displayed on platform.
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="pb-[15px] border-b border-[rgba(239,239,239,0.86)] flex flex-col gap-[13px]">
                    
                    {/* Avatar & Upload */}
                    <div className="flex items-center gap-[30px]">
                      <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#F1F5F9] border border-[#E4E4E7] flex items-center justify-center relative shrink-0">
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt={name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <User className="w-[32px] h-[32px] text-[#3D3D3D]" />
                        )}
                      </div>

                      <div className="flex flex-col justify-center gap-[10px]">
                        <label className="w-[86px] h-[32px] bg-[#F8F9FF] hover:bg-[#EEF0F8] rounded-[8px] font-rubik font-normal text-[14px] leading-[135%] text-[#0A0A6E] flex items-center justify-center cursor-pointer transition capitalize shadow-2xs">
                          Upload
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111]">
                          Png, jpeg upto 5mb
                        </span>
                      </div>
                    </div>

                    {/* Name Field */}
                    <div className="flex flex-col gap-[6px] w-full">
                      <label className="font-rubik font-normal text-[15px] leading-[18px] capitalize text-[#3D3D3D]">
                        Name
                      </label>
                      <div className="w-full h-[48px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] px-[15px] flex items-center">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#1A2E35] outline-none border-none"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-[6px] w-full">
                      <label className="font-rubik font-normal text-[15px] leading-[18px] capitalize text-[#3D3D3D]">
                        Email
                      </label>
                      <div className="w-full h-[48px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] px-[15px] flex items-center justify-between">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#1A2E35] outline-none border-none pr-2"
                        />
                        <AtSign className="w-5 h-5 text-[#3D3D3D] shrink-0" />
                      </div>
                    </div>

                  </div>

                  {/* Card Footer: Save Button */}
                  <div className="flex justify-end w-full">
                    <button
                      type="button"
                      onClick={handleSaveGeneralInfo}
                      className="w-[71px] h-[36px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] font-rubik font-medium text-[15px] leading-[135%] capitalize flex items-center justify-center transition cursor-pointer border-none shadow-2xs"
                    >
                      Save
                    </button>
                  </div>

                </div>

                {/* Card 2: Phone Number (Frame 2147227335: 600px x 249px) */}
                <div className="w-full bg-white rounded-[16px] p-[20px] flex flex-col gap-[20px] shadow-xs border border-[#EFEFEF]/60">
                  
                  {/* Card Header */}
                  <div className="flex flex-col gap-[8px]">
                    <h2 className="font-rubik font-medium text-[18px] leading-[21px] capitalize text-[#121111]">
                      Phone Number
                    </h2>
                    <p className="font-rubik font-light text-[14px] leading-[17px] text-[#3D3D3D]">
                      A 4 digit OTP will be send to your number upon changing.
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="pb-[15px] border-b border-[rgba(239,239,239,0.86)] flex flex-col gap-[13px]">
                    <div className="flex flex-col gap-[6px] w-full">
                      <label className="font-rubik font-normal text-[15px] leading-[18px] capitalize text-[#3D3D3D]">
                        Phone Number
                      </label>

                      {/* Phone Input with US Flag prefix */}
                      <div className="w-full h-[48px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] px-[15px] flex items-center gap-[10px]">
                        <div className="flex items-center gap-[8px] pr-[12px] border-r border-[rgba(239,239,239,0.86)] shrink-0 h-[32px]">
                          <svg className="w-5 h-4 rounded-xs object-cover" viewBox="0 0 741 390" fill="none">
                            <rect width="741" height="390" fill="#B22334" />
                            <path d="M0 30H741M0 90H741M0 150H741M0 210H741M0 270H741M0 330H741" stroke="#FFFFFF" strokeWidth="30" />
                            <rect width="296.4" height="210" fill="#3C3B6E" />
                            <circle cx="20" cy="20" r="4" fill="#FFFFFF" />
                            <circle cx="60" cy="20" r="4" fill="#FFFFFF" />
                            <circle cx="100" cy="20" r="4" fill="#FFFFFF" />
                            <circle cx="40" cy="50" r="4" fill="#FFFFFF" />
                            <circle cx="80" cy="50" r="4" fill="#FFFFFF" />
                            <circle cx="20" cy="80" r="4" fill="#FFFFFF" />
                            <circle cx="60" cy="80" r="4" fill="#FFFFFF" />
                            <circle cx="100" cy="80" r="4" fill="#FFFFFF" />
                          </svg>
                          <span className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111]">
                            +1
                          </span>
                        </div>

                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-transparent font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#1A2E35] outline-none border-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Save Button */}
                  <div className="flex justify-end w-full">
                    <button
                      type="button"
                      onClick={handleSavePhone}
                      className="w-[71px] h-[36px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] font-rubik font-medium text-[15px] leading-[135%] capitalize flex items-center justify-center transition cursor-pointer border-none shadow-2xs"
                    >
                      Save
                    </button>
                  </div>

                </div>

                {/* Card 3: Delete Account (Frame 2147227336: 600px x 157px) */}
                <div className="w-full bg-white rounded-[16px] p-[20px] flex flex-col gap-[20px] shadow-xs border border-[#EFEFEF]/60">
                  
                  {/* Card Header */}
                  <div className="pb-[15px] border-b border-[rgba(239,239,239,0.86)] flex flex-col gap-[8px]">
                    <h2 className="font-rubik font-medium text-[18px] leading-[21px] capitalize text-[#121111]">
                      Delete Account
                    </h2>
                    <p className="font-rubik font-light text-[14px] leading-[17px] text-[#3D3D3D]">
                      Permanently delete your account and all its data.
                    </p>
                  </div>

                  {/* Card Footer: Delete Button */}
                  <div className="flex justify-end w-full">
                    <button
                      type="button"
                      onClick={() => setIsDeleteDialogOpen(true)}
                      className="w-[83px] h-[36px] bg-[#C81E1E] hover:bg-[#b01717] text-white rounded-[8px] font-rubik font-medium text-[15px] leading-[135%] capitalize flex items-center justify-center transition cursor-pointer border-none shadow-2xs"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* Blocked Users Tab View */}
            {activeTab === 'blocked' && (
              <div className="w-full max-w-[980px]">
                <BlockedUsersTab />
              </div>
            )}

            {/* Notifications Tab View */}
            {activeTab === 'notifications' && (
              <div className="w-full max-w-[980px]">
                <NotificationTab />
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[400px] max-w-[92vw] bg-white rounded-[24px] p-6 sm:p-7 flex flex-col items-center text-center shadow-xl border border-[#EFEFEF] outline-none select-none"
        >
          <div className="w-[52px] h-[52px] rounded-full bg-[#FEE2E2] text-[#C81E1E] flex items-center justify-center mb-2">
            <UserX className="w-7 h-7 stroke-[2.5]" />
          </div>

          <DialogTitle className="font-rubik font-bold text-[22px] leading-[28px] text-[#121111]">
            Delete Account?
          </DialogTitle>

          <DialogDescription className="font-rubik font-normal text-[14px] leading-[21px] text-[#565656] max-w-[310px] mt-2 mb-6">
            Are you sure you want to permanently delete your account? All your data, jobs, and services will be removed forever.
          </DialogDescription>

          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1 h-[46px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="flex-1 h-[46px] bg-[#C81E1E] hover:bg-[#b01717] text-white font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none shadow-xs flex items-center justify-center"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
