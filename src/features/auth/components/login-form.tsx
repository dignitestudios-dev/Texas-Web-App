'use client';

import { useState } from 'react';
import { useLogin } from '../api/auth.mutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';

const loginSchema = z.object({
  phoneNumber: z.string().min(12, "Please enter a valid phone number"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams ? searchParams.get('role') : null;
  const roleTitle = roleParam === 'caregiver' ? 'Care Giver' : roleParam === 'seeker' ? 'Care Seeker' : null;

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phoneNumber: '' }
  });

  const phoneNumberValue = watch('phoneNumber');

  const onSubmit = (data: LoginFormValues) => {
    // login({ phoneNumber: data.phoneNumber.replace(/-/g, '') });
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
    <div className="flex flex-col items-center w-full max-w-[447px] mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col items-center space-y-3">
        <h1 className="font-rubik font-medium text-[26px] leading-[31px] tracking-[-0.408px] text-[#121111]">
          Welcome Back
        </h1>
        <p className="font-poppins font-normal text-[14px] leading-[1.2] text-center text-[#565656]">
          {roleTitle ? `Please enter your details to log in as ${roleTitle}.` : 'Please enter your details to log in.'}
        </p>
      </div>

      {/* Social Logins */}
      <div className="flex flex-row justify-center items-start gap-5 w-full">
        <Button variant="ghost" className="flex-1 flex flex-row justify-center items-center py-[14px] px-[16px] gap-[6px] h-[50px] bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-none border-none">
          <Image src="/images/google-icon.svg" alt="Google" width={16} height={16} />
          <span className="font-rubik font-medium text-[15px] leading-[1.35] text-center capitalize text-[#121111]">
            Continue With Google
          </span>
        </Button>

        <Button variant="ghost" className="flex-1 flex flex-row justify-center items-center py-[14px] px-[16px] gap-[6px] h-[50px] bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-none border-none">
          <Image src="/images/apple-icon.svg" alt="Apple" width={16} height={16} />
          <span className="font-rubik font-medium text-[15px] leading-[1.35] text-center capitalize text-[#121111]">
            Continue With Apple
          </span>
        </Button>
      </div>

      {/* Divider */}
      <div className="flex flex-row items-center gap-[10px] w-full">
        <div className="flex-1 border-t border-[#EFEFEF]"></div>
        <span className="font-rubik font-medium text-[16px] leading-[1.35] text-center capitalize text-[#121111]">
          Or
        </span>
        <div className="flex-1 border-t border-[#EFEFEF]"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full space-y-8">

        {/* Phone Input Container */}
        <div className="flex flex-row items-center gap-2 w-full">
          {/* Country Code */}
          <div className="flex flex-row items-center justify-center gap-2 w-[112px] h-[44px] bg-white  shrink-0 rounded-xl">
            <Image src="/images/us-flag.svg" alt="US" width={24} height={18} className="" />
            <span className="font-poppins font-medium text-[14px] text-[#181818]">
              +1
            </span>
          </div>

          {/* Input */}
          <div className="flex-1 flex flex-col">
            <Input
              type="tel"
              placeholder="Add phone number"
              className={`h-[44px] bg-white rounded-xl px-4 font-poppins text-[14px] text-[#181818] placeholder:text-[#727272] outline-none focus-visible:ring-2 focus-visible:ring-[#F36922] focus-visible:ring-offset-0 border-none ${errors.phoneNumber ? 'ring-2 ring-red-500' : ''}`}
              value={phoneNumberValue}
              onChange={handlePhoneChange}
              maxLength={12}
            />
          </div>
        </div>
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm font-poppins  -mt-5">{errors.phoneNumber.message}</p>
        )}

        {/* Continue Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="flex flex-row justify-center items-center py-[14px] px-[16px] gap-[6px] w-full h-[48px] bg-[#F36922] rounded-xl hover:bg-[#E55A13] transition-colors disabled:opacity-70 text-white"
        >
          <span className="font-rubik font-medium text-[15px] leading-[1.35] text-center capitalize">
            {isPending ? 'Loading...' : 'Continue'}
          </span>
        </Button>

      </form>

      {/* Footer text */}
      <div className="pt-2">
        <p className="font-poppins font-medium text-[14px] leading-[1.2] text-center text-[#181818]">
          Don't have an account?{' '}
          <Link href="/register" className="font-bold hover:underline">
            Create Now
          </Link>
        </p>
      </div>

    </div>
  );
};
