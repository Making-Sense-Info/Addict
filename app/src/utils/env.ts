const getEnv = (k: string): string => import.meta.env["VITE_".concat(k)];

const GITHUB_REPO_OWNER = getEnv("GITHUB_REPO_OWNER");
const GITHUB_REPO_NAME = getEnv("GITHUB_REPO_NAME");
const GITHUB_REPO_BRANCH = getEnv("GITHUB_REPO_BRANCH");

export const getResourcesUrl = (path: string) =>
    `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${path}?ref=${GITHUB_REPO_BRANCH}`;

export const GITHUB_TOKEN = getEnv("GITHUB_TOKEN");

export const PREFERED_LANGUAGE = getEnv("PREFERED_LANGUAGE");
