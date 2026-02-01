import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

function FallenCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-card border-border">
      <CardContent className="p-0">
        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-7 gap-4 p-4 items-center">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>

        {/* Mobile View */}
        <div className="md:hidden p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
          <Skeleton className="h-9 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function FallenListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search Section Skeleton */}
      <div className="relative max-w-md mx-auto">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Table Header Skeleton */}
      <Skeleton className="hidden md:block h-14 w-full rounded-lg" />

      {/* List Items Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <FallenCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
