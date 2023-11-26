import { Control, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea, TextareaProps } from "../ui/textarea";

type RHFInputProps = TextareaProps & {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
};

const RHFTextarea: React.FC<RHFInputProps> = ({
  name,
  label,
  placeholder,
  required,
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
              className=" bg-slate-100"
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
