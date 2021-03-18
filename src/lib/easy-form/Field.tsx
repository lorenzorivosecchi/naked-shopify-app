// https://blog.andrewbran.ch/polymorphic-react-components/#an-alternative-approach

import { ForwardedRef, forwardRef, Ref } from "react";
import { ReactNode } from "react";

interface FieldInjectedProps {
  id: string;
  name: string;
  children?: ReactNode;
  ref: ForwardedRef<any>;
}

interface FieldProps {
  label?: string;
  name: string;
  render: (props: FieldInjectedProps) => JSX.Element;
  children?: ReactNode;
}

const Field = (props: FieldProps, ref: Ref<any>) => {
  const { name, label, render, children, ...rest } = props;
  return (
    <>
      <label htmlFor={name}>{label || name}</label>
      {render({
        id: name,
        name,
        children,
        ref,
        ...rest,
      })}
    </>
  );
};

export default forwardRef(Field);
