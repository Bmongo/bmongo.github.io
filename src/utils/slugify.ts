import { slug } from "github-slugger";

export const slugify = (str: string) => slug(str);
