import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';

import { Navigation } from './styles';
import { NavLink, withRouter } from 'react-router-dom';

function Header({ history }) {
  const [user, setUser] = useState('');
  const UserStore = useSelector(state => state.UserStore);
  useEffect(() => {
    setUser(UserStore);
  }, [UserStore]);

  return (
    <Navigation variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Gerador EDEF
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/disciplinas">
              Disciplinas
            </Nav.Link>
            {user && user.admin && (
              <Nav.Link as={NavLink} to="/professores">
                Professores
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <NavDropdown title={user.name || ''} id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Alterar Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  localStorage.clear();
                  history.replace('/login');
                }}
              >
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navigation>
  );
}
export default withRouter(Header);
