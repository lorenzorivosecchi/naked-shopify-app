import {
  HTMLAttributes,
  HTMLProps,
  InputHTMLAttributes,
  ReactHTMLElement,
  SelectHTMLAttributes,
} from "react";
import { FieldValues, UseFormMethods } from "react-hook-form";

type P = SelectHTMLAttributes<HTMLSelectElement>;

interface Props<TFieldValues extends FieldValues>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  name: Extract<keyof TFieldValues, string>;
  register?: UseFormMethods<TFieldValues>["register"];
  options: string[];
}

function Select<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
  const { register, options, name, ...rest } = props;
  return (
    <select name={name} ref={register} {...rest}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

export default Select;
