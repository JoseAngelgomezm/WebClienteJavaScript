import { useState } from "react"

// este componente renderiaza la pregunta que le llega y el array de respuestas como botones
export default function Pregunta(props) {
    const [botonPulsado, setBotonPulsado] = useState()

    const botones = props.arrayRespuestas.map((elemento, indice) => {
        return <button key={indice}
            onClick={() => {
                setBotonPulsado(props.valores[indice]);
                props.enviarDatos(props.valores[indice]);
            }}
            value={props.valores[indice]}>{elemento}</button>

    })

    return (
        <>
            <h3>{props.pregunta}</h3>
            {botones}
        </>
    )
}