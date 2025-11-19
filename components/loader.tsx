"use client";

const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-400 rounded ${className}`} />
);

const PageTableSkeleton = () => {
  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-start mb-4.5">
        <div>
          <Skeleton className="h-8 w-24 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Sort and View buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-16" />
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg">
        {/* Table Header */}
        <div className="grid grid-cols-2 border-b border-gray-200 p-5"/>

        {/* Empty State */}
        <div className="flex items-center justify-center py-32.5">
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <Skeleton className="h-4 w-40" />
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTableSkeleton;