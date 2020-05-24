import React from 'react';

const customEmailContainer = ({ children, label, errorMessage }) => (
    <div className="input-group mb-3">
        {label}
        {children}
        <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">@example.com</span>
        </div>
        <div className="error-message">{errorMessage}</div>
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
const categoryPost = [
    {
        name: 'category',
        element: 'select',
        className: 'form-control',
        label: 'Category',
        value: 'category2',
        required: true,
        options: [
            {
                value: '',
                content: '-',
            },
            {
                value: 'category1',
                content: 'Category 1',
            }, {
                value: 'category2',
                content: 'Category 2',
            },
        ],
        onChange: (event) => {
            console.log(`Category: ${event.target.value}`);
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
const comment = {
    id: 'comment',
    element: 'textarea',
    name: 'comment',
    // value: 'JhonDoe',
    // minLength: 4,
    // type: 'text',
    className: 'form-control',
    required: true,
    placeholder: 'Your comment',
    onChange: (event) => {
        console.log(`Comment: ${event.target.value}`);
    },
};

export const fields = [
    [...authorFields],
    [...contactFields],
    {
        title: 'Post status',
        content: 'Select an status',
        fields: [...statusPost],
    },
    {
        title: 'Post category',
        content: 'Select a category',
        fields: [...categoryPost],
    },
    [...tags],
    [comment],
];

export const form = {
    action: 'https://www.google.es',
    method: 'GET',
    id: 'form',
};

export const submitProps = {
    className: "submit-button"
};