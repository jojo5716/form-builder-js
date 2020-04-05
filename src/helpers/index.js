require('../polyfills/arrays');

module.exports = {
    buildFormState,
    isObjectArray,
};

function getFieldNamesFromForm(formData, formState) {
    if (isObjectArray(formData)) {
        formData.forEach(group => getFieldNamesFromForm(group, formState));
    } else {
        formState[ formData.name ] = formData.value || '';
    }

    return formState;
}

function buildFormState(formData) {
    const newFormState = {};
    const fieldsValues = getFieldNamesFromForm(formData, newFormState);

    return fieldsValues;
}

function isObjectArray(object) {
    return Array.isArray(object);
}
