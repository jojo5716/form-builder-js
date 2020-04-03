/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */

import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';

import fixtures from '../example/fixtures';
import FormBuilder from '../src';

chai.should();

describe('FormBuilder', () => {

    let data;

    beforeEach(() => {
        data = Object.assign({}, fixtures);
    });

    it('renders a form', () => {
        const wrapper = shallow(<FormBuilder {...data}/>);
        wrapper.is('Container').should.be.true;
    });


});
