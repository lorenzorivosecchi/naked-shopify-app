import React from "react";
import Form from "./Form";
import Input from "./Form/Input";
import Select from "./Form/Select";

export default function ExampleForm() {
  const onSubmit = (data) => console.log(data);

  return (
    <Form onSubmit={onSubmit}>
      <Input name="firstName" />
      <Input name="lastName" />
      <Select name="gender" options={["female", "male", "other"]} />
      <Input type="submit" value="Submit" />
    </Form>
  );
}
