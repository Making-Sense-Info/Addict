import {
    DDI_L_NAMESPACE,
    QUESTION_ITEM_ID,
    QUESTION_ITEM_XML_TAG,
    QUESTION_SCHEME_ID,
    QUESTION_SCHEME_XML_TAG
} from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getCodeLists } from "./CodeList";
import {
    getXMLCode,
    getElementURN,
    getLabelsByLang,
    getPreferedLabel,
    getElementContent
} from "./common";

export const getQuestionItems = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const questionItems = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, QUESTION_ITEM_XML_TAG);
    return Array.from(questionItems).map(q => {
        const labels = q.querySelectorAll(":scope > QuestionItemName > String");
        return {
            URN: getElementURN(q),
            label: getPreferedLabel(getLabelsByLang(labels)),
            type: QUESTION_ITEM_ID
        };
    });
};

export const getQuestionItem = (xmlDoc: Document, id: string): DDIDetailledObject => {
    const questionItems = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, QUESTION_ITEM_XML_TAG);
    const questionItem = Array.from(questionItems).find(q => {
        const foundId = q.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!questionItem) throw new Error(`Unknow Question Item: ${id}`);

    const labels = questionItem.querySelectorAll(":scope > QuestionItemName > String");
    const questionTexts = questionItem.querySelectorAll(":scope > QuestionText > LiteralText > Text");

    const questionScheme = questionItem.closest(QUESTION_SCHEME_XML_TAG) as Element;
    const containedInURN = getElementURN(questionScheme);
    const containedInLabel = getElementContent(questionScheme);

    const codeListReferencesURN = Array.from(
        questionItem.querySelectorAll(":scope > CodeDomain > CodeListReference")
    ).map(c => getElementURN(c));

    const codeLists = getCodeLists(xmlDoc).filter(({ URN }) => codeListReferencesURN.includes(URN));

    return {
        URN: getElementURN(questionItem),
        labels: getLabelsByLang(labels),
        questionTexts: getLabelsByLang(questionTexts),
        containedIn: { type: QUESTION_SCHEME_ID, URN: containedInURN, label: containedInLabel },
        uses: codeLists,
        code: getXMLCode(questionItem)
    };
};
