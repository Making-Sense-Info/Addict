import { lighten } from "@mui/material/styles";

import { DDIObjectIDs } from "@model/ddi";

import * as C from "./contants";

export const getBadgeColor =
    (baseColor: string) =>
    (id: DDIObjectIDs): string => {
        if (id === C.CATEGORY_SCHEME_ID) return lighten(baseColor, 0);
        if (id === C.CATEGORY_ID) return lighten(baseColor, 0.05);
        if (id === C.VARIABLE_SCHEME_ID) return lighten(baseColor, 0.1);
        if (id === C.VARIABLE_ID) return lighten(baseColor, 0.15);
        if (id === C.CODE_LIST_SCHEME_ID) return lighten(baseColor, 0.2);
        if (id === C.CODE_LIST_ID) return lighten(baseColor, 0.25);
        if (id === C.CODE_ID) return lighten(baseColor, 0.25);
        throw new Error(`Unknow id: ${id}`);
    };
