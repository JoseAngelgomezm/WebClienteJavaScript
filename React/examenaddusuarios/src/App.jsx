import React, { Component, useState } from "react";
import { Button, Input, FormGroup, Label, Col, Table, ButtonGroup } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";


const Saldo = (props) => {

  const [telefono, setTelefono] = useState("")
  const [saldo, setSaldo] = useState("")

  //GESTIÓN DE SALDO (SUMAR Y GASTAR)

  const handleChange = (event) => {
    if (event.target.name == "telefono") {
      let telefonoIntroducido = event.target.value
      setTelefono(telefonoIntroducido)
    }

    if (event.target.name == "saldo") {
      let saldoIntroducido = event.target.value
      setSaldo(saldoIntroducido)
    }
  }

  return (
    <div>
      <h3>{props.titulo}</h3>
      <FormGroup row>
        <Label sm={1} > Teléfono: </Label>
        <Col sm={2}>
          <Input
            id="telefono"
            name="telefono"
            type="Text" onChange={handleChange} />
        </Col>
        <Label sm={1} > Saldo: </Label>
        <Col sm={2}>
          <Input
            id="saldo"
            name="saldo"
            type="Number" onChange={handleChange} />
        </Col>
      </FormGroup>


      <Button color="primary" onClick={() => props.gestionarSaldo(saldo, telefono)}>ACTUALIZAR</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>


  );
}


const Altas = (props) => {

  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [saldo, setSaldo] = useState("")

  // ALTAS DE USUARIOS
  const handleChange = (event) => {

    if (event.target.name == "nombre") {
      let nombreIntroducido = event.target.value
      setNombre(nombreIntroducido)
    }

    if (event.target.name == "telefono") {
      let telefonoIntroducido = event.target.value
      setTelefono(telefonoIntroducido)
    }

    if (event.target.name == "saldo") {
      let saldoIntroducido = event.target.value
      setSaldo(saldoIntroducido)
    }

  }

  return (
    <div>
      <h3>Alta de usuario</h3>
      <FormGroup row>
        <Label sm={1} > Nombre: </Label>
        <Col sm={3}>
          <Input
            id="nombre"
            name="nombre"
            type="Text" onChange={handleChange} />
        </Col>
        <Label sm={1} > Teléfono: </Label>
        <Col sm={2}>
          <Input
            id="telefono"
            name="telefono"
            type="Text" onChange={handleChange} />
        </Col>
        <Label sm={1} > Saldo: </Label>
        <Col sm={2}>
          <Input
            id="saldo"
            name="saldo"
            type="Number" onChange={handleChange} />
        </Col>
      </FormGroup>


      <Button color="primary" onClick={() => { props.añadir(telefono, nombre, saldo)}} >ALTA</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>


  );
}


const Mostrar = (props) => {
  // ESTE COMPONENTE MUESTRA LA TABLA

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
            <th>Teléfono</th>
            <th>Nombre</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {

            props.datos.map((elemento) => {
              return <tr>
                <td>
                  {<Button onClick={() => props.borrar(elemento.telefono)}>Borrar</Button>}
                </td>
                <td>
                  {elemento.telefono}
                </td>
                <td>
                  {elemento.nombre}
                </td>
                <td>
                  {elemento.saldo}
                </td>
              </tr>
            })

          }
        </tbody>
      </Table>


    </>
  );
};






