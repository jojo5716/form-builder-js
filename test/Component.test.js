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

        it('Inputs', () => {
            wrapper.find('input').length.should.be.eq(2);
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

            wrapper.find('EMPTY_CONTAINER').length.should.be.eq(1);

        });

        it('Submit button', () => {
            wrapper = mount(<FormBuilder form={data} showSubmitButton={false}/>);

            wrapper.find('input[type="submit"]').length.should.be.eq(0);
        });

        describe('Input', () => {
            it('Text', () => {
                wrapper.find('input[type="text"]').length.should.be.eq(1);
            });

            it('Invalid type dont will be rendered', () => {
                const newForm = [...data, { type: 'invalid-type' }];
                wrapper = mount(<FormBuilder form={newForm} showSubmitButton={false}/>);

                wrapper.find('input').length.should.be.eq(1);
            });

        });

        describe('Button', () => {
            it('onClick prop is called when hasToSubmit is false', () => {
                const onSubmitMock = jest.fn();
                wrapper = mount(<FormBuilder form={data} onSubmit={onSubmitMock} hasToSubmit={false}/>);

                const buttonElement = wrapper.find('button');

                buttonElement.simulate('click');

                buttonElement.length.should.be.eq(1);

                expect(onSubmitMock.mock.calls.length).toBe(1);
            });
        });

    });


});
