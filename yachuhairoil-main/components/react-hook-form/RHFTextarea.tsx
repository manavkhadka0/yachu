import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface RHFTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  [key: string]: any;
}

const RHFTextarea = ({
  name,
  label,
  placeholder,
  required,
  className,
  ...others
}: RHFTextareaProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1.5">
          <FormLabel className="text-xs font-bold uppercase tracking-widest text-foreground/40">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder || ""}
              className={cn(
                "rounded-2xl border-2 border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus-visible:border-forest focus-visible:ring-0 resize-none",
                className,
              )}
              {...field}
              {...others}
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default RHFTextarea;
