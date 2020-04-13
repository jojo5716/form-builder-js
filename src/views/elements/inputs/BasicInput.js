import React from 'react';
import PropTypes from 'prop-types';

import Element from '../Element';
import { EMPTY_CALLBACK, EMPTY_FIELD_CONTAINER } from '../../../constants';


/**
 *
 * This class represent a basic input type text
 * */
class BasicInput extends Element {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        super.showOrHideErrorMessage();
        const currentValue = event.target.value;

        this.props.setFieldValueState(currentValue);
        this.props.onChangeField(this.props.name, currentValue);
        this.props.onChange(event);
    }

    render() {
        const Container = this.props.fieldContainer || this.props.parentFieldContainer || EMPTY_FIELD_CONTAINER;
        const label = this.renderLabel();
        const errorMessage = this.renderErrorMessage();
        const inputProps = this.calculateElementProps();
        const elementProps = {
            ...inputProps,
            value: this.props.fieldValueState,
            onChange: this.onChange,
        };
        return (
            <Container errorMessage={errorMessage} {...inputProps} {...this.props.extraData} label={label}>
                <input {...elementProps} ref={this.setElementReference}/>
            </Container>
        );
    }
}

export default BasicInput;


BasicInput.propTypes = {
    errorMessage: PropTypes.string,
    fieldValueState: PropTypes.any,
    fieldContainer: PropTypes.any,
    labelContainer: PropTypes.any,
    setErrorOnChange: PropTypes.bool,
    hasToShowLabel: PropTypes.bool,
    parentFieldContainer: PropTypes.any,
    onChange: PropTypes.func,
    setReference: PropTypes.func,
    setFieldValueState: PropTypes.func,
    onChangeField: PropTypes.func,
    extraData: PropTypes.object,
};

BasicInput.defaultProps = {
    errorMessage: 'This field is required',
    fieldContainer: null,
    labelContainer: null,
    setErrorOnChange: true,
    hasToShowFieldErrors: false,
    hasToShowLabel: true,
    parentFieldContainer: null,
    onChange: EMPTY_CALLBACK,
    setReference: EMPTY_CALLBACK,
    setFieldValueState: EMPTY_CALLBACK,
    onChangeField: EMPTY_CALLBACK,
    extraData: {},
};
