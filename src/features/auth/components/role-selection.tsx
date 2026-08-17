'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const RoleSelection = () => {
  const router = useRouter();

  const handleRoleSelect = (role: 'seeker' | 'caregiver') => {
    router.push(`/login?role=${role}`);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[720px] mx-auto pt-10">
      {/* Header */}
      <div className="flex flex-col items-center space-y-3 mb-[60px] text-center max-w-[535px]">
        <h1 className="font-rubik font-medium text-[26px] leading-[31px] tracking-[-0.408px] text-[#121111]">
          Choose Your Role
        </h1>
        <p className="font-poppins font-normal text-[14px] leading-[1.2] text-[#565656]">
          Select how you'd like to use the app. Whether you're looking for care services or offering professional care, we'll customize your experience accordingly.
        </p>
      </div>

      {/* Role Cards */}
      <div className="flex flex-col md:flex-row w-full gap-[20px] justify-center items-center">

        {/* Care Seeker Card */}
        <div className="flex flex-col w-[350px] h-[344px] bg-white rounded-[24px] shadow-sm overflow-hidden">
          {/* Image */}
          <div className="w-[350px] h-[158px] relative shrink-0">
            <Image src="/images/seeker.webp" alt="Care Seeker" fill className="object-cover" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 px-[16px] pt-[16px] pb-[20px] justify-between">
            <div className="flex flex-col gap-[10px]">
              <h3 className="font-rubik font-medium text-[24px] leading-[28px] tracking-[-0.408px] text-black">
                Care Seeker
              </h3>
              <p className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-black">
                Find trusted caregivers, browse available services, and connect with professionals who can support your needs.
              </p>
            </div>

            <button
              onClick={() => handleRoleSelect('seeker')}
              className="flex flex-row justify-center items-center py-[10px] px-[10px] gap-[10px] w-full h-[44px] bg-[#0A0A6E] rounded-[24px] hover:bg-[#0A0A6E]/90 transition-colors mt-auto"
            >
              <span className="font-rubik font-medium text-[20px] leading-[24px] tracking-[-0.408px] text-white">
                Looking for Care?
              </span>
            </button>
          </div>
        </div>

        {/* Care Giver Card */}
        <div className="flex flex-col w-[350px] h-[344px] bg-white rounded-[24px] shadow-sm overflow-hidden">
          {/* Image */}
          <div className="w-[350px] h-[158px] relative shrink-0">
            <Image src="/images/giver.webp" alt="Care Giver" fill className="object-cover" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 px-[16px] pt-[16px] pb-[20px] justify-between">
            <div className="flex flex-col gap-[10px]">
              <h3 className="font-rubik font-medium text-[24px] leading-[28px] tracking-[-0.408px] text-black">
                Care Giver
              </h3>
              <p className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-1px] text-black">
                Showcase your skills, connect with individuals seeking care, and grow your caregiving business through the platform.
              </p>
            </div>

            <button
              onClick={() => handleRoleSelect('caregiver')}
              className="flex flex-row justify-center items-center py-[10px] px-[10px] gap-[10px] w-full h-[44px] bg-[#0A0A6E] rounded-[24px] hover:bg-[#0A0A6E]/90 transition-colors mt-auto"
            >
              <span className="font-rubik font-medium text-[20px] leading-[24px] tracking-[-0.408px] text-white">
                Provide Care Service
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
