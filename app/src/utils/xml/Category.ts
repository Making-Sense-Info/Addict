import {
    CATEGORY_ID,
    CATEGORY_XML_PATH,
    CATEGORY_SCHEME_ID,
    CODE_ID,
    CODE_XML_PATH
} from "@utils/contants";

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

    // TODO: extract? share? refacto?
    const categoryURN = getElementURN(category);
    const codeUses: DDIBaseObject[] = Array.from(xmlDoc.getElementsByTagName(CODE_XML_PATH))
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
        containedIn: { type: CATEGORY_SCHEME_ID, URN: containedInURN, label: containedInLabel },
        usedIn: codeUses,
        code: getXMLCode(category)
    };
};
