const form = [
    [
        [
            {
                id: 'name',
                name: 'name',
                type: 'text',
                className: 'class_name',
                required: true,
                placeholder: 'Name',
                onChange: (event) => {
                    console.log(`Name: ${event.target.value}`);
                },
            },
            {
                id: 'last_name',
                name: 'last_name',
                minLength: 3,
                type: 'text',
                className: 'class_name',
                required: true,
                placeholder: 'Last name',
                onChange: (event) => {
                    console.log(`Last name: ${event.target.value}`);
                },
            },
        ],
    ],
    [
        {
            id: 'mobile',
            name: 'mobile',
            type: 'number',
            className: 'class_name',
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
            className: 'class_name',
            required: true,
            placeholder: 'Email',
            onChange: (event) => {
                console.log(`Email: ${event.target.value}`);
            },
        },
        {
            id: 'birthday',
            name: 'birthday',
            type: 'date',
            className: 'class_name',
            required: true,
            placeholder: 'Birthday',
            onChange: (event) => {
                console.log(`Birthday: ${event.target.value}`);
            },
        },
    ],
];

export default form;
