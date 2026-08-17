import ReviewPage from '@/features/care-services/components/review-page';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ReviewPage id={id} />;
}
