import {
    DDI_INSTANCE_ID,
    DDI_INSTANCE_XML_TAG,
    DDI_L_NAMESPACE,
    QUESTION_SCHEME_ID,
    QUESTION_SCHEME_XML_TAG
} from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getQuestionItems } from "./QuestionItem";
import {
    getXMLCode,
    getElementURN,
    getLabelsByLang,
    getPreferedLabel,
    getElementContent
} from "./common";

export const getQuestionSchemes = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const questionSchemes = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, QUESTION_SCHEME_XML_TAG);
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
    const questionSchemes = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, QUESTION_SCHEME_XML_TAG);
    const questionScheme = Array.from(questionSchemes).find(q => {
        const foundId = q.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!questionScheme) throw new Error(`Unknow Question Scheme: ${id}`);
    const labels = questionScheme.querySelectorAll(":scope > Label > Content");
    const contains = getQuestionItems(questionScheme);

    const ddiInstance = questionScheme.closest(DDI_INSTANCE_XML_TAG) as Element;
    const containedInURN = getElementURN(ddiInstance);
    const containedInLabel = getElementContent(ddiInstance);

    return {
        URN: getElementURN(questionScheme),
        labels: getLabelsByLang(labels),
        contains,
        containedIn: { type: DDI_INSTANCE_ID, URN: containedInURN, label: containedInLabel },
        code: getXMLCode(questionScheme)
    };
};
