import React, { Component, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


const Altas = (props) => {
  // UTILICE HOOKS EN ESTE COMPONENTE
  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  const [telefono, setTelefono] = useState()


  const recogerDatos = (event, actualizar) => {
    event.preventDefault()

    let nombreNuevo = event.target.nombre.value
    let apellidoNuevo = event.target.apellidos.value
    let telefonoNuevo = event.target.telefono.value

    setNombre(nombreNuevo)
    setApellido(apellidoNuevo)
    setTelefono(telefonoNuevo)

    let persona = { nombre: nombre, apellido: apellido, telefono: telefono }
  }

  return (
    <Form onSubmit={(event) => recogerDatos(event)}>
      <FormGroup>
        <Label for="Nombre">Nombre:</Label>
        <Input
          name="nombre" id="nombre" placeholder="introduzca nombre" />
        <Label for="Nombre">Apellidos:</Label>
        <Input
          name="apellidos" id="apellidos"
          placeholder="introduzca apellidos" />
        <Label for="Nombre">Telefono:</Label>
        <Input
          name="telefono" id="telefono" placeholder="introduzca telefono" />
      </FormGroup>
      <Button>Añadir</Button>
    </Form>
  );
}


const Mostrar = (props) => {
  // ESTE COMPONENTE MUESTRA EL LISTÍN TELEFÓNICO.
  let personas = props.lista.map((elemento) => <li>{elemento.nombre + " " + elemento.apellido + " " + elemento.telefono}</li>);
  return <ul>
    {personas}
  </ul>
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA
      //INFORMACIÓN DE LA APLICACIÓN.EL LISTÍN TELEFÓNICO
      listaPersonas: [{ nombre: "pepe", apellido: "perez", telefono: "5464892655" }],
    };
  }

  actualizarEstado(persona) {
    let copiaEstado = this.state.listaPersonas.slice()
    copiaEstado.push(persona)
    this.setState({ listaPersonas: copiaEstado })
  }

  render() {
    return (
      // DEBERÁ RENDERIZAR AL MENOS LOS DOS COMPONENTES ANTERIORES
      <div className="App">
        <Mostrar lista={this.state.listaPersonas}></Mostrar>
        <Altas actualizar={(persona) => this.actualizarEstado(persona)}></Altas>
      </div>
    );
  }
}
export default App;