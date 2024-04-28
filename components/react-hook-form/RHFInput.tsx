import { Control, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";

type RHFInputProps = InputProps & {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute | undefined;
  className?: string;
};

const RHFInput: React.FC<RHFInputProps> = ({
  name,
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
        <FormItem>
          <FormLabel>{required}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder || ""}
              className={cn(" bg-slate-100", className)}
              type={type}
              {...field}
              {...others}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default RHFInput;
