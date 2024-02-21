import { useState } from 'react'

import './App.css'
// 1 calcular la distancia
// 2 Filtro saber la distancia
// 3 dividir la poblacion
// 4 a cada supermercado del filtro le sumo la poblacion

function App() {
  const [poblacion, setPoblacion] = useState([
    [0, 5, 4, 2, 9, 8, 0, 8, 8],
    [1, 7, 21, 23, 44, 5, 3, 4, 0],
    [2, 6, 32, 22, 33, 8, 4, 2, 8],
    [1, 2, 43, 4, 56, 65, 34, 11, 8],
    [2, 22, 32, 3, 42, 62, 43, 21, 0],
    [2, 2, 23, 34, 64, 24, 42, 15, 7],
    [0, 2, 36, 43, 61, 26, 64, 12, 0],
    [1, 2, 15, 43, 34, 2, 12, 2, 3],
    [1, 0, 12, 3, 0, 0, 21, 2, 2]])

  const [botonesSeleccionados, setBotonesSeleccionados] = useState([])
  const[poblacionTotal, setPoblacionTotal] = useState([])
  const MostrarPoblacion = () => {

    return poblacion.map((e, fila) => {

      return e.map((e2, columna) => {

        // comprobar si la matriz contiene los valores por el que voy
        let fijarlo = botonesSeleccionados.some(arrayComprobar => JSON.stringify(arrayComprobar) === JSON.stringify([fila, columna]))

        // si lo contiene desabilitarlo
        if (fijarlo) {

          return <button disabled>{e2}</button>

        } else {
          return <button onClick={() => fijarBoton(fila, columna)}>{e2}</button>
        }


      }).concat(<br></br>)

    })
  }

  const fijarBoton = (fila, columna) => {
    let copiaEstado = botonesSeleccionados.slice()
    copiaEstado.push([fila, columna])
    setBotonesSeleccionados(copiaEstado)
    recalcular(fila,columna)
  }

  const recalcular = (fila, columna) => {
    // sacar las tiendas que hay
    let numeroTiendas = botonesSeleccionados.length
    
    // si hay mas de una, hacer los calculos
    if (numeroTiendas >= 1) {
      // saber la distancia entre tiendas
      for(let i = 0; i<=numeroTiendas;i++){
        // primera tienda
        console.log(botonesSeleccionados[0][0],botonesSeleccionados[0][1])
        
      }

    } else {
      // calcular la poblacion total
      let sumaValores = 0
      for (let i = 0; i < poblacion.length; i++) {
        sumaValores += poblacion[i].reduce((e1, e2) => e1 + e2)
      }

      let copiaPoblacion = poblacion.slice()
      copiaPoblacion[fila][columna] = sumaValores
      setPoblacion(copiaPoblacion)
      setPoblacionTotal(sumaValores)
    }
  }


  return (
    <>
      <div id='App'>
        <MostrarPoblacion />
      </div>
      <div id='datos'>
        <h1>Tiendas Asignadas</h1>
        <ul>
          {botonesSeleccionados.map((elemento) => <li>{elemento[0]},{elemento[1]}</li>)}
        </ul>
      </div>
    </>
  )
}

export default App
