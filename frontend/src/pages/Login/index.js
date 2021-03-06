import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
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

export default function Login({ history }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('@token');
    if (token) {
      history.push('/');
    }
  });

  async function formSubmit(values, { props, setFieldError }) {
    try {
      const { data } = await api.post('login', {
        email: values.email,
        password: values.password
      });
      if (data.token) {
        const user = jwt.decode(data.token);

        localStorage.setItem('@user', user.name);
        localStorage.setItem('@token', data.token);
        dispatch({ type: 'SET_USER', payload: user });
        props.history.push('/');
      }
    } catch (err) {
      setFieldError('submitError', 'E-mail ou senha inválidos');
    }
  }

  return (
    <Container>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('E-mail inválido')
            .required('Campo Obrigatório'),
          password: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Campo Obrigatório')
        })}
        onSubmit={formSubmit}
      >
        {({ errors, handleSubmit, setFieldValue, values }) => (
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
        )}
      </Formik>
    </Container>
  );
}
