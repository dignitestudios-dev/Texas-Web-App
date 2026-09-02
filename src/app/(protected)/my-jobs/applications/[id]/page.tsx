import React, { Suspense } from 'react';
import { ApplicantDetailsPage } from '@/features/care-services/components/applicant-details-page';
import { ApplicantDetailsSkeleton } from '@/features/care-services';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<ApplicantDetailsSkeleton />}>
      <ApplicantDetailsPage applicationId={resolvedParams.id} />
    </Suspense>
  );
}
