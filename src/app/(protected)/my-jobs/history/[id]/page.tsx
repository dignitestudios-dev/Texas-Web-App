import React, { Suspense } from 'react';
import { HistoryDetailsPage } from '@/features/care-services/components/history-details-page';
import { JobDetailsSkeleton } from '@/features/care-services';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<JobDetailsSkeleton />}>
      <HistoryDetailsPage jobId={resolvedParams.id} />
    </Suspense>
  );
}
