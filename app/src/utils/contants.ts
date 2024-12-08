import { DDIObjectIDs } from "@model/ddi";

/* Route path */
export const CATEGORY_ID = "category";
export const CATEGORY_SCHEME_ID = "category-scheme";
export const CODE_ID = "code";
export const CODE_LIST_ID = "code-list";
export const CODE_LIST_SCHEME_ID = "code-list-scheme";
export const DDI_INSTANCE_ID = "ddi-instance";
export const QUESTION_ITEM_ID = "question-item";
export const QUESTION_SCHEME_ID = "question-scheme";
export const VARIABLE_ID = "variable";
export const VARIABLE_SCHEME_ID = "variable-scheme";

export const DDI_OBJECTS = [
    CATEGORY_ID,
    CATEGORY_SCHEME_ID,
    CODE_ID,
    CODE_LIST_ID,
    CODE_LIST_SCHEME_ID,
    DDI_INSTANCE_ID,
    QUESTION_ITEM_ID,
    QUESTION_SCHEME_ID,
    VARIABLE_ID,
    VARIABLE_SCHEME_ID
] as Array<DDIObjectIDs>;

/* Supported DDI objects */
export const CATEGORY_LABEL = "Category";
export const CATEGORY_SCHEME_LABEL = "Category Scheme";
export const CODE_LABEL = "Code";
export const CODE_LIST_LABEL = "Code list";
export const CODE_LIST_SCHEME_LABEL = "Code list Scheme";
export const DDI_INSTANCE_LABEL = "DDI Instance";
export const QUESTION_ITEM_LABEL = "Question Item";
export const QUESTION_SCHEME_LABEL = "Question Scheme";
export const VARIABLE_LABEL = "Variable";
export const VARIABLE_SCHEME_LABEL = "Variable Scheme";

/* XML */

export const CATEGORY_XML_PATH = "l:Category";
export const CATEGORY_SCHEME_XML_PATH = "l:CategoryScheme";
export const CODE_XML_PATH = "l:Code";
export const CODE_LIST_XML_PATH = "l:CodeList";
export const CODE_LIST_SCHEME_XML_PATH = "l:CodeListScheme";
export const DDI_INSTANCE_XML_PATH = "DDIInstance";
export const QUESTION_ITEM_XML_PATH = "d:QuestionItem";
export const QUESTION_SCHEME_XML_PATH = "d:QuestionScheme";
export const VARIABLE_XML_PATH = "l:Variable";
export const VARIABLE_SCHEME_XML_PATH = "l:VariableScheme";
