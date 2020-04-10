import React from 'react';
import PropTypes from 'prop-types';

import Element from '../Element';
import { EMPTY_CALLBACK } from '../../../constants';

const PROPS_TO_DELETE = [
    'options',
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
        if (!(this.isFieldValid()) && this.props.setErrorOnChange) {
            this.showErrorMessage();
        } else {
            this.hideErrorMessage();
        }
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

    renderElement() {
        const elementProps = {
            onChange: this.onChange,
            value: this.props.value,
        };
        const optionsRendered = this.props.options.map(this.renderOption);
        const elementComponent = props => (
            <select {...props} {...elementProps} ref={this.setElementReference}>
                {optionsRendered}
            </select>
        );

        return super.renderElement(elementComponent, PROPS_TO_DELETE);
    }

    render() {
        return this.renderElement();
    }
}

export default BasicSelect;


BasicSelect.propTypes = {
    errorMessage: PropTypes.string,
    fieldValueState: PropTypes.string,
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
    fieldValueState: '',
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
