import { forwardRef, ReactNode, Ref } from "react";
import Field from "./Field";

interface SelectProps {
  name: string;
  label?: string;
  children: ReactNode;
}

const Select = (props: SelectProps, ref: Ref<HTMLSelectElement>) => {
  return (
    <Field ref={ref} {...props} render={(props) => <select {...props} />} />
  );
};

export default forwardRef(Select);
