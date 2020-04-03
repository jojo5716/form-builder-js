const form = [
    {
        id: 'name',
        name: 'name',
        type: 'text',
        className: 'class_name',
        required: true,
        onChange: (event) => {
            console.log(event.target.value);
        },
    },
];

export default form;
