import {
    CATEGORY_SCHEME_ID,
    CATEGORY_SCHEME_XML_TAG,
    DDI_INSTANCE_XML_TAG,
    DDI_L_NAMESPACE
} from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getCategories } from "./Category";
import { getXMLCode, getElementURN, getLabelsByLang, getPreferedLabel, getParentNode } from "./common";

export const getCategorySchemes = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const categorySchemes = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CATEGORY_SCHEME_XML_TAG);
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
    const categorySchemes = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CATEGORY_SCHEME_XML_TAG);
    const categoryScheme = Array.from(categorySchemes).find(c => {
        const foundId = c.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!categoryScheme) throw new Error(`Unknow Category Scheme: ${id}`);

    const labels = categoryScheme.querySelectorAll(":scope > Label > Content");
    const contains = getCategories(categoryScheme);

    const ddiInstanceElement = categoryScheme.closest(DDI_INSTANCE_XML_TAG) as Element;
    const parentElement = getParentNode(ddiInstanceElement);

    return {
        URN: getElementURN(categoryScheme),
        labels: getLabelsByLang(labels),
        contains,
        containedIn: parentElement,
        code: getXMLCode(categoryScheme)
    };
};
