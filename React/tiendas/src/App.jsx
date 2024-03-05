import { useEffect, useState } from 'react'

import './App.css'
// 1 calcular la distancia
// 2 Filtro saber la distancia
// 3 dividir la poblacion
// 4 a cada supermercado del filtro le sumo la poblacion

function App() {
  const poblacionNoTocar =
    [
      [0, 5, 4, 2, 9, 8, 0, 8, 8],
      [1, 7, 21, 23, 44, 5, 3, 4, 0],
      [2, 6, 32, 22, 33, 8, 4, 2, 8],
      [1, 2, 43, 4, 56, 65, 34, 11, 8],
      [2, 22, 32, 3, 42, 62, 43, 21, 0],
      [2, 2, 23, 34, 64, 24, 42, 15, 7],
      [0, 2, 36, 43, 61, 26, 64, 12, 0],
      [1, 2, 15, 43, 34, 2, 12, 2, 3],
      [1, 0, 12, 3, 0, 0, 21, 2, 2]
    ]

  const [poblacion, setPoblacion] = useState(
    [
      [0, 5, 4, 2, 9, 8, 0, 8, 8],
      [1, 7, 21, 23, 44, 5, 3, 4, 0],
      [2, 6, 32, 22, 33, 8, 4, 2, 8],
      [1, 2, 43, 4, 56, 65, 34, 11, 8],
      [2, 22, 32, 3, 42, 62, 43, 21, 0],
      [2, 2, 23, 34, 64, 24, 42, 15, 7],
      [0, 2, 36, 43, 61, 26, 64, 12, 0],
      [1, 2, 15, 43, 34, 2, 12, 2, 3],
      [1, 0, 12, 3, 0, 0, 21, 2, 2]
    ]
  )

  const [posicionesTiendas, setPosicionesTiendas] = useState([])
  const [poblacionTotal, setPoblacionTotal] = useState()
  const [tiendaPoblacion, setTiendaPoblacion] = useState([])

  const MostrarPoblacion = () => {
    let indice = 0
    return poblacion.map((e, fila) => {

      return e.map((e2, columna) => {

        // comprobar si la matriz contiene los valores por el que voy
        let fijarlo = posicionesTiendas.some(arrayComprobar => JSON.stringify(arrayComprobar) === JSON.stringify([fila, columna]))

        // si lo contiene desabilitarlo
        if (fijarlo) {
          indice++
          return <button key={indice} disabled>{e2}</button>

        } else {
          indice++
          return <button key={indice} onClick={() => fijarBoton(fila, columna)}>{e2}</button>
        }

      }).concat(<br></br>)

    })
  }

  // La primera vez , calcular la poblacion
  useEffect(() => {
    // calcular la poblacion total
    let sumaValores = 0
    for (let i = 0; i < poblacion.length; i++) {
      sumaValores += poblacion[i].reduce((e1, e2) => e1 + e2)
    }
    // establecer la poblacion total
    setPoblacionTotal(sumaValores)
  }, []);

  const fijarBoton = (fila, columna) => {
    setPosicionesTiendas(prevPosicionesTiendas => {
      const nuevasPosicionesTiendas = [...prevPosicionesTiendas, [fila, columna]];
      recalcular(nuevasPosicionesTiendas); // Llamar a recalcular con las nuevas posiciones de las tiendas
      return nuevasPosicionesTiendas;
    });
  }



  const recalcular = (nuevasPosicionesTiendas) => {
    // Copia de la población actual que no se modifica
    let copiaPoblacion = poblacionNoTocar.slice();


    // Recorrer la matriz para calcular distancias y ajustar población
    for (let i = 0; i < copiaPoblacion.length; i++) {
      for (let j = 0; j < copiaPoblacion[i].length; j++) {

        // Si la celda actual es una tienda, continuar
        if (nuevasPosicionesTiendas.some(tienda => tienda[0] === i && tienda[1] === j)) {
          continue;
        }

        // si solo hay una tienda, añadir en esa tienda el contenido de esta celda
        if (nuevasPosicionesTiendas.length === 1) {
          let tienda = nuevasPosicionesTiendas[0]
          copiaPoblacion[tienda[0]][tienda[1]] += copiaPoblacion[i][j]

          // si hay mas de una tienda
        } else {
          // recorrer las nuevas posiciones de las tiendas para calcular distancias
          // equivale al tercer bucle for, para calcular la distancia de una celda hasta las tiendas que hay
          let distancias = nuevasPosicionesTiendas.map(tienda => Math.floor(Math.sqrt(Math.pow(tienda[0] - i, 2) + Math.pow(tienda[1] - j, 2))));

          // me quedo con el valor minimo de las distancias
          const minimo = Math.min(...distancias);

          // creo un array por si hay mas de una tienda repetida
          const indicesMinimos = [];
          // recorro las distancias, si hay mas de un minimo, lo añado al array
          for (let i = 0; i < distancias.length; i++) {
            if (distancias[i] === minimo) {
              indicesMinimos.push(i);
            }
          }

          // Obtener las coordenadas de las tiendas más cercanas
          let indicesTiendasMasCercanas = indicesMinimos.map((elemento, indice) => nuevasPosicionesTiendas[indice]);
          
          if(indicesTiendasMasCercanas.length -1 > 0){
             // repartir la poblacion entre las tiendas mas cercanas
          let repartoPoblacion = Math.floor(copiaPoblacion[i][j] / indicesTiendasMasCercanas.length)

          // a cada tienda, asignarle lo correspondiente
          indicesTiendasMasCercanas.map((elemento) => copiaPoblacion[elemento[0]][elemento[1]] += repartoPoblacion)
          }else{
            indicesTiendasMasCercanas.map((elemento) => copiaPoblacion[elemento[0]][elemento[1]] += copiaPoblacion[i][j])
          }
         
        }
      }
    }

    // Actualizar el estado de la población
    setPoblacion(copiaPoblacion);
  }

  return (
    <>
      <div id='App'>
        <h1>Poblacion por tienda</h1>
        <MostrarPoblacion />

        <div id='datos'>
          <h1>Tiendas Asignadas</h1>
          <ul>
            {posicionesTiendas.map((elemento, indice) => <li key={indice}>Tienda {indice + 1} alojada en {elemento[0]},{elemento[1]}</li>)}
          </ul>
        </div>

        <div id='distancias'>
          {poblacionTotal !== undefined && <h2>Poblacion total : {poblacionTotal}</h2>}
          <ul>
            {tiendaPoblacion.map((elemento, indice = 200) => <li key={indice}>{elemento}</li>)}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
