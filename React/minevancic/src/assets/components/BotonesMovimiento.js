import React from "react";
import { Button } from "reactstrap";

export default function BotonesDireccion(props) {
  return (
    <>
      <div>
        <Button onClick={() => props.arriba()}>{"⬆️"}</Button>
      </div>
      <div>
        <Button onClick={() => props.izquierda()}>{"⬅️"}</Button>
        <Button onClick={() => props.derecha()}>{"➡️"}</Button>
      </div>
      <div>
        <Button onClick={() => props.abajo()}>{"⬇️"}</Button>
      </div>
    </>
  )
}