class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN
      listaUsuarios: [],
      opcion: 0,
      verAltas: false,
      verSumar: false,
      verGastar: false,
    };
  }

  borrar = (t) => {
    // recorrer la lista
    let listaFiltrada = this.state.listaUsuarios.filter((elemento) => elemento.telefono !== t)

    this.setState({ listaUsuarios: listaFiltrada })
  }

  añadirUsuario = (telefonoEntrada, nombreEntrada, saldoEntrada) => {

    // revisar que el telfono ya no este añadido

    // recuperar lista de telefonos
    const listaTelefonos = this.state.listaUsuarios.map((elemento) => elemento.telefono)

    // si contiene el telefono que se va añadir
    if (listaTelefonos.includes(telefonoEntrada) || telefonoEntrada == "" || nombreEntrada == "" || saldoEntrada == "") {

    } else {
      let personaNueva = {
        telefono: telefonoEntrada,
        nombre: nombreEntrada,
        saldo: saldoEntrada
      }
      let copiaEstado = this.state.listaUsuarios.slice()
      copiaEstado.push(personaNueva)
      this.setState({ listaUsuarios: copiaEstado })

    }

  }

  mostrarInsertar = (estado) => {

    this.setState({ verSumar: false, verGastar: false })

    if (estado) {
      this.setState({ verAltas: false })
    } else {
      this.setState({ verAltas: true })
    }
  }

  mostrarSumar = (estado) => {
    this.setState({ verGastar: false, verAltas: false })

    if (estado) {
      this.setState({ verSumar: false })
    } else {
      this.setState({ verSumar: true })
    }
  }

  mostrarGastar = (estado) => {
    this.setState({ verSumar: false, verAltas: false })

    if (estado) {
      this.setState({ verGastar: false })
    } else {
      this.setState({ verGastar: true })
    }
  }

  añadirSaldo = (saldo, telefono) => {
    let saldoEntero = parseInt(saldo)
    // recuperar lista de telefonos
    const listaTelefonos = this.state.listaUsuarios.map((elemento) => elemento.telefono)

    // si contiene el telefono que se va actualiza el saldo
    if (listaTelefonos.includes(telefono) && saldo !== undefined && saldo > 0) {

      let indice = this.state.listaUsuarios.map((elemento, indice) => {
        if (telefono === elemento.telefono) {
          return indice
        }
      })


      let copiaEstado = this.state.listaUsuarios.slice()
      let saldoPersona = copiaEstado[indice].saldo
      let saldoFinal = saldoEntero + parseInt(saldoPersona)
      copiaEstado[indice].saldo = saldoFinal
      this.setState({ listaUsuarios: copiaEstado })

    }
  }

  reducirSaldo = (saldo, telefono) => {
    let saldoEntero = parseInt(saldo)
    // recuperar lista de telefonos
    const listaTelefonos = this.state.listaUsuarios.map((elemento) => elemento.telefono)

    // si contiene el telefono que se va actualiza el saldo
    if (listaTelefonos.includes(telefono) && saldo !== undefined && saldo > 0) {

      let indice = this.state.listaUsuarios.map((elemento, indice) => {
        if (telefono === elemento.telefono) {
          return indice
        }
      })


      let copiaEstado = this.state.listaUsuarios.slice()
      let saldoPersona = copiaEstado[indice].saldo
      let saldoFinal = parseInt(saldoPersona) - saldoEntero
      copiaEstado[indice].saldo = saldoFinal
      this.setState({ listaUsuarios: copiaEstado })

    }
  }

  render() {
    return (
      <div className="App">
        <h1>GESTION USUARIOS</h1>

        <Mostrar datos={this.state.listaUsuarios} borrar={(t) => this.borrar(t)} />
        <ButtonGroup>
          <Button onClick={() => this.mostrarInsertar(this.state.verAltas)} color="info" >
            Alta usuario
          </Button>
          <Button onClick={() => this.mostrarSumar(this.state.verSumar)} color="success" >
            Sumar saldo
          </Button>
          <Button onClick={() => this.mostrarGastar(this.state.verGastar)} color="danger" >
            Gastar saldo
          </Button>
        </ButtonGroup>
        {/* renderizado condicional, si ver altas es true, se muestra */}
        {this.state.verAltas && <Altas añadir={(telefono, nombre, saldo) => this.añadirUsuario(telefono, nombre, saldo)}></Altas>}
        {this.state.verSumar && <Saldo gestionarSaldo={(saldo, telefono) => this.añadirSaldo(saldo, telefono)} titulo={"Añadir Saldo"}></Saldo>}
        {this.state.verGastar && <Saldo gestionarSaldo={(saldo, telefono) => this.reducirSaldo(saldo, telefono)} titulo={"Gastar Saldo"}></Saldo>}
      </div>
    );
  }
}
export default App;