import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'reactstrap';

// crear el function component boton, que recibe las props del app
function Boton(props) {
  return (
    // el componente contiene un boton reactstrap que recibe 2 props, el color y el onclick
    <Button color={props.col} onClick={() => props.cambia()}>
      Pulsa para cambiar de color.
    </Button>
  )
}

// crear el class component App 
class App extends React.Component {
  // crear el constructor que recibe las props
  constructor(props) {
    // obtener las props del padre React Component
    super(props);
    // contiene el estado color
    this.state = {
      color: "danger",
    }
  }

  // crear la funcion cambia, que recibira el boton reactstrap en su prop , al llamarla en onclick cambia de color
  cambia() {
    // si el color es danger cambiarlo a succes
    if (this.state.color === "danger") {
      this.setState({ color: "success" })
    // sino cambiarlo a danger
    } else {
      this.setState({ color: "danger" })
    }
  }
  render() {
    return (
      // al renderizar el boton, le pasamos el color y la funcion cambia el color
      <div className="App">
        <Boton col={this.state.color} cambia={() => this.cambia()} />
      </div>
    );
  }
}

export default App;