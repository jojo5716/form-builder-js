/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
import React from 'react';
import ReactDOM from 'react-dom';

import FormBuilder from '../src';

import './style.less';

// Example of use of the component in an application
import fields from './fixtures';

/**
* Render all fields into a custom html block.
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
    <div className="input-group">
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
* Render fields error message into a custom html block.
*/
const formErrorContainer = ({ children }) => (
    <div className="error">
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
* Called on submit button.
* Return all fields data as json
*/
function onCustomSubmit(formData) {
    console.log(formData);
}

function render(fieldsProps) {
    ReactDOM.render(
        <FormBuilder
            fields={fieldsProps}
            container={Container}
            fieldContainer={fieldContainer}
            fieldGroupContainer={fieldGroupContainer}
            labelContainer={labelContainer}
            formErrorContainer={formErrorContainer}
            onSuccess={onCustomSubmit}
            hasToSubmit={true}
            showSubmitButton={false}
            hasToShowLabel={true}
            showFormErrorMessage={true}
        />,
        document.getElementById('content'),
    );
}

render(fields);

const btnUpdateForm = document.getElementById('btnUpdateForm');

btnUpdateForm.addEventListener('click', () => {
    const currentForm = [...fields];
    currentForm.push([{
        name: 'url',
        type: 'url',
        className: 'fields-control',
        required: true,
        placeholder: 'URL',
        label: 'URL: ',
        onChange: (event) => {
            console.log(`URL: ${event.target.value}`);
        },
    }]);

    render(currentForm);
});
