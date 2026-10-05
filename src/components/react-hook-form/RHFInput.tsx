import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/services/lib/utils";

type RHFInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute | undefined;
  className?: string;
  hideLabel?: boolean;
  /** Label sits inside the field and floats up once it is focused or filled */
  floatingLabel?: boolean;
};

const RHFInput: React.FC<RHFInputProps> = ({
  name,
  label,
  placeholder,
  required,
  type,
  className,
  hideLabel,
  floatingLabel,
  ...others
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) =>
        floatingLabel ? (
          <FormItem className="w-full gap-1.5">
            <div className="relative">
              <FormControl>
                <Input
                  placeholder=" "
                  className={cn(
                    "peer h-14 w-full rounded-xl border-border bg-background px-4 pb-1 pt-5 text-base sm:h-14 sm:px-4 md:h-14 md:text-base",
                    className
                  )}
                  type={type}
                  {...field}
                  {...others}
                />
              </FormControl>
              <FormLabel className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-normal text-foreground/55 transition-all duration-150 peer-focus:top-3.5 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
                {label}
                {required && <span className="ml-0.5 text-destructive">*</span>}
              </FormLabel>
            </div>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        ) : (
          <FormItem className="w-full">
            <FormLabel
              className={
                hideLabel ? "sr-only" : "text-sm sm:text-base font-medium"
              }
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder || ""}
                className={cn("bg-muted/50 border-border w-full", className)}
                type={type}
                {...field}
                {...others}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )
      }
    />
  );
};

export default RHFInput;
