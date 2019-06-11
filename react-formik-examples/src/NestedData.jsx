/* eslint-env browser */

import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ReactJson from 'react-json-view';
import { TextField } from 'formik-material-ui';

import {
    Formik, Form, Field, getIn
} from 'formik';

import merge from 'deepmerge';

import { FormikConsumer } from 'formik';

// From: https://github.com/jaredpalmer/formik/issues/1144
function useFormik() {
    return useContext(FormikConsumer._context);
}


let testData = {
    "meta" : {
        "view" : {
            "id" : "bi63-dtpu",
            "name" : "NCHS Example Data United States",
            "category" : "NCHS",
            "columns" : [
                {
                    "id" : -1,
                    "name" : "sid",
                    "fieldName" : ":sid",
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


// Data from:
// https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013

function Item({name, index, item}) {

    const basePath = [name, index,'name'];
    const path = basePath.join('.');

    return <div>{path}:  <Field key={path} name={path} component={TextField}/></div>;
}

function Items({name}) {
    console.log('Items');
    const {values} = useFormik();
    console.log(values);
    
    let items = getIn(values, name);
    return items.map((item, index) => <Item name={name} item={item} index={index}/>);

}



//let overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;


//let newData = merge({}, data, options);


class NestedData extends React.Component {

    state = {
        data: testData
    };

    /* configure deepmerge to overwrite source Arrays with the Destination Arrays */
    overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;
    
    updateState = (values, funcs) => {
        let options = { arrayMerge: this.overwriteMerge };
        
        let newData = merge(this.state.data, values, options);
        this.setState({ data:newData}, () => {
            console.log('UpdateState');
            console.log(newData);
            console.log(this.state.data);
            funcs.setSubmitting(false);
        });
    }

    render = () => {
        
        var columnPath = 'meta.view.columns';

        var fieldNum = 0;
 
        return (
            <Paper>
              <Formik initialValues={this.state.data}
                      onSubmit={(values, funcs) => {
                          this.updateState(values, funcs);

                      }}
                
              >
                <table>
                  <tbody>
                  <tr>
                    <td>
                      <Form >
                        ID: <Field name='meta.view.id' component={TextField} fullWidth={true}/>
                        Name: <Field name='meta.view.name' key={fieldNum++} component={TextField} fullWidth={true}/>
                        Category: <Field name='meta.view.category'  key={fieldNum++} component={TextField} fullWidth={true}/>
                        Licence ID: <Field name='meta.view.licenseId'  key={fieldNum++}  component={TextField} fullWidth={true}/>
                        New Field:  <Field name='meta.view.newField'  key={fieldNum++}  component={TextField} fullWidth={true}/>
                        <div>
                          <Items key={fieldNum++} name={columnPath} />
                        </div>
                        <hr/>
                        <Button variant="contained"  color="primary" type="submit">Update</Button>
                        <hr/>
                        <ReactJson src={this.state.data} name={false}/>
                      </Form>
                    </td>
            </tr>
            </tbody>
                </table>
              </Formik>
            </Paper>);
    };

};



export default NestedData;
