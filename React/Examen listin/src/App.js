import React, { Component, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


const Altas = ({ actualizar }) => {
  // UTILICE HOOKS EN ESTE COMPONENTE
  const [persona, setPersona] = useState({ nombre: "", apellido: "", telefono: "" });

  // useEffect que se ejecuta siempre
  useEffect(() => {
    actualizar(persona)
  })

  // funcion que recoge los datos del formulario y setea el hook que es un objeto Persona
  const recogerDatos = (event) => {
    // evitamos el refresh con el prevent default
    event.preventDefault()

    // recogemos los datos
    let nombreNuevo = event.target.nombre.value
    let apellidoNuevo = event.target.apellidos.value
    let telefonoNuevo = event.target.telefono.value

    // creamos una persona nueva para setear el estado
    let personaNueva = { nombre: nombreNuevo, apellido: apellidoNuevo, telefono: telefonoNuevo }

    setPersona(personaNueva)
  }


  return (

    <Form onSubmit={(event) => recogerDatos(event)}>
      {/* En el onSubmit , pasamos el evento onsubmit, para que no haga el refresh */}
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

// recibe lista en lugar de props, no es necesario poner la palabra props, si usamos el mismo nombre en el parametro de entrada de la funcion
// que el nombre que le pasamos cuando renderizamos el componente en la pasada de props, sabemos exactamente cuantas props recibimos en el componenete
// y el nombre de cada una de esas props
const Mostrar = (lista) => {
  // creamos un array para guardar todos los li de las personas
  let arrayLi = []

  // recorremos la lista que recibimos por props, y por cada objeto, guardamos un li en el array con cada uno de sus datos 
  Object.entries(lista).forEach(([key, value]) => {
    let personas = value.map((elemento) => <li key={elemento.telefono}>{elemento.nombre + " " + elemento.apellido + " " + elemento.telefono}</li>)
    arrayLi.push(personas)
  })

  // devolvemos la ul con cada li
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
    // array para recuperar la lista de telefono recorriendo todos los objetos y mirando su telefono
    let listaTelefonos = []
    Object.entries(this.state.listaPersonas).forEach(([key, value]) => {
      let telefono = value.telefono
      listaTelefonos.push(telefono)
    })

    // si el telefono que recibimos en el objeto persona desde Altas esta en la lista de telefono que acabamos de recuperar
    // o alguno de sus valores esta vacio
    if (listaTelefonos.includes(persona.telefono) || persona.telefono === "" || persona.nombre === "" || persona.apellidos === "") {
      // no hacemos nada
    } else {
      // sino modificamos el estado
      let copiaEstado = this.state.listaPersonas.slice()
      copiaEstado.push(persona)
      this.setState({ listaPersonas: copiaEstado })
    }

  }


  render() {
    return (
      // DEBERÁ RENDERIZAR AL MENOS LOS DOS COMPONENTES ANTERIORES
      <div className="App">
        {/* aqui pasamos lista, porque en el Componente Mostrar, le pasamos de entrada este mismo nombre */}
        {/* además, pasamos la funcion sin el () al final, porque si le ponemos () al final, lo que pasamos por props */}
        {/* es el resultado de la ejecucion de esa funcion, de esta manera, pasamos la funcion, para que cuando la reciba */}
        {/* el componentes Mostrar, podamos ejecutarla llamandola con () al final de la ejecucion */}
        <Mostrar lista={this.state.listaPersonas}></Mostrar>
        <Altas actualizar={this.actualizarEstado}></Altas>
      </div>
    );
  }
}
export default App;