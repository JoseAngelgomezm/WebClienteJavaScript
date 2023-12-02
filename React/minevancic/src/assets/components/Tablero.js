import React from "react";
import { Button } from "reactstrap";

export default function Tablero(props) {

    let filas = props.filas
    let columnas = props.columnas


    let tablero = Array(filas);

    if (props.pintar.fila === 0 && props.pintar.columna === 9) {
       tablero = <div>Has Ganado</div>
    } else {
        for (let i = 0; i < tablero.length; i++) {
            tablero[i] = Array(columnas)
            for (let j = 0; j < tablero[i].length; j++) {
                if (props.pintar.fila === i && props.pintar.columna === j) {
                    tablero[i][j] = <Button color="primary"></Button>
                } else {
                    tablero[i][j] = <Button></Button>
                }
            }
            tablero[i].push(<br></br>)
        }
    }


    return (
        <div id="tablero">
            {tablero}
        </div>
    )
}
