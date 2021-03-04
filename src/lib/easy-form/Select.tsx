import { forwardRef, ReactChildren, ReactNode } from "react";
import Field from "./Field";

interface SelectProps {
  name: string;
  label: string;
  children: ReactNode;
}

const Select = forwardRef<any, SelectProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Field {...rest} render={(props) => <select {...props} />}>
      {children}
    </Field>
  );
});

export default Select;
