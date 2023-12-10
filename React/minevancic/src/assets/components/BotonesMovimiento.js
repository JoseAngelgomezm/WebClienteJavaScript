import React from "react";
import {Button} from "reactstrap";

export default function BotonesDireccion(props){
    return(
        <>
        <div id="arriba">
          <Button onClick={() => props.arriba()}>{"⬆️"}</Button>
        </div>
        <div id="central">
          <Button onClick={() => props.izquierda()}>{"⬅️"}</Button>
          <Button onClick={() => props.derecha()}>{"➡️"}</Button>
        </div>
        <div id="abajo">
          <Button onClick={() => props.abajo()}>{"⬇️"}</Button>
        </div>
      </>
    )
}