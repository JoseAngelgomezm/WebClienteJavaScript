import { useState } from "react"


export default function Pregunta(props) {
    const [botonPulsado, setBotonPulsado] = useState()
    

    const botones = props.arrayRespuestas.map((elemento, indice) => {
        if (botonPulsado === props.valores[indice]) {
            return <button disabled key={indice}
                onClick={() => {
                    setBotonPulsado(props.valores[indice]);
                    props.puntuacion(props.valores[indice])
                }}
                value={props.valores[indice]}>{elemento}</button>
        }else{
            return <button key={indice}
            onClick={() => {
                setBotonPulsado(props.valores[indice]);
                props.puntuacion(props.valores[indice])
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