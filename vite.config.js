/*
 * @Descripttion:
 * @Author: sjq
 * @Date: 2021-12-07 13:55:53
 * @LastEditors: sjq
 * @LastEditTime: 2021-12-07 16:02:50
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: {
    "@": "/src/",
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "./src/style/index.scss";',
      },
    },
  },
});
