import React from 'react';
import PropTypes from 'prop-types';

import FormView from './views/index.jsx';
import Input from './views/elements/Input';
import Button from './views/elements/Button';
import MAP_COMPONENT_INPUTS from './constants';
import { buildFormState } from './helpers';


const EMPTY_CONTAINER = ({ children }) => <React.Fragment>{children}</React.Fragment>;


class FormBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = buildFormState(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    renderInput(inputData, index) {
        const Component = MAP_COMPONENT_INPUTS[inputData.type];
        return Component ? <Component key={index} {...inputData}/> : null;
    }

    onSubmit() {
        this.props.onSubmit('submitting');
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

    render() {
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
}

export default FormBuilder;


FormBuilder.propTypes = {
    form: PropTypes.array,
    container: PropTypes.any,
    onSubmit: PropTypes.func,
    submitButtonText: PropTypes.string,
    method: PropTypes.string,
    hasToSubmit: PropTypes.bool,
    showSubmitButton: PropTypes.bool,
};

FormBuilder.defaultProps = {
    form: [],
    container: null,
    hasToSubmit: true,
    showSubmitButton: true,
    onSubmit: () => {
    },
    submitButtonText: 'Submit',
    method: 'GET',
};
