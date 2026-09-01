'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { CreditCard, Landmark, X } from 'lucide-react';

interface InstantRequestFeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPayNow: () => void;
}

export function InstantRequestFeeDialog({
  open,
  onOpenChange,
  onPayNow,
}: InstantRequestFeeDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [billedTo, setBilledTo] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPayNow();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full sm:max-w-[540px] md:max-w-[580px] bg-white rounded-[24px] p-6 sm:p-7 flex flex-col gap-3.5 shadow-2xl border border-[#EFEFEF] outline-none select-none overflow-hidden"
      >
        {/* Header Row: Title & Close Button */}
        <div className="flex items-center justify-between w-full">
          <DialogTitle className="font-rubik font-bold text-[22px] text-[#121111]">
            Instant Request Fee
          </DialogTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-7 h-7 rounded-full bg-[#F4F4F5] hover:bg-neutral-200 transition flex items-center justify-center text-[#121111] border-none cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Price Amount */}
        <div className="font-rubik font-bold text-[32px] leading-none text-[#121111]">
          $10.00
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {/* Field: Billed To */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-rubik font-medium text-[13px] text-[#121111]">
              Billed To
            </label>
            <input
              type="text"
              placeholder="Name"
              value={billedTo}
              onChange={(e) => setBilledTo(e.target.value)}
              className="w-full h-[42px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[10px] px-3.5 font-rubik text-[13.5px] text-[#121111] placeholder:text-[#A3A3A3] outline-none focus:border-[#F36922] transition-colors"
            />
          </div>

          {/* Payment Method Selector */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-rubik font-medium text-[13px] text-[#121111]">
              Payment Details
            </label>
            <div className="flex items-center gap-2.5 w-full">
              {/* Card Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 h-[56px] rounded-[12px] p-2.5 flex flex-col justify-between items-start transition cursor-pointer border-2 text-left ${
                  paymentMethod === 'card'
                    ? 'border-[#0A0A6E] bg-[#EEF2FF]'
                    : 'border-[#E4E4E7] bg-white hover:bg-[#FAFAFA]'
                }`}
              >
                <CreditCard className={`w-4 h-4 ${paymentMethod === 'card' ? 'text-[#0A0A6E]' : 'text-[#121111]'}`} />
                <span className={`font-rubik font-semibold text-[12.5px] ${paymentMethod === 'card' ? 'text-[#0A0A6E]' : 'text-[#121111]'}`}>
                  Card
                </span>
              </button>

              {/* Bank Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`flex-1 h-[56px] rounded-[12px] p-2.5 flex flex-col justify-between items-start transition cursor-pointer border-2 text-left ${
                  paymentMethod === 'bank'
                    ? 'border-[#0A0A6E] bg-[#EEF2FF]'
                    : 'border-[#E4E4E7] bg-white hover:bg-[#FAFAFA]'
                }`}
              >
                <Landmark className={`w-4 h-4 ${paymentMethod === 'bank' ? 'text-[#0A0A6E]' : 'text-[#121111]'}`} />
                <span className={`font-rubik font-semibold text-[12.5px] ${paymentMethod === 'bank' ? 'text-[#0A0A6E]' : 'text-[#121111]'}`}>
                  Bank
                </span>
              </button>
            </div>
          </div>

          {/* Card Name Input with Badges */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Card Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full h-[42px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[10px] px-3.5 pr-28 font-rubik text-[13.5px] text-[#121111] placeholder:text-[#A3A3A3] outline-none focus:border-[#F36922] transition-colors"
            />
            {/* Card Brand Logos */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
              <div className="w-7 h-4 bg-[#0070D2] rounded-[3px] flex items-center justify-center text-[7px] font-bold text-white tracking-tighter">
                AMEX
              </div>
              <div className="w-7 h-4 bg-[#EB001B] rounded-[3px] flex items-center justify-center text-[7px] font-bold text-white tracking-tighter">
                MC
              </div>
              <div className="w-7 h-4 bg-[#1A1F71] rounded-[3px] flex items-center justify-center text-[8px] font-bold text-white italic">
                VISA
              </div>
            </div>
          </div>

          {/* Expiration & CVC Row */}
          <div className="flex items-center gap-2.5 w-full">
            <input
              type="text"
              placeholder="Expiration"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              className="flex-1 h-[42px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[10px] px-3.5 font-rubik text-[13.5px] text-[#121111] placeholder:text-[#A3A3A3] outline-none focus:border-[#F36922] transition-colors"
            />
            <input
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="flex-1 h-[42px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[10px] px-3.5 font-rubik text-[13.5px] text-[#121111] placeholder:text-[#A3A3A3] outline-none focus:border-[#F36922] transition-colors"
            />
          </div>

          {/* Zip Input */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full h-[42px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[10px] px-3.5 font-rubik text-[13.5px] text-[#121111] placeholder:text-[#A3A3A3] outline-none focus:border-[#F36922] transition-colors"
            />
          </div>

          {/* Important Disclaimer Notice */}
          <div className="flex flex-col gap-0.5 text-left font-rubik text-[12px] leading-[16px] text-[#565656]">
            <span className="font-medium text-[#121111]">Important:</span>
            <p>
              This fee is for the Instant Job Request and is separate from the payment for the caregiver&apos;s service.
            </p>
          </div>

          {/* Pay Now Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full h-[44px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none shadow-sm flex items-center justify-center disabled:opacity-60"
          >
            {isProcessing ? 'Processing Payment...' : 'Pay Now'}
          </button>

          {/* Footer Terms Note */}
          <p className="font-rubik text-[11.5px] text-[#565656] text-center leading-[15px]">
            By continuing you agree with our{' '}
            <span className="font-semibold underline text-[#121111] cursor-pointer">
              Terms of Use
            </span>{' '}
            and{' '}
            <span className="font-semibold underline text-[#121111] cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
