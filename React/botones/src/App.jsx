import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'reactstrap';


class App extends React.Component{
    render() {
        return (
            <div className="App">
                {' '}
                <Button color="success">
                    Inglés
                </Button>
                {' '}
                <Button color="primary">
                    Aleman
                </Button>
                {' '}
                <Button>
                    Sueco
                </Button>
                {' '}
                <Button color="danger">
                    Español
                </Button>

            </div>
        );
    }
}

export default App;