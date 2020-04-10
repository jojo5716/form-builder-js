import React from 'react';
import PropTypes from 'prop-types';

import Element from '../../Element';
import { EMPTY_CALLBACK, EMPTY_FIELD_CONTAINER } from '../../../../constants';

/**
 *
 * This class represent a basic input type radio
 * */
class BasicRadio extends Element {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        if (event.target.checked) {
            this.props.setFieldValueState(event.target.value);
            this.props.onChange(event);
        }
    }

    render() {
        const Container = this.props.fieldContainer || this.props.parentFieldContainer || EMPTY_FIELD_CONTAINER;
        const label = this.renderLabel();
        const errorMessage = this.renderErrorMessage();
        const inputProps = this.calculateElementProps();
        const elementProps = {
            ...inputProps,
            checked: this.props.fieldValueState === this.props.value,
            onClick: this.onClick,
        };
        return (
            <Container label={label} errorMessage={errorMessage}>
                <input {...elementProps} ref={this.setElementReference}/>
            </Container>
        );
    }
}

export default BasicRadio;


BasicRadio.propTypes = {
    value: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    fieldValueState: PropTypes.string,
    fieldContainer: PropTypes.any,
    setErrorOnChange: PropTypes.bool,
    parentFieldContainer: PropTypes.any,
    onChange: PropTypes.func,
    setReference: PropTypes.func,
    setFieldValueState: PropTypes.func,
};

BasicRadio.defaultProps = {
    errorMessage: 'This field is required',
    fieldContainer: null,
    setErrorOnChange: true,
    parentFieldContainer: null,
    onChange: EMPTY_CALLBACK,
    setReference: EMPTY_CALLBACK,
    setFieldValueState: EMPTY_CALLBACK,
};
