import { Skeleton } from "../skeleton";





export function SkeletonTable({ columns, rows = 5 }) {
  return (
    <table className="w-full mt-5 border-collapse">
      <thead>
        <tr className="border-b border-slate-300">
          {columns.map((col) => (
            <th key={col.key} className={`p-2 ${col.width || ""}`}>
              <Skeleton className="h-4 w-20 bg-slate-400/30" />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex} className="border-b last:border-b-0">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="p-2">
                {col.key === "img" ? (
                  <Skeleton className="h-16 w-24 mx-auto bg-slate-400/30 rounded-md" />
                ) : col.key === "action" ? (
                  <div className="flex justify-center gap-3">
                    <Skeleton className="h-4 w-6 bg-slate-400/30" />
                    <Skeleton className="h-4 w-6 bg-slate-400/30" />
                  </div>
                ) : (
                  <Skeleton className="h-4 w-full bg-slate-400/30" />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

