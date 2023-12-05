import matter from "gray-matter";
import fs from "fs";

const index_fm = matter(fs.readFileSync("./book/index.md"));

export const book_title = index_fm.data.hero.name as string;
export const book_description = index_fm.data.hero.description as string;

export const index_fm_actions = index_fm.data.hero.actions as Array<{
  id?: string;
  theme: string;
  text: string;
  link: string;
}>;
