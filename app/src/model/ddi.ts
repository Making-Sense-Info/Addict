import * as C from "@utils/contants";

export type DDIObjectIDs =
    | typeof C.CATEGORY_ID
    | typeof C.CATEGORY_SCHEME_ID
    | typeof C.CODE_ID
    | typeof C.CODE_LIST_ID
    | typeof C.CODE_LIST_SCHEME_ID
    | typeof C.DDI_INSTANCE_ID
    | typeof C.QUESTION_ITEM_ID
    | typeof C.QUESTION_SCHEME_ID
    | typeof C.VARIABLE_ID
    | typeof C.VARIABLE_SCHEME_ID;

export type DDIObjectLabels =
    | typeof C.CATEGORY_LABEL
    | typeof C.CATEGORY_SCHEME_LABEL
    | typeof C.CODE_LABEL
    | typeof C.CODE_LIST_LABEL
    | typeof C.CODE_LIST_SCHEME_LABEL
    | typeof C.DDI_INSTANCE_LABEL
    | typeof C.QUESTION_ITEM_LABEL
    | typeof C.QUESTION_SCHEME_LABEL
    | typeof C.VARIABLE_LABEL
    | typeof C.VARIABLE_SCHEME_LABEL;

export type DDIBaseObject = {
    URN: string;
    label: string;
    type: DDIObjectIDs;
};

export type DDIDetailledObject = {
    URN: string;
    labels?: Record<string, string>;
    questionTexts?: Record<string, string>;
    value?: string;
    containedIn?: DDIBaseObject;
    contains?: DDIBaseObject[];
    uses?: DDIBaseObject[];
    usedIn?: DDIBaseObject[];
    code?: string;
};
