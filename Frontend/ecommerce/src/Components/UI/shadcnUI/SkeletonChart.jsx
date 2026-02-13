import { Skeleton } from "../../UI/skeleton";

export function SkeletonChart() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow w-1/2">
      <Skeleton className="h-6 w-32 mb-4 bg-slate-400/30" />
      <Skeleton className="h-64 w-full bg-slate-400/20 rounded-xl" />
    </div>
  );
}
