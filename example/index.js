/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
import React from 'react';
import ReactDOM from 'react-dom';

import FormBuilder from '../src';

import './style.less';

// Example of use of the component in an application
import form from './fixtures';

const Container = ({ children, onSubmit }) => (
    <div className="container-form">
        {children}

        <button onClick={onSubmit}>Custom submit form</button>
    </div>
);

const fieldContainer = ({ children, label }) => (
    <div className="form-control">
        {label}
        {children}
    </div>
);

const fieldGroupContainer = ({ children, label }) => (
    <div className="form-group">
        {label}
        {children}
    </div>
);

const formErrorContainer = ({ children }) => (
    <div className="error">
        {children}
    </div>
);

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
            formErrorContainer={formErrorContainer}
            onSubmit={onCustomSubmit}
            hasToSubmit={true}
            showSubmitButton={false}
            showFormErrorMessage={true}
        />,
        document.getElementById('content'),
    );
}

render(form);

const btnUpdateForm = document.getElementById('btnUpdateForm');

btnUpdateForm.addEventListener('click', () => {
    const currentForm = [...form];
    currentForm.push({
        id: 'url',
        name: 'url',
        type: 'url',
        className: 'class_name',
        required: true,
        placeholder: 'URL',
        onChange: (event) => {
            console.log(`URL: ${event.target.value}`);
        },
    });

    render(currentForm);
});
