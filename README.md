# Component form builder #
[![Build Status](https://travis-ci.com/jojo5716/form-builder-js.svg?branch=master)](https://travis-ci.com/jojo5716/form-builder-js)

## Requirements ##

* Node version >= 6.2


## See a demo ##

[https://form-builder-js.surge.sh/](https://form-builder-js.surge.sh/)



## Usage ##
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import FormBuilder from 'form-builder-js';

const form = [
    {
        id: 'name',
        name: 'name',
        type: 'text',
        className: 'class_name',
        required: true,
        onChange: (event) => {
            console.log(event.target.value);
        },
    },
];
/**
* Render all form into a custom html block.
*/
const Container = ({ children, onSubmit }) => (
    <div className="container-form">
        {children}

        <button onClick={onSubmit}>Custom submit form</button>
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
* Render fields group into a custom html block.
*/
const fieldGroupContainer = ({ children, label }) => (
    <div className="form-group">
        {label}
        {children}
    </div>
);

/**
* Render form error message into a custom html block.
*/
const formErrorContainer = ({ children }) => (
    <div className="error">
        {children}
    </div>
);

/**
* Called on submit button.
* Return all form data as json
*/
function onCustomSubmit(formData) {
    console.log(formData);
}


ReactDOM.render(
 <FormBuilder
        form={formProps}
        container={Container}
        fieldContainer={fieldContainer}
        fieldGroupContainer={fieldGroupContainer}
        formErrorContainer={formErrorContainer}
        onSubmit={onCustomSubmit}
        hasToSubmit={true}
        showSubmitButton={false}
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
