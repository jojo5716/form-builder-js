require('../polyfills/arrays');

module.exports = {
    buildFormState,
    isObjectArray,
};

function getFieldNamesFromForm(formData, formState) {
    if (isObjectArray(formData)) {
        formData.forEach(group => getFieldNamesFromForm(group, formState));
    } else {
        formState[formData.name] = formData.value || ''; // eslint-disable-line no-param-reassign
    }

    return formState;
}

function buildFormState(formData) {
    const newFormState = {};

    return getFieldNamesFromForm(formData, newFormState);
}

function isObjectArray(object) {
    return Array.isArray(object);
}
