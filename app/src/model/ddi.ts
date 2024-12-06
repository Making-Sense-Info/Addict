import { CATEGORY_SCHEME_TYPE } from "@utils/contants";

export type DDIBaseObject = {
    id: string;
    label: string;
    type: typeof CATEGORY_SCHEME_TYPE;
};
