import { useState } from 'react'
import datosPreguntas from './resources/datosPreguntas.json' 
import Pregunta from './components/Pregunta.jsx'
function App() {

  const jsonPreguntas = datosPreguntas.preguntas

  return (
    <>
    {jsonPreguntas.map((elemento) => <Pregunta key="" pregunta={elemento.pregunta} valores={elemento.valor} arrayRespuestas={elemento.respuestas}></Pregunta>)}
    </>
  )
}

export default App
