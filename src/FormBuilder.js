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
        this.state = buildFormState(props.form);
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
                        inputData.map((element, inputIndex) =>
                            this.renderElement(element, `index-${element.name}-${inputIndex}`))
                    }
                </Container>
            );
        } else {
            html = this.renderInput(inputData, index);
        }

        return html;
    }

    renderInput(inputData, index) {
        const Component = MAP_COMPONENT_INPUTS[ inputData.type ] || MAP_COMPONENT_INPUTS.default;
        const setFieldValueState = elementValue => this.setState({ [ inputData.name ]: elementValue });
        const reference = React.createRef();
        this.nodes.push(reference);

        return Component ? <Component
            key={index}
            reference={el => this.nodes.push(el)}
            {...inputData}
            setFieldValueState={setFieldValueState}
            fieldContainer={this.props.fieldContainer}
        /> : null;
    }

    isValidForm() {
        console.log(this.nodes);
    }

    onSubmit() {
        if (this.isValidForm()) {
            this.props.onSubmit({ ...this.state });

        } else {
            console.log('Invalid form');
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

    renderForm() {
        const elementsRendered = this.props.form.map(this.renderElement);
        const Container = this.props.container || EMPTY_CONTAINER;

        return (
            <Container onSubmit={this.onSubmit}>
                <FormView {...this.props}>
                    {elementsRendered}
                    {this.props.showSubmitButton ? this.renderSubmitButton() : null}
                </FormView>
            </Container>
        );
    }

    render() {
        return isObjectArray(this.props.form) ? this.renderForm() : null;
    }
}

export default FormBuilder;


FormBuilder.propTypes = {
    form: PropTypes.array,
    container: PropTypes.any,
    fieldGroupContainer: PropTypes.any,
    fieldContainer: PropTypes.any,
    onSubmit: PropTypes.func,
    submitButtonText: PropTypes.string,
    method: PropTypes.string,
    hasToSubmit: PropTypes.bool,
    showSubmitButton: PropTypes.bool,
};

FormBuilder.defaultProps = {
    form: [],
    container: null,
    fieldGroupContainer: null,
    fieldContainer: null,
    hasToSubmit: true,
    showSubmitButton: true,
    onSubmit: () => {
    },
    submitButtonText: 'Submit',
    method: 'GET',
};
