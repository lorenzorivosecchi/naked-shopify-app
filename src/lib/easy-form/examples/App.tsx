import Field from "../Field";
import Form from "../Form";

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
          <Field
            name="firstName"
            label="First Name"
            ref={register({ required: true })}
            render={(props) => <input {...props} />}
          />
          <Field
            name="lastName"
            label="Last Name"
            ref={register({
              required: true,
            })}
            render={(props) => <input {...props} />}
          />
        </>
      )}
    </Form>
  );
};

export default App;
