import { Loader } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Loader className="h-12 w-12 text-amber-500 animate-spin" />
      <p className="mt-4 text-slate-400">Loading content...</p>
    </div>
  );
}