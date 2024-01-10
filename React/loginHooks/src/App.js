import React from 'react';
import AppLogin from './componentes/AppLogin.js'
import Menu from './componentes/Menu.js'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuItem: "UNO",
      logged: false,
    }
  }
  render() {
    let mostrar = <AppLogin userLogin={(usuario, contraseña) => this.userLogin(usuario, contraseña)} />
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

  userLogin(usuario, contraseña) {
    if (usuario === "admin@es.es" && contraseña === "admin") {
      this.setState({ logged: true })
    }
  }

}

export default App;
