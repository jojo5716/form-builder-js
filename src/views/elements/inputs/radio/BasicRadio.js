import React from 'react';
import PropTypes from 'prop-types';

import Element from '../../Element';
import { EMPTY_CALLBACK, EMPTY_CONTAINER } from '../../../../constants';

const PROPS_TO_DELETE = [];

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
        const Container = this.props.fieldContainer || this.props.parentFieldContainer || EMPTY_CONTAINER;
        const inputProps = this.calculateElementProps(PROPS_TO_DELETE);

        return (
            <Container>
                {this.renderLabel()}
                <input
                    ref={this.setElementReference}
                    {...inputProps}
                    onClick={this.onClick}
                    checked={this.props.fieldValueState === this.props.value}
                />
                {this.renderErrorMessage()}
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
