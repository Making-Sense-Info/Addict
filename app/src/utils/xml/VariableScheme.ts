import { DDI_INSTANCE_ID, VARIABLE_SCHEME_ID, VARIABLE_SCHEME_XML_PATH } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getVariables } from "./Variable";
import {
    getXMLCode,
    getElementURN,
    getLabelsByLang,
    getPreferedLabel,
    getElementContent
} from "./common";

export const getVariableSchemes = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const variableSchemes = xmlDoc.getElementsByTagName(VARIABLE_SCHEME_XML_PATH);
    return Array.from(variableSchemes).map(v => {
        const labels = v.querySelectorAll(":scope > Label > Content");
        return {
            URN: getElementURN(v),
            label: getPreferedLabel(getLabelsByLang(labels)),
            type: VARIABLE_SCHEME_ID
        };
    });
};

export const getVariableScheme = (xmlDoc: Document, id: string): DDIDetailledObject => {
    const variableSchemes = xmlDoc.getElementsByTagName(VARIABLE_SCHEME_XML_PATH);
    const variableScheme = Array.from(variableSchemes).find(v => {
        const foundId = v.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!variableScheme) throw new Error(`Unknow Variable Scheme: ${id}`);
    const labels = variableScheme.querySelectorAll(":scope > Label > Content");
    const contains = getVariables(variableScheme);

    const ddiInstance = variableScheme.closest("DDIInstance") as Element;
    const containedInURN = getElementURN(ddiInstance);
    const containedInLabel = getElementContent(ddiInstance);

    return {
        URN: getElementURN(variableScheme),
        labels: getLabelsByLang(labels),
        contains,
        containedIn: { type: DDI_INSTANCE_ID, URN: containedInURN, label: containedInLabel },
        code: getXMLCode(variableScheme)
    };
};
