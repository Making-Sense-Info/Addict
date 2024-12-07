import {
    CODE_LIST_ID,
    CODE_LIST_SCHEME_ID,
    CODE_LIST_XML_PATH,
    QUESTION_ITEM_ID,
    QUESTION_ITEM_XML_PATH
} from "@utils/contants";

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

    // TODO: extract? share? refacto?
    const codeListURN = getElementURN(codeList);
    const questionItemsUses: DDIBaseObject[] = Array.from(
        xmlDoc.getElementsByTagName(QUESTION_ITEM_XML_PATH)
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
        containedIn: { type: CODE_LIST_SCHEME_ID, URN: containedInURN, label: containedInLabel },
        usedIn: questionItemsUses,
        code: getXMLCode(codeList)
    };
};
