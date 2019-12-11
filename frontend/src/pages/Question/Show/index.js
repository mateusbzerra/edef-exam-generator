import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from 'services/api';

export default function AddQuestion({ match, history }) {
  const [question, setQuestion] = useState({});
  const [newQuestion, setNewQuestion] = useState(true);
  const [handleError, setHandleError] = useState(null);

  useEffect(() => {
    async function getQuestions() {
      const { data } = await api.get(`questions/${match.params.id}`);
      setQuestion(data);
      console.log('data', data);
    }
    if (newQuestion) {
      getQuestions();
    }
  }, [match.params.id, newQuestion]);

  useEffect(() => {
    if (match.params.id) {
      setNewQuestion(false);
    }
  }, [match.params]);

  async function formSubmit(values) {
    setHandleError(null);

    try {
      const response = await api.postOrPut('questions', question._id, {
        ...values,
        discipline: history.location.state.discipline
      });
      if (response.data) {
        setHandleError({
          error: false,
          message: 'Questão salva com sucesso!'
        });
      }
    } catch (err) {
      setHandleError({ error: true, message: 'Erro ao salvar questão' });
    }
  }
  return (
    <Container className="mt-3 mb-3">
      {newQuestion ? <h1>Nova Questão</h1> : <h1>Editar Questão</h1>}
      <Formik
        enableReinitialize
        initialValues={
          newQuestion
            ? {
                title: '',
                description: '',
                alternatives: ['', '', '', '', '']
              }
            : question
        }
        onSubmit={formSubmit}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Campo Obrigatório'),
          description: Yup.string().required('Campo Obrigatório'),
          awnser: Yup.number()
            .typeError('Selecione uma alternativa')
            .required('Campo Obrigatório'),
          alternatives: Yup.array()
            .min(5, 'Questões devem ter 5 alternativas')
            .required('Campo Obrigatório')
        })}
      >
        {({ values, errors, setFieldValue, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control
                value={values.title}
                onChange={e => setFieldValue('title', e.target.value)}
                type="text"
                placeholder="CCXXX"
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Comando da questão</Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                value={values.description}
                onChange={e => setFieldValue('description', e.target.value)}
                type="text"
                placeholder="CCXXX"
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={1}>
                A)
              </Form.Label>
              <Col sm={11}>
                <Form.Control
                  as="textarea"
                  rows="2"
                  value={values.alternatives && values.alternatives[0]}
                  onChange={e => {
                    let newValue = values.alternatives;
                    newValue[0] = e.target.value;
                    setFieldValue('alternatives', newValue);
                  }}
                  placeholder="Digite uma alternativa para a questão"
                  isInvalid={!!errors.alternatives}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.alternatives}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={1}>
                B)
              </Form.Label>
              <Col sm={11}>
                <Form.Control
                  as="textarea"
                  rows="2"
                  value={values.alternatives && values.alternatives[1]}
                  onChange={e => {
                    let newValue = values.alternatives;
                    newValue[1] = e.target.value;
                    setFieldValue('alternatives', newValue);
                  }}
                  placeholder="Digite uma alternativa para a questão"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={1}>
                C)
              </Form.Label>
              <Col sm={11}>
                <Form.Control
                  as="textarea"
                  rows="2"
                  value={values.alternatives && values.alternatives[2]}
                  onChange={e => {
                    let newValue = values.alternatives;
                    newValue[2] = e.target.value;
                    setFieldValue('alternatives', newValue);
                  }}
                  placeholder="Digite uma alternativa para a questão"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={1}>
                D)
              </Form.Label>
              <Col sm={11}>
                <Form.Control
                  as="textarea"
                  rows="2"
                  value={values.alternatives && values.alternatives[3]}
                  onChange={e => {
                    let newValue = values.alternatives;
                    newValue[3] = e.target.value;
                    setFieldValue('alternatives', newValue);
                  }}
                  placeholder="Digite uma alternativa para a questão"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={1}>
                E)
              </Form.Label>
              <Col sm={11}>
                <Form.Control
                  as="textarea"
                  rows="2"
                  value={values.alternatives && values.alternatives[4]}
                  onChange={e => {
                    let newValue = values.alternatives;
                    newValue[4] = e.target.value;
                    setFieldValue('alternatives', newValue);
                  }}
                  placeholder="Digite uma alternativa para a questão"
                />
              </Col>
            </Form.Group>
            <fieldset>
              <Form.Group>
                <Row>
                  <Col sm={3}>
                    <Form.Label as="legend" column>
                      Alternativa Correta
                    </Form.Label>
                  </Col>
                  <Col>
                    <Row>
                      <Form.Control
                        value={values.awnser}
                        onChange={e => setFieldValue('awnser', e.target.value)}
                        as="select"
                        isInvalid={!!errors.awnser}
                      >
                        <option>Selecione uma alternativa</option>
                        <option value={0}>A</option>
                        <option value={1}>B</option>
                        <option value={2}>C</option>
                        <option value={3}>D</option>
                        <option value={4}>E</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.awnser}
                      </Form.Control.Feedback>
                    </Row>
                  </Col>
                </Row>
              </Form.Group>
            </fieldset>
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
    </Container>
  );
}
