import React, { Suspense } from 'react';
import { HistoryDetailsPage } from '@/features/care-services/components/history-details-page';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div className="p-8 font-rubik">Loading history details...</div>}>
      <HistoryDetailsPage jobId={resolvedParams.id} />
    </Suspense>
  );
}
