import React from 'react';
import PropTypes from 'prop-types';

import FormView from './views/index.jsx';
import BasicInput from './views/elements/inputs/BasicInput';
import Button from './views/elements/Button';
import { MAP_ELEMENTS } from './elements-mapping';
import { EMPTY_CALLBACK, EMPTY_CONTAINER } from './constants';
import { buildFormState, isObjectArray } from './helpers';

const isEqual = require('lodash.isequal');


class FormBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: buildFormState(props),
            hasToShowFormError: false,
            hasToShowFieldErrors: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.renderElement = this.renderElement.bind(this);
        this.renderGroup = this.renderGroup.bind(this);
        this.renderGroupElements = this.renderGroupElements.bind(this);
        this.nodes = {};
    }

    componentDidUpdate(prevProps) {
        if (!(isEqual(this.props, prevProps))) {
            this.setState({
                fields: buildFormState(this.props),
            });
        }
    }

    renderGroupElements(inputData, containerPropName, index) {
        const Container = this.props[containerPropName] || EMPTY_CONTAINER;

        return (
            <Container key={`index-parent-field-${index}-${inputData.length}`}>
                {
                    inputData.map((element, inputIndex) => (
                        this.renderElement(element, `index-${element.name}-${inputIndex}`)))
                }
            </Container>
        );
    }

    renderGroup(groupData, index) {
        return this.renderGroupElements(groupData.fields, 'groupContainer', index);
    }

    renderElement(inputData, index) {
        let html;

        if (isObjectArray(inputData)) {
            html = this.renderGroupElements(inputData, 'fieldGroupContainer', index);
        } else if (typeof inputData.fields !== 'undefined') {
            const Container = this.props.groupContainer || EMPTY_CONTAINER;
            const GroupContainer = inputData.container || EMPTY_CONTAINER;

            html = (
                <Container {...inputData} key={`group-container-${index}`}>
                    <GroupContainer {...inputData.extraData}>
                        {this.renderGroupElements(inputData.fields, 'fieldGroupContainer', index)}
                    </GroupContainer>
                </Container>
            );
        } else {
            html = this.renderInput(inputData, index);
        }

        return html;
    }

    renderInput(inputData, index) {
        const inputTypes = MAP_ELEMENTS[inputData.element] || MAP_ELEMENTS.default;
        const Component = inputTypes[inputData.type] || inputTypes.default;
        const setFieldValueState = elementValue => this.setState({
            fields: {
                ...this.state.fields,
                [inputData.name]: elementValue,
            },
        });

        return Component ? <Component
            {...inputData}
            key={index}
            setReference={(node) => {
                if (node) {
                    this.nodes[node.name] = node;
                }
            }}
            setFieldValueState={setFieldValueState}
            setErrorOnChange={this.props.setErrorOnChange}
            parentFieldContainer={this.props.fieldContainer}
            labelContainer={this.props.labelContainer}
            hasToShowLabel={this.props.hasToShowLabel}
            fieldValueState={this.state.fields[inputData.name]}
            hasToShowErrorMessage={this.state.hasToShowFieldErrors}
            onChangeField={this.props.onChange}
        /> : null;
    }

    isValidForm() {
        const fieldsValidityValues = Object.values(this.nodes).map(node => node && node.validity.valid);

        return fieldsValidityValues.every(value => value);
    }

    getFieldsErrorMessage() {
        const errors = {};
        Object.values(this.nodes).forEach((node) => {
            if (node && !(node.validity.valid)) {
                errors[node.name] = node.validationMessage || '';
            }
        });

        return errors;
    }

    onSubmit() {
        if (this.isValidForm()) {
            this.setState({ hasToShowFormError: false });
            this.props.onSuccess({ ...this.state.fields });
        } else if (this.props.showFormErrorMessage) {
            this.setState({
                hasToShowFormError: true,
                hasToShowFieldErrors: this.props.showFieldsErrorsOnFailSubmit,
            });
            this.props.onError(this.getFieldsErrorMessage());
        }
    }

    renderSubmitButton() {
        const Container = this.props.submitContainer || EMPTY_CONTAINER;
        let Component;
        let attributes;

        if (this.props.hasToSubmit) {
            Component = BasicInput;
            attributes = {
                ...this.props.submit,
                type: 'submit',
                fieldValueState: this.props.submitButtonText,
            };
        } else {
            Component = Button;
            attributes = {
                ...this.props.submit,
                text: this.props.submitButtonText,
                onClick: this.onSubmit,
            };
        }

        return (
            <Container {...attributes}>
                <Component {...attributes} />
            </Container>
        );
    }

    renderFormErrorMessage() {
        const Container = this.props.formErrorContainer || EMPTY_CONTAINER;
        return (
            <Container>
                {this.props.customFormErrorMessage}
            </Container>
        );
    }

    renderForm() {
        const elementsRendered = this.props.fields.map(this.renderElement);
        const Container = this.props.container || EMPTY_CONTAINER;
        const FormContainer = this.props.createFormElement ? FormView : EMPTY_CONTAINER;

        return (
            <Container onSubmit={this.onSubmit}>
                {this.state.hasToShowFormError ? this.renderFormErrorMessage() : null}
                <FormContainer {...this.props}>
                    {elementsRendered}
                    {this.props.showSubmitButton ? this.renderSubmitButton() : null}
                </FormContainer>
            </Container>
        );
    }

    render() {

        return isObjectArray(this.props.fields) ? this.renderForm() : null;
    }
}

export default FormBuilder;


FormBuilder.propTypes = {
    form: PropTypes.object,
    submit: PropTypes.object,
    fields: PropTypes.array,
    container: PropTypes.any,
    groupContainer: PropTypes.any,
    fieldGroupContainer: PropTypes.any,
    fieldContainer: PropTypes.any,
    formErrorContainer: PropTypes.any,
    onSuccess: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    submitButtonText: PropTypes.string,
    customFormErrorMessage: PropTypes.string,
    method: PropTypes.string,
    hasToSubmit: PropTypes.bool,
    showSubmitButton: PropTypes.bool,
    showFormErrorMessage: PropTypes.bool,
    showFieldsErrorsOnFailSubmit: PropTypes.bool,
    createFormElement: PropTypes.bool,
};

FormBuilder.defaultProps = {
    form: {},
    submit: {},
    fields: [],
    container: null,
    groupContainer: null,
    fieldGroupContainer: null,
    fieldContainer: null,
    formErrorContainer: null,
    hasToSubmit: true,
    showSubmitButton: true,
    showFormErrorMessage: true,
    showFieldsErrorsOnFailSubmit: true,
    createFormElement: true,
    onSuccess: EMPTY_CALLBACK,
    onError: EMPTY_CALLBACK,
    onChange: EMPTY_CALLBACK,
    submitButtonText: 'Submit',
    method: 'GET',
    customFormErrorMessage: 'Invalid fields',
};
