import { React } from 'react';
import { Button } from "reactstrap";

export default function Tablero(props) {
    let campo = props.campo;
    let tablero = [];

    // leer el campo que viene
    for (let i = 0; i < campo.length; i++) {
        let filaBotones = []
        for (let j = 0; j < campo[i].length; j++) {
            // solo poner la funcion meter ficha en los botones de la fila 0
            if (campo[i][j] === 0 && i === 0) {
                filaBotones.push(<Button outline onClick={() => props.meterFicha(i, j)}></Button>)
            }else if(campo[i][j] === 1 && i === 0){
                filaBotones.push(<Button color='primary' onClick={() => props.meterFicha(i, j)}></Button>)
            }else if(campo[i][j] === 2 && i === 0){
                filaBotones.push(<Button color='warning' onClick={() => props.meterFicha(i, j)}></Button>)
            }else if(campo[i][j] === 1 ){
                filaBotones.push(<Button color='primary'></Button>)
            }else if(campo[i][j] === 2){
                filaBotones.push(<Button color='warning'></Button>)
            }else{
                filaBotones.push(<Button outline></Button>)
            }
        }
        tablero.push(filaBotones)
        tablero.push(<br></br>)
    }

    return (
        <div class="tablero">{tablero}</div>
    )
}





