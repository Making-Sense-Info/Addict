import { PREFERED_LANGUAGE } from "@utils/env";

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

export const getElementURN = (e: Element): string => {
    const agency = e.querySelector("Agency")?.textContent;
    const id = e.querySelector("ID")?.textContent;
    const version = e.querySelector("Version")?.textContent;
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
