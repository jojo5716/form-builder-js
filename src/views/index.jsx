import React from 'react';


const FormView = ({ children, form }) => (
    <form {...form} >
        {children}
    </form>
);

export default FormView;
