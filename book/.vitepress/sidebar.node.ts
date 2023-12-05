import fg from "fast-glob";
import { array_pathd_to_tree } from "../util";
import matter from "gray-matter";
import fs from "fs";

function _replace_prefix(target: string, prefix: string, repto: string) {
  if (!target.startsWith(prefix)) {
    throw Error(
      `the string require start with prefix "${prefix}" ( replace to "${repto}") , but not , it's "${target}" .`
    );
  }
  return repto + target.substring(prefix.length);
}

const _common_sidebar = async (folder_name: string) => {
  const docs_paths = await fg(`./book/${folder_name}/**/*.md`);

  console.log(`
  +--------------------------------------------
  |   Build sidebar for ${folder_name}
  +--------------------------------------------\n`);
  return array_pathd_to_tree(
    docs_paths.map((path) => ({
      link: _replace_prefix(path, `./book/${folder_name}/`, `/${folder_name}/`),
      _filepath: path,
    })),
    {
      path: "link",
      name: "name",
      items: "items",
      value: "__my_value",
    },
    {
      onCreateMapping: (it) => {
        it["text"] = it.name;
        return it;
      },
      afterMountValue: (it) => {
        if (it.name.endsWith(".md")) {
          const filepath = it.__my_value!!._filepath;
          try {
            const frontmatter = matter(fs.readFileSync(filepath, "utf-8"));
            const _tmp_title = frontmatter.content
              .split("\n")
              .find((line) => line.startsWith("# "));
            if (!_tmp_title) {
              throw Error("Title not found !");
            }
            const title = _replace_prefix(_tmp_title, "# ", "").trim();
            it["text"] = title;
            console.log(`[√] ${filepath}`, {
              title,
              frontmatter_data: frontmatter.data,
            });
          } catch (err) {
            console.error(`[x] ${filepath}\n\n`, err);
            throw err;
          }
          it["link"] = it.__my_value!!.link;
        } else if (!it.__my_value) {
          // is parent dir
          it["text"] = it.name;
        } else {
          // is other file
        }
      },
    }
  )[0].items /* remove `/` */[0].items; /* remove the folder_name */
};

export const quick_start_sidebar = await _common_sidebar("quick_start");
