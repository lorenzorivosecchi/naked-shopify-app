import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormMethods,
} from "react-hook-form";

interface FormProps<TFormValues> {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormMethods<TFormValues>) => React.ReactNode;
}

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
