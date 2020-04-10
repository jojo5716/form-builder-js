import React from 'react';
import PropTypes from 'prop-types';

import Element from '../Element';
import { EMPTY_CALLBACK } from '../../../constants';

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

    renderElement() {
        const elementProps = {
            onChange: this.onChange,
            value: this.props.fieldValueState,
        };
        const optionsRendered = this.props.options.map(this.renderOption);
        const elementComponent = props => (
            <select {...props} {...elementProps} ref={this.setElementReference}>
                {this.props.required ? null : this.renderEmptyOption()}
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
    emptyOptionText: PropTypes.string,
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
