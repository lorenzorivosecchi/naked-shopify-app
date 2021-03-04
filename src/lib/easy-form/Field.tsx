// https://blog.andrewbran.ch/polymorphic-react-components/#an-alternative-approach

import React, { ForwardedRef } from "react";
import { ReactNode } from "react";

interface FieldInjectedProps {
  id: string;
  name: string;
  children?: ReactNode;
  ref: ForwardedRef<any>;
}

interface FieldProps {
  label: string;
  name: string;
  render: (props: FieldInjectedProps) => JSX.Element;
  children?: ReactNode;
}

const Field = React.forwardRef<any, FieldProps>((props, ref) => {
  const { name, label, render, children } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      {render({
        id: name,
        name,
        children,
        ref,
      })}
    </>
  );
});

const defaultProps: Pick<FieldProps, "render"> = {
  render: (props) => <input {...props} />,
};

Field.defaultProps = defaultProps;

export default Field;
