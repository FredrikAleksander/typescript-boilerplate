import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default [
{
  plugins: [
    json({
      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true, // Default: false

      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: '  '
    }),
    resolve(),
    typescript()
  ],
  input: 'src/main.ts',
  output: {
    format: 'cjs',
    sourcemap: true,
    file: pkg.main
  },

}
];
