import React from 'react';
import PropTypes from 'prop-types';

import Element from '../Element';
import { EMPTY_CALLBACK, EMPTY_FIELD_CONTAINER } from '../../../constants';

const PROPS_TO_DELETE = [
    'options',
    'emptyOptionText',
];

/**
 *
 * This class represent a basic select
 * */
class BasicSelect extends Element {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        super.showOrHideErrorMessage();

        this.props.setFieldValueState(event.target.value);
        this.props.onChange(event);
    }

    renderOption(option, index) {
        return (
            <option
                key={`option-${index}-${option.value}`}
                value={option.value}>
                {option.content}
            </option>
        );
    }

    renderEmptyOption() {
        return <option>{this.props.emptyOptionText}</option>;
    }

    render() {
        const Container = this.props.fieldContainer || this.props.parentFieldContainer || EMPTY_FIELD_CONTAINER;
        const label = this.renderLabel();
        const errorMessage = this.renderErrorMessage();
        const inputProps = this.calculateElementProps(PROPS_TO_DELETE);
        const hasToShowEmptyOption = this.props.required && !(this.props.value);
        const elementProps = {
            ...inputProps,
            value: this.props.fieldValueState,
            onChange: this.onChange,
        };
        const optionsRendered = this.props.options.map(this.renderOption);

        return (
            <Container label={label} errorMessage={errorMessage}>
                <select {...elementProps} ref={this.setElementReference}>
                    {hasToShowEmptyOption ? this.renderEmptyOption() : null}
                    {optionsRendered}
                </select>
            </Container>
        );
    }
}

export default BasicSelect;


BasicSelect.propTypes = {
    errorMessage: PropTypes.string,
    emptyOptionText: PropTypes.string,
    fieldValueState: PropTypes.any,
    fieldContainer: PropTypes.any,
    labelContainer: PropTypes.any,
    setErrorOnChange: PropTypes.bool,
    hasToShowLabel: PropTypes.bool,
    parentFieldContainer: PropTypes.any,
    onChange: PropTypes.func,
    setReference: PropTypes.func,
    setFieldValueState: PropTypes.func,
};

BasicSelect.defaultProps = {
    emptyOptionText: '-',
    errorMessage: 'This field is required',
    fieldContainer: null,
    labelContainer: null,
    setErrorOnChange: true,
    hasToShowLabel: true,
    parentFieldContainer: null,
    onChange: EMPTY_CALLBACK,
    setReference: EMPTY_CALLBACK,
    setFieldValueState: EMPTY_CALLBACK,
};
