import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css'
import BotonesMovimiento from './assets/components/BotonesMovimiento.js'
import Tablero from './assets/components/Tablero.js'
import PanelMinas from './assets/components/PanelMinas.js'
// crear el class component App 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filas: 4,
      columnas: 4,
      numeroMinas:1,
    }
  }

  subirMinas = () =>{
     let parrafoMinas = document.getElementById("numMinas");
     let numeroMinas = parrafoMinas.innerHTML;
      if(numeroMinas < 20){
        numeroMinas++;
      }
     parrafoMinas.innerHTML = numeroMinas;
  }
  
  bajarMinas = () =>{
    let parrafoMinas = document.getElementById("numMinas");
     let numeroMinas = parrafoMinas.innerHTML;
    if(numeroMinas > 1){
      numeroMinas--;
    }
     parrafoMinas.innerHTML = numeroMinas;
  }

  jugar(){
    let numeroMinasHTML = document.getElementById("numMinas").innerHTML;
    this.setState({numeroMinas:numeroMinasHTML})
  }



  render() {
    return (
      <>

        <PanelMinas clickSubirMina={()=>this.subirMinas()} clickBajarMina={() => this.bajarMinas()} clickJugar={() => this.jugar()}></PanelMinas>
        <Tablero numeroMinas={this.state.numeroMinas} columnas={this.state.columnas} filas={this.state.filas}/>
        <BotonesMovimiento/>
      </>

    )
  }
}

export default App;