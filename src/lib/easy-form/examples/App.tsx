import { Form, Input, Select } from "..";

interface FormValues {
  firstName: "firstName";
  lastName: "lastName";
}

const App = () => {
  const onSubmit = (data) => console.log(data);

  return (
    <Form<FormValues> onSubmit={onSubmit}>
      {({ register }) => (
        <>
          <Input
            name="firstName"
            label="First Name"
            ref={register({ required: true })}
          />
          <Input
            name="lastName"
            label="Last Name"
            ref={register({
              required: true,
            })}
          />
          <Select name="gender" label="Gender" ref={register}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
          <input type="submit" />
        </>
      )}
    </Form>
  );
};

export default App;
