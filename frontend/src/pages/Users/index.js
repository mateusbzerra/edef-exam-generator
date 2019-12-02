import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import TableList from 'components/TableList';
import api from 'services/api';
import { Link } from 'react-router-dom';
import ModalComponent from 'components/ModalComponent';
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [newUser, setNewUser] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [handleError, setHandleError] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setNewUser(false);
    }
  }, [selectedUser]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('users');
      setUsers(data);
    }
    fetchData();
  }, [handleError]);

  async function formSubmit(values, bag) {
    setHandleError(null);
    if (values.password === '') {
      values.password = values.newPassword;
    }
    try {
      const response = await api.postOrPut('users', selectedUser._id, values);
      if (response.data) {
        setHandleError({
          error: false,
          message: 'Dados salvos com sucesso!'
        });
      }
    } catch (err) {
      setHandleError({ error: true, message: 'Erro ao salvar dados' });
    }
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h1>Professores</h1>
        </Col>
        <Col className="text-right">
          <Button
            variant="success"
            onClick={() => {
              setShowModal(!showModal);
              setNewUser(true);
            }}
          >
            Cadastrar Professor
          </Button>
        </Col>
      </Row>
      <hr />
      <TableList
        items={users}
        headers={['ID', 'Nome', 'E-mail', 'Ações']}
        render={item => (
          <tr key={item._id}>
            <td>{item._id} </td>
            <td>{item.name} </td>
            <td>{item.email}</td>
            <td>
              <Button
                onClick={() => {
                  setSelectedUser(item);
                  setShowModal(!showModal);
                }}
                variant="primary"
                size="sm"
              >
                Editar
              </Button>
            </td>
          </tr>
        )}
      ></TableList>

      <ModalComponent
        show={showModal}
        title={newUser ? 'Cadastrar Professor' : 'Visualizar Professor'}
        handleShow={() => {
          setShowModal(!showModal);
          setHandleError(null);
        }}
      >
        <Formik
          enableReinitialize
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Campo Obrigatório'),
            email: Yup.string()
              .email()
              .required('Campo Obrigatório'),
            newUser: Yup.boolean(),
            newPassword: Yup.string().when('newUser', {
              is: true,
              then: Yup.string().required('Campo Obrigatório')
            }),
            password: Yup.string()
          })}
          onSubmit={formSubmit}
          initialValues={
            newUser
              ? { name: '', email: '', newPassword: '', newUser }
              : selectedUser
          }
        >
          {({ values, setFieldValue, handleSubmit, isSubmitting, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nome {newUser.toString()}</Form.Label>
                <Form.Control
                  value={values.name}
                  onChange={e => setFieldValue('name', e.target.value)}
                  type="text"
                  placeholder="Nome Completo"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  value={values.email}
                  onChange={e => setFieldValue('email', e.target.value)}
                  type="text"
                  placeholder="E-mail do professor"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>{newUser ? 'Senha' : 'Nova Senha'}</Form.Label>
                <Form.Control
                  value={newUser ? values.newPassword : values.password}
                  onChange={e =>
                    newUser
                      ? setFieldValue('newPassword', e.target.value)
                      : setFieldValue('password', e.target.value)
                  }
                  type="password"
                  placeholder="Senha Secreta"
                  isInvalid={newUser ? !!errors.newPassword : !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {newUser ? errors.newPassword : errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                type="submit"
                block
                disabled={isSubmitting}
                variant="success"
              >
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </Form>
          )}
        </Formik>
        {handleError && (
          <Alert
            className="mt-3"
            variant={handleError.error ? 'danger' : 'success'}
          >
            {handleError.message}
          </Alert>
        )}
      </ModalComponent>
    </Container>
  );
}
