import React, { Component } from 'react';
import logo from './assets/react.svg';
import { useState } from "react"
import './App.css';
import { useEffect } from 'react';



function User(props) {

  return (
    <li>
      {props.id} - {props.name} - {props.email}<button onClick={() => props.handleClickBorrar(props.id)}>Borrar {props.email}</button>
    </li>
  );
}


function UserList(props) {
  return (
    <ul>
      {props.users.map(u => {
        return (
          <User handleClickBorrar={props.handleClickBorrar}
            key={u.id}
            id={u.id}
            name={u.name}
            email={u.email}
          />
        );
      })
      }
    </ul>
  );
}

function UserForm(props) {
  return (
    <form onSubmit={props.onAddUser}>
      <input type="text" placeholder="Nombre" name="name" />
      <input type="email" placeholder="Email" name="email" />
      <input type="submit" value="Guardar" />
    </form>
  );
}


function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers([
      {id: 1, name: "perico", email: "perico@myfpschool.com"},
      {id: 2, name: "juanico", email: "juanico@myfpschool.com"},
      {id: 3, name: "andrés", email: "andrés@myfpschool.com"}
      ])
  }, [])


  const handleClickBorrar = (idUsuarioAborrar) => {
    let listaFiltrada = users.filter((usuario) => usuario.id !== idUsuarioAborrar)

    setUsers(listaFiltrada)
  }

  const onAddUser = (event) => {
    event.preventDefault()

    let listaEmail = users.map((usuario) => usuario.email)
    let nombreIntroducido = event.target.name.value
    let emailIntroducido = event.target.email.value

    let idIntroducido
    if(users.length == 0){
      idIntroducido = 1;
    }else{
      let idUltimoUser = users[users.length - 1].id

      idIntroducido = idUltimoUser + 1
    }

    if (!listaEmail.includes(emailIntroducido)) {
      
      const personaNueva = {
        id: idIntroducido,
        name: nombreIntroducido,
        email: emailIntroducido
      }

      let copiaEstado = users.slice()
      copiaEstado.push(personaNueva)
      setUsers(copiaEstado)
    }

  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Me mola Myfpschool</h2>
      </div>
      <div>
        <p><strong>Añade usuarios</strong></p>
        <UserList handleClickBorrar={handleClickBorrar} users={users}></UserList>
        <UserForm onAddUser={onAddUser}></UserForm>
      </div>
    </div>
  );
}
export default App;