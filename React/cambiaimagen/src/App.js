import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

const Imagen = (props) => {
  return (
    <div>
      <Card>
        <img alt="Imagen de prueba" src={props.img}
        />
        <CardBody>
          <CardTitle tag="h5">
            {props.titulo}
          </CardTitle>
          <CardSubtitle tag="h6" >
            {props.subtitulo}
          </CardSubtitle>
          <CardText>
            {props.texto}
          </CardText>
          <Button onClick={props.OnclickPatras(props.imagen)}>
            {props.texto1}
          </Button>
          <Button onClick={props.OnclickPalante(props.imagen)}>
            {props.texto2}
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

// crear el class component App 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      imagen:"../public/2.jpg",
    }
  }

  palantePatras(imagen){
    console.log("palabte o patra");
    if(imagen == "../public/1.web"){
      this.setState=({imagen:"../public/2.jpg"})
    }else{
      this.setState=({imagen:"../public/1.webp"})
    }
  }

  

  render() {
    return (
      <div><Imagen texto2="Palante" 
      texto1="Patras" 
      OnclickPalante={() => this.palantePatras()} 
      OnclickPatras={() => this.palantePatras()} 
      img={this.state.imagen} 
      subtitulo="esta es una imagen de prueba" texto="esto es una imagen de prueba que se utiliza para aprender a usa react" textoUno="SiqueSi" textodos="NoqueNo" titulo="esto es una imagen" /></div>
    )
  }
}

export default App;