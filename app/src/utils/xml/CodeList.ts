import {
    CODE_LIST_ID,
    CODE_LIST_SCHEME_XML_TAG,
    CODE_LIST_XML_TAG,
    DDI_L_NAMESPACE,
    QUESTION_ITEM_ID,
    QUESTION_ITEM_XML_TAG
} from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getCodes } from "./Code";
import { getXMLCode, getElementURN, getLabelsByLang, getPreferedLabel, getParentNode } from "./common";

export const getCodeLists = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const codeLists = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CODE_LIST_XML_TAG);
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
    const codeLists = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CODE_LIST_XML_TAG);
    const codeList = Array.from(codeLists).find(v => {
        const foundId = v.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!codeList) throw new Error(`Unknow Code list: ${id}`);
    const labels = codeList.querySelectorAll(":scope > Label > Content");

    const contains = getCodes(codeList);

    const codeListSchemeElement = codeList.closest(CODE_LIST_SCHEME_XML_TAG) as Element;
    const parentElement = getParentNode(codeListSchemeElement);

    const codeListURN = getElementURN(codeList);

    // TODO: extract? share? refacto?
    const questionItemsUses: DDIBaseObject[] = Array.from(
        xmlDoc.getElementsByTagName(QUESTION_ITEM_XML_TAG)
    )
        .reduce((acc, q) => {
            const codeListReferences = q.querySelectorAll("CodeListReference");
            const cl = Array.from(codeListReferences).filter(c => getElementURN(c) === codeListURN);
            if (cl.length > 0) return [...acc, q];
            return acc;
        }, [] as Element[])
        .map(q => {
            const labels = q.querySelectorAll(":scope > QuestionItemName > String");
            return {
                URN: getElementURN(q),
                label: getPreferedLabel(getLabelsByLang(labels)),
                type: QUESTION_ITEM_ID
            };
        });

    return {
        URN: codeListURN,
        labels: getLabelsByLang(labels),
        contains,
        containedIn: parentElement,
        usedIn: questionItemsUses,
        code: getXMLCode(codeList)
    };
};
