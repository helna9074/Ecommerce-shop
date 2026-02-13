import React from "react";

const ProductviewSkeleton = () => {
  return (
    <div className="lg:mx-40 mx-5 animate-pulse h-full">
      <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr_1fr] gap-6">

        {/* Thumbnails */}
        <div className="hidden lg:flex flex-col gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 rounded"></div>
          ))}
        </div>

        {/* Main Image */}
        <div className="h-[400px] bg-slate-200 rounded"></div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div className="h-6 bg-slate-200 w-3/4 rounded"></div>
          <div className="h-4 bg-slate-200 w-1/3 rounded"></div>

          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-slate-200 rounded"></div>
            ))}
          </div>

          <div className="h-6 bg-slate-200 w-1/4 rounded"></div>

          <div className="h-16 bg-slate-200 rounded"></div>

          <div className="h-10 bg-slate-200 w-1/2 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductviewSkeleton;
