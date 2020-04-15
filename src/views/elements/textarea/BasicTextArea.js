import React from 'react';
import PropTypes from 'prop-types';

import BasicInput from '../inputs/BasicInput';
import { EMPTY_CALLBACK } from '../../../constants';

/**
 *
 * This class represent a basic textarea
 * */
class BasicTextArea extends BasicInput {
    constructor(props) {
        super(props);
        this.elementComponent = componentProps => (
            <textarea {...componentProps}>
                {componentProps.fieldValueState}
            </textarea>
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
