'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  CreditCard,
  Building2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

interface PaymentCheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  planName: string;
  amount: string | number;
  onSuccessRedirect?: () => void;
}

export function PaymentCheckoutDialog({
  isOpen,
  onClose,
  title = 'Featured Service',
  subtitle = 'Do More With Our Featured Service',
  planName = 'Standard Plan',
  amount = 99,
  onSuccessRedirect,
}: PaymentCheckoutDialogProps) {
  const router = useRouter();

  // Dialog step: 1 = Checkout Form, 2 = Payment Success
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [name, setName] = useState('Antonio Ibrahimovic');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [cardName, setCardName] = useState('Antonio Ibrahimovic');
  const [expiration, setExpiration] = useState('12/28');
  const [cvc, setCvc] = useState('123');
  const [zip, setZip] = useState('78501');

  if (!isOpen) return null;

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    // Proceed to Success step
    setStep(2);
  };

  const handleContinueSuccess = () => {
    onClose();
    setStep(1);
    if (onSuccessRedirect) {
      onSuccessRedirect();
    } else {
      router.push('/');
    }
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-[24px] p-6 sm:p-8 max-w-[840px] w-full shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* ================= STEP 1: CHECKOUT DIALOG (MATCHES IMAGE 1) ================= */}
        {step === 1 ? (
          <div className="flex flex-col w-full">
            {/* Header with Title & Close Button */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <h2 className="font-rubik font-bold text-[24px] text-[#121111]">
                  {title}
                </h2>
                <p className="font-rubik text-[14px] text-[#565656] mt-0.5">
                  {subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#F4F4F5] hover:bg-[#E4E4E7] flex items-center justify-center text-[#121111] transition cursor-pointer border-none shadow-2xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 2-Column Grid */}
            <form onSubmit={handleCompletePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Inputs (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                
                {/* Billed To */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-rubik font-medium text-[14px] text-[#121111]">
                    Billed To
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full h-[48px] px-4 bg-[#F8F9FF] border border-[#EFEFEF] rounded-[10px] font-rubik text-[14px] text-[#121111] outline-none focus:border-[#0A0A6E] shadow-2xs"
                  />
                </div>

                {/* Payment Details */}
                <div className="flex flex-col gap-3">
                  <label className="font-rubik font-medium text-[14px] text-[#121111]">
                    Payment Details
                  </label>

                  {/* Payment Method Switcher Pills */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`h-[48px] rounded-[10px] flex items-center justify-center gap-2 font-rubik font-medium text-[14px] transition cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-2 border-[#0A0A6E] bg-[#F8F9FF] text-[#0A0A6E]'
                          : 'border border-[#EFEFEF] bg-white text-[#121111] hover:bg-neutral-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`h-[48px] rounded-[10px] flex items-center justify-center gap-2 font-rubik font-medium text-[14px] transition cursor-pointer ${
                        paymentMethod === 'bank'
                          ? 'border-2 border-[#0A0A6E] bg-[#F8F9FF] text-[#0A0A6E]'
                          : 'border border-[#EFEFEF] bg-white text-[#121111] hover:bg-neutral-50'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Bank</span>
                    </button>
                  </div>

                  {/* Card Name Input with Card Brand Logos */}
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Card Name"
                      className="w-full h-[48px] pl-4 pr-24 bg-[#F8F9FF] border border-[#EFEFEF] rounded-[10px] font-rubik text-[14px] text-[#121111] outline-none focus:border-[#0A0A6E] shadow-2xs"
                    />
                    <div className="absolute right-3 flex items-center gap-1.5 pointer-events-none">
                      <span className="text-[10px] font-bold bg-[#002663] text-white px-1.5 py-0.5 rounded-xs">
                        AMEX
                      </span>
                      <div className="w-5 h-3.5 bg-[#EB001B] rounded-xs flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-[#F79E1B] rounded-full opacity-80" />
                      </div>
                      <span className="text-[10px] font-bold text-[#1A1F71] italic">
                        VISA
                      </span>
                    </div>
                  </div>

                  {/* Expiration and CVC Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                      placeholder="Expiration"
                      className="w-full h-[48px] px-4 bg-[#F8F9FF] border border-[#EFEFEF] rounded-[10px] font-rubik text-[14px] text-[#121111] outline-none focus:border-[#0A0A6E] shadow-2xs"
                    />
                    <input
                      type="text"
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-full h-[48px] px-4 bg-[#F8F9FF] border border-[#EFEFEF] rounded-[10px] font-rubik text-[14px] text-[#121111] outline-none focus:border-[#0A0A6E] shadow-2xs"
                    />
                  </div>

                  {/* Zip Code */}
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Zip"
                    className="w-full h-[48px] px-4 bg-[#F8F9FF] border border-[#EFEFEF] rounded-[10px] font-rubik text-[14px] text-[#121111] outline-none focus:border-[#0A0A6E] shadow-2xs"
                  />
                </div>

                {/* Disclaimer Footnote */}
                <p className="font-rubik font-normal text-[12px] text-[#565656] leading-[18px]">
                  By providing your card info you allow Texas caregiver to charge you in future payments in accordance to thier terms.
                </p>

              </div>

              {/* Right Column: Price & Complete Button (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-start lg:pl-6 pt-2">
                <div className="font-rubik font-bold text-[44px] text-[#121111] mb-6">
                  ${amount}
                </div>

                <button
                  type="submit"
                  className="w-full h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[16px] rounded-[10px] transition cursor-pointer border-none shadow-md"
                >
                  Complete
                </button>

                <p className="font-rubik text-[12px] text-[#565656] text-center mt-3 leading-[18px]">
                  By continuing you agree with our{' '}
                  <span className="font-semibold text-[#121111] underline cursor-pointer">
                    Terms of Use
                  </span>{' '}
                  and{' '}
                  <span className="font-semibold text-[#121111] underline cursor-pointer">
                    Privacy Policy
                  </span>
                </p>
              </div>

            </form>
          </div>
        ) : (
          /* ================= STEP 2: PAYMENT SUCCESS MODAL (MATCHES IMAGE 2) ================= */
          <div className="flex flex-col items-center text-center w-full py-4 px-2">
            
            {/* Green Circular Success Badge */}
            <div className="w-16 h-16 bg-[#E6F4EA] rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#137333]" />
            </div>

            {/* Title & Subtitle */}
            <h3 className="font-rubik font-bold text-[24px] text-[#121111] mb-1">
              Payment Success!
            </h3>
            <p className="font-rubik text-[14px] text-[#565656] mb-6">
              Your payment has been successfully done.
            </p>

            {/* Receipt Summary Card */}
            <div className="w-full bg-[#F8F9FF] border border-[#EFEFEF] rounded-[18px] p-6 flex flex-col gap-3.5 text-left mb-6">
              
              {/* Row 1: Amount */}
              <div className="flex justify-between items-center">
                <span className="font-rubik text-[14px] text-[#565656]">Amount</span>
                <span className="font-rubik font-bold text-[20px] text-[#121111]">
                  ${amount}
                </span>
              </div>

              {/* Row 2: Payment Status */}
              <div className="flex justify-between items-center">
                <span className="font-rubik text-[14px] text-[#565656]">Payment Status</span>
                <span className="bg-[#D1FADF] text-[#027A48] font-rubik font-medium text-[12px] px-3 py-0.5 rounded-full">
                  Success
                </span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#EFEFEF] my-0.5" />

              {/* Row 3: Plan Type */}
              <div className="flex justify-between items-center">
                <span className="font-rubik text-[14px] text-[#565656]">Plan Type</span>
                <div className="flex items-center gap-1.5 font-rubik font-semibold text-[14px] text-[#121111]">
                  <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                  <span>{planName}</span>
                </div>
              </div>

              {/* Row 4: Payment Method */}
              <div className="flex justify-between items-center">
                <span className="font-rubik text-[14px] text-[#565656]">Payment Method</span>
                <span className="font-rubik font-medium text-[14px] text-[#121111]">
                  {paymentMethod === 'card' ? 'Card Transfer' : 'Bank Transfer'}
                </span>
              </div>

              {/* Row 5: Payment Time */}
              <div className="flex justify-between items-center">
                <span className="font-rubik text-[14px] text-[#565656]">Payment Time</span>
                <span className="font-rubik font-medium text-[14px] text-[#121111]">
                  {formattedDate}
                </span>
              </div>

              {/* Row 6: Sender */}
              <div className="flex justify-between items-center">
                <span className="font-rubik text-[14px] text-[#565656]">Sender</span>
                <span className="font-rubik font-medium text-[14px] text-[#121111]">
                  {name || 'Antonio Ibrahimovic'}
                </span>
              </div>

            </div>

            {/* Bottom Continue Button */}
            <button
              type="button"
              onClick={handleContinueSuccess}
              className="w-full h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[16px] rounded-[10px] transition cursor-pointer border-none shadow-md"
            >
              Continue
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
