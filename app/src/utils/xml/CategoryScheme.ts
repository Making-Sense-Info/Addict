import { CATEGORY_SCHEME_PATH, CATEGORY_SCHEME } from "@utils/contants";

import { DDIBaseObject } from "@model/ddi";

import { getLabelsByLang, getPreferedLabel } from "./common";

export const getCategorySchemes = (xmlDoc: Document): DDIBaseObject[] => {
    const categorySchemes = xmlDoc.getElementsByTagName(CATEGORY_SCHEME_PATH);
    return Array.from(categorySchemes).map(c => {
        const agency = c.querySelector("Agency")?.textContent;
        const id = c.querySelector("ID")?.textContent;
        const version = c.querySelector("Version")?.textContent;
        const labels = c.getElementsByTagName("r:Content");
        // TODO: handle
        // const categories = c.getElementsByTagName(CATEGORY_PATH);

        return {
            id: `${agency}:${id}:${version}`,
            label: getPreferedLabel(getLabelsByLang(labels)),
            type: CATEGORY_SCHEME
        };
    });
};
