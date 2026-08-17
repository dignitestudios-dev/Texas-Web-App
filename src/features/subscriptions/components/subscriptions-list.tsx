"use client"
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const INCLUDE_ITEMS = [
  "Non tempor nec eu feugiat venenatis pulvinar neque egestas adipiscing.",
  "Non tempor nec eu feugiat venenatis pulvinar neque egestas adipiscing.",
  "Non tempor nec eu feugiat venenatis pulvinar neque egestas adipiscing.",
  "Non tempor nec eu feugiat venenatis pulvinar neque egestas adipiscing.",
];

export const SubscriptionsList = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/welcome');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-[40px] mt-[20px]">
        <h1 className="font-rubik font-medium text-[26px] leading-[31px] tracking-[-0.408px] text-[#121111] mb-[5px]">
          Our Subscriptions
        </h1>
        <p className="font-poppins font-normal text-[14px] leading-[17px] text-[#565656] text-center">
          Upgrade your account with our plans
        </p>
      </div>

      {/* Plans Container */}
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-[20px] w-full">

        {/* Free Plan */}
        <div className="flex flex-col p-[40px] flex-1 border border-[#EFEFEF] rounded-xl relative hover:shadow-sm transition-shadow">
          <h2 className="font-rubik font-medium text-[24px] leading-[130%] text-[#121111] mb-[5px]">
            Free
          </h2>
          <p className="font-rubik font-light text-[14px] leading-[130%] text-[#121111] mb-[15px]">
            Consectetur orci sit nibh id erat sodales. Tellus vitae id accumsan aliquam amet consectetur in lacus.
          </p>
          <div className="flex flex-row items-center gap-[15px] mb-[20px]">
            <span className="font-rubik font-medium text-[32px] leading-[130%] text-[#121111]">
              $0
            </span>
            <span className="font-rubik font-normal text-[14px] leading-[130%] text-[#121111]">
              /30 free connects
            </span>
          </div>
          <Button
            onClick={handleRedirect}
            className="w-full h-[40px] bg-[#0A0A6E] hover:bg-[#0A0A6E]/90 text-white font-rubik font-normal text-[15px] rounded-lg capitalize mb-[20px]"
          >
            Continue For Free
          </Button>
          <h3 className="font-rubik font-medium text-[16px] leading-[130%] text-[#121111] mb-[10px]">
            Includes
          </h3>
          <div className="flex flex-col gap-[10px]">
            {INCLUDE_ITEMS.map((item, index) => (
              <div key={index} className="flex flex-row items-start gap-[10px]">
                <Check className="w-4 h-4 text-[#121111] shrink-0 mt-[2px]" />
                <span className="font-rubik font-normal text-[14px] leading-[130%] text-[#121111]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Standard Plan */}
        <div className="flex flex-col p-[40px] flex-1 bg-[#FEF0E9] border border-[#EFEFEF] rounded-xl relative hover:shadow-sm transition-shadow overflow-hidden">
          {/* Popular Tag */}
          <div className="absolute top-0 right-0 w-[120px] h-[120px] overflow-hidden rounded-tr-xl pointer-events-none">
            <div className="absolute top-[20px] -right-[30px] w-[140px] bg-[#ECF0FF] py-1 text-center transform rotate-45 text-[15px] font-rubik text-[#121111]">
              Popular
            </div>
          </div>

          <h2 className="font-rubik font-medium text-[24px] leading-[130%] text-[#121111] mb-[5px]">
            Standard
          </h2>
          <p className="font-rubik font-light text-[14px] leading-[130%] text-[#121111] mb-[15px] relative z-10">
            Consectetur orci sit nibh id erat sodales. Tellus vitae id accumsan aliquam amet consectetur in lacus.
          </p>
          <div className="flex flex-row items-center gap-[15px] mb-[20px]">
            <span className="font-rubik font-medium text-[32px] leading-[130%] text-[#121111]">
              $99
            </span>
            <span className="font-rubik font-normal text-[14px] leading-[130%] text-[#121111]">
              /900 connects
            </span>
          </div>
          <Button
            onClick={handleRedirect}
            className="w-full h-[40px] bg-[#F36922] hover:bg-[#F36922]/90 text-white font-rubik font-normal text-[15px] rounded-lg capitalize mb-[20px]"
          >
            Upgrade To Standard
          </Button>
          <h3 className="font-rubik font-medium text-[16px] leading-[130%] text-[#121111] mb-[10px]">
            Includes
          </h3>
          <div className="flex flex-col gap-[10px]">
            {INCLUDE_ITEMS.map((item, index) => (
              <div key={index} className="flex flex-row items-start gap-[10px]">
                <Check className="w-4 h-4 text-[#121111] shrink-0 mt-[2px]" />
                <span className="font-rubik font-normal text-[14px] leading-[130%] text-[#121111]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Plan */}
        <div className="flex flex-col p-[40px] flex-1 border border-[#EFEFEF] rounded-xl relative hover:shadow-sm transition-shadow">
          <h2 className="font-rubik font-medium text-[24px] leading-[130%] text-[#121111] mb-[5px]">
            Pro
          </h2>
          <p className="font-rubik font-light text-[14px] leading-[130%] text-[#121111] mb-[15px]">
            Consectetur orci sit nibh id erat sodales. Tellus vitae id accumsan aliquam amet consectetur in lacus.
          </p>
          <div className="flex flex-row items-center gap-[15px] mb-[20px]">
            <span className="font-rubik font-medium text-[32px] leading-[130%] text-[#121111]">
              $299
            </span>
            <span className="font-rubik font-normal text-[14px] leading-[130%] text-[#121111]">
              /Unlimited connects
            </span>
          </div>
          <Button
            onClick={handleRedirect}
            className="w-full h-[40px] bg-[#F36922] hover:bg-[#F36922]/90 text-white font-rubik font-normal text-[15px] rounded-lg capitalize mb-[20px]"
          >
            Upgrade To Pro
          </Button>
          <h3 className="font-rubik font-medium text-[16px] leading-[130%] text-[#121111] mb-[10px]">
            Includes
          </h3>
          <div className="flex flex-col gap-[10px]">
            {INCLUDE_ITEMS.map((item, index) => (
              <div key={index} className="flex flex-row items-start gap-[10px]">
                <Check className="w-4 h-4 text-[#121111] shrink-0 mt-[2px]" />
                <span className="font-rubik font-normal text-[14px] leading-[130%] text-[#121111]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
