import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'reactstrap';

// crear el function component boton, que recibe las props del app
function Boton(props) {
  return (
    // el componente contiene un boton reactstrap que recibe 2 props, el onclick y el nombre
    <Button onClick={() => props.cambia()}>
      {props.nombre}
    </Button>
  )
}

// crear el class component App 
class App extends React.Component {
  // crear el constructor que recibe las props
  constructor(props) {
    // obtener las props del padre React Component
    super(props)
    // contiene el estado color
    this.state = {
      letrero: "Saludo en diferentes idiomas",
    }
  }

  // crear la funcion cambia, que ejecutara el boton al darle click 
  cambiaIngles() {
    this.setState({ letrero: "Hello everybody" })
  }
  cambiaEspañol() {
    this.setState({ letrero: "Hola a todos" })
  }
  cambiaFrances() {
    this.setState({ letrero: "Bonjour" })
  }
  render() {
    return (
      // al renderizar el boton, le pasamos la funcion cambia en el onClick y el nombre
      <div className="botones">
        <h1>{this.state.letrero}</h1>
        <Boton nombre={"Inglés"} cambia={() => this.cambiaIngles()} />
        <Boton nombre={"Español"} cambia={() => this.cambiaEspañol()} />
        <Boton nombre={"Francés"} cambia={() => this.cambiaFrances()} />
      </div>
    );
  }
}

export default App;