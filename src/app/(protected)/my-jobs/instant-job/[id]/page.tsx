import React, { Suspense } from 'react';
import { InstantJobDetailsPage } from '@/features/care-services';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div className="p-8 font-rubik">Loading instant job details...</div>}>
      <InstantJobDetailsPage jobId={resolvedParams.id} />
    </Suspense>
  );
}
