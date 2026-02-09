import Link from "next/link";
import { cn } from "@/lib/cn";

export function LinkButton({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "retro-button"
      : "retro-button retro-button--secondary";

  return (
    <Link
      href={href}
      className={cn(styles)}
    >
      {children}
    </Link>
  );
}
