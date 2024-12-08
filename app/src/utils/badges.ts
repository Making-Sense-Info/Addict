import { lighten } from "@mui/material/styles";

import { DDIObjectIDs } from "@model/ddi";

import * as C from "./contants";

export const getBadgeColor =
    (baseColor: string) =>
    (id: DDIObjectIDs): string => {
        if (id === C.CATEGORY_ID) return lighten(baseColor, 0);
        if (id === C.CATEGORY_SCHEME_ID) return lighten(baseColor, 0.04);
        if (id === C.CODE_ID) return lighten(baseColor, 0.08);
        if (id === C.CODE_LIST_ID) return lighten(baseColor, 0.12);
        if (id === C.CODE_LIST_SCHEME_ID) return lighten(baseColor, 0.16);
        if (id === C.DDI_INSTANCE_ID) return lighten(baseColor, 0.2);
        if (id === C.QUESTION_ITEM_ID) return lighten(baseColor, 0.24);
        if (id === C.QUESTION_SCHEME_ID) return lighten(baseColor, 0.28);
        if (id === C.VARIABLE_ID) return lighten(baseColor, 0.32);
        if (id === C.VARIABLE_SCHEME_ID) return lighten(baseColor, 0.36);
        throw new Error(`Unknow id: ${id}`);
    };
