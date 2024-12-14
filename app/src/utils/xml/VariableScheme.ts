import {
    DDI_INSTANCE_XML_TAG,
    DDI_L_NAMESPACE,
    VARIABLE_SCHEME_ID,
    VARIABLE_SCHEME_XML_TAG
} from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getVariables } from "./Variable";
import { getXMLCode, getElementURN, getLabelsByLang, getPreferedLabel, getParentNode } from "./common";

export const getVariableSchemes = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const variableSchemes = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, VARIABLE_SCHEME_XML_TAG);
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
    const variableSchemes = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, VARIABLE_SCHEME_XML_TAG);
    const variableScheme = Array.from(variableSchemes).find(v => {
        const foundId = v.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!variableScheme) throw new Error(`Unknow Variable Scheme: ${id}`);
    const labels = variableScheme.querySelectorAll(":scope > Label > Content");
    const contains = getVariables(variableScheme);

    const ddiInstanceElement = variableScheme.closest(DDI_INSTANCE_XML_TAG) as Element;
    const parentElement = getParentNode(ddiInstanceElement);

    return {
        URN: getElementURN(variableScheme),
        labels: getLabelsByLang(labels),
        contains,
        containedIn: parentElement,
        code: getXMLCode(variableScheme)
    };
};
