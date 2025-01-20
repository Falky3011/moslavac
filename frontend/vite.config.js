// /* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

function copyDir(src, dest) {
  try {
    if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
    const entries = readdirSync(src);

    for (const entry of entries) {
      const srcPath = join(src, entry);
      const destPath = join(dest, entry);

      const stat = statSync(srcPath);
      if (stat.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error("Error copying directory:", err);
  }
}

function copyFile(src, dest) {
  try {
    copyFileSync(src, dest);
  } catch (err) {
    console.error("Error copying directory:", err);
  }
}

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react(),
      tailwind(),
      {
        name: "copy-public",
        closeBundle() {
          const publicDir = resolve(__dirname, "./public");
          const targetDir = resolve(
            __dirname,
            "../src/main/resources/static/public"
          );
          copyDir(publicDir, targetDir);
        },
      },
      {
        name: "copy-firebase",
        closeBundle() {
          const publicDir = resolve(
            __dirname,
            "./public/firebase-messaging-sw.js"
          );
          const targetDir = resolve(
            __dirname,
            "../src/main/resources/static/firebase-messaging-sw.js"
          );
          copyFile(publicDir, targetDir);
        },
      },
    ],
    build: {
      outDir: `../src/main/resources/static/`,
      rollupOptions: {
        input: {
          index: `./src/main.jsx`,
        },
        output: {
          entryFileNames: isProduction ? `[name].js` : `[name].js`,
          chunkFileNames: isProduction ? `[name].js` : `[name].js`,
          assetFileNames: ({ name }) => {
            if (/\.png$|\.jpg$|\.jpeg$|\.svg$|\.gif$/.test(name ?? "")) {
              return isProduction
                ? "images/[name].[ext]"
                : "images/[name].[ext]";
            }
            if (/\.woff$|\.woff2$|\.eot$|\.ttf$|\.otf$/.test(name ?? "")) {
              return isProduction ? "fonts/[name].[ext]" : "fonts/[name].[ext]";
            }

            return isProduction ? `[name].[ext]` : `[name].[ext]`;
          },
        },
      },
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        "@": "/frontend/src",
      },
    },
    server: {
      port: 5171,
    },
  };
});
