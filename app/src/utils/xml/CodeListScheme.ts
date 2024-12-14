import {
    CODE_LIST_SCHEME_ID,
    CODE_LIST_SCHEME_XML_TAG,
    DDI_INSTANCE_XML_TAG,
    DDI_L_NAMESPACE
} from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getCodeLists } from "./CodeList";
import { getXMLCode, getElementURN, getLabelsByLang, getPreferedLabel, getParentNode } from "./common";

export const getCodeListSchemes = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const codeListSchemes = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CODE_LIST_SCHEME_XML_TAG);
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
    const codeListSchemes = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CODE_LIST_SCHEME_XML_TAG);
    const codeListScheme = Array.from(codeListSchemes).find(c => {
        const foundId = c.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!codeListScheme) throw new Error(`Unknow Code list Scheme: ${id}`);

    const labels = codeListScheme.querySelectorAll(":scope > CodeListSchemeName > String");
    const contains = getCodeLists(codeListScheme);

    const ddiInstanceElement = codeListScheme.closest(DDI_INSTANCE_XML_TAG) as Element;
    const parentElement = getParentNode(ddiInstanceElement);

    return {
        URN: getElementURN(codeListScheme),
        labels: getLabelsByLang(labels),
        contains,
        containedIn: parentElement,
        code: getXMLCode(codeListScheme)
    };
};
