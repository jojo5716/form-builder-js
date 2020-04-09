/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
import React from 'react';
import ReactDOM from 'react-dom';

import FormBuilder from '../src';

import './style.less';

// Example of use of the component in an application
import { form, fields } from './fixtures';

/**
 * Render all fields into a custom html block.
 */
const Container = ({ children }) => (
    <div className="container-form">
        {children}

        {/* <button onClick={onSubmit}>Custom submit form</button> */}
    </div>
);

/**
 * Render group into a custom html block.
 */
const groupContainer = ({ children, title, content }) => (
    <div className="group-container">
        <fieldset>
            <legend>{title}</legend>
            <p>{content}</p>

            {children}

        </fieldset>
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
const fieldGroupContainer = ({ children, label, groupName }) => (
    <div className="form-group">
        <p>{groupName}</p>
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

function render(formProps, fieldsProps) {
    ReactDOM.render(
        <FormBuilder
            form={formProps}
            fields={fieldsProps}
            container={Container}
            groupContainer={groupContainer}
            fieldContainer={fieldContainer}
            fieldGroupContainer={fieldGroupContainer}
            labelContainer={labelContainer}
            formErrorContainer={formErrorContainer}
            onSuccess={onCustomSubmit}
            hasToSubmit={false}
            showSubmitButton={true}
            hasToShowLabel={true}
            showFormErrorMessage={true}
            setErrorOnChange={true}
        />,
        document.getElementById('content'),
    );
}

render(form, fields);

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

    render(form, currentForm);
});
