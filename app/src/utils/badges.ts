import { DDIObjectIDs, DDIObjectLabels } from "@model/ddi";

import { CATEGORY_SCHEME_ID, CATEGORY_SCHEME_LABEL } from "./contants";

export const getLabelFromId = (id: DDIObjectIDs): DDIObjectLabels => {
    if (id === CATEGORY_SCHEME_ID) {
        return CATEGORY_SCHEME_LABEL;
    }
    throw new Error(`Unknow DDI object id: ${id}`);
};
