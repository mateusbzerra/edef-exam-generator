import React, { useEffect, useState } from 'react';
import { Container, Alert, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TableList from 'components/TableList';
import api from 'services/api';

export default function Question({ match, history }) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function getQuestions() {
      const { data } = await api.get(
        `/disciplines/${match.params.id}/questions`
      );
      setQuestions(data);
    }
    getQuestions();
  }, [match]);

  return (
    <Container>
      <Row className="mt-4">
        <Col sm={10}>
          <h1>Disciplina - {history.location.state.name} </h1>
        </Col>
        <Col sm={2}>
          <Button
            as={Link}
            to={{
              pathname: `/questao`,
              state: {
                discipline: match.params.id
              }
            }}
          >
            Nova Questão
          </Button>
        </Col>
      </Row>
      <TableList
        items={questions}
        headers={['Questão', 'Título', 'Ações']}
        render={(item, index) => (
          <tr key={item._id}>
            <td>0{index + 1} </td>
            <td>{item.title} </td>
            <td>
              <Button
                as={Link}
                to={`/questao/${item._id}`}
                variant="primary"
                size="sm"
              >
                Editar
              </Button>
            </td>
          </tr>
        )}
      ></TableList>
      {questions.length < 6 && (
        <Alert className="text-center" variant="secondary">
          São Necessárias 6 questões para gerar a prova
        </Alert>
      )}
      <Button
        variant="success"
        onClick={() => console.log('print click')}
        size="lg"
        block
        disabled
      >
        Imprimir Prova
      </Button>
    </Container>
  );
}
