import React, { ReactElement, ReactNode } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormOptions,
} from "react-hook-form";

interface FormProps<TFieldValues extends FieldValues> {
  defaultValues?: UseFormOptions["defaultValues"];
  children: ReactElement | ReactElement[];
  onSubmit: SubmitHandler<TFieldValues>;
}

function Form<TFieldValues extends FieldValues>(
  props: FormProps<TFieldValues>
) {
  const { defaultValues, children, onSubmit } = props;
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...child.props,
              register: methods.register,
              key: child.props.name,
            })
          : child;
      })}
    </form>
  );
}

export default Form;
