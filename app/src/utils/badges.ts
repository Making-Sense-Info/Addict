import { lighten } from "@mui/material/styles";

import { DDIObjectIDs, DDIObjectLabels } from "@model/ddi";

import { CATEGORY_SCHEME_ID, CATEGORY_ID, CATEGORY_SCHEME_LABEL, CATEGORY_LABEL } from "./contants";

export const getLabelFromId = (id: DDIObjectIDs): DDIObjectLabels => {
    if (id === CATEGORY_SCHEME_ID) {
        return CATEGORY_SCHEME_LABEL;
    }
    if (id === CATEGORY_ID) {
        return CATEGORY_LABEL;
    }
    throw new Error(`Unknow DDI object id: ${id}`);
};

export const getBadgeColor =
    (baseColor: string) =>
    (id: DDIObjectIDs): string => {
        if (id === CATEGORY_SCHEME_ID) return lighten(baseColor, 0);
        if (id === CATEGORY_ID) return lighten(baseColor, 0.15);
        throw new Error(`Unknow id: ${id}`);
    };
