
import { cn } from "@/lib/utils";

export function GeminiLogo({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-2xl", className)}
      role="img"
      aria-label="spark emoji"
      {...props}
    >
      ✨
    </span>
  );
}
