import React from 'react';
import PropTypes from 'prop-types';

import { convertStringToCamelCase } from '../../helpers';

const EMPTY_CONTAINER = ({ children }) => <React.Fragment>{children}</React.Fragment>;
const EMPTY_LABEL_CONTAINER = ({ children }) => <label>{children}</label>;


class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasToShowErrorMessage: false,
        };

        this.onChange = this.onChange.bind(this);
        this.showErrorMessage = this.showErrorMessage.bind(this);
        this.hideErrorMessage = this.hideErrorMessage.bind(this);
        this.setElementReference = this.setElementReference.bind(this);
        this.ref = null;
    }

    isFieldValid() {
        return this.ref.validity.valid;
    }

    showErrorMessage() {
        this.setState({ hasToShowErrorMessage: true });
    }

    hideErrorMessage() {
        this.setState({ hasToShowErrorMessage: false });
    }

    onChange(event) {
        if (!this.props.setErrorOnChange || (this.props.setErrorOnChange && this.isFieldValid())) {
            this.props.setFieldValueState(event.target.value);
            this.props.onChange(event);
            this.hideErrorMessage();
        } else {
            this.showErrorMessage();
        }
    }

    setElementReference(element) {
        this.ref = element;
        this.props.setReference(element);
    }

    renderErrorMessage() {
        return (
            <span>{this.props.errorMessage}</span>
        );
    }

    renderLabel() {
        const Container = this.props.labelContainer || EMPTY_LABEL_CONTAINER;
        const labelText = convertStringToCamelCase(this.props.label || this.props.name || '');

        return (
            <Container>
                {labelText}
            </Container>
        );
    }

    render() {
        const Container = this.props.fieldContainer || this.props.parentFieldContainer || EMPTY_CONTAINER;

        return (
            <Container>
                {this.props.hasToShowLabel ? this.renderLabel() : null}
                <input ref={this.setElementReference} {...this.props} onChange={this.onChange}/>
                {this.state.hasToShowErrorMessage ? this.renderErrorMessage() : null}
            </Container>
        );
    }
}

export default Input;


Input.propTypes = {
    type: PropTypes.string,
    errorMessage: PropTypes.string,
    setFieldValueState: PropTypes.func,
    setReference: PropTypes.func,
    reference: PropTypes.any,
    parentFieldContainer: PropTypes.any,
    labelContainer: PropTypes.any,
    onChange: PropTypes.func,
    fieldContainer: PropTypes.any,
    setErrorOnChange: PropTypes.bool,
    hasToShowLabel: PropTypes.bool,
};

Input.defaultProps = {
    type: 'text',
    errorMessage: 'This field is required',
    fieldContainer: null,
    parentFieldContainer: null,
    labelContainer: null,
    setErrorOnChange: true,
    hasToShowLabel: true,
    setFieldValueState: () => {
    },
    setReference: () => {
    },
    onChange: () => {
    },
    reference: React.createRef(),
};
