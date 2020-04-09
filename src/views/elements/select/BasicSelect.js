import React from 'react';
import PropTypes from 'prop-types';

import Element from '../Element';
import { EMPTY_CALLBACK, EMPTY_CONTAINER } from '../../../constants';

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

    render() {
        const Container = this.props.fieldContainer || this.props.parentFieldContainer || EMPTY_CONTAINER;
        const inputProps = this.calculateElementProps(PROPS_TO_DELETE);

        return (
            <Container>
                {this.renderLabel()}
                <select
                    ref={this.setElementReference}
                    {...inputProps}
                    onChange={this.onChange}
                    value={this.props.value}>
                    {this.props.options.map(this.renderOption)}
                </select>
                {this.renderErrorMessage()}
            </Container>
        );
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
