import React, { useState } from 'react';
import { Row, Col, Card, CardTitle, CardText, Form, FormGroup, Button, Label, Input, Navbar, NavLink, NavbarBrand } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { useEffect } from 'react';


function Menu(props) {
  let colorUno = 'secondary'
  let colorDos = 'secondary'
  let colorTres = 'secondary'
  switch (props.menuItem) {
    case 'UNO':
      colorUno = 'primary'
      break;
    case 'DOS':
      colorDos = 'primary'
      break;
    case 'TRES':
      colorTres = 'primary'
      break;
  }
  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">MYFPSCHOOL</NavbarBrand>
        <NavLink>
          <Button color={colorUno} onClick={() => props.changeMenu("UNO")} >UNO</Button>{" "}
          <Button color={colorDos} onClick={() => props.changeMenu("DOS")}>DOS</Button>{" "}
          <Button color={colorTres} onClick={() => props.changeMenu("TRES")}>TRES</Button>
        </NavLink>
      </Navbar>
    </div>
  );
}

function AppLogin(props) {

  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [info, setInfo] = useState('');

  const handleChange = (event) => {
    setInfo('');
    const target = event.target;
    if (target.name == "password") {
      setPassword(target.value);
    }
    if (target.name == "telefono") {
      setTelefono(target.value);
    }
  }


  const clicar = () => {
    if (password == '' || telefono == '') {

      setInfo('Cumplimente todos los campos');

    } else if (telefono == "jose" && password == "josefa") {

      props.userLogin(telefono, password)

    } else {

      setInfo('DATOS INCORRECTOS')

    }
  }

  return (
    <Row>
      <Col sm="4"></Col>
      <Col sm="4">
        <Card body>
          <CardTitle className="text-center" tag="h4">
            Log in
          </CardTitle>
          <Form inline>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2" for="exampleEmail">User id</Label>
              <Input
                id="Telefono"
                name="telefono"
                placeholder="type your user id"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2"
                for="examplePassword">Password</Label>
              <Input
                id="Password"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </FormGroup>
            <br />
            <Button color="primary" size="lg" block onClick={clicar}>
              <strong>Log in</strong>
            </Button>
            <CardText className="text-danger">{info}</CardText>

          </Form>
        </Card>
      </Col>
    </Row>
  )
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: "UNO",
      logged: false,
    }
  }

  changeMenu(item) {
    this.setState({ menuItem: item })
  }

  userLogin() {
    this.setState({ logged: true })
  }

  render() {
    let obj = <></>

    if (!this.state.logged) {
      obj = <AppLogin userLogin={(telefono, password) => this.userLogin(telefono, password)} />
    } else {
      obj = <Menu menuItem={this.state.menuItem} changeMenu={(item) => this.changeMenu(item)} />
    }

    return (
      <div className="App">
        {obj}
      </div>
    );
  }

}
export default App;


