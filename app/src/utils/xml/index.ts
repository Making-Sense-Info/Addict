import {
    CATEGORY_SCHEME_ID,
    CATEGORY_ID,
    CATEGORY_SCHEME_LABEL,
    CATEGORY_LABEL,
    VARIABLE_ID,
    VARIABLE_LABEL,
    VARIABLE_SCHEME_ID,
    VARIABLE_SCHEME_LABEL
} from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject, DDIObjectIDs, DDIObjectLabels } from "@model/ddi";

import { getCategories, getCategory } from "./Category";
import { getCategoryScheme, getCategorySchemes } from "./CategoryScheme";
import { getVariable, getVariables } from "./Variable";
import { getVariableScheme, getVariableSchemes } from "./VariableScheme";

export const getDDIObjects = (xmlDoc: Document): DDIBaseObject[] => [
    ...getCategorySchemes(xmlDoc),
    ...getCategories(xmlDoc),
    ...getVariableSchemes(xmlDoc),
    ...getVariables(xmlDoc)
];

export const getDDIObject = (content: Document, type: DDIObjectIDs, id: string): DDIDetailledObject => {
    if (type === CATEGORY_SCHEME_ID) return getCategoryScheme(content, id);
    if (type === CATEGORY_ID) return getCategory(content, id);
    if (type === VARIABLE_SCHEME_ID) return getVariableScheme(content, id);
    if (type === VARIABLE_ID) return getVariable(content, id);
    throw new Error(`Unknow DDI object type: ${type}`);
};

export const getTitle = (type: DDIObjectIDs): DDIObjectLabels => {
    if (type === CATEGORY_SCHEME_ID) return CATEGORY_SCHEME_LABEL;
    if (type === CATEGORY_ID) return CATEGORY_LABEL;
    if (type === VARIABLE_SCHEME_ID) return VARIABLE_SCHEME_LABEL;
    if (type === VARIABLE_ID) return VARIABLE_LABEL;
    throw new Error(`Unknow type: ${type}`);
};
