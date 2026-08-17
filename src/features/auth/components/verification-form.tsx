'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const verificationSchema = z.object({
  otp: z.string().length(5, "Please enter all 5 digits"),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

export const VerificationForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get('phone');
  const [otp, setOtp] = useState(['', '', '', '', '']);

  const { handleSubmit, setValue, formState: { errors } } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: { otp: '' }
  });

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setValue('otp', newOtp.join(''), { shouldValidate: true });
    // Optionally focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const onSubmit = (data: VerificationFormValues) => {
    // Handle verification submission here
    console.log("Verified OTP:", data.otp);
    router.replace('/success');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center max-w-[445px] w-full mx-auto">
      {/* Back Button */}
      <div className="mb-10 self-start w-full">
        <Link href="/login" className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors border border-gray-100">
          <ArrowLeft className="w-5 h-5 text-[#181818]" />
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full mt-4">
        {/* Header */}
        <div className="flex flex-col items-center space-y-3 mb-12">
          <h1 className="font-rubik font-medium text-[26px] leading-[31px] tracking-[-0.408px] text-[#121111]">
            Verification
          </h1>
          <p className="font-poppins font-normal text-[14px] leading-[1.2] text-center text-[#565656]">
            Enter the OTP sent to *** *** {phone ? phone.slice(-3) : '***'}
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex flex-row items-center justify-center gap-8">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-[52px] bg-white rounded-xl text-center font-poppins font-semibold text-[16px] text-[#0A0A6E] outline-none focus-visible:ring-1 focus-visible:ring-[#0A0A6E] focus-visible:border-[#0A0A6E] focus-visible:ring-offset-0 border-none ${errors.otp ? 'ring-1 ring-red-500' : ''}`}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm font-poppins mt-3">{errors.otp.message}</p>
          )}
        </div>

        {/* Resend Link */}
        <div className="mb-8">
          <p className="font-poppins font-medium text-[14px] leading-[1.2] text-center text-[#181818]">
            Didn't receive code?{' '}
            <button type="button" className="font-bold hover:underline">
              Resend Now
            </button>
          </p>
        </div>

        {/* Continue Button */}
        <Button 
          type="submit"
          className="flex flex-row justify-center items-center py-[14px] px-[16px] gap-[6px] w-full h-[48px] bg-[#F36922] rounded-xl hover:bg-[#E55A13] transition-colors text-white shadow-sm border-none"
        >
          <span className="font-rubik font-medium text-[15px] leading-[1.35] text-center capitalize">
            Continue
          </span>
        </Button>
      </form>
    </div>
  );
};
