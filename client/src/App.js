import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CounterPage from './counter/counter-page';


function App() {
  return (
    <Router>
      <div className="App">
        <Header>
          <Link to="/">Home</Link>
        </Header>
      <div>
      <Route exact path="/" component={CounterPage}/>

      </div>
      </div>
      </Router>
   
  );
}

export default App;
