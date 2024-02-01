import { useState } from 'react'
import logo from "./assets/react.svg"
import './App.css'
import React, { Component } from 'react';

function DesireList({ lista, handleClickBorrar }) {

  let listaProp = lista
  let listaLi = listaProp.map((elemento, indice) =>
    <li key={indice}>{elemento}
      <button onClick={() => handleClickBorrar(elemento)}>Borrar {elemento}
      </button>
    </li>)

  return (

    <ul>
      {listaLi}
    </ul>

  );
}

function Desire(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input type="text" placeholder="Escribe tu deseo" name="deseo"

      />
    </form>
  );
}


function App() {
  const [listaDeseos, setListaDeseos] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    let entradaDeseo = event.target.deseo.value

    if (entradaDeseo !== "" && !listaDeseos.includes(entradaDeseo)) {
      let copiaEstado = listaDeseos.slice()
      copiaEstado.push(entradaDeseo)
      setListaDeseos(copiaEstado)
    }

    event.target.deseo.value = ""
  }

  const handleClickBorrar = (elementoBorrar) => {
    let copiaEstado = listaDeseos.slice()
    let nuevoEstado = copiaEstado.filter((elemento) => elemento !== elementoBorrar)
    setListaDeseos(nuevoEstado)
  }

  return (
    <>
      <div className="App">
        <div>

          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Lista de deseos.
          </h2>
        </div>
        <div>
          <p><strong>Añade tu regalo favorito</strong></p>
          <DesireList handleClickBorrar={handleClickBorrar} lista={listaDeseos} />
          <Desire handleSubmit={handleSubmit}></Desire>
        </div>
      </div>
    </>
  )
}

export default App
