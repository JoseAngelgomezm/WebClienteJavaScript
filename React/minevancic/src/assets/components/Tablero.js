import React from "react";
import BotonMinevancic from "./BotonMinevancic";
import {Row,Col} from 'reactstrap'


export default function Tablero(props) {
    let arrayFilas = Array(props.filas)
    let arrayColumnas = Array(props.columnas)

    // llenar el array de columnas de botones
    for(let i = 0; i<arrayColumnas.length; i++){
        arrayColumnas[i] = (<BotonMinevancic layout={props.layoutBoton} texto={props.textoBoton}/>)
    }

    // llenar el array de filas de array de columnas
    for(let i = 0; i<arrayFilas.length; i++){
        arrayFilas[i] = <Row><Col>{arrayColumnas}</Col></Row>
    }

    return (
        <div>
            {arrayFilas}
        </div>
    )
}