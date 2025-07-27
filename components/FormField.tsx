import React from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProp<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
  autoComplete?: string;
}

const FormField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: FormFieldProp<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input
            className="input"
            placeholder={placeholder}
            type={type}
            autoComplete={autoComplete}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
export default FormField;
