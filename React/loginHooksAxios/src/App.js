import React from 'react';
import AppLogin from './componentes/AppLogin.js'
import Menu from './componentes/Menu.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import md5 from "md5"
import {urlBASE} from "./componentes/llamadaApi.js"





class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuItem: "UNO",
      logged: false,
    }
    this.userLogin = this.userLogin.bind(this)
  }

  userLogin(usuarioIntroducido, contraseña) {
    
    let contraseñaEncriptada = md5(contraseña)
    // hacer peticion axios
    axios.post(urlBASE + "login" , {usuario:usuarioIntroducido, clave:contraseñaEncriptada}).then((datos) => {
      // si el usuario existe
      if(datos.data.usuario !== undefined){
        // logearlo
        this.setState({logged : true})
      }
    })
  }

  render() {
    let mostrar = <AppLogin userLogin={this.userLogin} info={this.state.mensajeError} />
    if (this.state.logged) {
      mostrar = <Menu menuItem={this.state.menuItem} click={(botonPulsado) => this.cambiarMenu(botonPulsado)} />
    }
    return (
      <div className="App" >
        {mostrar}
      </div>
    )
  }

  cambiarMenu(botonPulsado) {
    this.setState({ menuItem: botonPulsado })
  }



}

export default App;
