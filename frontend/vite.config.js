import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../src/main/resources/static",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // All node_modules will be bundled into a 'vendor' chunk
          }
        }
      }
    },
    chunkSizeWarningLimit: 2000
    // rollupOptions: {
    //   input: {
    //     index: "./frontend/src/main.jsx",
    //   },
    //   output: {
    //     entryFileNames: "[name].js",
    //     chunkFileNames: "[name].js",
    //     assetFileNames: ({ name }) => {
    //       if (/\.png$|\.jpg$|\.jpeg$|\.svg$|\.gif$/.test(name ?? "")) {
    //         return "images/[name].[ext]"
    //       }
    //       if (/\.woff$|\.woff2$|\.eot$|\.ttf$|\.otf$/.test(name ?? "")) {
    //         return "fonts/[name].[ext]";
    //       }

    //       return "[name].[ext]";
    //     },
    //   },
    // },

  },

})
