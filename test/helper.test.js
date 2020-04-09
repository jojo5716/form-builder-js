/* eslint-env node, jest */
import { buildFormState } from '../src/helpers';
import fields from '../example/fixtures';


describe.only('Helpers', () => {
    beforeEach(() => {

    });

    describe('Index', () => {
        it('buildFormState return fields initial state', () => {
            const expectedState = {
                birthday: '',
                email: '',
                gender: 'male',
                lastName: '',
                mobile: '',
                name: '',
            };

            const fieldsState = buildFormState(fields);

            expect(fieldsState).toEqual(expectedState);
        });
    });
});
