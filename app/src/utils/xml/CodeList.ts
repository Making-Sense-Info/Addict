import { CODE_LIST_ID, CODE_LIST_SCHEME_ID, CODE_LIST_XML_PATH } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getCodes } from "./Code";
import {
    getXMLCode,
    getElementContent,
    getElementURN,
    getLabelsByLang,
    getPreferedLabel
} from "./common";

export const getCodeLists = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const codeLists = xmlDoc.getElementsByTagName(CODE_LIST_XML_PATH);
    return Array.from(codeLists).map(v => {
        const labels = v.querySelectorAll(":scope > Label > Content");
        return {
            URN: getElementURN(v),
            label: getPreferedLabel(getLabelsByLang(labels)),
            type: CODE_LIST_ID
        };
    });
};

export const getCodeList = (xmlDoc: Document, id: string): DDIDetailledObject => {
    const codeLists = xmlDoc.getElementsByTagName(CODE_LIST_XML_PATH);
    const codeList = Array.from(codeLists).find(v => {
        const foundId = v.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!codeList) throw new Error(`Unknow Code list: ${id}`);
    const labels = codeList.querySelectorAll(":scope > Label > Content");

    const contains = getCodes(codeList);

    const codeListScheme = codeList.closest("CodeListScheme") as Element;
    const containedInURN = getElementURN(codeListScheme);
    const containedInLabel = getElementContent(codeListScheme);

    return {
        URN: getElementURN(codeList),
        labels: getLabelsByLang(labels),
        contains,
        containedIn: { type: CODE_LIST_SCHEME_ID, URN: containedInURN, label: containedInLabel },
        code: getXMLCode(codeList)
    };
};
