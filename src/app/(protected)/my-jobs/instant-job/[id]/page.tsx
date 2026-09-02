import React, { Suspense } from 'react';
import { InstantJobDetailsPage, JobDetailsSkeleton } from '@/features/care-services';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<JobDetailsSkeleton />}>
      <InstantJobDetailsPage jobId={resolvedParams.id} />
    </Suspense>
  );
}
