import { CODE_ID, CODE_LIST_ID, CODE_XML_TAG, DDI_L_NAMESPACE } from "@utils/contants";

import { DDIBaseObject, DDIDetailledObject } from "@model/ddi";

import { getCategories } from "./Category";
import { getXMLCode, getElementContent, getElementURN } from "./common";

export const getCodes = (xmlDoc: Document | Element): DDIBaseObject[] => {
    const codes = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CODE_XML_TAG);
    return Array.from(codes).map(v => {
        const value = v.querySelector(":scope > Value")?.textContent || "";
        return {
            URN: getElementURN(v),
            label: value,
            type: CODE_ID
        };
    });
};

export const getCode = (xmlDoc: Document, id: string): DDIDetailledObject => {
    const codes = xmlDoc.getElementsByTagNameNS(DDI_L_NAMESPACE, CODE_XML_TAG);
    const code = Array.from(codes).find(v => {
        const foundId = v.querySelector("ID")?.textContent;
        return id === foundId;
    });
    if (!code) throw new Error(`Unknow Code: ${id}`);
    const value = code.querySelector(":scope > Value")?.textContent || "";

    const codeList = code.closest("CodeList") as Element;
    const containedInURN = getElementURN(codeList);
    const containedInLabel = getElementContent(codeList);

    const categoryReferencesURN = Array.from(code.querySelectorAll(":scope > CategoryReference")).map(
        c => getElementURN(c)
    );

    const categoryReferences = getCategories(xmlDoc).filter(({ URN }) =>
        categoryReferencesURN.includes(URN)
    );

    return {
        URN: getElementURN(code),
        value,
        containedIn: { type: CODE_LIST_ID, URN: containedInURN, label: containedInLabel },
        uses: categoryReferences,
        code: getXMLCode(code)
    };
};
