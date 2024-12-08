import { DDI_INSTANCE_ID, DDI_INSTANCE_XML_PATH } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getCategorySchemes } from "./CategoryScheme";
import { getCodeListSchemes } from "./CodeListScheme";
import { getQuestionSchemes } from "./QuestionScheme";
import { getVariableSchemes } from "./VariableScheme";
import { getXMLCode, getElementURN, getLabelsByLang, getPreferedLabel } from "./common";

export const getDDIInstances = (xmlDoc: Document): DDIBaseObject[] => {
    const ddiInstances = xmlDoc.getElementsByTagName(DDI_INSTANCE_XML_PATH);
    return Array.from(ddiInstances).map(d => {
        const labels = d.querySelectorAll(":scope > Citation > Title > String");
        return {
            URN: getElementURN(d),
            label: getPreferedLabel(getLabelsByLang(labels)),
            type: DDI_INSTANCE_ID
        };
    });
};

export const getDDIInstance = (xmlDoc: Document, id: string): DDIDetailledObject => {
    const ddiInstances = xmlDoc.getElementsByTagName(DDI_INSTANCE_XML_PATH);
    const ddiInstance = Array.from(ddiInstances).find(c => {
        const foundId = c.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!ddiInstance) throw new Error(`Unknow DDI Instance: ${id}`);

    const labels = ddiInstance.querySelectorAll(":scope > Citation > Title > String");
    const contains = [
        ...getCategorySchemes(ddiInstance),
        ...getCodeListSchemes(ddiInstance),
        ...getQuestionSchemes(ddiInstance),
        ...getVariableSchemes(ddiInstance)
    ];

    return {
        URN: getElementURN(ddiInstance),
        labels: getLabelsByLang(labels),
        contains,
        code: getXMLCode(ddiInstance)
    };
};
