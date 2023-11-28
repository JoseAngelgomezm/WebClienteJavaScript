import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {BotonMinevancic} from 'assets/components/BotonMinevancic.js';


// crear el class component App 
class App extends React.Component {
  constructor(props) {
    super(props);
    
  }



  render() {
    return (
      <div>
        <botonMinevancic texto={"b1"}></botonMinevancic>
      </div>
    )
  }
}

export default App;