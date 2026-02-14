import { Skeleton } from "../../UI/Skeleton";

export function SkeletonOrder() {
  return (
    <div className="bg-white p-4 shadow w-1/4 rounded-2xl">
      <Skeleton className="h-5 w-40 mb-4 bg-slate-400/30" />

      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="mb-4">
          <div className="flex justify-between mb-2">
            <Skeleton className="h-3 w-24 bg-slate-400/30" />
            <Skeleton className="h-3 w-10 bg-slate-400/30" />
          </div>
          <Skeleton className="h-3 w-full bg-slate-400/20 rounded-full" />
        </div>
      ))}
    </div>
  );
}
