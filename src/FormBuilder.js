import React from 'react';
import PropTypes from 'prop-types';


class FormBuilder extends React.Component {
    render() {
        return <div/>;
    }
}

export default FormBuilder;


FormBuilder.propTypes = {
    form: PropTypes.array,
};

FormBuilder.defaultProps = {
    form: [],
};
