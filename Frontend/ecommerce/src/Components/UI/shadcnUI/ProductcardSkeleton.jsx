import React from "react";

const ProductCardSkeleton = ({ count = 10 }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col lg:w-64 w-full h-70 shrink-0 animate-pulse"
        >
          {/* Image */}
          <div className="md:w-full lg:w-[75%] h-[200px] bg-slate-200 rounded"></div>

          {/* Text */}
          <div className="flex flex-col gap-2 mt-3">
            <div className="h-3 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/3"></div>

            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <div
                  key={j}
                  className="w-4 h-4 bg-slate-200 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
