import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import * as path from "path"

export default defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.json'),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname,'src/index.ts'),
      name: 'kyber-swap',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
        input:"src/index.ts",
      external: ['ethers', 'axios'], 
      output: {
        globals: {
          ethers: 'ethers',
          axios: 'axios',
        },
      },
    },
  },
});
