import React from 'react';

const customEmailContainer = ({ children }) => (
    <div className="input-group mb-3">
        {children}
        <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">@example.com</span>
        </div>
    </div>
);

const form = [
    [
        {
            id: 'name',
            name: 'name',
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
            name: 'email',
            type: 'email',
            className: 'form-control',
            required: true,
            placeholder: 'Email',
            fieldContainer: customEmailContainer,
            onChange: (event) => {
                console.log(`Email: ${event.target.value}`);
            },
        },
        {
            id: 'birthday',
            name: 'birthday',
            type: 'date',
            className: 'form-control',
            required: true,
            placeholder: 'Birthday',
            label: 'Birthday label',
            onChange: (event) => {
                console.log(`Birthday: ${event.target.value}`);
            },
        },
    ],
];

export default form;
