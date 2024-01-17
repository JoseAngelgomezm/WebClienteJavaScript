import React, { Component } from 'react';
import { useState } from 'react';

function App() {

  const lista = [
    "Tornillo Phillips 4mm",
    "Tornillo Allen 6mm",
    "Tornillo para madera 3.5mm",
    "Tornillo de máquina 5mm",
    "Tornillo autorroscante 8mm",
    "Tornillo de seguridad 6mm",
    "Tornillo de cabeza plana 10mm",
    "Tornillo para plástico 4mm",
    "Tornillo de anclaje 12mm",
    "Tornillo de métrica fina 3mm",

    "Tuerca hexagonal 5mm",
    "Tuerca autoblocante 8mm",
    "Tuerca mariposa 6mm",
    "Tuerca de mariposa 10mm",
    "Tuerca cuadrada 6mm",
    "Tuerca de seguridad 12mm",
    "Tuerca autoblocante 10mm",
    "Tuerca hexagonal 8mm",
    "Tuerca de presión 14mm",
    "Tuerca de brida 7mm",

    "Arandela plana 10mm",
    "Arandela de presión 12mm",
    "Arandela de seguridad 7mm",
    "Arandela de fijación 8mm",
    "Arandela de resorte 6mm",
    "Arandela de goma 10mm",
    "Arandela de presión extra 15mm",
    "Arandela de aluminio 5mm",
    "Arandela de cobre 12mm",
    "Arandela cónica 7mm",

    "Clavo de acero 50mm",
    "Clavo para madera 30mm",
    "Clavo de cabeza perdida 40mm",
    "Clavo de cabeza perdida 60mm",
    "Clavo para concreto 40mm",
    "Clavo de acero inoxidable 25mm",
    "Clavo de acabado 20mm",
    "Clavo de punta aguda 35mm",
    "Clavo de doble cabeza 50mm",
    "Clavo para techos 30mm",

  ]
  const [listaObjetos, setListaObjetos] = useState(lista)
  const [palabraBuscar, setPalabraBuscar] = useState("")


  const añadirElementos = (event) => {
    const input = event.target.value
    setPalabraBuscar(input)
  }

  // filtrar la lista, si el string del input que introducimos esta incluido en el string de la palabra que buscamos, metemos el elemento en la lista
  const listaPalabras = listaObjetos.filter((elemento) => {
    if (elemento.toLowerCase().includes(palabraBuscar.toLowerCase())) {
      return elemento
    }
  })

  // recorrer la lista para obtener un li por cada elemento que hemos obtenido
  const listaLi = listaPalabras.map((e) => <li>{e}</li>)

  return (
    <div className="App" >
      <form className='buscador' onSubmit={(e) => e.preventDefault()}>
        <h2>Introduce una palabra para buscar</h2>
        <input name="buscar" placeholder='Introduce para buscar un item' onChange={(event) => añadirElementos(event)}></input>
      </form>
      <div id="contendor-lista">
        <ul id="lista">{listaLi}</ul>
      </div>
    </div>
  );
}

export default App;
