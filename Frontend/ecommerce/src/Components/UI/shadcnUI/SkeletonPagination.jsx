import { Skeleton } from "../skeleton";

export function PaginationSkeleton() {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <Skeleton className="h-8 w-16 bg-slate-400/30 rounded-md" />
      <Skeleton className="h-8 w-8 bg-slate-400/30 rounded-md" />
      <Skeleton className="h-8 w-8 bg-slate-400/30 rounded-md" />
      <Skeleton className="h-8 w-8 bg-slate-400/30 rounded-md" />
      <Skeleton className="h-8 w-16 bg-slate-400/30 rounded-md" />
    </div>
  );
}
