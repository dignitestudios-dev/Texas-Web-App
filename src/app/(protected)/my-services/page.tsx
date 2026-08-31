'use client';

import React, { Suspense } from 'react';
import { MyServicesPage } from '@/features/my-services';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FEF0E9] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#0A0A6E] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <MyServicesPage />
    </Suspense>
  );
}
