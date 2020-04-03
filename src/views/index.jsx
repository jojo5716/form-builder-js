import React from 'react';


const FormView = ({ children, method }) => (
    <form method={method}>
        {children}
    </form>
);

export default FormView;
