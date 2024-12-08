import { lighten } from "@mui/material/styles";

import { DDIObjectIDs } from "@model/ddi";

import { CATEGORY_SCHEME_ID, CATEGORY_ID, VARIABLE_ID, VARIABLE_SCHEME_ID } from "./contants";

export const getBadgeColor =
    (baseColor: string) =>
    (id: DDIObjectIDs): string => {
        if (id === CATEGORY_SCHEME_ID) return lighten(baseColor, 0);
        if (id === CATEGORY_ID) return lighten(baseColor, 0.1);
        if (id === VARIABLE_SCHEME_ID) return lighten(baseColor, 0.2);
        if (id === VARIABLE_ID) return lighten(baseColor, 0.3);
        throw new Error(`Unknow id: ${id}`);
    };
