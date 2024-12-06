import { CATEGORY_SCHEME } from "@utils/contants";

export type DDIObjectTypes = typeof CATEGORY_SCHEME;

export type DDIBaseObject = {
    id: string;
    label: string;
    type: DDIObjectTypes;
};
