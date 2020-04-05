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

    let data;
    let wrapper;

    beforeEach(() => {
        data = [...formFixtures];
        wrapper = mount(<FormBuilder form={data}/>);
    });

    describe('Render element', () => {
        it('Form', () => {
            wrapper.find('form').length.should.be.eq(1);
        });

        it('Dont render anything if form prop is not an array', () => {
            wrapper = mount(<FormBuilder form={{...data}}/>);

            wrapper.find('form').length.should.be.eq(0);
        });

        it('Inputs', () => {
            wrapper.find('input').length.should.be.eq(6);
        });

        it('Custom container', () => {
            const Container = ({ children, onSubmit }) => (
                <div className="container-form">
                    {children}

                    <button onClick={onSubmit}>Custom submit form</button>
                </div>
            );
            wrapper = mount(<FormBuilder form={data} container={Container}/>);

            wrapper.find('.container-form').length.should.be.eq(1);
        });

        it('Default container', () => {
            wrapper = mount(<FormBuilder form={data} container={null}/>);

            wrapper.find('EMPTY_CONTAINER').length.should.be.eq(10);
        });

        it('Submit button', () => {
            wrapper = mount(<FormBuilder form={data} showSubmitButton={false}/>);

            wrapper.find('input[type="submit"]').length.should.be.eq(0);
        });

        describe('Input', () => {
            it('Text', () => {
                wrapper.find('input[type="text"]').length.should.be.eq(2);
            });

            it('Invalid type dont will be rendered', () => {
                const newForm = [...data, { type: 'invalid-type' }];
                wrapper = mount(<FormBuilder form={newForm} showSubmitButton={false}/>);

                wrapper.find('input').length.should.be.eq(6);
            });

        });

        describe('onClick submit button', () => {
            it('onSubmit prop is called and hasToShowFormError state is change to false if form is valid', () => {
                const onSubmitMock = jest.fn();
                const form = [{
                    name: 'name',
                    type: 'text',
                    value: 'Jhon',
                }];

                wrapper = mount(<FormBuilder form={form} onSubmit={onSubmitMock} hasToSubmit={false}/>);

                const buttonElement = wrapper.find('button');

                buttonElement.simulate('click');

                buttonElement.length.should.be.eq(1);

                expect(onSubmitMock.mock.calls.length).toBe(1);

                expect(onSubmitMock).toHaveBeenCalledWith({ name: 'Jhon' });

            });

            it('show form error message if form is not valid', () => {
                const onSubmitMock = jest.fn();
                const form = [{
                    name: 'name',
                    type: 'text',
                    value: '',
                }];

                FormBuilder.prototype.isValidForm = () => false;
                wrapper = mount(<FormBuilder form={form} onSubmit={onSubmitMock} hasToSubmit={false}/>);

                const buttonElement = wrapper.find('button');

                buttonElement.simulate('click');

                buttonElement.length.should.be.eq(1);

                expect(onSubmitMock.mock.calls.length).toBe(0);

                expect(wrapper.state().hasToShowFormError).toBe(true);
            });
            it('onSubmit do anything if showFormErrorMessage is false and form is invalid', () => {
                const onSubmitMock = jest.fn();
                const form = [{
                    name: 'name',
                    type: 'text',
                    value: '',
                }];

                FormBuilder.prototype.isValidForm = () => false;
                wrapper = mount(
                    <FormBuilder
                        form={form}
                        onSubmit={onSubmitMock}
                        hasToSubmit={false}
                        showFormErrorMessage={false}
                    />
                );

                const buttonElement = wrapper.find('button');

                buttonElement.simulate('click');

                buttonElement.length.should.be.eq(1);

                expect(wrapper.state().hasToShowFormError).toBe(false);
            });
        });
    });
});
