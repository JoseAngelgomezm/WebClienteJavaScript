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

  const [posicionesTiendas, setposicionesTiendas] = useState([])
  const [poblacionTotal, setPoblacionTotal] = useState([])
  const [distanciasEntreTiendas, setDistanciasEntreTiendas] = useState([])
  const MostrarPoblacion = () => {

    return poblacion.map((e, fila) => {

      return e.map((e2, columna) => {

        // comprobar si la matriz contiene los valores por el que voy
        let fijarlo = posicionesTiendas.some(arrayComprobar => JSON.stringify(arrayComprobar) === JSON.stringify([fila, columna]))

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
    let copiaEstado = posicionesTiendas.slice()
    copiaEstado.push([fila, columna])
    setposicionesTiendas(copiaEstado)
    recalcular(fila, columna)
  }

  // funcion que calcula la distancia desde la ultima tienda puesta a todas las demás
  const calcularDistancia = (fila, columna) => {

    let arrayDistancias = []
    let numeroDistanciasAcalcular = posicionesTiendas.length
    let posiciones1 = [fila, columna]
    while (numeroDistanciasAcalcular !== 0) {
      let posiciones2 = posicionesTiendas[numeroDistanciasAcalcular - 1]
      let distancia = Math.abs(posiciones1[0] - posiciones2[0]) + Math.abs(posiciones1[1] - posiciones2[1])
      arrayDistancias.push(distancia)
      numeroDistanciasAcalcular--
    }

    setDistanciasEntreTiendas(arrayDistancias)

  }

  const calcularPoblacion = () => {
    console.log(distanciasEntreTiendas)
  }

  const recalcular = (fila, columna) => {
    // sacar las tiendas que hay
    let numeroTiendas = posicionesTiendas.length

    // si hay mas de una, hacer los calculos de las distancias
    if (numeroTiendas >= 1) {
      // calculamos la distancia 
      calcularDistancia(fila, columna)
      // establecemos la poblacion
      calcularPoblacion()
    } else {

      // calcular la poblacion total
      let sumaValores = 0
      let copiaPoblacion = poblacion.slice()
      for (let i = 0; i < poblacion.length; i++) {
        sumaValores += poblacion[i].reduce((e1, e2) => e1 + e2)
      }

      // poner todo a 0
      for (var i = 0; i < copiaPoblacion.length; i++) {
        for (var j = 0; j < copiaPoblacion[i].length; j++) {
          copiaPoblacion[i][j] = 0;
        }
      }

      // establecer en la actual la poblacion total
      copiaPoblacion[fila][columna] = sumaValores
      setPoblacion(copiaPoblacion)
      setPoblacionTotal(sumaValores)
    }

  }



  return (
    <>
      <div id='App'>
        <MostrarPoblacion />
        <div id='datos'>
          <h1>Tiendas Asignadas</h1>
          <ul>
            {posicionesTiendas.map((elemento, indice) => <li>Tienda {indice + 1} alojada en {elemento[0]},{elemento[1]}</li>)}
          </ul>
        </div>

        <div id='distancias'>
          <h1>Distancias</h1>
          <ul>
            {distanciasEntreTiendas.length !== 0 && distanciasEntreTiendas.map((elemento, indice) => <li>Distancia entre tienda {posicionesTiendas.length} a {posicionesTiendas.length - 1 - indice} = {elemento}</li>)}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
