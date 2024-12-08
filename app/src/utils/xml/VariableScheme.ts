import { VARIABLE_SCHEME_ID, VARIABLE_SCHEME_XML_PATH } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getVariables } from "./Variable";
import { getCode, getElementURN, getLabelsByLang, getPreferedLabel } from "./common";

export const getVariableSchemes = (xmlDoc: Document): DDIBaseObject[] => {
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
    const children = getVariables(variableScheme);
    // TODO find parent
    return {
        URN: getElementURN(variableScheme),
        labels: getLabelsByLang(labels),
        children,
        code: getCode(variableScheme)
    };
};
