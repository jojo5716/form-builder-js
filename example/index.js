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

function onCustomSubmit(formData) {
    console.log(formData);
}

ReactDOM.render(
    <FormBuilder
        form={form}
        container={Container}
        fieldContainer={fieldContainer}
        fieldGroupContainer={fieldGroupContainer}
        onSubmit={onCustomSubmit}
        hasToSubmit={true}
        showSubmitButton={false}
    />,
    document.getElementById('content'),
);
