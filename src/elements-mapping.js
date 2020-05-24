export const MAP_INPUT_TYPES = {
    radio: import('./views/elements/inputs/radio/BasicRadio'),
    checkbox: import('./views/elements/inputs/checkbox/BasicCheckBox'),
    default: import('./views/elements/inputs/BasicInput'),
};

export const MAP_SELECT_TYPES = {
    default: import('./views/elements/select/BasicSelect'),
};

export const MAP_TEXTAREA_TYPES = {
    default: import('./views/elements/textarea/BasicTextArea'),
};

export const MAP_ELEMENTS = {
    input: MAP_INPUT_TYPES,
    select: MAP_SELECT_TYPES,
    textarea: MAP_TEXTAREA_TYPES,
    default: MAP_INPUT_TYPES,
};

export const map = new Map([['input', MAP_INPUT_TYPES]]);
