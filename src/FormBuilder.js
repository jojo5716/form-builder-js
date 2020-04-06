import React from 'react';
import PropTypes from 'prop-types';

import FormView from './views/index.jsx';
import Input from './views/elements/Input';
import Button from './views/elements/Button';
import { MAP_COMPONENT_INPUTS, EMPTY_CONTAINER } from './constants';
import { buildFormState, isObjectArray } from './helpers';


class FormBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: buildFormState(props.fields),
            hasToShowFormError: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.renderElement = this.renderElement.bind(this);
        this.nodes = [];
    }

    renderElement(inputData, index) {
        let html;

        if (isObjectArray(inputData)) {
            const Container = this.props.fieldGroupContainer || EMPTY_CONTAINER;

            html = (
                <Container key={`index-parent-field-${index}-${inputData.length}`}>
                    {
                        inputData.map((element, inputIndex) => (
                            this.renderElement(element, `index-${element.name}-${inputIndex}`)))
                    }
                </Container>
            );
        } else {
            html = this.renderInput(inputData, index);
        }

        return html;
    }

    renderInput(inputData, index) {
        const Component = MAP_COMPONENT_INPUTS[inputData.type] || MAP_COMPONENT_INPUTS.default;
        const setFieldValueState = elementValue => this.setState({
            fields: {
                ...this.state.fields,
                [inputData.name]: elementValue,
            },
        });

        return Component ? <Component
            {...inputData}
            key={index}
            setReference={el => this.nodes.push(el)}
            setFieldValueState={setFieldValueState}
            parentFieldContainer={this.props.fieldContainer}
            labelContainer={this.props.labelContainer}
            hasToShowLabel={this.props.hasToShowLabel}
            value={this.state.fields[inputData.name] || ''}
        /> : null;
    }

    isValidForm() {
        const fieldsValidityValues = this.nodes.map(node => node.validity.valid);

        return fieldsValidityValues.every(value => value);
    }

    onSubmit() {
        if (this.isValidForm()) {
            this.setState({ hasToShowFormError: false });
            this.props.onSubmit({ ...this.state.fields });
        } else if (this.props.showFormErrorMessage) {
            this.setState({ hasToShowFormError: true });
        }
    }

    renderSubmitButton() {
        let Component;
        let attributes;
        if (this.props.hasToSubmit) {
            Component = Input;
            attributes = {
                type: 'submit',
                value: this.props.submitButtonText,
            };
        } else {
            Component = Button;
            attributes = {
                text: this.props.submitButtonText,
                onClick: this.onSubmit,
            };
        }

        return <Component {...attributes} />;
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

        return (
            <Container onSubmit={this.onSubmit}>
                {this.state.hasToShowFormError ? this.renderFormErrorMessage() : null}
                <FormView {...this.props}>
                    {elementsRendered}
                    {this.props.showSubmitButton ? this.renderSubmitButton() : null}
                </FormView>
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
    fields: PropTypes.array,
    container: PropTypes.any,
    fieldGroupContainer: PropTypes.any,
    fieldContainer: PropTypes.any,
    formErrorContainer: PropTypes.any,
    onSubmit: PropTypes.func,
    submitButtonText: PropTypes.string,
    customFormErrorMessage: PropTypes.string,
    method: PropTypes.string,
    hasToSubmit: PropTypes.bool,
    showSubmitButton: PropTypes.bool,
    showFormErrorMessage: PropTypes.bool,
};

FormBuilder.defaultProps = {
    form: {},
    fields: [],
    container: null,
    fieldGroupContainer: null,
    fieldContainer: null,
    formErrorContainer: null,
    hasToSubmit: true,
    showSubmitButton: true,
    showFormErrorMessage: true,
    onSubmit: () => {
    },
    submitButtonText: 'Submit',
    method: 'GET',
    customFormErrorMessage: 'Invalid fields',
};
