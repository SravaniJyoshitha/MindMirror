
import { cn } from "@/lib/utils";

export function GeminiLogo({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", className)}
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 22a10 10 C 22 22 22 12 22 12" />
      <path d="M2 12a10 10 0 0 0 10 10" />
    </svg>
  );
}
