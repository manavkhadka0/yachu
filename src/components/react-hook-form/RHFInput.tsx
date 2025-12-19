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
};

const RHFInput: React.FC<RHFInputProps> = ({
  name,
  label,
  placeholder,
  required,
  type,
  className,
  ...others
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm sm:text-base font-medium">
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
      )}
    />
  );
};

export default RHFInput;