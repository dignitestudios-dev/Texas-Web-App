'use client';

import { useCurrentUser } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/lib/cookies';

export const DashboardView = () => {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/role');
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-4 md:px-6">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome back, {user?.name}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard content placeholders */}
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <h3 className="font-semibold leading-none tracking-tight">Total Users</h3>
            <p className="text-sm text-muted-foreground mt-2">1,234</p>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <h3 className="font-semibold leading-none tracking-tight">Active Sessions</h3>
            <p className="text-sm text-muted-foreground mt-2">56</p>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <h3 className="font-semibold leading-none tracking-tight">System Status</h3>
            <p className="text-sm text-muted-foreground mt-2 text-green-500">Operational</p>
          </div>
        </div>
      </main>
    </div>
  );
};
