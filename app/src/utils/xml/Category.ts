import { CATEGORY_ID, CATEGORY_XML_PATH, CATEGORY_SCHEME_ID } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import {
    getXMLCode,
    getElementContent,
    getElementURN,
    getLabelsByLang,
    getPreferedLabel
} from "./common";

export const getCategories = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const categories = xmlDoc.getElementsByTagName(CATEGORY_XML_PATH);
    return Array.from(categories).map(c => {
        const labels = c.querySelectorAll(":scope > Label > Content");
        return {
            URN: getElementURN(c),
            label: getPreferedLabel(getLabelsByLang(labels)),
            type: CATEGORY_ID
        };
    });
};

export const getCategory = (xmlDoc: Document, id: string): DDIDetailledObject => {
    const categories = xmlDoc.getElementsByTagName(CATEGORY_XML_PATH);
    const category = Array.from(categories).find(c => {
        const foundId = c.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!category) throw new Error(`Unknow Category Scheme: ${id}`);
    const labels = category.querySelectorAll(":scope > Label > Content");

    const categoryScheme = category.closest("CategoryScheme") as Element;
    const containedInURN = getElementURN(categoryScheme);
    const containedInLabel = getElementContent(categoryScheme);

    return {
        URN: getElementURN(category),
        labels: getLabelsByLang(labels),
        containedIn: { type: CATEGORY_SCHEME_ID, URN: containedInURN, label: containedInLabel },
        code: getXMLCode(category)
    };
};
