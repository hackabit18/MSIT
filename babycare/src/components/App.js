import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../css/App.css';


class App extends Component {
  render() {
    return (
        <div>
        <div className="App">
          <p>hello </p>
          <p>
          <Link to="/Map" >Map</Link>
          </p>
        </div>





        </div>

    );
  }
}


export default App;
