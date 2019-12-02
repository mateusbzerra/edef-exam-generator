import React from 'react';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { Navigation } from './styles';
import { NavLink, withRouter } from 'react-router-dom';

function Header({ history }) {
  const loggedUser = localStorage.getItem('@user');

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
            <Nav.Link as={NavLink} to="/professores">
              Professores
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={loggedUser} id="basic-nav-dropdown">
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
