import { CATEGORY_SCHEME_ID, CATEGORY_ID, CATEGORY_LABEL, CATEGORY_SCHEME_LABEL } from "@utils/contants";

export type DDIObjectIDs = typeof CATEGORY_SCHEME_ID | typeof CATEGORY_ID;
export type DDIObjectLabels = typeof CATEGORY_SCHEME_LABEL | typeof CATEGORY_LABEL;

export type DDIBaseObject = {
    URN: string;
    label: string;
    type: DDIObjectIDs;
};

export type DDIDetailledObject = {
    URN: string;
    labels: Record<string, string>;
    parent?: DDIBaseObject;
    children?: DDIBaseObject[];
};
