import React from 'react';
import PropTypes from 'prop-types';

import Element from '../Element';
import { EMPTY_CALLBACK } from '../../../constants';


const VALUE_ATTR_NAME = 'value';
const ONCHANGE_CALLBACK_NAME = 'onChange';

/**
 *
 * This class represent a basic input type text
 * */
class BasicInput extends Element {
    constructor(props) {
        super(props);

        this.elementComponent = componentProps => <input {...componentProps}/>;
    }

    getFieldValue(event) {
        return event.target[VALUE_ATTR_NAME];
    }

    render() {
        return this.renderField(this.elementComponent, VALUE_ATTR_NAME, ONCHANGE_CALLBACK_NAME);
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
