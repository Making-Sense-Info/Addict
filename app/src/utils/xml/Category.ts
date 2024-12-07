import { CATEGORY_ID, CATEGORY_XML_PATH, CATEGORY_SCHEME_ID } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getElementLabel, getElementURN, getLabelsByLang, getPreferedLabel } from "./common";

export const getCategories = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const categories = xmlDoc.getElementsByTagName(CATEGORY_XML_PATH);
    return Array.from(categories).map(c => {
        const labels = c.getElementsByTagName("r:Content");
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
    const labels = category.getElementsByTagName("r:Content");

    // Find parent
    const categoryScheme = category.closest("CategoryScheme") as Element;
    const parentURN = getElementURN(categoryScheme);
    const parentLabel = getElementLabel(categoryScheme);
    // TODO find parent
    return {
        URN: getElementURN(category),
        labels: getLabelsByLang(labels),
        parent: { type: CATEGORY_SCHEME_ID, URN: parentURN, label: parentLabel }
    };
};
