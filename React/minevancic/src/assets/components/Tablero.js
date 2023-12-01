import React from "react";
import { Button } from "reactstrap";
import { Row, Col} from 'reactstrap';

export default function Tablero(props) {
    
    let filas = props.filas
    let columnas = props.columnas


    let tablero = Array(filas);

    for(let i = 0 ; i < tablero.length; i++){
        tablero[i] = Array(columnas);
        for(let j = 0; j < tablero.length; j++){
            tablero[i][j] = <Row><Col><Button></Button></Col></Row>
        }
    }

    return (
        <div id="tablero">
            {tablero}
        </div>
    )
}
