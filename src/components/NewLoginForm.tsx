import Form from "./Form";

type FormValues = {
  email: string;
  password: string;
};

const NewLoginForm: React.FC<{}> = (props) => {
  const onSubmit = (data) => console.log(data);
  return (
    <Form<FormValues>> onSubmit={onSubmit}>
      <Form.Input name="email" />
      <Form.Input name="password" />
    </Form>
  );
};

export default NewLoginForm;
