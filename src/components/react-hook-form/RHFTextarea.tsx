import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/services/lib/utils";

type RHFTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  hideLabel?: boolean;
  /** Label sits inside the field and floats up once it is focused or filled */
  floatingLabel?: boolean;
};

const RHFTextarea: React.FC<RHFTextareaProps> = ({
  name,
  label,
  placeholder,
  required,
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
          <FormItem className="gap-1.5">
            <div className="relative">
              <FormControl>
                <Textarea
                  placeholder=" "
                  className={cn(
                    "peer min-h-[88px] rounded-xl border-border bg-background px-4 pb-2 pt-7 text-base md:text-base",
                    className
                  )}
                  {...field}
                  {...others}
                />
              </FormControl>
              <FormLabel className="pointer-events-none absolute left-4 top-4 text-base font-normal text-foreground/55 transition-all duration-150 peer-focus:top-2.5 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-xs">
                {label}
                {required && <span className="ml-0.5 text-destructive">*</span>}
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        ) : (
          <FormItem>
            <FormLabel
              className={
                hideLabel ? "sr-only" : "text-sm sm:text-base font-medium"
              }
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholder || ""}
                className={cn("bg-muted/50 border-border", className)}
                {...field}
                {...others}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }
    />
  );
};

export default RHFTextarea;
