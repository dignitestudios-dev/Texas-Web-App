"use client"
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const WelcomeSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center pt-[250px] gap-[12px] w-full">
      <div className="flex items-center justify-center w-[80px] h-[80px] bg-[#F36922] rounded-[16px] shadow-sm">
        <Check className="text-white w-10 h-10 stroke-[3]" />
      </div>
      <div className="flex flex-col items-center gap-[16px]">
        <h1 className="font-poppins font-semibold text-[26px] leading-[120%] text-[#181818] text-center">
          Welcome Aboard!
        </h1>
        <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#565656] text-center max-w-[516px]">
          Your account has been successfully created. We're excited to have you here—let's get started.
        </p>
      </div>
    </div>
  );
};
