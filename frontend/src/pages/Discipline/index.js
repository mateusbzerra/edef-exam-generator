import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import api from '../../services/api';

import { Link } from 'react-router-dom';
import TableList from '../../components/TableList';

export default function Discipline() {
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const disciplines = await api.get('disciplines');
      setDisciplines(disciplines.data);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="mt-3">Listar Disciplinas</h1>
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
              <Button
                as={Link}
                to={`/acao/${item.id}`}
                variant="primary"
                size="sm"
              >
                Visualizar
              </Button>
            </td>
          </tr>
        )}
      ></TableList>
    </Container>
  );
}
