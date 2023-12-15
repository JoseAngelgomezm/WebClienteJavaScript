import React, { Component } from 'react';
import Formulario from './Componentes/Formulario.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalAPagar: 0,
    }
  }

  handlerOnClick(eventoSubmit) {
    eventoSubmit.preventDefault()
    let cantidad = eventoSubmit.target.cantidad.value
    let interes = eventoSubmit.target.interes.value
    let años = eventoSubmit.target.años.value
    let meses = eventoSubmit.target.meses.value

    let tiempo = años * 12 + meses
    
    let cuotaFinal = (cantidad*(Math.pow(1+interes),tiempo)* interes) / ((Math.pow(1+ interes),tiempo)-1) / tiempo
    
    let estadoCopia = this.state
    estadoCopia.totalAPagar = cuotaFinal
    this.setState(estadoCopia)
  }

  render() {
    return (
      <>
        <div className="App" >
          <Formulario hacerClick={(eventoSubmit) => this.handlerOnClick(eventoSubmit)}></Formulario>
        </div>
        <div>
          <p>Su cuota mensual sera de: {this.state.totalAPagar}€</p>
        </div>
      </>
    );
  }

}

export default App;
