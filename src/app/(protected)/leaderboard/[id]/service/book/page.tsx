import BookingPage from '@/features/leaderboard/components/booking-page';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  await params; // consume params (id available if needed later)
  return <BookingPage />;
}
