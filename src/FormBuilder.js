import React from 'react';
import PropTypes from 'prop-types';

import FormView from './views/index.jsx';
import Input from './views/elements/Input';


const MAP_COMPONENT_INPUTS = {
    text: Input,
};

class FormBuilder extends React.Component {
    renderInput(inputData, index) {
        const Component = MAP_COMPONENT_INPUTS[ inputData.type ];
        return Component ? <Component key={index} {...inputData}/> : null;
    }

    render() {
        const elementsRendered = this.props.form.map(this.renderInput);
        return <FormView>{elementsRendered}</FormView>;
    }
}

export default FormBuilder;


FormBuilder.propTypes = {
    form: PropTypes.array,
};

FormBuilder.defaultProps = {
    form: [],
};
