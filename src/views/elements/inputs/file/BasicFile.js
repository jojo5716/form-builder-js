import PropTypes from 'prop-types';

import BasicInput from '../BasicInput';
import { EMPTY_CALLBACK } from '../../../../constants';


const VALUE_ATTR_NAME = 'filename';
const ONCHANGE_CALLBACK_NAME = 'onChange';
const PROPS_TO_DELETE = [
    'value',
];
/**
 *
 * This class represent a basic file
 * */
class BasicFile extends BasicInput {
    constructor(props) {
        super(props);
        this.additionalPropsToDelete = PROPS_TO_DELETE;
    }

    getFieldValue(event) {
        let files;
        if (event.target.files.length) {
            const arrFiles = Array.from(event.target.files);
            files = arrFiles.map((file, index) => {
                const src = window.URL.createObjectURL(file);
                return { file, id: index, src };
            });
        }

        return files ? files[0].file : files;

    }

    render() {
        return this.renderField(this.elementComponent, VALUE_ATTR_NAME, ONCHANGE_CALLBACK_NAME);
    }
}

export default BasicFile;


BasicFile.propTypes = {
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

BasicFile.defaultProps = {
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
