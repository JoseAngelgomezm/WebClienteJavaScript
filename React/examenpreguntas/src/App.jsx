import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Toast, ToastBody, ToastHeader } from 'reactstrap';
import React, { useState } from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

/*              ENUNCIADO DEL EJERCICIO.

Se pide que realices el programa que visualizas en el vídeo adjunto.

Se considerará incorrecto un programa que acumule la funcionalidad en solo un componente o cambie la estructura de clases.

Cosas que se valorarán:
Legibilidad del código.
Longitud del código.
No se valorará el aspecto estético de la web.
El programa realiza la funcionalidad requerida.
Que no haya errores en la consola.
La eficiencia.
La modularidad (alta cohesión y bajo acoplamiento).
Que el código sea limpio, flexible, reutilizable y mantenible.
Sigue los principios SOLID.
Otros criterios.

A continuación se describen los componentes que tienes que implementar para completar este ejercicio:

-----------COMPONENTE PREGUNTAS-----------
Es el encargado de mostrar la pregunta al usuario

-----------COMPONENTE VENTANAMODAL-----------
Es el encargado de mostrar el resultado del test y preguntar si lo quiere hacer de nuevo

-----------PREGUNTAS------------
Las preguntas se muestran de manera aleatoria. Para ello te proporciono la función aleatorio que siempre hemos utilizado.

Importante const PREGUNTAS: 
  EN LAS PREGUNTAS SI RESPUESTA ES 1 Y EL USUARIO ESCOJE SI -> ES NOMOFÓBICO (No nomofóbico en caso contrario)
  Y SI EL USUARIO ELIGE NO Y RESPUESTA ES 0 -> EL USUARIO ES NOMOFÓBICO (No nomofóbico en caso contrario)

-----------RESPUESTAS-----------
DEPENDIENDO DE LAS RESPUESTAS:
Al final de las preguntas y atendiendo las respuestas...
    Si el porcentaje de las respuestas es < 50 mostrará En principio no tienes nada de que preocuparte"
    Si el porcentaje de las respuestas es entre 50-69 mostrará "Empiezas a tener signos de dependencia del móvil. Puedes utilizar técnicas como apagar el móvil cuando no lo necesitas, cuando duermes, etc."
    Si el porcentaje de las respuestas es entre 70-79 mostrará "Tienes una gran dependencia del móvil. Deberías seguir un plan de «desintoxicación» del móvil como por ejemplo dejar el móvil en casa cuando vas a comprar, apagarlo durante la noche, apagarlo durante horas de clase o trabajo, etc."
    Si el porcentaje de las respuestas es >= 80 mostrará "Tus síntomas de dependencia son muy preocupantes. Además de todas las técnicas de los apartados anteriores deberías plantearte un plan de desintoxicación del móvil que consista en estar una o dos semanas sin utilizarlo. Si ves que no puedes hacerlo por ti mismo, pide ayuda a un profesional."

*/

const PREGUNTAS = [
  { "pregunta": "Cuando mandas un mensaje por whatsapp esperas siempre al doble check. Si no aparece vuelves a abrir el terminal para revisarlo al rato.", "respuesta": 1 },
  { "pregunta": "Antes de acostarte siempre miras el móvil a ver si tienes mensajes o notificaciones.", "respuesta": 1 },
  { "pregunta": "Te despiertas antes de tiempo para jugar, mandar mensajes, actualizar perfiles,… con el teléfono móvil.", "respuesta": 1 },
  { "pregunta": "Si sales de casa sin el móvil volverías a cogerlo aunque llegues tarde a tu cita.", "respuesta": 1 },
  { "pregunta": "No tienes miedo a quedarte sin batería.", "respuesta": 0 },
  { "pregunta": "Cuando tienes la batería baja desactivas ciertas aplicaciones u opciones del teléfono como la WiFi, bluetooth para no quedarte sin batería.", "respuesta": 1 },
  { "pregunta": "Tienes ansiedad cuando tienes llamadas perdidas. Llamas a los números y te preocupas si no responden.", "respuesta": 1 },
  { "pregunta": "Miras la cobertura cuando estas en algún sitio con los amigos, esperando, etc.", "respuesta": 1 },
  { "pregunta": "Sueles hacer alguna otra cosa mientras que miras al móvil como comer, lavarte los dientes, etc.", "respuesta": 1 },
  { "pregunta": "No sueles mirar la cobertura del móvil con frecuencia", "respuesta": 0 },
  { "pregunta": "Vas al baño siempre con el móvil.", "respuesta": 1 },
  { "pregunta": "A veces sales a la calle sin el móvil.", "respuesta": 0 }
];


// componente que muestra la pregunta que toque segun el orden obtemnido aleatoriamente
const MostrarPregunta = (props) => {
  let orden = props.ordenPreguntas
  let numero = props.numeroPregunta
  let preguntaAMostrar = orden[numero]
  let ObjetoPregunta = props.jsonPreguntas[preguntaAMostrar]

  return (
    <div>
      {<Preguntas comprobarValores={(valorPregunta, valorRespuesta) => props.comprobarValores(valorPregunta, valorRespuesta)} valor={ObjetoPregunta.respuesta} siguientePregunta={() => props.siguientePregunta()} textoPregunta={ObjetoPregunta.pregunta} numeroPregunta={preguntaAMostrar}></Preguntas>}
    </div>
  )
}



