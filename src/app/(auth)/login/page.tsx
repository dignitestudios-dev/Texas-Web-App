import { LoginForm, LoginSkeleton } from '@/features/auth';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-full">
      <Suspense fallback={<LoginSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
