import React, { Suspense } from 'react';
import { GiverJobDetailsPage } from '@/features/giver-jobs';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div className="p-8 font-rubik">Loading job details...</div>}>
      <GiverJobDetailsPage jobId={resolvedParams.id} />
    </Suspense>
  );
}
