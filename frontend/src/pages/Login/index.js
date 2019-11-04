import React, { useEffect, useState } from 'react';

import { Container, Content, Input, Image, Button, Label } from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('@token');
    if (token) {
      history.push('/');
    }
  });

  async function handleLogin(e) {
    e.preventDefault();
    if (email.length > 10 && password.length > 2) {
      try {
        const { data } = await api.post('login', { email, password });
        if (data.token) {
          localStorage.setItem('@token', data.token);
          history.push('/');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Container>
      <Content onSubmit={handleLogin}>
        <Image src={logo}></Image>
        <Label>Email</Label>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          placeholder="meu@email.com"
        ></Input>
        <Label>Senha</Label>
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="MinhaSenhaSegura"
        ></Input>
        <Button>Entrar</Button>
      </Content>
    </Container>
  );
}
