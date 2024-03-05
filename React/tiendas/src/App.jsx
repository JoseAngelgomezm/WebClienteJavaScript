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
  const [tiendaPoblacion, setTiendaPoblacion] = useState([])

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

  // funcion que fija el boton
  const fijarBoton = (fila, columna) => {
    let copiaEstado = posicionesTiendas.slice()
    copiaEstado.push([fila, columna])
    setposicionesTiendas(copiaEstado)
    return recalcular()
  }

  // calcula la poblacion total la primera vez y la distancia que hay desde todas las 
  // celdas a cada tienda
  const recalcular = () => {
    let numeroTiendas = posicionesTiendas.length

    // si hay una tienda , calcular la posicion total
    if (numeroTiendas === 1) {
      // calcular la poblacion total
      let sumaValores = 0
      for (let i = 0; i < poblacion.length; i++) {
        sumaValores += poblacion[i].reduce((e1, e2) => e1 + e2)
      }
      // establecer la poblacion total
      setPoblacionTotal(sumaValores)
      // calculamos las distancias de todas las casillas a las tiendas que hay
      return calcularDistancia()

    } else {
      // calculamos las distancias de todas las casillas a las tiendas que hay
      return calcularDistancia()
    }
  }

  // funcion que calcula la distancia de todas las casillas hasta las tiendas
  const calcularDistancia = () => {
    if(posicionesTiendas.length === 1){
      let poblacionAtienda1 = "Tienda 1 : "+poblacionTotal+" personas";
      let copia = tiendaPoblacion.slice()
      copia.push(poblacionAtienda1)
      setTiendaPoblacion(copia)
    }
    let arrayDistancias = []
    // sacar las distancias desde cada una de las casillas hasta las tiendas
    for (let i = 0; i < poblacion.length; i++) {
      for (let j = 0; j < poblacion[i].length; j++) {
        // calcular las distancias de la posicion actual a cada tienda
        for (let k = 0; k < posicionesTiendas.length; k++) {
          let tiendaAllegar = posicionesTiendas[k]
          // por cada posicion, calcular la distancia a cada tienda
          let distancia = Math.abs(tiendaAllegar[0] - i) + Math.abs(tiendaAllegar[1] - j)
          arrayDistancias.push(distancia)
        }
      }
    }
    console.log(arrayDistancias)
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
          <h1>Poblacion por tienda</h1>
          <ul>
            {tiendaPoblacion.map((elemento) => <li>{elemento}</li>)}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
