// Input elements
import BasicInput from './views/elements/inputs/BasicInput';
import BasicRadio from './views/elements/inputs/radio/BasicRadio';


export const MAP_INPUT_TYPES = {
    default: BasicInput,
    radio: BasicRadio,
};

export const MAP_ELEMENTS = {
    input: MAP_INPUT_TYPES,
    default: MAP_INPUT_TYPES,
};
