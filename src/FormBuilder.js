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
        this.state = buildFormState(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.nodes = [];
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
        const elementsRendered = this.props.form.map(this.renderInput);
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
    fieldContainer: null,
    hasToSubmit: true,
    showSubmitButton: true,
    onSubmit: () => {
    },
    submitButtonText: 'Submit',
    method: 'GET',
};
