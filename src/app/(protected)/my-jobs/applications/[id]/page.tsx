import React, { Suspense } from 'react';
import { ApplicantDetailsPage } from '@/features/care-services/components/applicant-details-page';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div className="p-8 font-rubik">Loading application details...</div>}>
      <ApplicantDetailsPage applicationId={resolvedParams.id} />
    </Suspense>
  );
}
