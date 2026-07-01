import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-xl border border-[#d7d3cf] bg-white px-3 py-2 text-sm outline-none transition placeholder:text-[#101010]/40 focus:border-[#7f263d]/40 focus:ring-2 focus:ring-[#7f263d]/15",
        className,
      )}
      {...props}
    />
  );
}
