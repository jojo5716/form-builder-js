import PropTypes from 'prop-types';

import BasicInput from '../BasicInput';
import { EMPTY_CALLBACK } from '../../../../constants';

const VALUE_ATTR_NAME = 'checked';
const ONCHANGE_CALLBACK_NAME = 'onChange';

/**
 *
 * This class represent a basic input type checkbox
 * */
class BasicCheckBox extends BasicInput {
    getFieldValueState() {
        return !!this.props.fieldValueState;
    }

    getFieldValue(event) {
        return event.target[VALUE_ATTR_NAME];
    }

    render() {
        return this.renderField(this.elementComponent, VALUE_ATTR_NAME, ONCHANGE_CALLBACK_NAME);
    }
}

export default BasicCheckBox;


BasicCheckBox.propTypes = {
    errorMessage: PropTypes.string,
    fieldValueState: PropTypes.bool,
    fieldContainer: PropTypes.any,
    labelContainer: PropTypes.any,
    setErrorOnChange: PropTypes.bool,
    hasToShowLabel: PropTypes.bool,
    parentFieldContainer: PropTypes.any,
    onChange: PropTypes.func,
    onChangeField: PropTypes.func,
    setReference: PropTypes.func,
    setFieldValueState: PropTypes.func,
};

BasicCheckBox.defaultProps = {
    fieldValueState: false,
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
};
