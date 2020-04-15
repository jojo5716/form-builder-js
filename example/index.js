/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
import React from 'react';
import ReactDOM from 'react-dom';

import FormBuilder from '../src';

import './style.less';

// Example of use of the component in an application
// import { form, fields } from './fixtures';
import { form } from './fixtures';

const statusPost = [
    {
        name: 'status',
        element: 'input',
        required: true,
        value: 'private',
        type: 'radio',
        className: 'form-control',
        label: 'Private',
        fieldContainer: null,
        onChange: (event) => {
            console.log(`Status (Private): ${event.target.value}`);
        },
    },
    {
        name: 'status',
        element: 'input',
        value: 'public',
        type: 'radio',
        checked: true,
        className: 'form-control',
        label: 'Public',
        fieldContainer: null,
        onChange: (event) => {
            console.log(`Status (Public): ${event.target.value}`);
        },
    },
];
const tags = [
    {
        id: 'tags',
        element: 'input',
        type: 'checkbox',
        name: 'tag1',
        value: 'tag1',
        className: 'form-control',
        label: 'Tag 1',
        onChange: (event) => {
            console.log(`Tag: ${event.target.value}`);
        },
    },
    {
        id: 'tags',
        element: 'input',
        type: 'checkbox',
        name: 'tag2',
        checked: true,
        required: true,
        value: 'tag2',
        className: 'form-control',
        label: 'Tag 2',
        onChange: (event) => {
            console.log(`Tag: ${event.target.value}`);
        },
    },
];
const fields = [
    {
        id: 'name',
        element: 'input',
        name: 'name',
        value: 'JhonDoe',
        minLength: 4,
        type: 'text',
        className: 'form-control',
        required: true,
        placeholder: 'Name',
        onChange: (event) => {
            console.log(`Name: ${event.target.value}`);
        },
    },
    statusPost,
    tags,
];
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
const fieldContainer = ({ children, label, errorMessage }) => (
    <div className={`input-group ${errorMessage ? 'error' : ''}`}>
        {label}
        {children}
        <div className="error-message">{errorMessage}</div>
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
function onSuccess(formData) {
    console.log(formData);
}

/**
 * Called when submit form with errors
 * Return all fields elements with errors
 */
function onError(fieldsWithError) {
    console.log(fieldsWithError);
}

ReactDOM.render(
    <FormBuilder
        form={form}
        fields={fields}
        container={Container}
        groupContainer={groupContainer}
        fieldContainer={fieldContainer}
        fieldGroupContainer={fieldGroupContainer}
        labelContainer={labelContainer}
        formErrorContainer={formErrorContainer}
        onSuccess={onSuccess}
        onError={onError}
        hasToSubmit={false}
        showSubmitButton={true}
        hasToShowLabel={true}
        showFormErrorMessage={true}
        setErrorOnChange={true}
        showFieldsErrorsOnFailSubmit={true}
    />,
    document.getElementById('root'),
);
document.getElementById('fields_example').textContent = JSON.stringify(fields, undefined, 2);
