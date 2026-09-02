import React, { Suspense } from 'react';
import { ApplicantDetailsPage } from '@/features/care-services/components/applicant-details-page';
import { ApplicantDetailsSkeleton } from '@/features/care-services';

export default function Page() {
  return (
    <Suspense fallback={<ApplicantDetailsSkeleton />}>
      <ApplicantDetailsPage applicationId="app-1" />
    </Suspense>
  );
}
