import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import { Formik } from 'formik';

import api from '../../services/api';
import TableList from '../../components/TableList';
import ModalComponent from 'components/ModalComponent';
import * as Yup from 'yup';

export default function Discipline() {
  const [disciplines, setDisciplines] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState({});
  const [newDiscipline, setNewDiscipline] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [handleError, setHandleError] = useState(false);
  const user = useSelector(state => state.UserStore);

  useEffect(() => {
    if (selectedDiscipline) {
      setNewDiscipline(false);
    }
  }, [selectedDiscipline]);

  useEffect(() => {
    async function fetchData() {
      const disciplines = await api.get('disciplines');
      setDisciplines(disciplines.data);
    }
    fetchData();
  }, [handleError]);

  async function formSubmit(values, bag) {
    setHandleError(null);
    try {
      const response = await api.postOrPut(
        'disciplines',
        selectedDiscipline._id,
        values
      );
      if (response.data) {
        setHandleError({
          error: false,
          message: 'Disciplina salva com sucesso!'
        });
      }
    } catch (err) {
      setHandleError({ error: true, message: 'Erro ao salvar disciplina' });
    }
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h1>Disciplinas</h1>
        </Col>
        <Col className="text-right">
          {user && user.admin && (
            <Button
              variant="success"
              onClick={() => {
                setShowModal(!showModal);
                setNewDiscipline(true);
              }}
            >
              Cadastrar Disciplina
            </Button>
          )}
        </Col>
      </Row>
      <hr />
      <TableList
        items={disciplines}
        headers={['Código', 'Nome', 'C.H.', 'Ações']}
        render={item => (
          <tr key={item._id}>
            <td>{item.code} </td>
            <td>{item.name} </td>
            <td>{item.workload}</td>
            <td>
              {user && user.admin ? (
                <Button
                  onClick={() => {
                    setSelectedDiscipline(item);
                    setShowModal(!showModal);
                  }}
                  variant="primary"
                  size="sm"
                >
                  Editar
                </Button>
              ) : (
                <Button
                  as={Link}
                  to={{
                    pathname: `/disciplinas/${item._id}/questoes`,
                    state: {
                      name: item.name
                    }
                  }}
                  variant="warning"
                  size="sm"
                >
                  Questões
                </Button>
              )}
            </td>
          </tr>
        )}
      ></TableList>

      <ModalComponent
        show={showModal}
        title={newDiscipline ? 'Nava Disciplina' : 'Visualizar Disciplina'}
        handleShow={() => {
          setShowModal(!showModal);
          setHandleError(null);
        }}
      >
        <Formik
          enableReinitialize
          validationSchema={Yup.object().shape({
            code: Yup.string().required('Campo Obrigatório'),
            name: Yup.string().required('Campo Obrigatório'),
            workload: Yup.number().required('Campo Obrigatório')
          })}
          onSubmit={formSubmit}
          initialValues={
            newDiscipline
              ? { code: '', name: '', workload: '' }
              : selectedDiscipline
          }
        >
          {({ values, setFieldValue, handleSubmit, isSubmitting, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control
                  value={values.code}
                  onChange={e => setFieldValue('code', e.target.value)}
                  type="text"
                  placeholder="CCXXX"
                  style={{ textTransform: 'uppercase' }}
                  isInvalid={!!errors.code}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.code}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  value={values.name}
                  onChange={e => setFieldValue('name', e.target.value)}
                  type="text"
                  placeholder="Nome da Disciplina"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Carga Horária</Form.Label>
                <Form.Control
                  value={values.workload}
                  onChange={e => setFieldValue('workload', e.target.value)}
                  type="number"
                  placeholder="Ex: 60"
                  isInvalid={!!errors.workload}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.workload}
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
