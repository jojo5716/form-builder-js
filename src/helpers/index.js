require('../polyfills/arrays');

module.exports = {
    buildFormState,
    isObjectArray,
    convertStringToCamelCase,
    removeInternalProps,
};

function getFieldNamesFromForm(formData, formState) {
    if (isObjectArray(formData)) {
        formData.forEach(group => getFieldNamesFromForm(group, formState));
    } else if (formData.fields) {
        formData.fields.forEach(group => getFieldNamesFromForm(group, formState));
    } else {
        formState[formData.name] = formData.value || ''; // eslint-disable-line no-param-reassign
    }

    return formState;
}

function buildFormState({ fields }) {
    const newFormState = {};
    return getFieldNamesFromForm(fields, newFormState);
}

function isObjectArray(object) {
    return Array.isArray(object);
}

function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

function removeSpecialCharacterFromString(str) {
    return str.replace(/[^a-zA-Z ]/g, '');
}

function convertStringToCamelCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .split('')
        .map((word, index) => {
            const wordTransformed = removeSpecialCharacterFromString(word);
            return (index === 0) ? capitalize(wordTransformed) : wordTransformed.toLowerCase();

        })
        .join('');
}

function removeInternalProps(props, attributesToDelete = []) {
    const propsCloned = { ...props };
    attributesToDelete.forEach((attribute) => {
        delete propsCloned[attribute];
    });

    return propsCloned;
}
