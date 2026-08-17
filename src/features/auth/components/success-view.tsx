"use client"
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const SuccessView = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/create-profile');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-[445px] mx-auto text-center">
      <div className="flex items-center justify-center w-[72px] h-[72px] bg-[#F36922] rounded-2xl mb-8 shadow-sm">
        <Check className="text-white w-10 h-10 stroke-[3]" />
      </div>
      <div className="flex flex-col items-center space-y-3">
        <h1 className="font-rubik font-medium text-[26px] leading-[31px] tracking-[-0.408px] text-[#121111]">
          Number Verified
        </h1>
        <p className="font-poppins font-normal text-[14px] leading-[1.4] text-[#565656] max-w-[280px]">
          Your phone number has been verified successfully!
        </p>
      </div>
    </div>
  );
};
