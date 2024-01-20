import React, { Component, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


const Altas = ({ actualizar }) => {
  // UTILICE HOOKS EN ESTE COMPONENTE
  const [persona, setPersona] = useState({ nombre: "", apellido: "", telefono: "" });

  useEffect(() => {
    actualizar(persona)
  }, [persona, actualizar])

  const recogerDatos = (event) => {
    event.preventDefault()
    let nombreNuevo = event.target.nombre.value
    let apellidoNuevo = event.target.apellidos.value
    let telefonoNuevo = event.target.telefono.value

    let personaNueva = { nombre: nombreNuevo, apellido: apellidoNuevo, telefono: telefonoNuevo }

    setPersona(personaNueva)
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


const Mostrar = (lista) => {
  let arrayLi = []
  Object.entries(lista).forEach(([key, value]) => {
    let personas = value.map((elemento) => <li key={elemento.telefono}>{elemento.nombre + " " + elemento.apellido + " " + elemento.telefono}</li>)
    arrayLi.push(personas)
  })

  return <ul>{arrayLi}</ul>
}




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA
      //INFORMACIÓN DE LA APLICACIÓN.EL LISTÍN TELEFÓNICO
      listaPersonas: [{ nombre: "pepe", apellido: "perez", telefono: "5464892655" }, { nombre: "julian", apellido: "sanchez", telefono: "89089234" }]
    };
  }

  actualizarEstado = (persona) => {
    let listaTelefonos = []
    Object.entries(this.state.listaPersonas).forEach(([key, value]) => {
      let telefono = value.telefono
      listaTelefonos.push(telefono)
    })
    

    if (listaTelefonos.includes(persona.telefono) || persona.telefono === "" || persona.nombre === "" || persona.apellidos === "") {

    } else {
      let copiaEstado = this.state.listaPersonas.slice()
      copiaEstado.push(persona)
      this.setState({ listaPersonas: copiaEstado })
    }

  }


  render() {
    return (
      // DEBERÁ RENDERIZAR AL MENOS LOS DOS COMPONENTES ANTERIORES
      <div className="App">
        <Mostrar lista={this.state.listaPersonas}></Mostrar>
        <Altas actualizar={this.actualizarEstado}></Altas>
      </div>
    );
  }
}
export default App;