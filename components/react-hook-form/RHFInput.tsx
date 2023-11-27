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

type RHFInputProps = InputProps & {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute | undefined;
};

const RHFInput: React.FC<RHFInputProps> = ({
  name,
  label,
  placeholder,
  required,
  type,
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
            <Input
              placeholder={placeholder || ""}
              className=" bg-slate-100"
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
