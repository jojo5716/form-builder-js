import React from 'react';
import PropTypes from 'prop-types';

import BasicInput from '../inputs/BasicInput';
import { EMPTY_CALLBACK } from '../../../constants';


const PROPS_TO_DELETE = [
    'emptyOptionText',
];

const Option = (option, index) => (
    <option
        key={`option-${index}-${option.value}`}
        value={option.value}>
        {option.content}
    </option>
);

const EmptyOption = ({ emptyOptionText }) => <option value=''>{emptyOptionText}</option>;

/**
 *
 * This class represent a basic select
 * */
class BasicSelect extends BasicInput {
    constructor(props) {
        super(props);
        this.additionalPropsToDelete = PROPS_TO_DELETE;
        // this.elementComponent = ({ componentProps, hasToShowEmptyOption, options }) => (
        this.elementComponent = (componentProps) => {
            const hasToShowEmptyOption = componentProps.required && !(componentProps.value);

            return (
                <select {...componentProps}>
                    {hasToShowEmptyOption ? <EmptyOption emptyOptionText={componentProps.emptyOptionText}/> : null}
                    {componentProps.options.map((option, index) => <Option key={index} {...option}/>)}
                </select>
            );
        };
    }

    render() {
        return super.render();
    }
}

export default BasicSelect;


BasicSelect.propTypes = {
    errorMessage: PropTypes.string,
    emptyOptionText: PropTypes.string,
    fieldValueState: PropTypes.any,
    fieldContainer: PropTypes.any,
    labelContainer: PropTypes.any,
    setErrorOnChange: PropTypes.bool,
    hasToShowLabel: PropTypes.bool,
    parentFieldContainer: PropTypes.any,
    onChange: PropTypes.func,
    onChangeField: PropTypes.func,
    setReference: PropTypes.func,
    setFieldValueState: PropTypes.func,
    options: PropTypes.array,
    extraData: PropTypes.object,
};

BasicSelect.defaultProps = {
    emptyOptionText: '-',
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
    options: [],
    extraData: {},
};
