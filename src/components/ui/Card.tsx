import { cn } from "@/lib/cn";

export function Card({
  className,
  title,
  children
}: {
  className?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("retro-card", className)}>
      {title && <div className="retro-card-header">{title}</div>}
      <div className="retro-card-body">
        {children}
      </div>
    </div>
  );
}
