import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase tracking-[0.15em]",
  {
    variants: {
      variant: {
        default: "border-[#101010]/20 bg-white/70 text-[#101010]",
        premium: "border-[#d4a56b]/40 bg-[#d4a56b]/10 text-[#7a5a2c]",
        sale: "border-[#c45b7a]/40 bg-[#c45b7a]/10 text-[#c45b7a]",
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
