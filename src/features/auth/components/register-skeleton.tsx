import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export function RegisterSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto mt-10 animate-pulse">
      <CardHeader className="space-y-2">
        <Skeleton className="h-7 w-48 rounded-lg bg-neutral-200/80" />
        <Skeleton className="h-4 w-72 rounded-md bg-neutral-200/60" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name Field Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 rounded bg-neutral-200/60" />
          <Skeleton className="h-10 w-full rounded-md bg-neutral-200/70" />
        </div>
        {/* Email Field Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-14 rounded bg-neutral-200/60" />
          <Skeleton className="h-10 w-full rounded-md bg-neutral-200/70" />
        </div>
        {/* Password Field Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 rounded bg-neutral-200/60" />
          <Skeleton className="h-10 w-full rounded-md bg-neutral-200/70" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Skeleton className="w-full h-10 rounded-md bg-neutral-200/80" />
        <Skeleton className="h-4 w-52 rounded bg-neutral-200/60 mx-auto" />
      </CardFooter>
    </Card>
  );
}
