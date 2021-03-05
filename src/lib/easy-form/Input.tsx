import { forwardRef, InputHTMLAttributes, Ref } from "react";
import Field from "./Field";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input = (props: InputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <Field ref={ref} {...props} render={(props) => <input {...props} />} />
  );
};

export default forwardRef(Input);
