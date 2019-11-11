import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Content,
  Input,
  Image,
  Button,
  Label,
  Error
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

function Login({ history, errors, handleSubmit, setFieldValue, values }) {
  useEffect(() => {
    const token = sessionStorage.getItem('@token');
    if (token) {
      history.push('/');
    }
  });

  return (
    <Container>
      <Content className="was-validated" onSubmit={handleSubmit}>
        <Image src={logo}></Image>
        <Label>Email</Label>
        <Input
          value={values.email}
          onChange={({ target }) => setFieldValue('email', target.value)}
          type="email"
          placeholder="meu@email.com"
        ></Input>
        {errors.email && <Error>{errors.email}</Error>}

        <Label>Senha</Label>
        <Input
          value={values.password}
          onChange={({ target }) => setFieldValue('password', target.value)}
          type="password"
          placeholder="MinhaSenhaSegura"
        ></Input>
        {errors.password && <Error>{errors.password}</Error>}

        <Button type="submit">Entrar</Button>
        {errors.submitError && <Error>{errors.submitError}</Error>}
      </Content>
    </Container>
  );
}

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('Campo Obrigatório'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Campo Obrigatório')
  }),
  handleSubmit: async (values, { props, setFieldError }) => {
    try {
      const { data } = await api.post('login', {
        email: values.email,
        password: values.password
      });
      if (data.token) {
        if (data.amdin) {
        }
        sessionStorage.setItem('@token', data.token);
        props.history.push('/');
      }
    } catch (err) {
      setFieldError('submitError', 'E-mail ou senha inválidos');
    }
  }
})(Login);
