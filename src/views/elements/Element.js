import React from 'react';
import PropTypes from 'prop-types';

import { convertStringToCamelCase, removeInternalProps } from '../../helpers';
import { EMPTY_CALLBACK, EMPTY_CONTAINER, EMPTY_LABEL_CONTAINER } from '../../constants';

const PROPS_TO_DELETE = [
    'setReference',
    'fieldContainer',
    'setFieldValueState',
    'parentFieldContainer',
    'labelContainer',
    'hasToShowLabel',
    'fieldValueState',
    'setErrorOnChange',
    'elementType',
    'errorMessage',
    'hasToShowFieldErrors',
    'hasToShowErrorMessage',
    'extraData',
    'onChangeField',
    'helpText',
];

class Element extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasToShowErrorMessage: props.hasToShowErrorMessage,
        };

        this.showErrorMessage = this.showErrorMessage.bind(this);
        this.hideErrorMessage = this.hideErrorMessage.bind(this);
        this.setElementReference = this.setElementReference.bind(this);
        this.getValidationMessage = this.getValidationMessage.bind(this);
        this.ref = null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.hasToShowErrorMessage !== this.props.hasToShowErrorMessage && !(this.isFieldValid())) {
            this.setState({
                hasToShowErrorMessage: this.props.hasToShowErrorMessage,
            });
        }
    }

    calculateElementProps(AdditionalPropsToDelete = []) {
        const allPropsToDelete = [...PROPS_TO_DELETE, ...AdditionalPropsToDelete];

        return removeInternalProps(this.props, allPropsToDelete);
    }

    showOrHideErrorMessage() {
        if (!(this.isFieldValid()) && this.props.setErrorOnChange) {
            this.showErrorMessage();
        } else {
            this.hideErrorMessage();
        }
    }

    isFieldValid() {
        return this.ref.validity.valid;
    }

    getValidationMessage() {
        return this.ref.validationMessage || this.props.errorMessage || '';
    }

    showErrorMessage() {
        this.setState({ hasToShowErrorMessage: true });
    }

    hideErrorMessage() {
        this.setState({ hasToShowErrorMessage: false });
    }

    setElementReference(element) {
        this.ref = element;
        this.props.setReference(element);
    }

    renderErrorMessage() {
        let html;
        if (this.state.hasToShowErrorMessage) {
            const Container = this.props.fieldErrorContainer || EMPTY_CONTAINER;

            html = (
                <Container>{this.getValidationMessage()}</Container>
            );
        }
        return html;
    }

    renderLabel() {
        let html;
        const labelText = convertStringToCamelCase(this.props.label || this.props.name || '');
        if (this.props.hasToShowLabel && labelText) {
            const Container = this.props.labelContainer || EMPTY_LABEL_CONTAINER;
            html = (
                <Container>
                    {labelText}
                </Container>
            );
        } else {
            html = null;
        }

        return html;
    }

    /*
    * Override this method on each field type
    * */
    render() {
        return null;
    }
}

export default Element;


Element.propTypes = {
    type: PropTypes.string,
    errorMessage: PropTypes.string,
    setFieldValueState: PropTypes.func,
    setReference: PropTypes.func,
    reference: PropTypes.any,
    parentFieldContainer: PropTypes.any,
    labelContainer: PropTypes.any,
    onChange: PropTypes.func,
    fieldContainer: PropTypes.any,
    fieldErrorContainer: PropTypes.any,
    setErrorOnChange: PropTypes.bool,
    hasToShowLabel: PropTypes.bool,
    hasToShowFieldErrors: PropTypes.bool,
};

Element.defaultProps = {
    type: 'text',
    errorMessage: 'This field is required',
    fieldContainer: null,
    fieldErrorContainer: null,
    parentFieldContainer: null,
    labelContainer: null,
    setErrorOnChange: true,
    hasToShowLabel: true,
    hasToShowFieldErrors: false,
    setFieldValueState: EMPTY_CALLBACK,
    onChange: EMPTY_CALLBACK,
    setReference: EMPTY_CALLBACK,
    reference: React.createRef(),
};
