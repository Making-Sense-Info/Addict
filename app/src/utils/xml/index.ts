import * as C from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject, DDIObjectIDs, DDIObjectLabels } from "@model/ddi";

import { getCategories, getCategory } from "./Category";
import { getCategoryScheme, getCategorySchemes } from "./CategoryScheme";
import { getCodes, getCode } from "./Code";
import { getCodeList, getCodeLists } from "./CodeList";
import { getCodeListScheme, getCodeListSchemes } from "./CodeListScheme";
import { getVariable, getVariables } from "./Variable";
import { getVariableScheme, getVariableSchemes } from "./VariableScheme";

export const getDDIObjects = (xmlDoc: Document): DDIBaseObject[] => [
    ...getCategorySchemes(xmlDoc),
    ...getCategories(xmlDoc),
    ...getVariableSchemes(xmlDoc),
    ...getVariables(xmlDoc),
    ...getCodeListSchemes(xmlDoc),
    ...getCodeLists(xmlDoc),
    ...getCodes(xmlDoc)
];

export const getDDIObject = (content: Document, type: DDIObjectIDs, id: string): DDIDetailledObject => {
    if (type === C.CATEGORY_SCHEME_ID) return getCategoryScheme(content, id);
    if (type === C.CATEGORY_ID) return getCategory(content, id);
    if (type === C.VARIABLE_SCHEME_ID) return getVariableScheme(content, id);
    if (type === C.VARIABLE_ID) return getVariable(content, id);
    if (type === C.CODE_LIST_SCHEME_ID) return getCodeListScheme(content, id);
    if (type === C.CODE_LIST_ID) return getCodeList(content, id);
    if (type === C.CODE_ID) return getCode(content, id);
    throw new Error(`Unknow DDI object type: ${type}`);
};

export const getTitle = (type: DDIObjectIDs): DDIObjectLabels => {
    if (type === C.CATEGORY_SCHEME_ID) return C.CATEGORY_SCHEME_LABEL;
    if (type === C.CATEGORY_ID) return C.CATEGORY_LABEL;
    if (type === C.VARIABLE_SCHEME_ID) return C.VARIABLE_SCHEME_LABEL;
    if (type === C.VARIABLE_ID) return C.VARIABLE_LABEL;
    if (type === C.CODE_LIST_SCHEME_ID) return C.CODE_LIST_SCHEME_LABEL;
    if (type === C.CODE_LIST_ID) return C.CODE_LIST_LABEL;
    if (type === C.CODE_ID) return C.CODE_LABEL;
    throw new Error(`Unknow type: ${type}`);
};
