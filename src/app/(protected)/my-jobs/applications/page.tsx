import React, { Suspense } from 'react';
import { ApplicantDetailsPage } from '@/features/care-services/components/applicant-details-page';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 font-rubik">Loading application details...</div>}>
      <ApplicantDetailsPage applicationId="app-1" />
    </Suspense>
  );
}
