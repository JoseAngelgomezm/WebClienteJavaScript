import React from "react";
import {Button} from "reactstrap";

export default function BotonesDireccion(){
    return(
        <>
        <div id="arriba">
          <Button>{"⬆️"}</Button>
        </div>
        <div id="central">
          <Button>{"⬅️"}</Button>
          <Button>{"➡️"}</Button>
        </div>
        <div id="abajo">
          <Button>{"⬇️"}</Button>
        </div>
      </>
    )
}