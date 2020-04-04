require('../polyfills/arrays');

module.exports = {
    buildFormState,
    isObjectArray,
};

function buildFormState(formData) {
    const formState = {};
    formData.form.forEach((element) => {
        formState[ element.name ] = element.value || '';
    });

    return formState;
}

function isObjectArray(object) {
    return Array.isArray(object);
}
