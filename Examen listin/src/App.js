import React, { Component, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

const Altas = (props) => {
  // UTILICE HOOKS EN ESTE COMPONENTE
  const [nombre, setNombre] = useState()
  const [apellidos, setApellidos] = useState()
  const [telefono , setTelefono] = useState()

  useEffect(() => {
    props.actualizar()
  }, [nombre, apellidos, telefono])

  const revisarDatos = (event) => {
    event.preventDefault();

    // comprobar los datos que estan correctos
    if(event.target.nombre.value !== "" && event.target.apellidos.value !== "" && event.target.telefono.value !== ""){
      // si no esta vacio el formulario
      let nuevoNombre = event.target.nombre.value
      let nuevoApellido = event.target.apellidos.value
      let nuevoTelefono = event.target.telefono.value
      
      event.target.nombre.value = ""
      event.target.apellidos.value = ""
      event.target.telefono.value = ""

      setNombre(nuevoNombre)
      setApellidos(nuevoApellido)
      setTelefono(nuevoTelefono)

      let persona = [nombre , apellidos , telefono]
    }

  }

  return (
    <Form onSubmit={(event) => revisarDatos(event)}>
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

const handleBorrar = (indice, listin) => {
  listin[indice] = ""
}

const Mostrar = (props) => {
  let listaLi = props.listin.map((e, i) => <li>{e.map((e) => e + " " )}<button onClick={() => handleBorrar(i, props.listin)}>X</button></li>)

  return listaLi
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN DE LA APLICACIÓN.EL LISTÍN TELEFÓNICO
      listin: [["pepe", "perez" , "6600948294"]],
    };
  }


  actualizarEstado(persona) {
    let copiaListin = this.state.listin.slice()
    copiaListin.push(persona)
    this.setState({listin:copiaListin})
  }

  render() {
    return (
      <div className="App">
        <Mostrar listin={this.state.listin}></Mostrar>
        <Altas actualizar={this.actualizarEstado}></Altas>
      </div>
    );
  }
}
export default App;
