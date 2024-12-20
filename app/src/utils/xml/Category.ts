import {
    CATEGORY_ID,
    CATEGORY_XML_TAG,
    CODE_ID,
    CODE_XML_TAG,
    DDI_L_NAMESPACE,
    CATEGORY_SCHEME_XML_TAG
} from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getXMLCode, getElementURN, getLabelsByLang, getPreferedLabel, getParentNode } from "./common";

export const getCategories = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const categories = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CATEGORY_XML_TAG);
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
    const categories = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CATEGORY_XML_TAG);
    const category = Array.from(categories).find(c => {
        const foundId = c.querySelector("ID")?.textContent;
        return id === foundId;
    });

    if (!category) throw new Error(`Unknow Category: ${id}`);
    const labels = category.querySelectorAll(":scope > Label > Content");

    const categorySchemeElement = category.closest(CATEGORY_SCHEME_XML_TAG) as Element;
    const parentElement = getParentNode(categorySchemeElement);

    const categoryURN = getElementURN(category);

    // TODO: extract? share? refacto?
    const codeUses: DDIBaseObject[] = Array.from(
        xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CODE_XML_TAG)
    )
        .reduce((acc, q) => {
            const categoryReferences = q.querySelectorAll("CategoryReference");
            const cr = Array.from(categoryReferences).filter(c => getElementURN(c) === categoryURN);
            if (cr.length > 0) return [...acc, q];
            return acc;
        }, [] as Element[])
        .map(q => {
            const labels = q.querySelectorAll(":scope > Value");
            return {
                URN: getElementURN(q),
                label: getPreferedLabel(getLabelsByLang(labels)),
                type: CODE_ID
            };
        });

    return {
        URN: categoryURN,
        labels: getLabelsByLang(labels),
        containedIn: parentElement,
        usedIn: codeUses,
        code: getXMLCode(category)
    };
};
