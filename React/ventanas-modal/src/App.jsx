import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Alert, Row, Col, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label
} from 'reactstrap';

const VentanaModalDiccionario = (props) => {
  const [medicamentos, setMedicamentos] = useState(["CODIGO1|DESCRIPCION1", "CODIGO2|DESCRIPCION2", "CODIGO3|DESCRIPCION3", "CODIGO4|DESCRIPCION4", "CODIGO5|DESCRIPCION5"])
  const [elegido, setElegido] = useState()

  const handleChangeFilter = (event) => {
    // COMPLETA ESTA FUNCION
    let textoInsertado = event.target.value
    if (textoInsertado !== "") {
      console.log(textoInsertado)
      let filtrados = medicamentos.filter((elemento) => elemento.toLowerCase().includes(textoInsertado.toLowerCase()) )
      console.log(filtrados)
      setElegido(filtrados)
    }

  }

  const handleChangeSelect = (event) => {
    let farmacoElegido = event.target.value
    setElegido(farmacoElegido)
  }


  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} onEntering={"//ESTO SE EJECUTA CUANDO MUESTRAS LA VENTANA"}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label sm={2} > Filtrar: </Label>
            <Col sm={10}>
              <Input onChange={handleChangeFilter}
                id="filtro"
                name="filtro"
                type="Text" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input onChange={handleChangeSelect}
                id="selectMulti"
                name="selectMulti"
                type="select"
              >
                {medicamentos.map((elemento, indice) => <option key={indice} >{elemento}</option>)}
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {elegido}<Button color="primary" onClick={() => props.add(elegido)}>{props.aceptar}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div>
  );
}


class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      listaElegidosAzul:[],
      listaElegidosRojo:[],
      botonPulsado: "",
    }
  }

 

  toggleModal(colorBoton) {
    if(colorBoton === "rojo"){
      this.setState({botonPulsado:"rojo"})
    }else{
      this.setState({botonPulsado:"azul"})
    }
    this.setState({ isOpen: !this.state.isOpen })
  }

  limpiar(colorBoton){
   if(colorBoton === "rojo"){
    let lista = []
    this.setState({listaElegidosRojo:lista})

   }else{
    let lista = []
    this.setState({listaElegidosAzul:lista})
   }
  }

  add(datos) {
    //aqui hacer algo con los datos
    if(datos !== ""){
      if(this.state.botonPulsado === "rojo"){
        let copiaEstado = this.state.listaElegidosRojo.slice()
        copiaEstado.push(datos)
        this.setState({listaElegidosRojo:copiaEstado})
      }else{
        let copiaEstado = this.state.listaElegidosAzul.slice()
        copiaEstado.push(datos)
        this.setState({listaElegidosAzul:copiaEstado})
      }
    }
   
    this.toggleModal();
  }

  render() {
    return <>
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
                    <Input type="textarea" name="rxseleccionar" value={this.state.listaElegidosAzul}/>
                    <Button color="info" onClick={() => { this.toggleModal("azul") }}>Add</Button>
                    {" "}<Button color="info" onClick={() => this.limpiar("azul")}>Clear</Button>
                  </Alert>
                </Col>
                <Col>
                  <Alert color="danger">
                    Excluir X Medicamentos:
                    <Input type="textarea" name="rxenmascarar"  value={this.state.listaElegidosRojo}/>
                    <Button color="danger" onClick={() => { this.toggleModal("rojo") }}>Add</Button>
                    {" "}<Button color="danger" onClick={() => this.limpiar("rojo")}>Clear</Button>
                  </Alert>
                </Col>
              </Row>
            </AccordionBody>
          </AccordionItem>
        </UncontrolledAccordion>
      </div>
      <VentanaModalDiccionario
        add={(datos) => this.add(datos)}
        mostrar={this.state.isOpen}
        aceptar={"Añadir"}
        titulo={"VENTANA MODAL"}
      />
      <br />
    </>
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