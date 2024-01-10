import React from 'react';
import { Row, Col, Card, CardTitle, CardText, Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { useState } from 'react'
function AppLogin(props) {
    const [contraseña, setContraseña] = useState('')
    const [usuario, setUsuario] = useState('')
    const [info, setinfo] = useState('')

    const siHayCambio = (event) => {
        setinfo('');

        // si se ha modificado el telefono
        if (event.target.name === "telefono") {
            setUsuario(event.target.value)
        }

        // si se ha modificado la contraseña
        if (event.target.name === "password") {
            setContraseña(event.target.value)
        }

    }

    const click = () => {
        if (contraseña === "" || usuario === "") {
            setinfo('Usuario o contraseña vacios')
        } else if (contraseña !== "admin" || usuario !== "admin@es.es") {
            setinfo('Usuario o contraseña INCORRECTOS')
        } else {
            props.userLogin(usuario, contraseña)
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
                                type="email"
                                onChange={siHayCambio}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label className="me-sm-2" for="examplePassword">Password</Label>
                            <Input
                                id="Password"
                                name="password"
                                type="password"
                                onChange={siHayCambio}
                            />
                        </FormGroup>
                        <br />
                        <Button color="primary" size="lg" block onClick={() => click()}>
                            <strong>Log in</strong>
                        </Button>
                        <CardText className="text-danger">{info}</CardText>

                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default AppLogin;