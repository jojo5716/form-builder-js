import React from 'react';
import PropTypes from 'prop-types';


class Input extends React.Component {
    render() {
        return (
            <input {...this.props}/>
        );
    }
}

export default Input;


Input.propTypes = {
    type: PropTypes.string,
};

Input.defaultProps = {
    type: 'text',
};
