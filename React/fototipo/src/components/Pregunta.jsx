export default function Pregunta(props) {

    return (
        <>
        <h3>{props.pregunta}</h3>
        {props.arrayRespuestas.map((elemento, indice) => <button value={props.valores[indice]}>{elemento}</button>)}
        </>
    )
}