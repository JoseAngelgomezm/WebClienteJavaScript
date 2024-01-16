import React from "reactstrap";
import { Outlet,Link } from "react-router-dom";
function App() {
  return (
    <div>
      <h1>ELEMENTO APP</h1>
      <nav>
        <Link to='/'>Home</Link>|{" "}
        <Link to='/Reservas'>Reservas</Link>|{" "}
        <Link to='/Administracion'>Administracion</Link>|{" "}
        <Link to='/Usuario'>Usuario</Link>|{" "}
      </nav>
      <Outlet/>
    </div>
  );
}

export default App;
