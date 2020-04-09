/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */

import React from 'react';
import { mount } from 'enzyme';
import chai from 'chai';

import formFixtures from '../example/fixtures';
import FormBuilder from '../src';

chai.should();

describe('FormBuilder', () => {

    let fields;
    let wrapper;

    beforeEach(() => {
        fields = [...formFixtures];
        wrapper = mount(<FormBuilder fields={fields}/>);
    });

    describe('Render element', () => {
        it('Form', () => {
            wrapper.find('form').length.should.be.eq(1);
        });

        it('Dont render anything if fields prop is not an array', () => {
            wrapper = mount(<FormBuilder fields={{ ...fields }}/>);

            wrapper.find('form').length.should.be.eq(0);
        });

        it('Inputs', () => {
            wrapper.find('input').length.should.be.eq(8);
        });

        it('Custom container', () => {
            const Container = ({ children, onSubmit }) => (
                <div className="container-form">
                    {children}

                    <button onClick={onSubmit}>Custom submit form</button>
                </div>
            );
            wrapper = mount(<FormBuilder fields={fields} container={Container}/>);

            wrapper.find('.container-form').length.should.be.eq(1);
        });

        it('Default container', () => {
            wrapper = mount(<FormBuilder fields={fields} container={null}/>);

            wrapper.find('EMPTY_CONTAINER').length.should.be.eq(11);
        });

        it('Submit button', () => {
            wrapper = mount(<FormBuilder fields={fields} showSubmitButton={false}/>);

            wrapper.find('input[type="submit"]').length.should.be.eq(0);
        });

        describe('Input', () => {
            it('Text', () => {
                wrapper.find('input[type="text"]').length.should.be.eq(2);
            });

            it('Invalid type dont will be rendered', () => {
                const newForm = [...fields, { type: 'invalid-type' }];
                wrapper = mount(<FormBuilder fields={newForm} showSubmitButton={false}/>);

                wrapper.find('input').length.should.be.eq(8);
            });

        });

        describe('onClick submit button', () => {
            it('onSuccess prop is called and hasToShowFormError state is change to false if fields is valid', () => {
                const onSuccessMock = jest.fn();
                const customFields = [{
                    name: 'name',
                    type: 'text',
                    value: 'Jhon',
                }];

                wrapper = mount(<FormBuilder fields={customFields} onSuccess={onSuccessMock} hasToSubmit={false}/>);

                const buttonElement = wrapper.find('button');

                buttonElement.simulate('click');

                buttonElement.length.should.be.eq(1);

                expect(onSuccessMock.mock.calls.length).toBe(1);

                expect(onSuccessMock).toHaveBeenCalledWith({ name: 'Jhon' });

            });

            it('show fields error message if fields is not valid', () => {
                const onSubmitMock = jest.fn();
                const form = [{
                    name: 'name',
                    type: 'text',
                    value: '',
                }];

                FormBuilder.prototype.isValidForm = () => false;
                wrapper = mount(<FormBuilder fields={form} onSubmit={onSubmitMock} hasToSubmit={false}/>);

                const buttonElement = wrapper.find('button');

                buttonElement.simulate('click');

                buttonElement.length.should.be.eq(1);

                expect(onSubmitMock.mock.calls.length).toBe(0);

                expect(wrapper.state().hasToShowFormError).toBe(true);
            });

            it('onSuccess do anything if showFormErrorMessage is false and fields is invalid', () => {
                const onSubmitMock = jest.fn();
                const form = [{
                    name: 'name',
                    type: 'text',
                    value: '',
                }];

                FormBuilder.prototype.isValidForm = () => false;
                wrapper = mount(
                    <FormBuilder
                        fields={form}
                        onSubmit={onSubmitMock}
                        hasToSubmit={false}
                        showFormErrorMessage={false}
                    />,
                );

                const buttonElement = wrapper.find('button');

                buttonElement.simulate('click');

                buttonElement.length.should.be.eq(1);

                expect(wrapper.state().hasToShowFormError).toBe(false);
            });
        });
    });
});
