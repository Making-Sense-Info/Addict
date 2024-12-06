import { DDIBaseObject } from "@model/ddi";

import { getCategorySchemes } from "./CategoryScheme";

export const getDDIObjects = (xmlDoc: Document): DDIBaseObject[] => [...getCategorySchemes(xmlDoc)];
