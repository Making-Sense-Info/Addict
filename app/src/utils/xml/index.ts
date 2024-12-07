import { CATEGORY_SCHEME_ID, CATEGORY_ID, CATEGORY_SCHEME_LABEL, CATEGORY_LABEL } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject, DDIObjectIDs, DDIObjectLabels } from "@model/ddi";

import { getCategories, getCategory } from "./Category";
import { getCategoryScheme, getCategorySchemes } from "./CategoryScheme";

export const getDDIObjects = (xmlDoc: Document): DDIBaseObject[] => [
    ...getCategorySchemes(xmlDoc),
    ...getCategories(xmlDoc)
];

export const getDDIObject = (content: Document, type: DDIObjectIDs, id: string): DDIDetailledObject => {
    if (type === CATEGORY_SCHEME_ID) return getCategoryScheme(content, id);
    if (type === CATEGORY_ID) return getCategory(content, id);
    throw new Error(`Unknow DDI object type: ${type}`);
};

export const getTitle = (type: DDIObjectIDs): DDIObjectLabels => {
    if (type === "category-scheme") return CATEGORY_SCHEME_LABEL;
    if (type === "category") return CATEGORY_LABEL;
    throw new Error(`Unknow type: ${type}`);
};
