import PropTypes from 'prop-types';

import BasicInput from '../BasicInput';
import { EMPTY_CALLBACK } from '../../../../constants';

const VALUE_ATTR_NAME = 'checked';
const ONCHANGE_CALLBACK_NAME = 'onClick';

/**
 *
 * This class represent a basic input type radio
 * */
class BasicRadio extends BasicInput {

    getFieldValueState() {
        return this.props.fieldValueState === this.props.value;
    }

    render() {
        return this.renderField(this.elementComponent, VALUE_ATTR_NAME, ONCHANGE_CALLBACK_NAME);
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
