import { cn } from "@/lib/cn";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "retro-badge",
        className
      )}
    >
      {children}
    </span>
  );
}
