import { DDIObjectIDs } from "@model/ddi";

/* Route path */
export const CATEGORY_SCHEME_ID = "category-scheme";
export const CATEGORY_ID = "category";
export const VARIABLE_SCHEME_ID = "variable-scheme";
export const VARIABLE_ID = "variable";
export const CODE_LIST_SCHEME_ID = "code-list-scheme";
export const CODE_LIST_ID = "code-list";
export const CODE_ID = "code";

export const DDI_OBJECTS = [
    CATEGORY_SCHEME_ID,
    CATEGORY_ID,
    VARIABLE_SCHEME_ID,
    VARIABLE_ID,
    CODE_LIST_SCHEME_ID,
    CODE_LIST_ID,
    CODE_ID
] as Array<DDIObjectIDs>;

/* Supported DDI objects */
export const CATEGORY_SCHEME_LABEL = "Category Scheme";
export const CATEGORY_LABEL = "Category";
export const VARIABLE_SCHEME_LABEL = "Variable Scheme";
export const VARIABLE_LABEL = "Variable";
export const CODE_LIST_SCHEME_LABEL = "Code list Scheme";
export const CODE_LIST_LABEL = "Code list";
export const CODE_LABEL = "Code";

/* XML */

export const CATEGORY_SCHEME_XML_PATH = "l:CategoryScheme";
export const CATEGORY_XML_PATH = "l:Category";
export const VARIABLE_SCHEME_XML_PATH = "l:VariableScheme";
export const VARIABLE_XML_PATH = "l:Variable";
export const CODE_LIST_SCHEME_XML_PATH = "l:CodeListScheme";
export const CODE_LIST_XML_PATH = "l:CodeList";
export const CODE_XML_PATH = "l:Code";
