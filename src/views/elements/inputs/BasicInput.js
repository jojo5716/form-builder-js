import React from 'react';
import PropTypes from 'prop-types';

import Element from '../Element';
import { EMPTY_CALLBACK, EMPTY_CONTAINER } from '../../../constants';

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
        if (!(this.isFieldValid()) && this.props.setErrorOnChange) {
            this.showErrorMessage();
        }
        this.props.setFieldValueState(event.target.value);
        this.props.onChange(event);
        // if (!this.props.setErrorOnChange || (this.props.setErrorOnChange && this.isFieldValid())) {
        //     this.props.setFieldValueState(event.target.value);
        //     this.props.onChange(event);
        //     this.hideErrorMessage();
        // } else {
        //     this.showErrorMessage();
        // }
    }

    render() {
        const Container = this.props.fieldContainer || this.props.parentFieldContainer || EMPTY_CONTAINER;
        const inputProps = this.calculateElementProps();

        return (
            <Container>
                {this.renderLabel()}
                <input ref={this.setElementReference} {...inputProps} onChange={this.onChange}/>
                {this.renderErrorMessage()}
            </Container>
        );
    }
}

export default BasicInput;


BasicInput.propTypes = {
    errorMessage: PropTypes.string,
    fieldContainer: PropTypes.any,
    setErrorOnChange: PropTypes.bool,
    parentFieldContainer: PropTypes.any,
    onChange: PropTypes.func,
    setReference: PropTypes.func,
    setFieldValueState: PropTypes.func,


};

BasicInput.defaultProps = {
    errorMessage: 'This field is required',
    fieldContainer: null,
    setErrorOnChange: true,
    parentFieldContainer: null,
    onChange: EMPTY_CALLBACK,
    setReference: EMPTY_CALLBACK,
    setFieldValueState: EMPTY_CALLBACK,
};
