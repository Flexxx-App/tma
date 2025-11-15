import { Skeleton, Text } from "@/shared/ui";

export default function ProfileLoading() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      <div className="flex flex-col gap-2 items-center justify-center">
        <Skeleton className="w-24 h-24 rounded-full mt-10" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center"></div>
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
    </div>
  );
}
