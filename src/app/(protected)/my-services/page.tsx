'use client';

import React, { Suspense } from 'react';
import { MyServicesPage } from '@/features/my-services';
import { JobsPageSkeleton } from '@/features/care-services';

export default function Page() {
  return (
    <Suspense fallback={<JobsPageSkeleton />}>
      <MyServicesPage />
    </Suspense>
  );
}
