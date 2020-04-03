import React from 'react';
import PropTypes from 'prop-types';


class Button extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        this.props.onClick();
    }

    render() {
        return (
            <button {...this.props} onClick={this.onClick}>
                {this.props.text}
            </button>
        );
    }
}

export default Button;


Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
};

Button.defaultProps = {
    onClick: () => {
    },
    text: '',
};
