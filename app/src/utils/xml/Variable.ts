import { VARIABLE_ID, VARIABLE_SCHEME_ID, VARIABLE_XML_PATH } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import {
    getXMLCode,
    getElementContent,
    getElementURN,
    getLabelsByLang,
    getPreferedLabel
} from "./common";

export const getVariables = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const variables = xmlDoc.getElementsByTagName(VARIABLE_XML_PATH);
    return Array.from(variables).map(v => {
        const labels = v.querySelectorAll(":scope > Label > Content");
        return {
            URN: getElementURN(v),
            label: getPreferedLabel(getLabelsByLang(labels)),
            type: VARIABLE_ID
        };
    });
};

export const getVariable = (xmlDoc: Document, id: string): DDIDetailledObject => {
    const variables = xmlDoc.getElementsByTagName(VARIABLE_XML_PATH);
    const variable = Array.from(variables).find(v => {
        const foundId = v.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!variable) throw new Error(`Unknow Variable: ${id}`);
    const labels = variable.querySelectorAll(":scope > Label > Content");

    const variableScheme = variable.closest("VariableScheme") as Element;
    const containedInURN = getElementURN(variableScheme);
    const containedInLabel = getElementContent(variableScheme);

    return {
        URN: getElementURN(variable),
        labels: getLabelsByLang(labels),
        containedIn: { type: VARIABLE_SCHEME_ID, URN: containedInURN, label: containedInLabel },
        code: getXMLCode(variable)
    };
};
