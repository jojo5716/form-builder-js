import React from 'react';

const customEmailContainer = ({ children }) => (
    <div className="input-group mb-3">
        {children}
        <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">@example.com</span>
        </div>
    </div>
);

const fields = [
    [
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
        {
            id: 'last_name',
            element: 'input',
            name: 'lastName',
            minLength: 3,
            type: 'text',
            className: 'form-control',
            required: true,
            placeholder: 'Last name',
            onChange: (event) => {
                console.log(`Last name: ${event.target.value}`);
            },
        },
    ],
    [
        {
            id: 'mobile',
            element: 'input',
            name: 'mobile',
            type: 'number',
            className: 'form-control',
            required: true,
            placeholder: 'Mobile',
            onChange: (event) => {
                console.log(`Mobile: ${event.target.value}`);
            },
        },
        {
            id: 'email',
            element: 'input',
            name: 'email',
            type: 'email',
            className: 'form-control',
            required: true,
            placeholder: 'Email',
            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
            fieldContainer: customEmailContainer,
            onChange: (event) => {
                console.log(`Email: ${event.target.value}`);
            },
        },
        {
            id: 'birthday',
            element: 'input',
            name: 'birthday',
            type: 'date',
            className: 'form-control',
            placeholder: 'Birthday',
            label: 'BIrthday label',
            onChange: (event) => {
                console.log(`Birthday: ${event.target.value}`);
            },
        },
    ],
    [
        {
            name: 'gender',
            element: 'input',
            value: 'female',
            checked: false,
            type: 'radio',
            className: 'form-control',
            // required: true,
            label: 'Female',
            fieldContainer: null,
            onChange: (event) => {
                console.log(`Gender female: ${event.target.value}`);
            },
        },
        {
            name: 'gender',
            element: 'input',
            value: 'male',
            checked: true,
            type: 'radio',
            className: 'form-control',
            // required: true,
            label: 'Male',
            fieldContainer: null,
            onChange: (event) => {
                console.log(`Gender male: ${event.target.value}`);
            },
        },
    ],
];

export default fields;
