// Input elements
import BasicInput from './views/elements/inputs/BasicInput';
import BasicRadio from './views/elements/inputs/radio/BasicRadio';
import BasicFile from './views/elements/inputs/file/BasicFile';

// Checkbox elements
import BasicCheckBox from './views/elements/inputs/checkbox/BasicCheckBox';

// Select elements
import BasicSelect from './views/elements/select/BasicSelect';

// Select elements
import BasicTextArea from './views/elements/textarea/BasicTextArea';


export const MAP_INPUT_TYPES = {
    default: BasicInput,
    radio: BasicRadio,
    checkbox: BasicCheckBox,
    file: BasicFile,
};

export const MAP_SELECT_TYPES = {
    default: BasicSelect,
};

export const MAP_TEXTAREA_TYPES = {
    default: BasicTextArea,
};

export const MAP_ELEMENTS = {
    input: MAP_INPUT_TYPES,
    select: MAP_SELECT_TYPES,
    textarea: MAP_TEXTAREA_TYPES,
    default: MAP_INPUT_TYPES,
};
