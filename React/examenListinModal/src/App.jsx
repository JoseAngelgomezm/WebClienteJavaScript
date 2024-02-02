import React, { Component, useState, useEffect } from "react";
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const VentanaModalDiccionario = (props) => {
  const {
    className
  } = props;

  const [nombre, setNombre] = useState()
  const [telefono, setTelefono] = useState()


  const añadirAlta = (event) => {
    if (event.target.name === "nombre") {
      let nombreIntroducido = event.target.value
      setNombre(nombreIntroducido)
    }

    if (event.target.name === "telefono") {
      let telefonoIntroducido = event.target.value
      setTelefono(telefonoIntroducido)
    }
  }

  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} onEntering={() => { }}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>

          <FormGroup row>
            <Label sm={2} > Nombre: </Label>
            <Col sm={10}>
              <Input
                onChange={añadirAlta}
                id="nombre"
                name="nombre"
                type="Text" />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} > Teléfono: </Label>
            <Col sm={10}>
              <Input onChange={añadirAlta}
                id="telefono"
                name="telefono"
                type="Text" />
            </Col>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.actualizarEstado(nombre, telefono)}>{props.aceptar}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div>

  );
}

const Mostrar = (props) => {

  const lista = props.listaUsuarios.map((elemento) => <li>{elemento.nombre + elemento.telefono} - <Button onClick={() => props.borrar(elemento.telefono)}>Borrar</Button></li>)

  return (
    <ul>
      {lista.map((elemento) => elemento)}
    </ul>
  );
};



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN
      listaUsuarios: [{ nombre: "juan", telefono: "7854128" }, { nombre: "pepe", telefono: "32432412" }],
      isOpen: false,
    };
  }

  actualizarEstado(nombreIntroducir, telefonoIntroducir) {
    let copiaEstado = this.state.listaUsuarios
    let listaTelefono = copiaEstado.map((elemento) => elemento.telefono)
    if (!listaTelefono.includes(telefonoIntroducir)) {

      let personaNueva = {
        nombre: nombreIntroducir,
        telefono: telefonoIntroducir
      }

      copiaEstado.push(personaNueva)
      this.setState({ listaUsuarios: copiaEstado })
      this.toggleModal()
    }

  }

  setIsOpen(d) {
    if (d == undefined) return;
    this.setState({ isOpen: d })
  }

  toggleModal() {
    this.setIsOpen(!this.state.isOpen);
  }

  borrar(telefonoBorrar) {
    let copiaEstado = this.state.listaUsuarios
    let listaFiltrada = copiaEstado.filter((elemento) => elemento.telefono !== telefonoBorrar)
    this.setState({ listaUsuarios: listaFiltrada })
  }


  render() {
    return (
      <div className="App">
        <h1>Listin teléfonico</h1>
        <Mostrar borrar={(telefonoBorrar) => this.borrar(telefonoBorrar)} listaUsuarios={this.state.listaUsuarios} />
        <Button onClick={() => { this.toggleModal() }} color="info">Add</Button>
        <VentanaModalDiccionario
          mostrar={this.state.isOpen}
          aceptar={"Añadir"}
          titulo={"Alta en el listín"}
          actualizarEstado={(nombreIntroducir, telefonoIntroducir) => this.actualizarEstado(nombreIntroducir, telefonoIntroducir)}
        />
      </div>
    );
  }
}
export default App;