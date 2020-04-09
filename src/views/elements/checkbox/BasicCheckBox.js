import React from 'react';
import PropTypes from 'prop-types';

import Element from '../Element';
import { EMPTY_CALLBACK, EMPTY_CONTAINER } from '../../../constants';

/**
 *
 * This class represent a basic input type checkbox
 * */
class BasicCheckBox extends Element {
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
        this.props.setFieldValueState(event.target.checked);
        this.props.onChange(event);
    }

    render() {
        const Container = this.props.fieldContainer || this.props.parentFieldContainer || EMPTY_CONTAINER;
        const inputProps = this.calculateElementProps();

        return (
            <Container>
                {this.renderLabel()}
                <input
                    ref={this.setElementReference}
                    {...inputProps}
                    checked={!!this.props.fieldValueState}
                    onChange={this.onChange}
                />
                {this.renderErrorMessage()}
            </Container>
        );
    }
}

export default BasicCheckBox;


BasicCheckBox.propTypes = {
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

BasicCheckBox.defaultProps = {
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
