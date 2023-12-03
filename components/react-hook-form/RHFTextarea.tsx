import { Control, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Textarea, TextareaProps } from "../ui/textarea";
import { cn } from "@/lib/utils";

type RHFInputProps = TextareaProps & {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const RHFTextarea: React.FC<RHFInputProps> = ({
  name,
  label,
  placeholder,
  required,
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
          <FormLabel>
            {label}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder || ""}
              className={cn(" bg-slate-100", className)}
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
export default RHFTextarea;
