import { InputHTMLAttributes, ReactElement, ReactHTMLElement } from "react";
import { FieldValues, UseFormMethods } from "react-hook-form";

interface Props<TFieldValues extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name?: Extract<keyof TFieldValues, string>;
  register?: UseFormMethods<TFieldValues>["register"];
}

function Input<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
  const { register, name, ...rest } = props;
  return <input name={name} ref={register} {...rest} />;
}

export default Input;
