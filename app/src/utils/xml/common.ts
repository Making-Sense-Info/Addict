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
