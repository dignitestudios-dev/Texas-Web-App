import React, { Suspense } from 'react';
import { CareServicesPage, JobsPageSkeleton } from '@/features/care-services';

export default function Page() {
  return (
    <Suspense fallback={<JobsPageSkeleton />}>
      <CareServicesPage />
    </Suspense>
  );
}
