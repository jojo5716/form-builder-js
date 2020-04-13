import React from 'react';
import PropTypes from 'prop-types';

import Element from '../Element';
import { EMPTY_CALLBACK, EMPTY_FIELD_CONTAINER } from '../../../constants';

/**
 *
 * This class represent a basic textarea
 * */
class BasicTextArea extends Element {
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
            <Container label={label} {...this.props.extraData} errorMessage={errorMessage}>
                <textarea {...elementProps} ref={this.setElementReference}>
                    {this.props.fieldValueState}
                </textarea>
            </Container>
        );
    }
}

export default BasicTextArea;


BasicTextArea.propTypes = {
    errorMessage: PropTypes.string,
    fieldValueState: PropTypes.string,
    fieldContainer: PropTypes.any,
    labelContainer: PropTypes.any,
    setErrorOnChange: PropTypes.bool,
    hasToShowLabel: PropTypes.bool,
    parentFieldContainer: PropTypes.any,
    onChange: PropTypes.func,
    onChangeField: PropTypes.func,
    setReference: PropTypes.func,
    setFieldValueState: PropTypes.func,
    extraData: PropTypes.object,
};

BasicTextArea.defaultProps = {
    fieldValueState: '',
    errorMessage: 'This field is required',
    fieldContainer: null,
    labelContainer: null,
    setErrorOnChange: true,
    hasToShowLabel: true,
    parentFieldContainer: null,
    onChange: EMPTY_CALLBACK,
    onChangeField: EMPTY_CALLBACK,
    setReference: EMPTY_CALLBACK,
    setFieldValueState: EMPTY_CALLBACK,
    extraData: {},

};
