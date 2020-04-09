require('../polyfills/arrays');

module.exports = {
    buildFormState,
    isObjectArray,
    convertStringToCamelCase,
    removeInternalProps,
};

const mapGetterStateByElementType = {
    checkbox: elementData => elementData.checked || false,
    default: elementData => elementData.value || '',
};

const getInitialStateFromElementType = (formData) => {
    const getterStateMethod = mapGetterStateByElementType[formData.type] || mapGetterStateByElementType.default;

    return getterStateMethod(formData);
};

function getFieldNamesFromForm(formData, formState) {
    if (isObjectArray(formData)) {
        formData.forEach(group => getFieldNamesFromForm(group, formState));
    } else if (formData.fields) {
        formData.fields.forEach(group => getFieldNamesFromForm(group, formState));
    } else {
        formState[formData.name] = getInitialStateFromElementType(formData); // eslint-disable-line no-param-reassign
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
    return str.replace(/[^a-zA-Z-0-9 ]/g, '');
}

function convertStringToCamelCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2')
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
