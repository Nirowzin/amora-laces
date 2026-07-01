import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase tracking-[0.15em]",
  {
    variants: {
      variant: {
        default: "border-[#101010]/20 bg-white/70 text-[#101010]",
        premium: "border-[#b8904f]/40 bg-[#b8904f]/10 text-[#7a5a2c]",
        sale: "border-[#7f263d]/40 bg-[#7f263d]/10 text-[#7f263d]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
