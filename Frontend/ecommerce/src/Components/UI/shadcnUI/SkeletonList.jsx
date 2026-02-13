import { Skeleton } from "../../UI/skeleton";
export function ListSkeleton() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow w-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full mb-3 bg-slate-400/30" />
      ))}
    </div>
  );
}
