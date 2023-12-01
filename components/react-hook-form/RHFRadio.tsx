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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type RHFradioProps = InputProps & {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute | undefined;
  children: React.ReactNode;
};

const RHFradio: React.FC<RHFradioProps> = ({
  name,
  label,
  placeholder,
  required,
  type,
  children,
  ...others
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Gender</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex  space-x-2"
            >
              {children}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default RHFradio;
