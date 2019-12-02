import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import TableList from 'components/TableList';
import api from 'services/api';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('users');
      setUsers(data);
    }
    fetchData();
  }, []);
  return (
    <Container>
      <h1 className="mt-3">Listar Professores</h1>
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
