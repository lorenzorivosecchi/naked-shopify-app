import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormMethods,
} from "react-hook-form";

interface FormProps<TFormValues> {
  onSubmit: SubmitHandler<TFormValues>;
  label: string;
  children: (methods: UseFormMethods<TFormValues>) => React.ReactNode;
}

/**
 * @see https://react-hook-form.com/ts#UseFormMethods
 */
const Form = <TFormValues extends FieldValues = FieldValues>({
  onSubmit,
  children,
  label,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>();
  return (
    <form aria-label={label} onSubmit={methods.handleSubmit(onSubmit)}>
      {children(methods)}
    </form>
  );
};

export default Form;
