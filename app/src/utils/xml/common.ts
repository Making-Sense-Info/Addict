import { PREFERED_LANGUAGE } from "@utils/env";

export const getLabelsByLang = (labels: HTMLCollectionOf<Element>): Record<string, string> =>
    Array.from(labels).reduce((acc, l) => {
        const lang = l.getAttribute("xml:lang") as string;
        const content = l.textContent?.trim() || "";
        return { ...acc, [lang]: content };
    }, {});

export const getPreferedLabel = (labels: Record<string, string>): string => {
    if (PREFERED_LANGUAGE in labels) return labels[PREFERED_LANGUAGE];
    return "";
};

export const getElementURN = (e: Element): string => {
    const agency = e.querySelector("Agency")?.textContent;
    const id = e.querySelector("ID")?.textContent;
    const version = e.querySelector("Version")?.textContent;
    return `${agency}:${id}:${version}`;
};

export const getElementContent = (e: Element): string =>
    getLabelsByLang(e.getElementsByTagName("r:Content"))[PREFERED_LANGUAGE];

export const getCode = (e: Element): string => new XMLSerializer().serializeToString(e);
