import { FieldValues, useForm } from "react-hook-form";
import { FormProps } from "src/components/Form";

/**
 * @see https://react-hook-form.com/ts#UseFormMethods
 */
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
