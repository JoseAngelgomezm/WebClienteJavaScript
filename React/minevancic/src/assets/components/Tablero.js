import React from "react";
import { Button } from "reactstrap";

export default function Tablero(props) {
    // recorrer el tablero para mostrar segun la matriz que nos llega
    let tableroRecibido = props.posiciones
    let tablero =[]
    
    // recorrer el array del tablero que recibimos
    for (let i = 0; i < tableroRecibido.length; i++) {
        // crear un array de filas
        let fila = Array(tablero.length)
        // recorrer cada posicion del tablero quye recibimos
        for (let j = 0; j < tableroRecibido[i].length; j++) {
        // si la posicion del muñeco que me llega es por la que voy, pintar aqui el muñeco 
        if(props.pintar.fila === i && props.pintar.columna === j){
            fila.push(<Button>🤺</Button>)
        }else{
            fila.push(<Button>⬛</Button>)
        }
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
