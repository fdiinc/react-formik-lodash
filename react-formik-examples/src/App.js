import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import NestedData from './NestedData.jsx';



function Index() {
  return <h2>Home</h2>;
}



function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/nestedData/">Using Forms with Nested Data</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/nestedData/" component={NestedData} />
      </div>
    </Router>
  );
}

export default App;

