'use client';

import React, { use } from 'react';
import { ServiceRequestDetailsPage } from '@/features/my-services';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = use(params);
  return <ServiceRequestDetailsPage requestId={resolvedParams.id} />;
}
