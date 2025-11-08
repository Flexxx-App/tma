import { cn } from "@/shared/lib/utils";

export function Page({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("h-full", className)}>{children}</div>;
}
