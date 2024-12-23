import {
    DDI_L_NAMESPACE,
    VARIABLE_ID,
    VARIABLE_SCHEME_XML_TAG,
    VARIABLE_XML_TAG
} from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getXMLCode, getElementURN, getLabelsByLang, getPreferedLabel, getParentNode } from "./common";

export const getVariables = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const variables = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, VARIABLE_XML_TAG);
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
    const variables = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, VARIABLE_XML_TAG);
    const variable = Array.from(variables).find(v => {
        const foundId = v.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!variable) throw new Error(`Unknow Variable: ${id}`);
    const labels = variable.querySelectorAll(":scope > Label > Content");

    const variableSchemeElement = variable.closest(VARIABLE_SCHEME_XML_TAG) as Element;
    const parentElement = getParentNode(variableSchemeElement);

    return {
        URN: getElementURN(variable),
        labels: getLabelsByLang(labels),
        containedIn: parentElement,
        code: getXMLCode(variable)
    };
};
