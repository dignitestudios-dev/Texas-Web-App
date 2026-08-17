'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function AccountTab() {
  const [name, setName] = useState('Nandi Bloard');
  const [phone, setPhone] = useState('11511126888412');
  const [address, setAddress] = useState("User's Address here");

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {/* General Info Card */}
      <div className="w-full bg-white rounded-[16px] py-[20px] flex flex-col gap-[20px] shadow-sm">
        {/* Card Header */}
        <div className="px-[20px] flex flex-col gap-[8px]">
          <h2 className="font-rubik font-medium text-[18px] leading-[21px] capitalize text-[#121111]">
            General Info
          </h2>
          <p className="font-rubik font-light text-[14px] leading-[17px] capitalize text-[#3D3D3D]">
            This is your email &amp; name that will be displayed on platform.
          </p>
        </div>

        {/* Card Body */}
        <div className="px-[20px] pb-[15px] border-b border-[rgba(239,239,239,0.86)] flex flex-col gap-[13px]">
          {/* Avatar & Upload */}
          <div className="flex items-center gap-[30px]">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-[rgba(239,239,239,0.86)] bg-[#F8F9FF] relative shrink-0">
              <Image
                src="/images/avatar.webp"
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-[10px]">
              <button
                type="button"
                className="w-[86px] h-[32px] bg-[#F8F9FF] hover:bg-neutral-100 rounded-[8px] font-rubik font-normal text-[14px] leading-[135%] capitalize text-[#121111] transition cursor-pointer border-none flex items-center justify-center"
              >
                Upload
              </button>
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
            <div className="h-[48px] bg-[#F8F9FF] border border-[rgba(239,239,239,0.86)] rounded-[12px] px-[15px] flex items-center">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-none outline-none font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#1A2E35]"
              />
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col gap-[6px] w-full">
            <label className="font-rubik font-normal text-[15px] leading-[18px] capitalize text-[#3D3D3D]">
              Phone Number
            </label>
            <div className="h-[48px] bg-[#F8F9FF] border border-[rgba(239,239,239,0.86)] rounded-[12px] p-[5px_5px_5px_15px] flex items-center gap-[10px]">
              {/* US Flag prefix */}
              <div className="flex items-center gap-[10px] pr-[12px] border-r border-[rgba(239,239,239,0.86)] shrink-0 h-[38px]">
                <svg className="w-5 h-4 rounded-sm object-cover" viewBox="0 0 741 390" fill="none">
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
                className="w-full bg-transparent border-none outline-none font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#1A2E35]"
              />
            </div>
          </div>

          {/* Address Field */}
          <div className="flex flex-col gap-[6px] w-full">
            <label className="font-rubik font-normal text-[15px] leading-[18px] capitalize text-[#3D3D3D]">
              Address
            </label>
            <div className="h-[48px] bg-[#F8F9FF] border border-[rgba(239,239,239,0.86)] rounded-[12px] px-[15px] flex items-center">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="User's Address here"
                className="w-full bg-transparent border-none outline-none font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#1A2E35] placeholder:text-[#1A2E35]"
              />
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-[20px] flex justify-end">
          <button
            type="button"
            className="w-[71px] h-[36px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] font-rubik font-medium text-[15px] leading-[135%] capitalize cursor-pointer border-none transition flex items-center justify-center shadow-sm"
          >
            Save
          </button>
        </div>
      </div>

      {/* Delete Account Card */}
      <div className="w-full bg-white rounded-[16px] py-[20px] flex flex-col gap-[20px] shadow-sm">
        {/* Card Header */}
        <div className="px-[20px] pb-[15px] border-b border-[rgba(239,239,239,0.86)] flex flex-col gap-[8px]">
          <h2 className="font-rubik font-medium text-[18px] leading-[21px] capitalize text-[#121111]">
            Delete Account
          </h2>
          <p className="font-rubik font-light text-[14px] leading-[17px] capitalize text-[#3D3D3D]">
            Permanently delete your account and all its data.
          </p>
        </div>

        {/* Card Footer */}
        <div className="px-[20px] flex justify-end">
          <button
            type="button"
            className="w-[83px] h-[36px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] font-rubik font-medium text-[15px] leading-[135%] capitalize cursor-pointer border-none transition flex items-center justify-center shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
