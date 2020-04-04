import React from 'react';

import Input from './views/elements/Input';


const MAP_COMPONENT_INPUTS = {
    default: Input,
};

const EMPTY_CONTAINER = ({ children }) => <React.Fragment>{children}</React.Fragment>;

module.exports = {
    MAP_COMPONENT_INPUTS,
    EMPTY_CONTAINER,
};
