import { Form, Input, Select, Error } from "..";
import Submit from "../Submit";

interface FormValues {
  firstName: string;
  lastName: string;
  gender: string;
}

const App = () => {
  const onSubmit = () => null;

  return (
    <Form<FormValues> label="Profile" onSubmit={onSubmit}>
      {({ register, formState: { errors } }) => (
        <>
          <Input
            name="firstName"
            label="First Name"
            ref={register({ required: true })}
          />
          {errors.firstName?.type === "required" && (
            <Error>Please provide your first name</Error>
          )}
          <Input
            name="lastName"
            label="Last Name"
            ref={register({
              required: true,
            })}
          />
          {errors.lastName?.type === "required" && (
            <Error>Please provide your last name</Error>
          )}
          <Select name="gender" label="Gender">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
          <Submit>Update</Submit>
        </>
      )}
    </Form>
  );
};

export default App;
