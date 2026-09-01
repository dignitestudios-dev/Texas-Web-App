'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useLogin } from '../api/auth.mutations';

const loginSchema = z.object({
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phoneNumber: '' },
  });

  const phoneNumberValue = watch('phoneNumber');

  const onSubmit = (data: LoginFormValues) => {
    router.replace(`/verification?phone=${encodeURIComponent(data.phoneNumber)}`);
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const digits = value.replace(/[^\d]/g, '');
    if (digits.length < 4) return digits;
    if (digits.length < 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phoneNumber', formatted, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[440px] mx-auto select-none">

      {/* Header (Matches Screenshot) */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="font-rubik font-bold text-[28px] sm:text-[32px] leading-[38px] text-[#121111] text-center">
          Welcome
        </h1>
        <p className="font-rubik font-normal text-[14px] sm:text-[15px] leading-[22px] text-[#565656] text-center mt-1.5">
          Sign in or sign up with your phone number to continue.
        </p>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">

        {/* Phone Input Row: Country Code + Phone Input */}
        <div className="flex flex-row items-center gap-2.5 w-full">
          {/* Country Code Pill */}
          <div className="box-border flex flex-row items-center justify-center gap-2 w-[80px] sm:w-[86px] h-[52px] bg-white border border-[#EFEFEF] rounded-[12px] shadow-2xs shrink-0">
            <Image
              src="/images/us-flag.svg"
              alt="US Flag"
              width={22}
              height={16}
              className="object-contain"
            />
            <span className="font-rubik font-medium text-[15px] text-[#121111]">
              +1
            </span>
          </div>

          {/* Input Box */}
          <div className="flex-1 flex flex-col">
            <input
              type="tel"
              placeholder="Add phone number"
              value={phoneNumberValue}
              onChange={handlePhoneChange}
              maxLength={12}
              className={`h-[52px] bg-white rounded-[12px] px-4 font-rubik text-[15px] text-[#121111] placeholder:text-[#8E8E93] border border-[#EFEFEF] shadow-2xs outline-none focus:border-[#F36922] transition-colors ${errors.phoneNumber ? 'border-red-500' : ''
                }`}
            />
          </div>
        </div>

        {errors.phoneNumber && (
          <span className="text-red-500 text-[13px] font-rubik mt-1.5 ml-1">
            {errors.phoneNumber.message}
          </span>
        )}

        {/* Continue CTA Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[16px] rounded-[12px] shadow-sm transition cursor-pointer border-none flex items-center justify-center mt-4 disabled:opacity-70"
        >
          {isPending ? 'Loading...' : 'Continue'}
        </button>

      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full my-6">
        <div className="flex-1 h-[1px] bg-[#E4E4E7]" />
        <span className="font-rubik font-normal text-[14px] text-[#565656]">
          Or
        </span>
        <div className="flex-1 h-[1px] bg-[#E4E4E7]" />
      </div>

      {/* Social Logins: Google & Apple */}
      <div className="flex items-center gap-3.5 w-full">
        <button
          type="button"
          className="flex-1 h-[48px] bg-white hover:bg-neutral-50 border border-[#EFEFEF] rounded-[12px] flex items-center justify-center gap-2 text-[#121111] font-rubik font-medium text-[14px] shadow-2xs transition cursor-pointer"
        >
          <Image
            src="/images/google-icon.svg"
            alt="Google"
            width={18}
            height={18}
          />
          <span>Continue With Google</span>
        </button>

        <button
          type="button"
          className="flex-1 h-[48px] bg-white hover:bg-neutral-50 border border-[#EFEFEF] rounded-[12px] flex items-center justify-center gap-2 text-[#121111] font-rubik font-medium text-[14px] shadow-2xs transition cursor-pointer"
        >
          <Image
            src="/images/apple-icon.svg"
            alt="Apple"
            width={18}
            height={18}
          />
          <span>Continue With Apple</span>
        </button>
      </div>

      {/* Footer Account Creation Link */}
      {/* <p className="font-rubik text-[14px] text-[#121111] text-center mt-6">
        Don’t have an account?{' '}
        <Link href="/role" className="font-semibold text-[#121111] hover:underline">
          Create Now
        </Link>
      </p> */}

      {/* Terms & Privacy Policy */}
      <p className="font-rubik text-[13px] text-[#565656] text-center mt-3">
        I Accept The{' '}
        <Link href="#" className="text-[#F36922] font-semibold hover:underline">
          Terms & Conditions
        </Link>{' '}
        And{' '}
        <Link href="#" className="text-[#F36922] font-semibold hover:underline">
          Privacy Policy
        </Link>
      </p>

    </div>
  );
};
