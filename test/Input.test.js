/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */

import React from 'react';
import { mount, shallow } from 'enzyme';
import chai from 'chai';


import BasicInput from '../src/views/elements/inputs/BasicInput';

chai.should();

describe('Input element', () => {
    let data;
    let wrapper;

    beforeEach(() => {
        data = {
            type: 'text',
            elementType: 'input',
            name: 'name',
            minLength: 5,
            required: true,
        };
        wrapper = mount(<BasicInput {...data}/>);
    });

    describe('BasicInput', () => {
        it('Render input element', () => {
            wrapper.find('input[type="text"]').length.should.be.eq(1);
        });

        it('Render custom container', () => {
            const customContainer = ({ children }) => <h1>{children}</h1>;

            wrapper = mount(<BasicInput {...data} fieldContainer={customContainer}/>);

            wrapper.find('h1').length.should.be.eq(1);
        });

        it('Render default container', () => {
            wrapper = mount(<BasicInput {...data} />);

            wrapper.find('EMPTY_CONTAINER').length.should.be.eq(1);
        });

        it('Render field error', () => {
            wrapper = mount(<BasicInput {...data} />);

            wrapper.instance().setState({
                hasToShowErrorMessage: true,
            });

            wrapper.update();
            wrapper.find('span').length.should.be.eq(1);
        });

        describe('onChange', () => {
            it('call setFieldValueState and onChange prop callbacks if field is valid ', async () => {
                const setFieldValueStateMock = jest.fn();
                const onChangeMock = jest.fn();
                // Input.prototype.isFieldValid = () => true;

                wrapper = shallow(
                    <BasicInput
                        {...data}
                        onChange={onChangeMock}
                        setFieldValueState={setFieldValueStateMock}
                    />,
                );

                wrapper.instance().isFieldValid = () => true;

                const event = { target: { value: 'Jhon Doe' } };

                wrapper.find('input[type="text"]').simulate('change', event);

                expect(setFieldValueStateMock).toHaveBeenCalledWith('Jhon Doe');

                expect(onChangeMock).toHaveBeenCalledWith(event);

                wrapper.update();

                expect(wrapper.state().hasToShowErrorMessage).toBe(false);
            });

            it('set hasToShowErrorMessage state true if field is not valid ', () => {
                wrapper = mount(<BasicInput {...data}/>);

                const event = { target: { value: 's' } };

                wrapper.find('input[type="text"]').simulate('change', event);

                expect(wrapper.state().hasToShowErrorMessage).toBe(true);
            });
        });
    });
});
