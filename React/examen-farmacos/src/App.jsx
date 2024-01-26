import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Alert, Row, Col, UncontrolledAccordion, AccordionItem,
    AccordionHeader, AccordionBody, Input, Button, Modal, ModalHeader,
    ModalBody, ModalFooter, FormGroup, Label
} from 'reactstrap';
import { FARMACOS } from './componentes/datos';
const VentanaModalDiccionario = (props) => {
    const {
        className
    } = props;

    // hooks que guardan la lista de farmacos y el farmaco seleccionado
    const [listaFarmacos, setListaFarmacos] = useState(FARMACOS)
    const [listaFiltrada, setListaFiltrada] = useState(FARMACOS)
    const [farmacoSeleccionado, setFarmacoSeleccionado] = useState({
        codATC: "",
        descATC: "",
    })

    const handleChangeFiltro = (event) => {
        // COMPLETA ESTA FUNCION

        // si tecleo algo
        if (event.target.value !== "") {
            // filtrar la lista por lo que teclea el usuario
            let entradaUsuario = event.target.value
            let nuevaListaFiltrada = listaFarmacos.filter((elemento) => elemento.descATC.toLowerCase().includes(entradaUsuario.toLowerCase()))
            // montar la lista filtrada en el estado si no esta vacia
            if (nuevaListaFiltrada[0] !== undefined){
                setListaFiltrada(nuevaListaFiltrada)
                setFarmacoSeleccionado(nuevaListaFiltrada[0])
            }else{
                setListaFiltrada(FARMACOS)
            }   
        }else {
            setListaFiltrada(FARMACOS)
        }
    }

    const handleClickSelect = (event) => {
        // si el usuario selecciona uno, quedarnos con ese como elegido
        let farmacoUsuario = event.target.value;
        const arrayObjeto = farmacoUsuario.split("|")
        const elemento = {
            codATC: arrayObjeto[0],
            descATC: arrayObjeto[1],
        }
        setFarmacoSeleccionado(elemento)
    }


    return (
        <div>
            <Modal isOpen={props.mostrar} toggle={props.toggle}
                className={className}>
                <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
                <ModalBody>
                    <FormGroup row>
                        <Label sm={2} > Filtrar: </Label>
                        <Col sm={10}>
                            <Input
                                onChange={handleChangeFiltro}
                                id="filtro"
                                name="filtro"
                                type="Text" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Input
                                onClick={handleClickSelect}
                                id="selectMulti"
                                name="selectMulti"
                                type="select"
                            >
                                {listaFiltrada.map((elemento) => <option key={elemento.codATC}>{elemento.codATC}{"|"}{elemento.descATC}</option>)}
                            </Input>
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    {farmacoSeleccionado.codATC + "|" + farmacoSeleccionado.descATC}<Button color="primary" onClick={() => props.add(farmacoSeleccionado.codATC)}>{props.aceptar}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </ModalFooter>
            </Modal>
        </div >
    );
}
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            rxseleccionar: "",
            rxenmascarar: "",
            diccionario: "FÁRMACO",
            botonAdd: "",
        }
    }

    handleChange = (event) => {
    }

    limpiar(colorBoton) {
        // si el color del boton es azul
        if (colorBoton === "azul") {
            // limpiar lista rxseleccionar
            this.setState({ rxseleccionar: "" })
            // si es rojo limpiar la otra
        } else if (colorBoton === "rojo") {
            this.setState({ rxenmascarar: "" })
        }
    }

    add(datos) {
        // en el estado botonAdd tenemos desde que boton se abre la modal,
        // si se abre desde el azul, añadir el dato que recibimos a rxseleccionar
        if (this.state.botonAdd === "azul") {
            let copiaEstado = this.state.rxseleccionar
            console.log(datos)
            copiaEstado += datos + ","
            this.setState({ rxseleccionar: copiaEstado })

            // si se abre desde el rojo, añadir el dato a rxenmascarar
        } else if (this.state.botonAdd === "rojo") {
            let copiaEstado = this.state.rxenmascarar
            copiaEstado += datos + ","
            this.setState({ rxenmascarar: copiaEstado })
        }

        this.toggleModal();
    }

    setIsOpen(d) {
        if (d == undefined) return;
        this.setState({ isOpen: d })
    }

    toggleModal(colorBoton) {
        if (colorBoton === "rojo") {
            this.setState({ botonAdd: "rojo" })
        } else if (colorBoton === "azul") {
            this.setState({ botonAdd: "azul" })
        }
        this.setIsOpen(!this.state.isOpen);
    }


    render() {
        return (
            <>
                <div>
                    <UncontrolledAccordion
                        defaultOpen={[
                            '1'
                        ]}
                        stayOpen
                    >
                        <AccordionItem>
                            <AccordionHeader targetId="1">
                                GESTION DE FARMACOS
                            </AccordionHeader>
                            <AccordionBody accordionId="1">
                                <Row>
                                    <Col>
                                        <Alert color="info">
                                            Incluir X Medicamentos:
                                            <Input type="textarea" name="rxseleccionar" onChange={this.handleChange.bind(this)} value={this.state.rxseleccionar} />
                                            <Button onClick={() => { this.toggleModal("azul") }} color="info">Add</Button>{" "}
                                            <Button color="info" onClick={() => this.limpiar("azul")}>Clear</Button>
                                        </Alert>
                                    </Col>
                                    <Col>
                                        <Alert color="danger">
                                            Excluir X Medicamentos:
                                            <Input type="textarea" name="rxenmascarar"
                                                onChange={this.handleChange.bind(this)}
                                                value={this.state.rxenmascarar} />
                                            <Button
                                                onClick={() => { this.toggleModal("rojo") }} color="danger">Add</Button>
                                            {" "}<Button color="danger"
                                                onClick={() => this.limpiar("rojo")}>Clear</Button>
                                        </Alert>
                                    </Col>
                                </Row>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </div>
                <VentanaModalDiccionario diccionario={this.state.diccionario}
                    add={(datos) => this.add(datos)} mostrar={this.state.isOpen} aceptar=
                    {"Añadir"} toggle={() => this.toggleModal()} titulo={"Add" + this.state.diccionario} />
                <br />
            </>
        );
    }
}
class App extends Component {
    render() {
        return (
            <div className="App">
                <Filter />
            </div>
        );
    }
}
export default App;