import { GITHUB_TOKEN } from "./env";

export const getHeaders = (): Record<string, string> => {
    if (GITHUB_TOKEN)
        return {
            "Authorization": `token ${GITHUB_TOKEN}`,
            "Accept": "application/vnd.github.v3+json"
        };
    else return {};
};
