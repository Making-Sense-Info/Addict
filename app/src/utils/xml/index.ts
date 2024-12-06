import { CATEGORY_SCHEME_ID, CATEGORY_SCHEME_LABEL } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject, DDIObjectIDs, DDIObjectLabels } from "@model/ddi";

import { getCategoryScheme, getCategorySchemes } from "./CategoryScheme";

export const getDDIObjects = (xmlDoc: Document): DDIBaseObject[] => [...getCategorySchemes(xmlDoc)];

export const getDDIObject = (content: Document, type: DDIObjectIDs, id: string): DDIDetailledObject => {
    if (type === CATEGORY_SCHEME_ID) return getCategoryScheme(content, id);
    throw new Error(`Unknow DDI object type: ${type}`);
};

export const getTitle = (type: DDIObjectIDs): DDIObjectLabels => {
    if (type === "category-scheme") return CATEGORY_SCHEME_LABEL;
    throw new Error(`Unknow type: ${type}`);
};
