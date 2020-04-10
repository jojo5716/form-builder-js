// Input elements
import BasicInput from './views/elements/inputs/BasicInput';
import BasicRadio from './views/elements/inputs/radio/BasicRadio';

// Checkbox elements
import BasicCheckBox from './views/elements/inputs/checkbox/BasicCheckBox';

// Select elements
import BasicSelect from './views/elements/select/BasicSelect';

export const MAP_INPUT_TYPES = {
    default: BasicInput,
    radio: BasicRadio,
    checkbox: BasicCheckBox,
};

export const MAP_SELECT_TYPES = {
    default: BasicSelect,
};

export const MAP_ELEMENTS = {
    input: MAP_INPUT_TYPES,
    select: MAP_SELECT_TYPES,
    default: MAP_INPUT_TYPES,
};
