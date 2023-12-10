import React from "react";
import {Button} from "reactstrap";

export default function PanelMinas (props){ 
    return(
        <div>
            <p>Numero de minas</p>
            <p id="numMinas">1</p>
            <Button onClick={() => props.clickSubirMina()} >{"+"}</Button>
            <Button onClick={() => props.clickBajarMina()} >{"-"}</Button>
            <Button onClick={() => props.clickJugar()}>{"Jugar"}</Button>
        </div>
    )
}