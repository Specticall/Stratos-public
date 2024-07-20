import { cn } from "../../utils/helper";

export default function ProfilePicture({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-20 aspect-square rounded-full bg-slate-200 relative row-span-2 group cursor-pointer",
        className
      )}
    >
      <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-40 transition-all duration-200"></div>
    </div>
  );
}
