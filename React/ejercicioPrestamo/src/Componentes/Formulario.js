import React, {Component} from 'react';

export default class Formulario extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.hacerClick}>
                    <label for="cantidad">Cantidad</label>
                    <input type="text" name="cantidad"></input>
                    <br></br>
                    <br></br>
                    <label for="interes">Interes</label>
                    <input type="text" name="interes"></input>
                    <br></br>
                    <br></br>
                    <label for="años">Años</label>
                    <input type="num" name="años"></input>
                    <label for="meses">Meses</label>
                    <input type="num" max="12" name="meses"></input>
                    <br></br>
                    <br></br>
                    <button type="submit" name="enviar">Calcular</button>
                </form>
            </div>
        )
    }
}