import React, { Suspense } from 'react';
import { GiverJobDetailsPage } from '@/features/giver-jobs';
import { JobDetailsSkeleton } from '@/features/care-services';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<JobDetailsSkeleton />}>
      <GiverJobDetailsPage jobId={resolvedParams.id} />
    </Suspense>
  );
}
