import { forwardRef, ReactChildren, ReactNode } from "react";
import Field from "./Field";

interface SelectProps {
  name: string;
  label?: string;
  children: ReactNode;
}

const Select = forwardRef<any, SelectProps>((props, ref) => {
  return (
    <Field ref={ref} {...props} render={(props) => <select {...props} />} />
  );
});

export default Select;
