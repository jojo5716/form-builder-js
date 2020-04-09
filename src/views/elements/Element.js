import React from 'react';
import PropTypes from 'prop-types';

import { convertStringToCamelCase, removeInternalProps } from '../../helpers';
import { EMPTY_CALLBACK, EMPTY_LABEL_CONTAINER } from '../../constants';


class Element extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasToShowErrorMessage: false,
        };

        this.showErrorMessage = this.showErrorMessage.bind(this);
        this.hideErrorMessage = this.hideErrorMessage.bind(this);
        this.setElementReference = this.setElementReference.bind(this);
        this.ref = null;
        this.propsToDelete = [
            'setReference',
            'fieldContainer',
            'setFieldValueState',
            'parentFieldContainer',
            'labelContainer',
            'hasToShowLabel',
        ];
    }

    calculateElementProps() {
        return removeInternalProps(this.props, this.propsToDelete);
    }

    isFieldValid() {
        return this.ref.validity.valid;
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
            html = (
                <span>{this.props.errorMessage}</span>
            );
        }
        return html;
    }

    renderLabel() {
        let html;
        if (this.props.hasToShowLabel) {
            const Container = this.props.labelContainer || EMPTY_LABEL_CONTAINER;
            const labelText = convertStringToCamelCase(this.props.label || this.props.name || '');
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
    setErrorOnChange: PropTypes.bool,
    hasToShowLabel: PropTypes.bool,
};

Element.defaultProps = {
    type: 'text',
    errorMessage: 'This field is required',
    fieldContainer: null,
    parentFieldContainer: null,
    labelContainer: null,
    setErrorOnChange: true,
    hasToShowLabel: true,
    setFieldValueState: EMPTY_CALLBACK,
    onChange: EMPTY_CALLBACK,
    setReference: EMPTY_CALLBACK,
    reference: React.createRef(),
};