const Preguntas = (props) => {

  return (
    <div className="p-3 my-2 rounded bg-docs-transparent-grid">
      <Toast>
        <ToastHeader>
          Pregunta Nº: {props.numeroPregunta}
        </ToastHeader>
        <ToastBody>
          {props.textoPregunta}
        </ToastBody>
        <div class="container">
          <div class="row justify-content-center">
            <Button outline color="secondary" onClick={() => { props.siguientePregunta(); props.comprobarValores(props.valor, 1) }}>Si</Button>&nbsp;
            <Button outline color="secondary" onClick={() => { props.siguientePregunta(); props.comprobarValores(props.valor, 0) }} >No</Button>
          </div>
        </div>
      </Toast>
    </div>
  );

}

const VentanaModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  // comprobar aciertos y fallos
  let aciertos = parseInt(props.numeroAciertos)
  let fallos = parseInt(props.numeroFallos)
  let total = aciertos + fallos
  // obtener porcentaje
  let porcentaje = (aciertos * 100) / total
  let textoRespuesta = ""

  // segun porcentaje obtener texto
  if (porcentaje < 50) {
    textoRespuesta = "En principio no tienes nada de que preocuparte"
  } else if (porcentaje >= 50 && porcentaje <= 69) {
    textoRespuesta = "Empiezas a tener signos de dependencia del móvil. Puedes utilizar técnicas como apagar el móvil cuando no lo necesitas, cuando duermes, etc."
  } else if (porcentaje > 70 && porcentaje <= 79) {
    textoRespuesta = "Tienes una gran dependencia del móvil. Deberías seguir un plan de «desintoxicación» del móvil como por ejemplo dejar el móvil en casa cuando vas a comprar, apagarlo durante la noche, apagarlo durante horas de clase o trabajo, etc."
  } else if (porcentaje >= 80) {
    textoRespuesta = "Tus síntomas de dependencia son muy preocupantes. Además de todas las técnicas de los apartados anteriores deberías plantearte un plan de desintoxicación del móvil que consista en estar una o dos semanas sin utilizarlo. Si ves que no puedes hacerlo por ti mismo, pide ayuda a un profesional."
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Resultados del test NOMOFOBIA: {porcentaje} %</ModalHeader>
        <ModalBody>
          {textoRespuesta}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { props.reiniciarEstados(); toggle() }}>Seguir</Button>
          <Button color="secondary" onClick={() => { props.salir(); toggle() }}>Salir</Button>
        </ModalFooter>
      </Modal>
    </div>

  );
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      preguntas: PREGUNTAS,
      aciertos: 0,
      fallos: 0,
      textoPregunta: "",
      respuesta: 0,
      finalizado: 0,
      ordenPreguntas: null,
      numeroPreguntaMostrar: 0,
    };
  }
  componentDidMount () {
    // POR SI NECESITAS REALIZAR ALGO ANTES DE  QUE SE MONTE EL COMPONENTE
    // obtener el orden de las preguntas de forma aleatoria
    let numeroSalidos = []
    for (let i = 0; i < this.state.preguntas.length; i++) {
      let numeroAleatorio = this.aleatorio(0, this.state.preguntas.length)
      while (numeroSalidos.includes(numeroAleatorio)) {
        numeroAleatorio = this.aleatorio(0, this.state.preguntas.length)
      }
      numeroSalidos.push(numeroAleatorio)
    }

    this.setState({ ordenPreguntas: numeroSalidos })
  }

  aleatorio (min, max) { //Devuelve un valor aleatorio entre min y max
    var horquilla = max - min;
    return Math.floor(Math.random() * horquilla + min);
  }

  // funcion que muestra la siguiente pregunta
  siguientePregunta () {
    if (this.state.numeroPreguntaMostrar < this.state.preguntas.length - 1) {
      let siguiente = this.state.numeroPreguntaMostrar + 1
      this.setState({ numeroPreguntaMostrar: siguiente })
    } else {
      this.setState({ finalizado: 1 })
    }

  }

  // funcion que empieza de nuevo el test
  reiniciarEstados () {
    this.componentDidMount()
    this.setState({ aciertos: 0, fallos: 0, finalizado: 0, numeroPreguntaMostrar: 0 })
  }

  // funcion que termina el test y lo deja todo blanco
  salir () {
    this.setState({ ordenPreguntas: null, finalizado: 0 })
  }

  // funcion que determina los acieros y los fallos
  comprobarValores (valorPregunta, valorRespuesta) {
    let aciertosNuevos = this.state.aciertos;
    let fallosNuevos = this.state.fallos;
    if (valorPregunta === valorRespuesta) {
      aciertosNuevos += 1
    } else {
      fallosNuevos += 1
    }

    this.setState({ aciertos: aciertosNuevos, fallos: fallosNuevos })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.ordenPreguntas !== null && <MostrarPregunta comprobarValores={(valorPregunta, valorRespuesta) => this.comprobarValores(valorPregunta, valorRespuesta)} siguientePregunta={() => this.siguientePregunta()} jsonPreguntas={this.state.preguntas} numeroPregunta={this.state.numeroPreguntaMostrar} ordenPreguntas={this.state.ordenPreguntas}></MostrarPregunta>}
          {this.state.finalizado !== 0 && <VentanaModal salir={() => this.salir()} reiniciarEstados={() => this.reiniciarEstados()} numeroAciertos={this.state.aciertos} numeroFallos={this.state.fallos} ></VentanaModal>}
        </header>

      </div>
    );
  }
}

export default App;


