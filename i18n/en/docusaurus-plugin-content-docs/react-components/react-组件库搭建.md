---
slug: set-up
title: Set up a React component library
tags:
  - React
  - Component library
categories:
  - Frontend
  - React
date: 2021-08-22T16:22:55.000Z
keywords:
  - react component library development
  - react component library bundling
  - unit testing
  - rollup
description: >-
  The process of setting up a react component library, including packaging,
  publishing, and unit testing
sidebar_label: Component setup
sidebar_position: 1
summary: >-
  I'm building my own component library and scaffolding. I used technologies
  like React, Sass, TypeScript, Create-React-App, Storybook, Jest, and Lerna. I
  learned a lot, such as `peerDependencies` in `package.json`, node-sass is
  deprecated, bundling with Rollup, etc. I also encountered a strange issue: the
  Rollup bundling process didn't close. I configured ESLint, Prettier, Husky +
  lint-staged, and Commitlint to ensure code quality. I used Rollup to bundle
  the component library and wrote a bundling script. Finally, I published the
  component library to npm.
ai_translation: true
---

I've always wanted to build my own component library and scaffolding, and now I've finally started.

<!--truncate-->

## Technology selection

- React
- Sass
- TypeScript
- Create-React-App
- Storybook
- Jest
- Lerna

## Accumulated knowledge points

- `peerDependencies` in `package.json` The third-party library version depends on the host environment, and the third-party library does not provide it.
- node-sass has been deprecated, now use sass(dart-sass) [issue](https://stackoverflow.com/questions/63943756/replace-node-sass-with-dart-sass-in-create-react-app-v3-x)
- [Rollup bundling](https://www.codefeetime.com/post/rollup-config-for-react-component-library-with-typescript-scss/)

## To be understood

package.json's module and types

## Code quality related

Configure eslint
`npx eslint --init`

Configure prettier
`eslint-plugin-prettier` `eslint-config-prettier`

Configure husky + lint-staged

```
npx mrm@2 lint-staged
```

Configure commitlint
Use `commitizen` to simplify the process

## Strange problems

The Rollup bundling process did not close: https://github.com/rollup/rollup/issues/4213

## npm release

### Prerequisites

- npm account
- Packaged component files
- **npm has bound the account**

### Prior knowledge

#### package.json

```json
  "name": "@3alan/ui", // Package name, @ followed by the organization name
  "version": "0.2.10", // Package version number, you need to change the version number each time you release it
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
  }, // Dependencies that the host (i.e. the project that needs to use the package) needs to have
```

![Parameters corresponding to part of npm](https://raw.githubusercontent.com/3Alan/images/master/img/image-20210910105028280.png)

### Package the component library

#### Use rollup to package

Create a `rollup.config.js` file in the root directory

The plugins used in the file are installed by yourself

```js
import typescript from '@rollup/plugin-typescript';
// Used to handle import 'xxx.scss' issues
import postcss from 'rollup-plugin-postcss';
// Compress code
import { terser } from 'rollup-plugin-terser';
// Similar to webpack-bundle-analyzer
import { visualizer } from 'rollup-plugin-visualizer';
// Copy static resources
import copy from 'rollup-plugin-copy';

// Package the dependencies in package.json
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
    // roughjs will be packaged into dist together
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

#### Packaging script

Install the delete tool (used to clear the dist directory each time before packaging)

```shell
yarn add rimraf -D
```

```json
"build:sass": "sass ./src/components/style/index.scss ./dist/index.css
"clean": "rimraf ./dist",
"build": "yarn clean && rollup -c && yarn build:sass",
```

Directory after packaging:

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

- The npm mirror source has not been switched, you can use `npm whoami` to verify, if the npm username can be returned correctly

- `version` in `package.json` is higher than the version number of the last release

#### Release script

- npm publish

- You can configure hooks in package.json to automatically package before release

  ```json
  "prepublishOnly": "yarn build",
  ```
