import { Skeleton } from "../../UI/Skeleton";

export function SkeletonCards() {
  return (
    <div className="grid grid-cols-4 gap-4 px-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-2xl shadow"
        >
          <Skeleton className="h-4 w-24 mb-3 bg-slate-400/30" />
          <Skeleton className="h-8 w-32 bg-slate-400/40" />
        </div>
      ))}
    </div>
  );
}
