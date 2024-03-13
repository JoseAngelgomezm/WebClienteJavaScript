import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { create, all } from 'mathjs'
import { PISOS, PRECIOS } from './pisos.js'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

function Formulario ({ establecerDatos }) {
  const ANIO_MAX = (new Date()).getFullYear()

  const enviar = (e) => {
    e.preventDefault()
    const form = e.target
    const vistas = form.vistas.checked ? 1 : 0
    const garaje = form.garaje.checked ? 1 : 0
    const trastero = form.trastero.checked ? 1 : 0
    const piscina = form.piscina.checked ? 1 : 0
    const datos = [form.metros.value, form.habitaciones.value, form.banios.value, vistas, garaje, trastero, form.anio.value, form.estado.value, piscina]
    establecerDatos(datos)
  }

  return (
    <div className="formulario">
      <h2>Introduce los datos de una vivienda para estimar su precio</h2>
      <Form onSubmit={ enviar }>
        <FormGroup>
          <Label for='metros'>
            Metros
          </Label>
          <Input
            id='metros'
            name='metros'
            placeholder='Introduce metros cuadrados'
            type="number"
            min={ 1 }
            required
          />
        </FormGroup >
        <FormGroup>
          <Label for='habitaciones'>
            Habitaciones
          </Label>
          <Input
            id='habitaciones'
            name='habitaciones'
            placeholder='Introduce numero de habitaciones'
            type="number"
            min={ 1 }
            required
          />
        </FormGroup >
        <FormGroup>
          <Label for='banios'>
            Baños
          </Label>
          <Input
            id='banios'
            name='banios'
            placeholder='Introduce numero de baños'
            type="number"
            min={ 1 }
            required
          />
        </FormGroup >
        <FormGroup>
          <Label for='anio'>
            Año de construcción
          </Label>
          <Input
            id='anio'
            name='anio'
            placeholder='Introduce los años que tiene la vivienda'
            type="number"
            max={ ANIO_MAX }
            min={ 1900 }
            required
          />
        </FormGroup >
        <FormGroup>
          <Label for='estado'>
            Estado de la vivienda de 1(malo) a 5(bueno)
          </Label>
          <Input
            id='estado'
            name='estado'
            placeholder='Introduce el estado en el que se encuentra la vivienda'
            type="number"
            min={ 1 }
            max={ 5 }
            required
          />
        </FormGroup >
        <FormGroup>
          <Label for='piscina'>
            ¿Tiene piscina?
          </Label>
          <Input
            id='piscina'
            name='piscina'
            type="checkbox"
          />
        </FormGroup >
        <FormGroup>
          <Label for='vistas'>
            ¿Vistas al mar?
          </Label>
          <Input
            id='vistas'
            name='vistas'
            type="checkbox"
          />
        </FormGroup >
        <FormGroup>
          <Label for='garaje'>
            ¿Garaje?
          </Label>
          <Input
            id='garaje'
            name='garaje'
            type="checkbox"
          />
        </FormGroup >
        <FormGroup>
          <Label for='trastero'>
            ¿Trastero?
          </Label>
          <Input
            id='trastero'
            name='trastero'
            type="checkbox"
          />
        </FormGroup >
        <Button color='primary' >Calcular</Button>
      </Form>

    </div>
  )
}

function Ventana ({ modal, precio, toggle }) {
  return (
    <div>
      <Modal isOpen={ modal } toggle={ toggle }>
        <ModalHeader toggle={ toggle }>Resultado</ModalHeader>
        <ModalBody>
          El precio aproximado de tu vivienda es de { precio } €
        </ModalBody>
      </Modal>
    </div>
  )
}

function App() {
  const [vector, setVector] = useState()
  const [math] = useState(create(all, {}))
  const [datosUsuario, setDatosUsuario] = useState([])
  const [precio, setPrecio] = useState()
  const [modal, setModal] = useState(false)

  // Calculo el vector de regresión multivariable
  useEffect(() => {
    // Convierto mis datos en matrices que pueda tratar
    const MATRIZ_PISOS = math.matrix(PISOS)
    const MATRIZ_PRECIOS = math.matrix(PRECIOS)

    // Aplico la fórmula de la normal para calcular el vector de regresión lineal
    const VECTOR = math.multiply(math.multiply(math.inv(math.multiply(math.transpose(MATRIZ_PISOS), MATRIZ_PISOS)), math.transpose(MATRIZ_PISOS)), MATRIZ_PRECIOS)
    // Me quedo solo con los datos de la matriz
    setVector(VECTOR._data)
  }, [math])

  useEffect(() => {
    if (vector) {
      let resultado = 0
      vector.map((valor, indice) => {
        resultado += valor * datosUsuario[indice]
        return valor
      })
      // Aproximo a las centésimas
      resultado = Math.floor(resultado * 100) / 100
      setPrecio(resultado)
    }
  }, [datosUsuario, vector])

  useEffect(() => {
    if (!isNaN(precio)) {
      setModal(true)
    }
  }, [precio])

  function establecerDatos(datos) {
    setDatosUsuario(datos)
    setModal(true)
  }

  function toggle() {
    setModal(!modal)
  }

  return (
    <div className="App">
      <Formulario establecerDatos={establecerDatos} />
      {modal && <Ventana modal={modal} precio={precio} toggle={toggle} />}
    </div>
  )
}

export default App
