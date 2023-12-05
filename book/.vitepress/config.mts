import { defineConfig } from "vitepress";
import { quick_start_sidebar } from "./sidebar.node.js";
import { index_fm_actions, book_title, book_description } from "./home.node.ts";

const quick_start = index_fm_actions.find((it) => it.id == "quick_start")!!;

const icon_mdi_web =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
  "<title>前往服务器主页</title>" +
  '<path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74' +
  "C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,1" +
  "7.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12" +
  ".68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68" +
  " 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,1" +
  "8.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8." +
  "35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4," +
  "12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64" +
  ",14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15." +
  "97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,1" +
  '2A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />' +
  "</svg>";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: book_title,
  description: book_description,
  base: "/tongjuclub_user_document/",
  markdown: {
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  themeConfig: {
    search: {
      provider: "local",
    },

    socialLinks: [
      {
        icon: { svg: icon_mdi_web },
        link: "https://dashy.tong-ju.top:8443",
      },
      // { icon: 'mastodon', link: 'https://github.com/vuejs/vitepress' }
    ],

    editLink: {
      pattern:
        "https://github.com/tongjuclub/tongjuclub_user_document/blob/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "最后更新于 ",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: quick_start.text, link: quick_start.link },
    ],
    sidebar: [
      {
        text: quick_start.text,
        items: quick_start_sidebar,
      },
      {
        text: "n8n详解",
        link: "n8n/readme",
        items: [],
      },
    ],
  },
});
