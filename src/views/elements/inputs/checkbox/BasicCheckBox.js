import React from 'react';
import PropTypes from 'prop-types';

import Element from '../../Element';
import { EMPTY_CALLBACK } from '../../../../constants';

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
        super.showOrHideErrorMessage();

        this.props.setFieldValueState(event.target.checked);
        this.props.onChange(event);
    }

    renderElement() {
        const elementProps = {
            checked: !!this.props.fieldValueState,
            onChange: this.onChange,
        };
        const elementComponent = props => <input {...props} {...elementProps} ref={this.setElementReference}/>;

        return super.renderElement(elementComponent);
    }

    render() {
        return this.renderElement();
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
    setReference: EMPTY_CALLBACK,
    setFieldValueState: EMPTY_CALLBACK,
};
