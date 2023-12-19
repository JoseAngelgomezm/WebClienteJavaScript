import { React } from 'react';
import { Button } from "reactstrap";

export default function Tablero(props) {
    let campo = props.campo;
    let tablero = new Array();

    // leer el campo que viene
    for (let i = 0; i < campo.length; i++) {
        let filaBotones = Array()
        for (let j = 0; j < campo[i].length; j++) {
            if (campo[i][j] === 0 && i === 0) {
                filaBotones.push(<Button onClick={props.meterFicha()} color='secondary'></Button>)
            }else{
                filaBotones.push(<Button color='secondary'></Button>)
            }
        }
        tablero.push(filaBotones)
        tablero.push(<br></br>)
    }

    return (
        <div class="tablero">{tablero}</div>
    )
}





