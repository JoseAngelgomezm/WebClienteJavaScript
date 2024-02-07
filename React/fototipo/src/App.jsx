import { useState } from 'react'
import datosPreguntas from './resources/datosPreguntas.json'
import Pregunta from './components/Pregunta.jsx'
import "./App.css"


const MostrarPreguntas = (props) => {
  const preguntas = props.jsonPreguntas.map((elemento, indice) => <div class="pregunta"><Pregunta puntuacion={(valor) => props.cambiarPuntuacion(valor)} key={indice} pregunta={elemento.pregunta} valores={elemento.valor} arrayRespuestas={elemento.respuestas}></Pregunta></div>)
  return preguntas
}

function App() {

  const jsonPreguntas = datosPreguntas.preguntas
  const [puntuacion, setPuntuacion] = useState(Array(datosPreguntas.preguntas.length).fill(-1));


  const cambiarPuntuacion = (valor, numeroPregunta) => {
    console.log(valor, indice)
  }

  return (
    <>
      <header>
        <h2>Descubre tu FOTOTIPO</h2>
        <p>Responde al siguiente cuestrionario y podras saber tu fototipo segun una puntuacion de cada respuesta</p>
      </header>
      <div id="preguntas">
      <MostrarPreguntas cambiarPuntuacion={(valor) => cambiarPuntuacion(valor)} jsonPreguntas={jsonPreguntas}></MostrarPreguntas>
      <button id ="enviar">Enviar Preguntas</button>
      </div>
    </>
  )
}

export default App
