import { CODE_LIST_SCHEME_ID, CODE_LIST_SCHEME_XML_PATH, DDI_INSTANCE_ID } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getCodeLists } from "./CodeList";
import {
    getXMLCode,
    getElementURN,
    getLabelsByLang,
    getPreferedLabel,
    getElementContent
} from "./common";

export const getCodeListSchemes = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const codeListSchemes = xmlDoc.getElementsByTagName(CODE_LIST_SCHEME_XML_PATH);
    return Array.from(codeListSchemes).map(c => {
        const labels = c.querySelectorAll(":scope > CodeListSchemeName > String");
        return {
            URN: getElementURN(c),
            label: getPreferedLabel(getLabelsByLang(labels)),
            type: CODE_LIST_SCHEME_ID
        };
    });
};

export const getCodeListScheme = (xmlDoc: Document, id: string): DDIDetailledObject => {
    const codeListSchemes = xmlDoc.getElementsByTagName(CODE_LIST_SCHEME_XML_PATH);
    const codeListScheme = Array.from(codeListSchemes).find(c => {
        const foundId = c.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!codeListScheme) throw new Error(`Unknow Code list Scheme: ${id}`);

    const labels = codeListScheme.querySelectorAll(":scope > CodeListSchemeName > String");
    const contains = getCodeLists(codeListScheme);

    const ddiInstance = codeListScheme.closest("DDIInstance") as Element;
    const containedInURN = getElementURN(ddiInstance);
    const containedInLabel = getElementContent(ddiInstance);

    return {
        URN: getElementURN(codeListScheme),
        labels: getLabelsByLang(labels),
        contains,
        containedIn: { type: DDI_INSTANCE_ID, URN: containedInURN, label: containedInLabel },
        code: getXMLCode(codeListScheme)
    };
};
