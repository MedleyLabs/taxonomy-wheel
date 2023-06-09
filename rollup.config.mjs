import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.tsx',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    plugins: [
        json(),
        typescript()
    ]
};