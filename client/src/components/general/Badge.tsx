import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/helper";

export default function Badge({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "bg-slate-600 text-white px-5 py-[0.125rem] rounded-full",
        className
      )}
    >
      {children}
    </div>
  );
}
