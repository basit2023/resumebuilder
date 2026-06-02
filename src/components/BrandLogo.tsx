import { FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  inverse?: boolean;
  compact?: boolean;
};

export function BrandLogo({
  className,
  markClassName,
  textClassName,
  inverse = false,
  compact = false,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-sm ring-1 ring-white/20",
          markClassName,
        )}
      >
        <FileText className="h-5 w-5" strokeWidth={2.4} />
        <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-brand-950 ring-2 ring-white">
          <Sparkles className="h-2.5 w-2.5" strokeWidth={3} />
        </span>
      </span>
      {!compact && (
        <span
          className={cn(
            "font-display text-xl font-extrabold leading-none tracking-tight",
            inverse ? "text-white" : "text-gray-950",
            textClassName,
          )}
        >
          Job<span className={inverse ? "text-emerald-200" : "text-brand-600"}>Draft</span>ly
        </span>
      )}
    </span>
  );
}
