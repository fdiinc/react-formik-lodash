/* eslint-env browser */

import React from 'react';
import Button from '@material-ui/core/Button';
import produce from "immer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import ReactJson from 'react-json-view';
import { TextField,Checkbox } from 'formik-material-ui';

import {
    Formik, Form, Field, ErrorMessage, FieldArray, getIn
} from 'formik';


import _ from 'lodash';
import  FlattenJS from 'flattenjs';


import data from './data.json';



let testData = {
  "meta" : {
    "view" : {
      "id" : "bi63-dtpu",
      "name" : "NCHS - Leading Causes of Death: United States",
      "category" : "NCHS",
      "createdAt" : 1449080633,
      "viewType" : "tabular",
      "columns" : [ {
        "id" : -1,
        "name" : "sid",
        "dataTypeName" : "meta_data",
        "fieldName" : ":sid",
        "position" : 0,
        "renderTypeName" : "meta_data",
        "format" : { },
        "flags" : [ "hidden" ]
      }, {
        "id" : -1,
        "name" : "id",
        "dataTypeName" : "meta_data",
        "fieldName" : ":id",
        "position" : 0,
        "renderTypeName" : "meta_data",
        "format" : { },
        "flags" : [ "hidden" ]
      }
		  ]
    }
  }
};

const merge = require('deepmerge');
// Data from:
// https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013

function Item({name, index, item}) {

    const basePath = [name, index,'name'];
    const path = basePath.join('.');

    return <div>{path}:  <Field name={path} component={TextField}/></div>;
}

let overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;
 
let options = { arrayMerge: overwriteMerge };


//let newData = merge({}, data, options);


class NestedData extends React.Component {

    state = {
        data: testData
    };


      overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;
 
    updateState = (values, funcs) => {
        console.log('Input values');
        console.log(values);
    let options = { arrayMerge: this.overwriteMerge };
    let newData = produce(this.state.data, draft => 
                       {
                         draft = merge(draft,values, options);
                         return draft;
                       }
                      );
      
        this.setState({ data:newData}, () => {
        console.log('UpdateState');
                console.log(newData);
        console.log(this.state.data);
        funcs.setSubmitting(false);
    });
   }


    render = () => {
    
    var columnPath = 'meta.view.columns';
    var columns = getIn(testData, columnPath);
    console.log(columns);
    var fieldNum = 0;
    console.log('ReRender');
        return (
            <Formik initialValues={this.state.data}
                    onSubmit={(values, funcs) => {
                    // same shape as initial values
                    console.log('xyzzy');
                        console.log(values);
                        console.log(funcs);
                        this.updateState(values, funcs);

      }}
              
      >
        <Form >          <Field name='meta.view.id' component={TextField} fullWidth={true}/>
          <Field name='meta.view.name' key={fieldNum++} component={TextField} fullWidth={true}/>
          <Field name='meta.view.category'  key={fieldNum++} component={TextField} fullWidth={true}/>
          <Field name='meta.view.licenseId'  key={fieldNum++}  component={TextField} fullWidth={true}/>
          <div>
            {
                columns.map((item, index) => <Item name={columnPath} item={item} index={index}/>)
          }
          </div>
          <Field name='meta.view.licenseId'  key={fieldNum++} component={TextField} fullWidth={true}/>
          <hr/>
          <Button type="submit">Submit</Button>
          <ReactJson src={this.state.data} name={false}/>
        </Form>
      </Formik>);
    };

};


                  
export default NestedData;
