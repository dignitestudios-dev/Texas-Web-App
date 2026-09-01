'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const verificationSchema = z.object({
  otp: z.string().length(5, 'Please enter all 5 digits'),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

export const VerificationForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams ? searchParams.get('phone') : null;
  const [otp, setOtp] = useState(['', '', '', '', '']);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: { otp: '' },
  });

  const handleChange = (index: number, value: string) => {
    // Only accept numeric digits
    const cleanDigit = value.replace(/[^\d]/g, '');
    if (!cleanDigit && value !== '') return;

    const char = cleanDigit.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);
    setValue('otp', newOtp.join(''), { shouldValidate: true });

    // Focus next input if a digit was entered
    if (char && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/[^\d]/g, '').slice(0, 5);
    if (!pasteData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 5; i++) {
      newOtp[i] = pasteData[i] || '';
    }
    setOtp(newOtp);
    setValue('otp', newOtp.join(''), { shouldValidate: true });

    // Focus the appropriate input
    const focusIndex = Math.min(pasteData.length, 4);
    const targetInput = document.getElementById(`otp-${focusIndex}`);
    targetInput?.focus();
  };

  const onSubmit = (data: VerificationFormValues) => {
    toast.success('Verification successful!');
    router.replace('/success');
  };

  const handleResend = () => {
    toast.success('A new OTP has been sent to your phone.');
  };

  return (
    <div className="flex flex-col items-center max-w-[440px] w-full mx-auto select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="font-rubik font-bold text-[28px] sm:text-[32px] leading-[38px] text-[#121111]">
          Verification
        </h1>
        <p className="font-rubik font-normal text-[14px] sm:text-[15px] leading-[22px] text-[#565656] mt-1.5">
          Enter the OTP sent to {phone ? `*** *** ${phone.replace(/[^\d]/g, '').slice(-4)}` : 'your phone number'}
        </p>

        {/* Change Number Option */}
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="font-rubik font-medium text-[14px] text-[#F36922] hover:underline cursor-pointer border-none bg-transparent mt-1"
        >
          Change Number
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
        
        {/* 5-Digit OTP Boxes */}
        <div className="flex flex-col items-center mb-6 w-full">
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-[52px] h-[56px] sm:w-[58px] sm:h-[60px] bg-white rounded-[14px] text-center font-rubik font-semibold text-[20px] sm:text-[22px] text-[#0A0A6E] border border-[#EFEFEF] shadow-2xs outline-none focus:border-[#F36922] focus:ring-1 focus:ring-[#F36922] transition-colors ${
                  errors.otp ? 'border-red-500' : ''
                }`}
              />
            ))}
          </div>

          {errors.otp && (
            <span className="text-red-500 text-[13px] font-rubik mt-2">
              {errors.otp.message}
            </span>
          )}
        </div>

        {/* Resend Code Section */}
        <div className="mb-6">
          <p className="font-rubik font-normal text-[14px] text-[#565656] text-center">
            Didn't receive code?{' '}
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-[#121111] hover:underline cursor-pointer border-none bg-transparent"
            >
              Resend Now
            </button>
          </p>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[16px] rounded-[12px] shadow-sm transition cursor-pointer border-none flex items-center justify-center"
        >
          Continue
        </button>

      </form>

    </div>
  );
};
