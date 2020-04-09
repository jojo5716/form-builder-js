import React from 'react';

const customEmailContainer = ({ children }) => (
    <div className="input-group mb-3">
        {children}
        <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">@example.com</span>
        </div>
    </div>
);

const authorFields = [
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
];
const contactFields = [
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

];
const statusPost = [
    {
        name: 'status',
        element: 'input',
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

export const fields = [
    [...authorFields],
    [...contactFields],
    {
        title: 'Post fields',
        content: 'Post content',
        fields: [...statusPost],
    },
];

export const form = {
    action: 'https://www.google.es',
    method: 'GET',
};
