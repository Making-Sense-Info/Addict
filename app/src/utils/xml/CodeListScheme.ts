import { CODE_LIST_SCHEME_ID, CODE_LIST_SCHEME_XML_PATH } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getCodeLists } from "./CodeList";
import { getXMLCode, getElementURN, getLabelsByLang, getPreferedLabel } from "./common";

export const getCodeListSchemes = (xmlDoc: Document): DDIBaseObject[] => {
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
    const codeLists = xmlDoc.getElementsByTagName(CODE_LIST_SCHEME_XML_PATH);
    const codeList = Array.from(codeLists).find(c => {
        const foundId = c.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!codeList) throw new Error(`Unknow Code list Scheme: ${id}`);

    const labels = codeList.querySelectorAll(":scope > CodeListSchemeName > String");
    const contains = getCodeLists(codeList);

    // TODO find parent
    return {
        URN: getElementURN(codeList),
        labels: getLabelsByLang(labels),
        contains,
        code: getXMLCode(codeList)
    };
};
