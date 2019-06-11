import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import NestedData from './NestedData.jsx';
import ReactDOM from 'react-dom';
import ReactJson from 'react-json-view';
import { TextField,Checkbox } from 'formik-material-ui';

import {
    Formik, Form, Field, ErrorMessage, FieldArray, getIn
} from 'formik';



function Index() {
  return <h2>Home</h2>;
}


export const NestedExample = () => (
  <div>
    <h1>Social Profiles</h1>
    <Formik
      initialValues={{
        social: {
          facebook: '',
          twitter: '',
        },
      }}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    ><Form>
      <Field name="social.facebook" />
      <Field name="social.twitter" />
    <button type="submit">Submit</button>
    </Form>
    </Formik>
  </div>
);

function App(props) {
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

