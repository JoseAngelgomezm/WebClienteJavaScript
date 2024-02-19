import { useState } from 'react'
import datosPreguntas from './assets/datosPreguntas.json'
import Pregunta from './assets/components/Pregunta.jsx'
import "./App.css"
import axios from "axios"
import {urlBASECLASE}  from './assets/peticion.js'
import {urlBASECASA}  from './assets/peticion.js'
import imagen1 from './assets/images/tipo1.png'
import imagen2 from './assets/images/tipo2.png'
import imagen3 from './assets/images/tipo3.png'
import imagen4 from './assets/images/tipo4.png'
import imagen5 from './assets/images/tipo5.png'
import imagen6 from './assets/images/tipo6.png'



const MostrarPreguntas = (props) => {

  // renderiza una pregunta por cada elemento en la lista de preguntas
  const preguntas = props.jsonPreguntas.map((elemento, indice) => <div className="pregunta"><Pregunta enviarDatos={(valor) => props.enviarDatos(valor)} key={indice} pregunta={elemento.pregunta} valores={elemento.valor} arrayRespuestas={elemento.respuestas}></Pregunta></div>)
  return preguntas[props.numeroPregunta]
}

function App() {

  const jsonPreguntas = datosPreguntas.preguntas
  const [puntuacion, setPuntuacion] = useState(Array(datosPreguntas.preguntas.length).fill(-1));
  const [textoInformativo, settextoInformativo] = useState("")
  const [numeroPersonasComoTu, setnumeroPersonasComoTu] = useState("")
  const [imagen, setimagen] = useState("")
  const [puntuacionTotal, setPuntuacionTotal] = useState("")
  const [numeroPregunta, setNumeroPregunta] = useState(0)


  const verResultados = () => {
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

      let tipoActualizado = 0

      // depende de la puntuacion total, mostrar una foto y un texto diferente 
      switch (true) {
        case sumaPuntuacion <= 7:
          settextoInformativo("Muy sensible a la luz solar, tipo 1");
          setimagen(imagen1)
          tipoActualizado = 1
          break;

        case sumaPuntuacion > 7 && sumaPuntuacion <= 21:
          settextoInformativo("Sensible a la luz solar, tipo 2");
          setimagen(imagen2)
          tipoActualizado = 2
          break;

        case sumaPuntuacion > 21 && sumaPuntuacion <= 42:
          settextoInformativo("Sensibilidad normal a la luz solar, tipo 3");
          setimagen(imagen3)
          tipoActualizado = 3
          break;

        case sumaPuntuacion > 42 && sumaPuntuacion <= 68:
          settextoInformativo("La piel tiene tolerancia a la luz solar, tipo 4");
          setimagen(imagen4)
          tipoActualizado = 4
          break;

        case sumaPuntuacion > 68 && sumaPuntuacion <= 84:
          settextoInformativo("La piel es oscura, alta tolerancia, tipo 5");
          setimagen(imagen5)
          tipoActualizado = 5
          break;

        case sumaPuntuacion > 85:
          settextoInformativo("La piel es negra, altísima tolerancia, tipo 6");
          setimagen(imagen6)
          tipoActualizado = 6
          break;

        default:
          break;
      }

      setPuntuacionTotal(sumaPuntuacion)
      gestionarDatosPHP(tipoActualizado)
    }
  }

  const gestionarDatosPHP = (tipo) => {
   
    // enviar el tipo en un formato json
    const numero = {
      cantidad:tipo,
    }
    
    // mediante una peticion post, envio el numero de fototipo y recibo la cantidad de personas
    // que tienen el mismo fototipo menos esta persona
  
    axios.post(urlBASECLASE + "/gestionFototipos.php", numero).then(respuesta => {

      setnumeroPersonasComoTu(respuesta.data)
        
      })
      .catch(error => {
        // Manejar errores
        console.error('Error al enviar los datos:', error);
      });

  }

  const enviarDatos = (valor) => {
    // pone en la posicion del array del numero de pregunta la puntuacion de la pregunta
    // que recibe de la callback
    const nuevoArray = puntuacion
    nuevoArray[numeroPregunta] = valor
    setPuntuacion(nuevoArray)
    setNumeroPregunta(numeroPregunta + 1)

    if (numeroPregunta === jsonPreguntas.length - 1) {
      verResultados()
    }
  }

  const reiniciar = () => {
    setPuntuacion(Array(datosPreguntas.preguntas.length).fill(-1))
    settextoInformativo("")
    setnumeroPersonasComoTu("")
    setimagen("")
    setPuntuacionTotal("")
    setNumeroPregunta(0)
  }

  return (
    <>
      <header>
        <h2>Descubre tu FOTOTIPO</h2>
      </header>
      <div id="preguntas">
        <h2>Responde al siguiente cuestrionario y podrás saber tu fototipo</h2>
        <MostrarPreguntas enviarDatos={(valor) => enviarDatos(valor)} numeroPregunta={numeroPregunta} jsonPreguntas={jsonPreguntas}></MostrarPreguntas>
        <button onClick={() => reiniciar()}>Reiniciar test</button>
        {/* Renderizado condicional, si el error contiene algo, mostrarlo*/}
        {textoInformativo !== "" && <h2>{textoInformativo}</h2>}
        {/* Renderizado condicional, si la puntuacion contiene algo, mostrarlo*/}
        {puntuacionTotal !== "" && <h2>Tu puntuacion es de: {puntuacionTotal}</h2>}
        {/* Renderizado condicional, si el numero de personas contiene algo, mostrarlo*/}
        {numeroPersonasComoTu !== "" && <h2>Hay un total de {numeroPersonasComoTu} personas con el mismo fototipo que tu que han realizado este test</h2>}
        {/* Renderizado condicional, si la imagen contiene algo, mostrarla*/}
        {imagen !== "" && <img src={imagen} alt='imagen visual de cual seria tu fototipo' />}
      </div>
    </>
  )
}

export default App
