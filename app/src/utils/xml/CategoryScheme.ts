import { CATEGORY_SCHEME_ID, CATEGORY_SCHEME_XML_PATH } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getCategories } from "./Category";
import { getXMLCode, getElementURN, getLabelsByLang, getPreferedLabel } from "./common";

export const getCategorySchemes = (xmlDoc: Document): DDIBaseObject[] => {
    const categorySchemes = xmlDoc.getElementsByTagName(CATEGORY_SCHEME_XML_PATH);
    return Array.from(categorySchemes).map(c => {
        const labels = c.querySelectorAll(":scope > Label > Content");
        return {
            URN: getElementURN(c),
            label: getPreferedLabel(getLabelsByLang(labels)),
            type: CATEGORY_SCHEME_ID
        };
    });
};

export const getCategoryScheme = (xmlDoc: Document, id: string): DDIDetailledObject => {
    const categorySchemes = xmlDoc.getElementsByTagName(CATEGORY_SCHEME_XML_PATH);
    const categoryScheme = Array.from(categorySchemes).find(c => {
        const foundId = c.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!categoryScheme) throw new Error(`Unknow Category Scheme: ${id}`);

    const labels = categoryScheme.querySelectorAll(":scope > Label > Content");
    const contains = getCategories(categoryScheme);

    // TODO find parent
    return {
        URN: getElementURN(categoryScheme),
        labels: getLabelsByLang(labels),
        contains,
        code: getXMLCode(categoryScheme)
    };
};
