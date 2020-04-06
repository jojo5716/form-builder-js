# Component form builder #
[![Build Status](https://travis-ci.com/jojo5716/form-builder-js.svg?branch=master)](https://travis-ci.com/jojo5716/form-builder-js)
[![npm version](https://badge.fury.io/js/js-form-builder.svg)](https://badge.fury.io/js/js-form-builder)
[![GitHub issues](https://img.shields.io/github/issues/jojo5716/form-builder-js)](https://github.com/jojo5716/form-builder-js/issues)
[![Downloads](https://img.shields.io/npm/dm/js-form-builder.svg?style=flat)](https://www.npmjs.com/package/js-form-builder)

## Requirements ##


* Node version >= 6.2


## See a demo ##

[https://form-builder-js.surge.sh/](https://form-builder-js.surge.sh/)


## Props ##
|       Prop name      | Required |  Default value |                                                                         Description                                                                        |
|:--------------------:|:--------:|:--------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|
|        fields        |     -    |       []       |                                                               List of all fields for the form                                                              |
|         form         |     -    |       {}       |                                                Form configuration to submit fields (Action, Method, etc...)                                                |
|       container      |     -    |      null      |                                                               Wrapper container for all form                                                               |
|  fieldGroupContainer |     -    |      null      |                                      Wrapper to group of fields Each block of field will renderen into this container                                      |
|    fieldContainer    |     -    |      null      |                                                                   Wrapper for each field.                                                                  |
|  formErrorContainer  |     -    |      null      |                                                               Wrapper for form error message                                                               |
|      hasToSubmit     |     -    |      true      | If submit button should submit form. If this prop is false on submit button just will return a json with all fields values. (Only if all fields are valid) |
|   showSubmitButton   |     -    |      true      |                                                          If form has to render a button to submit.                                                         |
| showFormErrorMessage |     -    |      true      |                                                   If form has to render a error message on click submit.                                                   |
|       onSuccess      |     -    | Empty function |                                                       Called on click submit and all fields are valid                                                      |
|                      |          |                |                                                                                                                                                            |
|                      |          |                |                                                                                                                                                            |
|                      |          |                |                                                                                                                                                            |


## Fields Props ##
* Each field supports its html properties in addition to some additional ones such as:
 
 |    Prop name   | Required | Default value |             Description             |
|:--------------:|:--------:|:-------------:|:-----------------------------------:|
|    onChange    |     -    | Empty funcion |  Return field value on change value |
| fieldContainer |     -    |      null     | Wrapp field into a custom container |

## Usage ##
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import FormBuilder from 'js-form-builder';


const displayOnChangeFieldValue = (event) => {
    console.log(event.target.value);
};

const form = [
    {
        id: 'name',
        name: 'name',
        type: 'text',
        className: 'class_name',
        required: true,
        onChange: displayOnChangeFieldValue,
    }, {
        id: 'lastName',
        name: 'lastName',
        type: 'text',
        className: 'class_name',
        required: true,
        onChange: displayOnChangeFieldValue,
    },
];
/**
* Render form into a custom html block.
*/
const Container = ({ children, onSubmit }) => (
    <div className="container-form">
        {children}

        <button onClick={onSubmit}>Custom submit form</button>
    </div>
);

/**
* Render fields group into a custom html block.
*/
const fieldGroupContainer = ({ children, label }) => (
    <div className="form-group">
        {label}
        {children}
    </div>
);

/**
* Render field into a custom html block.
*/
const fieldContainer = ({ children, label }) => (
    <div className="form-control">
        {label}
        {children}
    </div>
);


/**
* Render label field into a custom html block.
*/
const labelContainer = ({ children }) => (
    <label className="label">
        {children}
    </label>
);

/**
* Render fields error message into a custom html block.
*/
const formErrorContainer = ({ children }) => (
    <div className="error">
        {children}
    </div>
);

/**
* Called on submit button.
* Return all fields data as json
*/
function onCustomSubmit(formData) {
    console.log(formData);
}


ReactDOM.render(
 <FormBuilder
        form={form}
        container={Container}
        fieldContainer={fieldContainer}
        fieldGroupContainer={fieldGroupContainer}
        labelContainer={labelContainer}
        formErrorContainer={formErrorContainer}
        onSubmit={onCustomSubmit}
        hasToSubmit={true}
        showSubmitButton={false}
        hasToShowLabel={true}
        showFormErrorMessage={true}
    />,
    document.getElementById('form'),
);

```

## How to collaborate ##


* Clone the project git clone https://github.com/jojo5716/form-builder-js

```
cd form-builder-js/
```
* Install dependencies

```
npm ci
```

* Start the development. This will command will start the development server builds, automatic testing and linting.

```
npm start
```
* Open ```http://localhost:8080/``` in a browser.
