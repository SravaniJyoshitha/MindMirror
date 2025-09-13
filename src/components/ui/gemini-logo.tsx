
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
      <path d="M12 3v.01M16.2 7.8l.01.01M21 12h-.01M16.2 16.2l.01.01M12 21v-.01M7.8 16.2l-.01.01M3 12h.01M7.8 7.8l-.01.01" />
    </svg>
  );
}
