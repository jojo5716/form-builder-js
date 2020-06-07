require('../polyfills/arrays');

module.exports = {
    buildFormState,
    isObjectArray,
    convertStringToCamelCase,
    removeInternalProps,
};

const mapGetterStateByElementType = {
    checkbox: (elementData, initialState) => initialState || elementData.checked || false,
    default: (elementData, initialState) => initialState || elementData.value || '',
};

const getInitialStateFromElementType = (formData, initialState) => {
    const getterStateMethod = mapGetterStateByElementType[formData.type] || mapGetterStateByElementType.default;

    return getterStateMethod(formData, initialState);
};

function getFieldNamesFromForm(formData, formState, initialState) {
    if (isObjectArray(formData)) {
        formData.forEach(group => getFieldNamesFromForm(group, formState, initialState));
    } else if (formData.fields) {
        formData.fields.forEach(group => getFieldNamesFromForm(group, formState, initialState));
    } else {
        const isRadioButton = formData.type === 'radio';
        const isRadioButtonDefaultValue = isRadioButton && formData.checked;
        const existRadioButtonFieldState = isRadioButton && !!formState[formData.name];
        const fieldState = formState[formData.name];

        if (!fieldState || (isRadioButton && (isRadioButtonDefaultValue || !existRadioButtonFieldState))) {
            console.log(formState)
            formState[formData.name] = getInitialStateFromElementType(formData, initialState[formData.name]); // eslint-disable-line
        }
    }

    return formState;
}

function buildFormState({ fields, initialState={} }) {
    const newFormState = {};

    return getFieldNamesFromForm(fields, newFormState, initialState);
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
    return str.replace(/([a-z])([A-Z])/g, '$1$2')
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
