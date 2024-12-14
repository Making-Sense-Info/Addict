const GITHUB_REPO_OWNER = import.meta.env["GITHUB_REPO_OWNER"];
const GITHUB_REPO_NAME = import.meta.env["GITHUB_REPO_NAME"];
const GITHUB_REPO_BRANCH = import.meta.env["GITHUB_REPO_BRANCH"];

export const ROOT_SUB_PATH = import.meta.env["ROOT_SUB_PATH"];

export const getResourcesUrl = (path: string) =>
    `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${path}?ref=${GITHUB_REPO_BRANCH}`;

export const GITHUB_TOKEN = import.meta.env["GITHUB_TOKEN"];

export const PREFERED_LANGUAGE = import.meta.env["PREFERED_LANGUAGE"];
