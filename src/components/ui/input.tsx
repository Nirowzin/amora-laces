import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-xl border border-[#d7d3cf] bg-white px-3 text-sm outline-none transition placeholder:text-[#101010]/40 focus:border-[#7f263d]/40 focus:ring-2 focus:ring-[#7f263d]/15",
        className,
      )}
      {...props}
    />
  );
}
