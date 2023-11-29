import React from "react";
import BotonMinevancic from "./BotonMinevancic";

export default function BotonesDireccion(){
    return(
        <>
        <div id="arriba">
          <BotonMinevancic texto={"⬆️"}></BotonMinevancic>
        </div>
        <div id="central">
          <BotonMinevancic texto={"⬅️"}></BotonMinevancic>
          <BotonMinevancic texto={"➡️"}></BotonMinevancic>
        </div>
        <div id="abajo">
          <BotonMinevancic texto={"⬇️"}></BotonMinevancic>
        </div>
      </>
    )
}