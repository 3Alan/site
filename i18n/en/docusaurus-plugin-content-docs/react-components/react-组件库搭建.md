---
slug: set-up
title: React Component Library Setup
tags:
  - React
  - Component Library
categories:
  - Front-end
  - React
date: 2021-08-22T16:22:55.000Z
keywords:
  - react component library development
  - react component library bundling
  - unit testing
  - rollup
description: >-
  React component library setup process, including bundling, publishing, and
  unit testing
sidebar_label: Component Setup
sidebar_position: 1
summary: >-
  I'm building my own component library and scaffolding. I'm using technologies
  like React, Sass, TypeScript, Create-React-App, Storybook, Jest, and Lerna. I
  learned a lot, such as `peerDependencies` in `package.json`, node-sass is
  deprecated, bundling with Rollup, etc. I also encountered a strange issue: the
  Rollup bundling process didn't exit. I configured ESLint, Prettier, Husky +
  lint-staged, and Commitlint to ensure code quality. I used Rollup to bundle
  the component library and wrote a bundling script. Finally, I published the
  component library to npm.
ai_translation: true
---

I've always wanted to build my own component library and scaffolding, and this time I finally started.

<!--truncate-->

## Technology Selection

- React
- Sass
- TypeScript
- Create-React-App
- Storybook
- Jest
- Lerna

## Accumulated Knowledge

- `peerDependencies` in `package.json`: Third-party library versions depend on the host environment, and the third-party library
  does not provide them.
- node-sass is deprecated, now use sass(dart-sass) [issue](https://stackoverflow.com/questions/63943756/replace-node-sass-with-dart-sass-in-create-react-app-v3-x)
- [Rollup bundling](https://www.codefeetime.com/post/rollup-config-for-react-component-library-with-typescript-scss/)

## To Be Learned

`module` and `types` in `package.json`

## Code Quality Related

Configure ESLint
`npx eslint --init`

Configure Prettier
`eslint-plugin-prettier` `eslint-config-prettier`

Configure Husky + lint-staged

```
npx mrm@2 lint-staged
```

Configure Commitlint
Use `commitizen` to simplify the process

## Strange Issues

Rollup bundling process didn't exit: https://github.com/rollup/rollup/issues/4213

## npm Release

### Prerequisites

- npm account
- Bundled component files
- **npm account has been bound**

### Prior Knowledge

#### `package.json`

```json
  "name": "@3alan/ui", // Package name, @ followed by the organization name
  "version": "0.2.10", // Package version, the version number needs to be changed every time it is released
  "private": false, // Whether it is a private package
  "main": "dist/index.cjs.js", // Package entry file
  "module": "dist/index.esm.js",
  "types": "dist/types/index.d.ts", // Typescript declaration file
  "license": "MIT", // Open source agreement
  "description": "hand drawn react components", // Package description
  "author": "3Alan", // Author
  "homepage": "https://alan-ui.alanwang.site/", // Website
  "repository": {
    "type": "git",
    "url": "https://github.com/3Alan/alan-ui"
  },
  "files": [
    "dist"
  ], // Files that need to be uploaded to npm
  "keywords": [
    "react",
    "components",
    "ui",
    "hand drawn"
  ], // Keywords: used to describe your package
  "dependencies": {
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }, // Dependencies that the host (i.e. the project that needs to use this package) needs to have
```

![Parameters corresponding to npm](https://raw.githubusercontent.com/3Alan/images/master/img/image-20210910105028280.png)

### Bundle the Component Library

#### Bundle with Rollup

Create a `rollup.config.js` file in the root directory

Install the plugins used in the file yourself

```js
import typescript from '@rollup/plugin-typescript';
// Used to handle import 'xxx.scss' issues
import postcss from 'rollup-plugin-postcss';
// Minify code
import { terser } from 'rollup-plugin-terser';
// Similar to webpack-bundle-analyzer
import { visualizer } from 'rollup-plugin-visualizer';
// Copy static resources
import copy from 'rollup-plugin-copy';

// Bundle the dependencies in package.json
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const copyRight = `/*!
Copyright (c) 2021 3Alan.
Licensed under the MIT License (MIT)
*/`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      footer: copyRight
    },
    {
      file: pkg.module,
      format: 'esm',
      footer: copyRight
    }
  ],
  plugins: [
    // roughjs will be bundled into dist
    resolve({ resolveOnly: ['roughjs'] }),
    commonjs(),
    // Convert ts to es5 syntax and generate type files
    typescript({
      tsconfig: './tsconfig.build.json',
      // Generate d.ts files and generate paths
      declaration: true,
      declarationDir: 'types'
    }),
    copy({
      targets: [{ src: 'src/components/style/*.ttf', dest: 'dist' }]
    }),
    postcss(),
    terser(),
    visualizer()
  ]
};
```

#### Bundling Script

Install the removal tool (used to clear the dist directory before each bundling)

```shell
yarn add rimraf -D
```

```json
"build:sass": "sass ./src/components/style/index.scss ./dist/index.css
"clean": "rimraf ./dist",
"build": "yarn clean && rollup -c && yarn build:sass",
```

Bundled directory:

```
dist
 ├── index.cjs.js
 ├── index.css
 ├── index.css.map
 ├── index.esm.js
 ├── Stanberry.ttf
 └── types
```

### Publish npm

#### Prerequisites

- npm is logged in

- The npm mirror source has not been switched, you can use `npm whoami` to verify, if the npm username can be returned correctly, it is fine

- `version` in `package.json` is higher than the version number of the last release

#### Release Script

- npm publish

- You can configure hooks in `package.json` to automatically bundle before release

  ```json
  "prepublishOnly": "yarn build",
  ```
