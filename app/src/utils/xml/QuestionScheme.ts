import {
    DDI_INSTANCE_XML_TAG,
    DDI_D_NAMESPACE,
    QUESTION_SCHEME_ID,
    QUESTION_SCHEME_XML_TAG
} from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getQuestionItems } from "./QuestionItem";
import { getXMLCode, getElementURN, getLabelsByLang, getPreferedLabel, getParentNode } from "./common";

export const getQuestionSchemes = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const questionSchemes = xmlDoc.getElementsByTagNameNS(DDI_D_NAMESPACE, QUESTION_SCHEME_XML_TAG);
    return Array.from(questionSchemes).map(q => {
        const labels = q.querySelectorAll(":scope > Label > Content");
        return {
            URN: getElementURN(q),
            label: getPreferedLabel(getLabelsByLang(labels)),
            type: QUESTION_SCHEME_ID
        };
    });
};

export const getQuestionScheme = (xmlDoc: Document, id: string): DDIDetailledObject => {
    const questionSchemes = xmlDoc.getElementsByTagNameNS(DDI_D_NAMESPACE, QUESTION_SCHEME_XML_TAG);
    const questionScheme = Array.from(questionSchemes).find(q => {
        const foundId = q.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!questionScheme) throw new Error(`Unknow Question Scheme: ${id}`);
    const labels = questionScheme.querySelectorAll(":scope > Label > Content");
    const contains = getQuestionItems(questionScheme);

    const ddiInstanceElement = questionScheme.closest(DDI_INSTANCE_XML_TAG) as Element;
    const parentElement = getParentNode(ddiInstanceElement);

    return {
        URN: getElementURN(questionScheme),
        labels: getLabelsByLang(labels),
        contains,
        containedIn: parentElement,
        code: getXMLCode(questionScheme)
    };
};
