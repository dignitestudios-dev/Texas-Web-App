'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { saveRole } from '@/lib/cookies';

export const RoleSelection = () => {
  const router = useRouter();

  const handleRoleSelect = (role: 'seeker' | 'giver') => {
    router.push(`/login?role=${role}`);
    saveRole(role)

  };

  const handleGuestContinue = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[600px] mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-4 max-w-[480px]">
        <h1 className="font-rubik font-semibold text-[26px] md:text-[30px] leading-[36px] tracking-[-0.408px] text-[#121111]">
          Choose Your Role
        </h1>
        <p className="font-rubik font-normal text-[13px] md:text-[14px] leading-[20px] text-[#565656] mt-1">
          Select how you&apos;d like to use the app. Whether you&apos;re looking for care services
          or offering professional care, we&apos;ll customize your experience accordingly.
        </p>
      </div>

      {/* Role Cards Container */}
      <div className="flex flex-col w-full gap-3.5">
        {/* Card 1: Care Seeker */}
        <div
          onClick={() => handleRoleSelect('seeker')}
          className="w-full h-[215px] md:h-[225px] rounded-[24px] relative overflow-hidden shadow-lg flex flex-col justify-end p-5 cursor-pointer group transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
        >
          {/* Background Image */}
          <Image
            src="/images/seeker.webp"
            alt="Care Seeker"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

          {/* Text Content */}
          <div className="relative z-10 flex flex-col gap-1 text-left mb-2.5">
            <h2 className="font-rubik font-medium text-[24px] md:text-[26px] leading-[30px] text-white tracking-[-0.408px]">
              Care Seeker
            </h2>
            <p className="font-rubik font-normal text-[13px] md:text-[14px] leading-[18px] text-white/95 max-w-[440px]">
              Find trusted caregivers, browse available services, and connect with professionals who can support your needs.
            </p>
          </div>

          {/* Centered Pill Action Button */}
          <div className="relative z-10 w-full flex justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRoleSelect('seeker');
              }}
              className="w-full max-w-[280px] h-[40px] bg-[#0A0A6E] hover:bg-[#080856] active:scale-95 text-white font-rubik font-semibold text-[15px] md:text-[16px] leading-[20px] rounded-full transition-all duration-200 cursor-pointer border-none shadow-md flex items-center justify-center"
            >
              Looking for Care?
            </button>
          </div>
        </div>

        {/* Card 2: Care Giver */}
        <div
          onClick={() => handleRoleSelect('giver')}
          className="w-full h-[215px] md:h-[225px] rounded-[24px] relative overflow-hidden shadow-lg flex flex-col justify-end p-5 cursor-pointer group transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
        >
          {/* Background Image */}
          <Image
            src="/images/giver.webp"
            alt="Care Giver"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

          {/* Text Content */}
          <div className="relative z-10 flex flex-col gap-1 text-left mb-2.5">
            <h2 className="font-rubik font-medium text-[24px] md:text-[26px] leading-[30px] text-white tracking-[-0.408px]">
              Care Giver
            </h2>
            <p className="font-rubik font-normal text-[13px] md:text-[14px] leading-[18px] text-white/95 max-w-[440px]">
              Showcase your skills, connect with individuals seeking care, and grow your caregiving business through the platform.
            </p>
          </div>

          {/* Centered Pill Action Button */}
          <div className="relative z-10 w-full flex justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRoleSelect('giver');
              }}
              className="w-full max-w-[280px] h-[40px] bg-[#0A0A6E] hover:bg-[#080856] active:scale-95 text-white font-rubik font-semibold text-[15px] md:text-[16px] leading-[20px] rounded-full transition-all duration-200 cursor-pointer border-none shadow-md flex items-center justify-center"
            >
              Provide Care Service
            </button>
          </div>
        </div>
      </div>

      {/* Or Divider */}
      <div className="flex items-center gap-4 w-full max-w-[480px] my-3.5">
        <div className="flex-1 h-px bg-[#D1D1D1]" />
        <span className="font-rubik text-[13px] text-[#727272]">Or</span>
        <div className="flex-1 h-px bg-[#D1D1D1]" />
      </div>

      {/* Guest Link */}
      <div className="text-center font-rubik text-[14px] text-[#121111]">
        <span>Just browsing? </span>
        <button
          type="button"
          onClick={handleGuestContinue}
          className="font-semibold text-[#121111] hover:underline cursor-pointer border-none bg-transparent p-0 inline font-rubik"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};
