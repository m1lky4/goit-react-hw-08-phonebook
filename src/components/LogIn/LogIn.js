import { Form } from './login.styled';
import { Input, Button, FormLabel } from '@chakra-ui/react';

import { PasswordInput } from './PasswordInput';

import { logIn } from 'redux/auth/authOperations';
import { useDispatch } from 'react-redux';

import s from '../HomePage/HomePage.module.scss'

export const LogIn = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    dispatch(logIn({ email, password }));

    form.reset();
  };

  return (
    <>
      <div className={s.snow}></div>
      <Form onSubmit={handleSubmit}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          placeholder="Enter email"
          required
          minLength={3}
          maxLength={30}
        />
        <FormLabel>Password</FormLabel>
        <PasswordInput />
        <Button type="submit" colorScheme="purple">
          Log in
        </Button>
      </Form>
    </>
  );
};
