'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getRole } from '@/lib/cookies';
import { PaymentCheckoutDialog } from '@/components/common/payment-checkout-dialog';

const INCLUDE_ITEMS = [
  'Non tempor nec eu feugiat venenatis pulvinar neque egestas adipiscing.',
  'Non tempor nec eu feugiat venenatis pulvinar neque egestas adipiscing.',
  'Non tempor nec eu feugiat venenatis pulvinar neque egestas adipiscing.',
  'Non tempor nec eu feugiat venenatis pulvinar neque egestas adipiscing.',
];

export const SubscriptionsList = () => {
  const router = useRouter();

  // Billing Frequency Switcher: 'monthly' | 'yearly'
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Checkout Dialog State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState('Standard Plan');
  const [selectedPlanAmount, setSelectedPlanAmount] = useState<number>(99);

  const handleOpenCheckout = (planName: string, amount: number) => {
    setSelectedPlanName(planName);
    setSelectedPlanAmount(amount);
    setIsCheckoutOpen(true);
  };

  const handleSuccessRedirect = () => {
    const role = getRole();
    if (role === 'giver') {
      router.push('/identity-verification');
    } else {
      router.push('/');
    }
  };

  const standardPrice = billingCycle === 'monthly' ? 99 : 89;
  const proPrice = billingCycle === 'monthly' ? 299 : 269;

  return (
    <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto pb-20">
      
      {/* Header Row: Title & Subtitle (Left) + Monthly/Yearly Toggle (Right) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-10 mt-4 gap-6">
        
        {/* Left: Heading & Subtitle */}
        <div className="flex flex-col">
          <h1 className="font-rubik font-bold text-[34px] sm:text-[38px] leading-[44px] text-[#121111]">
            Our Subscriptions
          </h1>
          <p className="font-rubik font-normal text-[16px] leading-[22px] text-[#565656] mt-1">
            Upgrade your account with our plans
          </p>
        </div>

        {/* Right: Pay Monthly / Pay Yearly Pill Switcher (Matches Exact Screenshot) */}
        <div className="box-border flex flex-row items-center p-1 bg-[#F4F7FE] rounded-[10px] shrink-0 select-none gap-2">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`font-rubik font-medium text-[16px] leading-[20px] transition cursor-pointer border-none ${
              billingCycle === 'monthly'
                ? 'bg-white rounded-[10px] px-6 py-2.5 shadow-sm text-[#121111]'
                : 'bg-transparent px-5 py-2.5 text-[#121111] hover:opacity-80'
            }`}
          >
            Pay Monthly
          </button>

          <button
            type="button"
            onClick={() => setBillingCycle('yearly')}
            className={`font-rubik font-medium text-[16px] leading-[20px] transition cursor-pointer border-none flex items-center gap-3 ${
              billingCycle === 'yearly'
                ? 'bg-white rounded-[10px] px-6 py-2.5 shadow-sm text-[#121111]'
                : 'bg-transparent px-4 py-2.5 text-[#121111] hover:opacity-80'
            }`}
          >
            <span>Pay Yearly</span>
            <span className="bg-[#FFEFE8] text-[#F36922] font-rubik font-normal text-[14px] px-3.5 py-1 rounded-full">
              Save 10%
            </span>
          </button>
        </div>

      </div>

      {/* 3 Plans Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">

        {/* 1. Free Plan Card */}
        <div className="flex flex-col p-8 sm:p-10 flex-1 backdrop-blur-xs border border-[#EFEFEF] rounded-[24px] relative shadow-xs hover:shadow-md transition-shadow">
          <h2 className="font-rubik font-bold text-[24px] text-[#121111] mb-2">
            Free
          </h2>
          <p className="font-rubik font-normal text-[14px] leading-[22px] text-[#565656] mb-6">
            Consectetur orci sit nibh id erat sodales. Tellus vitae id accumsan aliquamamet consectetur in lacus.
          </p>
          
          <div className="flex flex-row items-baseline gap-2 mb-6">
            <span className="font-rubik font-bold text-[36px] text-[#121111]">
              $0
            </span>
            <span className="font-rubik font-normal text-[14px] text-[#565656]">
              /30 free connects
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleSuccessRedirect()}
            className="w-full h-[48px] bg-[#0A0A6E] hover:bg-[#080856] text-white font-rubik font-medium text-[15px] rounded-[10px] mb-8 cursor-pointer shadow-xs transition border-none"
          >
            Continue For Free
          </button>

          <h3 className="font-rubik font-bold text-[16px] text-[#121111] mb-4">
            Includes
          </h3>
          <div className="flex flex-col gap-3.5">
            {INCLUDE_ITEMS.map((item, index) => (
              <div key={index} className="flex flex-row items-start gap-3">
                <Check className="w-4 h-4 text-[#121111] shrink-0 mt-0.5" />
                <span className="font-rubik font-normal text-[14px] leading-[20px] text-[#565656]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Standard Plan Card (Popular Badge) */}
        <div className="flex flex-col p-8 sm:p-10 flex-1 backdrop-blur-xs border border-[#EFEFEF] rounded-[24px] relative shadow-xs hover:shadow-md transition-shadow overflow-hidden">
          {/* Popular Corner Badge */}
          <div className="absolute top-0 right-0 w-[120px] h-[120px] overflow-hidden rounded-tr-[24px] pointer-events-none">
            <div className="absolute top-[22px] -right-[32px] w-[140px] bg-white py-1 text-center transform rotate-45 text-[13px] font-rubik font-semibold text-[#F36922] shadow-xs">
              Popular
            </div>
          </div>

          <h2 className="font-rubik font-bold text-[24px] text-[#121111] mb-2">
            Standard
          </h2>
          <p className="font-rubik font-normal text-[14px] leading-[22px] text-[#565656] mb-6">
            Consectetur orci sit nibh id erat sodales. Tellus vitae id accumsan aliquamamet consectetur in lacus.
          </p>

          <div className="flex flex-row items-baseline gap-2 mb-6">
            <span className="font-rubik font-bold text-[36px] text-[#121111]">
              ${standardPrice}
            </span>
            <span className="font-rubik font-normal text-[14px] text-[#565656]">
              {billingCycle === 'monthly' ? '/900 connects' : '/month (billed yearly)'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleOpenCheckout('Standard Plan', standardPrice)}
            className="w-full h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[15px] rounded-[10px] mb-8 cursor-pointer shadow-xs transition border-none"
          >
            Upgrade To Standard
          </button>

          <h3 className="font-rubik font-bold text-[16px] text-[#121111] mb-4">
            Includes
          </h3>
          <div className="flex flex-col gap-3.5">
            {INCLUDE_ITEMS.map((item, index) => (
              <div key={index} className="flex flex-row items-start gap-3">
                <Check className="w-4 h-4 text-[#121111] shrink-0 mt-0.5" />
                <span className="font-rubik font-normal text-[14px] leading-[20px] text-[#565656]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Pro Plan Card */}
        <div className="flex flex-col p-8 sm:p-10 flex-1  backdrop-blur-xs border border-[#EFEFEF] rounded-[24px] relative shadow-xs hover:shadow-md transition-shadow">
          <h2 className="font-rubik font-bold text-[24px] text-[#121111] mb-2">
            Pro
          </h2>
          <p className="font-rubik font-normal text-[14px] leading-[22px] text-[#565656] mb-6">
            Consectetur orci sit nibh id erat sodales. Tellus vitae id accumsan aliquamamet consectetur in lacus.
          </p>

          <div className="flex flex-row items-baseline gap-2 mb-6">
            <span className="font-rubik font-bold text-[36px] text-[#121111]">
              ${proPrice}
            </span>
            <span className="font-rubik font-normal text-[14px] text-[#565656]">
              {billingCycle === 'monthly' ? '/Unlimited connects' : '/month (billed yearly)'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleOpenCheckout('Pro Plan', proPrice)}
            className="w-full h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[15px] rounded-[10px] mb-8 cursor-pointer shadow-xs transition border-none"
          >
            Upgrade To Pro
          </button>

          <h3 className="font-rubik font-bold text-[16px] text-[#121111] mb-4">
            Includes
          </h3>
          <div className="flex flex-col gap-3.5">
            {INCLUDE_ITEMS.map((item, index) => (
              <div key={index} className="flex flex-row items-start gap-3">
                <Check className="w-4 h-4 text-[#121111] shrink-0 mt-0.5" />
                <span className="font-rubik font-normal text-[14px] leading-[20px] text-[#565656]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Payment Checkout Modal Dialog */}
      <PaymentCheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title="Our Subscriptions"
        subtitle="Upgrade your account with our plans"
        planName={selectedPlanName}
        amount={selectedPlanAmount}
        onSuccessRedirect={handleSuccessRedirect}
      />
    </div>
  );
};
