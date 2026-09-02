'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import { JobDetailsPage } from '@/features/care-services/components/job-details-page';
import { GiverJobDetailsPage } from '@/features/giver-jobs';
import { JobDetailsSkeleton } from '@/features/care-services';
import { getRole } from '@/lib/cookies';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = use(params);
  const [role, setRole] = useState<'seeker' | 'giver' | null>(null);

  useEffect(() => {
    setRole(getRole() || 'seeker');
  }, []);

  return (
    <Suspense fallback={<JobDetailsSkeleton />}>
      {role === 'giver' ? (
        <GiverJobDetailsPage jobId={resolvedParams.id} />
      ) : role === 'seeker' ? (
        <JobDetailsPage jobId={resolvedParams.id} />
      ) : (
        <JobDetailsSkeleton />
      )}
    </Suspense>
  );
}
