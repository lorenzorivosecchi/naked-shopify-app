import { forwardRef, ReactChildren, ReactNode } from "react";
import Field from "./Field";

interface InputProps {
  name: string;
  label: string;
}

const Input = forwardRef<any, InputProps>((props, ref) => {
  return (
    <Field ref={ref} {...props} render={(props) => <input {...props} />} />
  );
});

export default Input;
