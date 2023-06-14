import { Form } from './RegisterForm.styled';
import { Input, Button, FormLabel } from '@chakra-ui/react';
import { PasswordInput } from './PasswordInput';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/authOperations';
import s from '../HomePage/HomePage.module.scss';
export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const passwordTwo = form.elements.passwordTwo.value;

    if (password === passwordTwo) {
      dispatch(register({ name, email, password }));

      form.reset();
    } else {
      return alert(`Passwords don't sing`);
    }
  };

  return (
    <>
      <div className={s.snow}></div>
      <Form onSubmit={handleSubmit}>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          type="text"
          required
          minLength={3}
          maxLength={30}
          placeholder="Your name"
        />
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          required
          minLength={3}
          maxLength={30}
          placeholder="Your email"
        />
        <FormLabel>Password</FormLabel>
        <PasswordInput name={'password'} />
        <FormLabel>Confirm password</FormLabel>
        <PasswordInput name={'passwordTwo'} />
        <Button type="submit" colorScheme="purple">
          Register
        </Button>
      </Form>
    </>
  );
};
