import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface RHFInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  className?: string;
  [key: string]: any;
}

const RHFInput = ({
  name,
  label,
  placeholder,
  required,
  type = "text",
  className,
  ...others
}: RHFInputProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full space-y-1.5">
          <FormLabel className="text-xs font-bold uppercase tracking-widest text-foreground/40">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder || ""}
              className={cn(
                "h-12 rounded-2xl border-2 border-border bg-card px-4 text-sm text-foreground placeholder:text-foreground/30 focus-visible:border-forest focus-visible:ring-0",
                className,
              )}
              type={type}
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

export default RHFInput;
