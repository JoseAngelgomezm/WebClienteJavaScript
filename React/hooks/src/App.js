import React, { useContext } from "react";

// hook useState, usa estados en function components, necesitamos importarlos
import { useState } from "react";

// hook useEffect, se ejecuta cada vez que hay cambios en la web, tambien se ejecuta al incializar
// la aplicacion por primera vez
import { useEffect } from "react";

// hook createContext, se usa para pasar la informacion necesaria de un padre a un hijo concreto
import { createContext } from "react";

// variable llamada usercontext que es un hook createContext()
const UserContext=createContext()

function App() {
  // creacion de las variables de estado para el hook useState con sus setters
  // igualandolo al hook useState() a 0 siendo, este el valor incial
  const [contador, setContador] = useState(0)
  const [texto, setTexto] = useState("Alboran")

  // funcion que realiza el aumento de click
  const aumentarClick = () => {
    setContador(contador + 1)
  }

  // hook useEffect que actualiza el nombre del titulo de la web
  useEffect(() => {
    document.title = "hemos hecho click " + contador + " veces"
  })


  return (
    <div className="App" >
      <h1>TEORIA HOOKS</h1>
      {/* mostramos la variable contador*/}
      <h2>Has hecho click {contador} veces</h2>
      {/* añadimos un boton que aumentara en uno el contador con el setContador */}
      <button onClick={() => aumentarClick()}>¡Click!</button>
      {/* Renderizar el componente creado pasandole una prop de texto que es un estado useState*/}
      <Componente textoPasado={texto}></Componente>
      {/* Para ahorrarnos pasar por props toda la informacion creamos un userContext.provider */}
      <UserContext.Provider value={texto}>
        {/* Creamos el componente2 dentro , solo lo que hay aqui dentro obtendra la informacion del value */}
        <Componente textoPasado={texto}></Componente>
      </UserContext.Provider>
    </div>
  )
}

// creacion de un componente que contiene otro componente
const Componente = (props) => {
  return (
    <>
      <h2>{props.textoPasado}</h2>
      <Componente2 textoPasado2={props.textoPasado}></Componente2>
    </>
  )
}

// crecion de un componente
const Componente2 = (props) => {
  // creamos el contexto
  const contexto = useContext(UserContext)
  return (
    <>
      {/* usamos el contexto dentro del hijo */}
      <h2>{props.textoPasado2}{contexto}</h2>
    </>
  )
}

export default App;
