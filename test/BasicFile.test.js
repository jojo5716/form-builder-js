/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */

import React from 'react';
import { mount } from 'enzyme';

import BasicFile from '../src/views/elements/inputs/file/BasicFile';


describe('File element', () => {
    let data;

    beforeEach(() => {
        data = {
            id: 'tags',
            element: 'input',
            type: 'file',
            name: 'tag1',
            className: 'form-control',
            label: 'Tag 1',
            onChange: (event) => {
                console.log(`Tag: ${event.target.value}`);
            },
        };
    });


    describe('BasicFile', () => {
        it('call setFieldValueState without any file if change without upload ', () => {
            const setFieldValueStateMock = jest.fn();
            const onChangeMock = jest.fn();

            const wrapper = mount(
                <BasicFile
                    {...data}
                    onChange={onChangeMock}
                    setFieldValueState={setFieldValueStateMock}
                />,
            );

            wrapper.instance().isFieldValid = () => true;

            const event = { target: { files: [] } };

            wrapper.find('input[type="file"]').simulate('change', event);

            wrapper.update();

            expect(setFieldValueStateMock).toHaveBeenCalledWith(undefined);

            expect(wrapper.state().hasToShowErrorMessage).toBe(false);
        });

        it('current_test call setFieldValueState with file content on change ', () => {
            const setFieldValueStateMock = jest.fn();
            const onChangeMock = jest.fn();
            window.URL.createObjectURL = jest.fn(() => 'localhost:8080/file.jpg');

            const wrapper = mount(
                <BasicFile
                    {...data}
                    onChange={onChangeMock}
                    setFieldValueState={setFieldValueStateMock}
                />,
            );

            wrapper.instance().isFieldValid = () => true;

            const event = {
                target: {
                    files: [
                        { file: 'file.jpg', src: 'localhost:8080/file.jpg' }
                    ]
                }
            };

            wrapper.find('input[type="file"]').simulate('change', event);

            wrapper.update();

            expect(setFieldValueStateMock).toHaveBeenCalledWith(
                [
                    {
                        "file": {
                            "file": "file.jpg", "src": "localhost:8080/file.jpg"
                        },
                        "id": 0,
                        "src": "localhost:8080/file.jpg"
                    }]
            );

            expect(wrapper.state().hasToShowErrorMessage).toBe(false);
        });

    });
});
