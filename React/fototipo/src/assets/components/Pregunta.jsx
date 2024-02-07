import { useState } from "react"

// este componente renderiaza la pregunta que le llega y el array de respuestas como botones
export default function Pregunta(props) {
    const [botonPulsado, setBotonPulsado] = useState()
    

    const botones = props.arrayRespuestas.map((elemento, indice) => {
        if (botonPulsado === props.valores[indice]) {
            return <button disabled key={indice}
                onClick={() => {
                    // cuando se pulsa, se establece el estado interno para desabilitarlo
                    // y marcar el que esta seleccionado, tambien envia los datos al app
                    // para que se quede con la puntuacion
                    setBotonPulsado(props.valores[indice]);
                    props.puntuacion(props.valores[indice])
                }}
                value={props.valores[indice]}>{elemento}</button>
        }else{
            return <button key={indice}
            onClick={() => {
                setBotonPulsado(props.valores[indice]);
                props.puntuacion(props.valores[indice], props.numeroPregunta)
            }}
            value={props.valores[indice]}>{elemento}</button>
        }
    })

    return (
        <>
            <h3>{props.pregunta}</h3>
            {botones}
        </>
    )
}