import React from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormMethods,
} from "react-hook-form";

export type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormMethods<TFormValues>) => React.ReactNode;
};

const Form = <TFormValues extends FieldValues = FieldValues>({
  onSubmit,
  children,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>();
  return (
    <form onSubmit={methods.handleSubmit(onSubmit, console.log)}>
      {children(methods)}
    </form>
  );
};

export default Form;

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

/**
 *  @see https://react-hook-form.com/ts#UseFormMethods
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <input ref={ref} {...props} />
);

export type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[] };

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, ...props }, ref) => (
    <select ref={ref} {...props}>
      {options.map(({ label, value }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  )
);

export const Error: React.FC<{}> = ({ children }) => (
  <span role="alert">{children}</span>
);
