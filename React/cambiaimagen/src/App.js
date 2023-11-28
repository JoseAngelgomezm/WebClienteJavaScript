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
          <Button onClick={() => props.OnclickPatras()}>
            {props.texto1}
          </Button>
          <Button onClick={() => props.OnclickPalante()}>
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
    this.state = {
      imagen: "2.jpg",
    }
  }

  palantePatras(imagen) {
    console.log(imagen)
    let imagenNueva = this.state.imagen
    if (imagen === "2.jpg") {
      imagenNueva = "1.webp"
      this.setState = ({imagen: imagenNueva})
    } else {
      imagenNueva = "2.jpg"
      this.setState = ({imagen: imagenNueva})
    }
  }



  render() {
    return (
      <div><Imagen texto2="Palante"
        texto1="Patras"
        OnclickPalante={() => this.palantePatras(this.state.imagen)}
        OnclickPatras={() => this.palantePatras(this.state.imagen)}
        img={this.state.imagen}
        subtitulo="esta es una imagen de prueba"
        texto="esto es una imagen de prueba que se utiliza para aprender a usa react"
        titulo="esto es una imagen" /></div>
    )
  }
}

export default App;