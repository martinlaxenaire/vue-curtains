import vue from 'rollup-plugin-vue';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const extensions = ['.js'];

export default [
  {
    input: './src/index.js',
    output: [
      {
        format: 'esm',
        file: pkg.module
      },
      {
        format: 'cjs',
        file: pkg.main
      }
    ],
    plugins: [
      nodeResolve({ extensions }),
      commonjs({
        exclude: 'src/**'
      }),
      vue(),
      peerDepsExternal()
    ]
  }
]