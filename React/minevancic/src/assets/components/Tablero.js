import React from "react";
import { Button } from "reactstrap";

export default function Tablero(props) {
    // recorrer el tablero para mostrar segun la matriz que nos llega
    let tableroRecibido = props.posiciones
    let tablero =[]
  
    for (let i = 0; i < tableroRecibido.length; i++) {
        let fila = Array(tablero.length)
        for (let j = 0; j < tableroRecibido[i].length; j++) {
          fila.push(<Button></Button>)
        }
        tablero.push(fila)
        tablero.push(<br></br>)
    }


    

    return (
        <div id="tablero">
            {tablero}
        </div>
    )
}
