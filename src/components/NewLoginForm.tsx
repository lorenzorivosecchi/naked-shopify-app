import React from "react";
import Form from "./Form";
import Input from "./Form/Input";

interface FormValues {
  email: string;
  password: string;
}

export default function NewLoginForm() {
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Form onSubmit={onSubmit}>
      <Input name="email" required={true} />
      <Input name="password" required={true} />
      <Input type="submit" value="Submit" />
    </Form>
  );
}
