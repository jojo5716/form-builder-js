/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
import React from 'react';
import ReactDOM from 'react-dom';

import FormBuilder from '../src';

import './style.less';

// Example of use of the component in an application
import form from './fixtures';

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
* Render form error message into a custom html block.
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
* Return all form data as json
*/
function onCustomSubmit(formData) {
    console.log(formData);
}

function render(formProps) {
    ReactDOM.render(
        <FormBuilder
            form={formProps}
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
        document.getElementById('content'),
    );
}

render(form);

const btnUpdateForm = document.getElementById('btnUpdateForm');

btnUpdateForm.addEventListener('click', () => {
    const currentForm = [...form];
    currentForm.push([{
        name: 'url',
        type: 'url',
        className: 'form-control',
        required: true,
        placeholder: 'URL',
        label: 'URL: ',
        onChange: (event) => {
            console.log(`URL: ${event.target.value}`);
        },
    }]);

    render(currentForm);
});
