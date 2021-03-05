import { forwardRef, Ref } from "react";
import Field from "./Field";

interface InputProps {
  name: string;
  label?: string;
}

const Input = (props: InputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <Field ref={ref} {...props} render={(props) => <input {...props} />} />
  );
};

export default forwardRef(Input);
