import { useState } from 'react'
import datosPreguntas from './assets/datosPreguntas.json'
import Pregunta from './assets/components/Pregunta.jsx'
import "./App.css"
import imagen1 from './assets/images/tipo1.png'
import imagen2 from './assets/images/tipo2.png'
import imagen3 from './assets/images/tipo3.png'
import imagen4 from './assets/images/tipo4.png'
import imagen5 from './assets/images/tipo5.png'
import imagen6 from './assets/images/tipo6.png'



const MostrarPreguntas = (props) => {

  // renderiza una pregunta por cada elemento en la lista de preguntas
  const preguntas = props.jsonPreguntas.map((elemento, indice) => <div className="pregunta"><Pregunta numeroPregunta={indice} puntuacion={(valor, numeroPregunta) => props.cambiarPuntuacion(valor, numeroPregunta)} key={indice} pregunta={elemento.pregunta} valores={elemento.valor} arrayRespuestas={elemento.respuestas}></Pregunta></div>)
  return preguntas
}

function App() {

  const jsonPreguntas = datosPreguntas.preguntas
  const [puntuacion, setPuntuacion] = useState(Array(datosPreguntas.preguntas.length).fill(-1));
  const [textoInformativo, settextoInformativo] = useState("")
  const [imagen, setimagen] = useState("")
  const [puntuacionTotal, setPuntuacionTotal] = useState("")
  const [numeroPregunta, setNumeroPregunta] = useState("")


  const cambiarPuntuacion = (valor, numeroPregunta) => {
    // pone en la posicion del array del numero de pregunta la puntuacion de la pregunta
    // que recibe de la callback
    const nuevoArray = puntuacion
    nuevoArray[numeroPregunta] = valor
    setPuntuacion(nuevoArray)
  }

  const enviarDatos = () => {
    let sumaPuntuacion = 0
    // si contiene un menos -1 en la puntuacion, es que no estan seleccionadas todas las preguntas
    if (puntuacion.includes(-1)) {
      settextoInformativo("No se han seleccionado todas las respuestas, porfavor, seleccionalas todas")
      // si no lo contiene, guardar los resultados
    } else {
      // sumarlos
      for (let i = 0; i < puntuacion.length; i++) {
        sumaPuntuacion = sumaPuntuacion + puntuacion[i];
      }

      // depende de la puntuacion total, mostrar una foto y un texto diferente 
      switch (true) {
        case sumaPuntuacion <= 7:
          settextoInformativo("Muy sensible a la luz solar");
          setimagen(imagen1)
          break;

        case sumaPuntuacion > 7 && sumaPuntuacion <= 21:
          settextoInformativo("Sensible a la luz solar");
          setimagen(imagen2)
          break;

        case sumaPuntuacion > 21 && sumaPuntuacion <= 42:
          settextoInformativo("Sensible normal luz solar");
          setimagen(imagen3)
          break;

        case sumaPuntuacion > 42 && sumaPuntuacion <= 68:
          settextoInformativo("La piel tiene tolerancia a la luz solar");
          setimagen(imagen4)
          break;

        case sumaPuntuacion > 68 && sumaPuntuacion <= 84:
          settextoInformativo("La piel es oscura, alta tolerancia");
          setimagen(imagen5)
          break;

        case sumaPuntuacion > 85:
          settextoInformativo("La piel es negra, altísima tolerancia");
          setimagen(imagen6)
          break;

        default:
          break;
      }

      setPuntuacionTotal(sumaPuntuacion)

    }
  }

  const reiniciar = () => {
    setPuntuacion(Array(datosPreguntas.preguntas.length).fill(-1))
    settextoInformativo("")
    setPuntuacionTotal("")
    setimagen("")
  }

  return (
    <>
      <header>
        <h2>Descubre tu FOTOTIPO</h2>
      </header>
      <div id="preguntas">
      <p>Responde al siguiente cuestrionario y podras saber tu fototipo segun una puntuacion de cada respuesta</p>
        <MostrarPreguntas cambiarPuntuacion={(valor, numeroPregunta) => cambiarPuntuacion(valor, numeroPregunta)} jsonPreguntas={jsonPreguntas}></MostrarPreguntas>
        <button onClick={() => enviarDatos()}>Enviar Preguntas</button>
        <button onClick={() => reiniciar()}>Reiniciar test</button>
        {/* Renderizado condicional, si el error contiene algo, mostrarlo*/}
        {textoInformativo !== "" && <h2>{textoInformativo}</h2>}
        {/* Renderizado condicional, si la puntuacion contiene algo, mostrarlo*/}
        {puntuacionTotal !== "" && <h2>Tu puntuacion es de: {puntuacionTotal}</h2>}
        {/* Renderizado condicional, si la imagen contiene algo, mostrarla*/}
        {imagen !== "" && <img src={imagen} alt='imagen visual de cual seria tu fototipo' />}
      </div>
    </>
  )
}

export default App
