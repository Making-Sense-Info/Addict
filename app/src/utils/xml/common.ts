import * as C from "@utils/contants";
import { PREFERED_LANGUAGE } from "@utils/env";

import { DDIBaseObject, DDIObjectID } from "@model/ddi";

export const getLabelsByLang = (labels: NodeListOf<Element>): Record<string, string> =>
    Array.from(labels).reduce((acc, l) => {
        const lang = l.getAttribute("xml:lang") || "";
        const content = l.textContent?.trim() || (l.textContent as string) || "";
        return { ...acc, [lang]: content };
    }, {});

export const getPreferedLabel = (labels: Record<string, string>): string => {
    if (PREFERED_LANGUAGE in labels) return labels[PREFERED_LANGUAGE];
    // fallback, return first one
    const values = Object.values(labels);
    return values.length > 0 ? values[0] : "no label";
};

const getRootChildText = (children: ChildNode[], nodeName: string): string =>
    children.find(c => c.nodeType === Node.ELEMENT_NODE && c.nodeName === nodeName)?.textContent ?? "";

export const getElementURN = (e: Element): string => {
    const children = Array.from(e.childNodes);
    const agency = getRootChildText(children, "r:Agency");
    const id = getRootChildText(children, "r:ID");
    const version = getRootChildText(children, "r:Version");
    return `${agency}:${id}:${version}`;
};

const handleLabels = (e: Element) => {
    const titles = e.querySelectorAll(":scope > Citation > Title > String");
    if (titles.length > 0) {
        return titles;
    }
    const contents = e.querySelectorAll(":scope > Label > Content");
    if (contents.length > 0) {
        return contents;
    }
    return contents;
};

export const getElementContent = (e: Element): string => {
    const labels = getLabelsByLang(handleLabels(e));
    const preferedLabel = labels[PREFERED_LANGUAGE];
    if (preferedLabel) {
        return preferedLabel;
    }
    const values = Object.values(labels);
    if (values.length > 0) {
        return values[0];
    }
    return "";
};

export const getXMLCode = (e: Element): string => new XMLSerializer().serializeToString(e);

const getIDFromTag = (tag: string): DDIObjectID | undefined => {
    if (tag.endsWith(C.CATEGORY_XML_TAG)) return C.CATEGORY_ID;
    if (tag.endsWith(C.CATEGORY_SCHEME_XML_TAG)) return C.CATEGORY_SCHEME_ID;
    if (tag.endsWith(C.CODE_XML_TAG)) return C.CODE_ID;
    if (tag.endsWith(C.CODE_LIST_XML_TAG)) return C.CODE_LIST_ID;
    if (tag.endsWith(C.CODE_LIST_SCHEME_XML_TAG)) return C.CODE_LIST_SCHEME_ID;
    if (tag.endsWith(C.DDI_INSTANCE_XML_TAG)) return C.DDI_INSTANCE_ID;
    if (tag.endsWith(C.QUESTION_ITEM_XML_TAG)) return C.QUESTION_ITEM_ID;
    if (tag.endsWith(C.QUESTION_SCHEME_XML_TAG)) return C.QUESTION_SCHEME_ID;
    if (tag.endsWith(C.VARIABLE_XML_TAG)) return C.VARIABLE_ID;
    if (tag.endsWith(C.VARIABLE_SCHEME_XML_TAG)) return C.VARIABLE_SCHEME_ID;
    return undefined;
};

export const getParentNode = (parent: Element): DDIBaseObject | undefined => {
    if (!parent) return undefined;

    const type = getIDFromTag(parent.tagName);

    if (type === undefined) return undefined;

    const URN = getElementURN(parent);
    const label = getElementContent(parent);

    return { type, URN, label };
};
