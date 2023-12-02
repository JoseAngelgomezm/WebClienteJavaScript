import React from "react";
import { Button } from "reactstrap";

export default function Tablero(props) {

    let columnas = props.columnas
    let tablero = Array(props.filas);

    // si la posicion es a la que hay que llegar para ganar
    if (props.pintar.fila === 0 && props.pintar.columna === 9) {
        tablero = <div>Has Ganado</div>
        // sino pintar el tablero
    } else {
        // recorrer el array tablero
        for (let i = 0; i < tablero.length; i++) {
            // añadir otro array a cada posicion
            tablero[i] = Array(columnas)
            // recorrer las posiciones del tablero
            for (let j = 0; j < tablero[i].length; j++) {
                // si la posicion es por la que voy pintarlo como primary
                if ((props.pintar.fila === i && props.pintar.columna === j)) {
                    tablero[i][j] = <Button color="primary">🤺</Button>
                } else {
                    tablero[i][j] = <Button>⬛</Button>
                }
            }
            // salto de linea para mostrar el tablero
            tablero[i].push(<br></br>)
        }
    }


console.log(props.minas)

    return (
        <div id="tablero">
            {tablero}
        </div>
    )
}
