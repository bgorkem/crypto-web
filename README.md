# How to create a React Typescript SPA

Minimum setup steps required to build React Typescript Single Page app with webpack

uses:
* webpack 5
* babel 7
* typescript 4
* react 17
* eslint

## WebPack setup
- Initialise a new project

`npm init -y`

- Inside `package.json` add a script entry to start dev server

```json
...
 "scripts": {
    "start":"webpack serve"
  },
...
```

- install webpack

`npm i -D webpack webpack-cli html-webpack-plugin`

- add `index.html` template file at root folder.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>

```
## Typescript setup

- install typescript

`npm i -D typescript`
- initialise typescript

`tsc --init`

- configure `tsconfig.json` to be like this:
```json
{
  "compilerOptions": {
    "target": "ES2020",                       /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "jsx": "preserve",                        /* Leave jsx transpilation to higher level babel loader */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "strict": true,                           /* Enable all strict type-checking options. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    "skipLibCheck": true                      /* Skip type checking of declaration files. */
  }
}
```

Typescript will only be used by @babel/preset-typescript to js code from ts code to the latest ES2020 format, actual transpilation to browser compatible formats will be done by @babel/preset-env and babel-loader and webpack

- install babel dependencies

` npm i -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader `

- create and configure babel configuration `.babelrc` file at root folder
```json
{
  "presets": [["@babel/preset-env", { "targets": "> 0.25%, not dead" }], "@babel/preset-react", "@babel/preset-typescript"]
}

```

- install react

` npm -i react react-dom `

- install react types

` npm i - D @types/react @types/react-dom `

## Configure WebPack for Typescript / React project

- create and configure `webpack.config.js` at root folder

```js

const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/Index.tsx',
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },

  plugins: [new HtmlWebPackPlugin({ template: 'index.html' })],
};
```

### Separate TypeScript Checker for WebPack
We use [Fork TS Checker Webpack Plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) on a separate process whilst WebPack bundling at watch mode, for performance. This Plugin runs in a separate process for Type checking and linting

- install Fork TS Checker Webpack Plugin

` npm i - D fork-ts-checker-webpack-plugin`.

- Configure Plugin for TypeScript options in `webpack.config.js` file. Require plugin at the top of file and add in plugins array
```js
 const HtmlWebPackPlugin = require('html-webpack-plugin');
 const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

 module.exports = {
   ....
  plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          profile: true,
          mode: 'write-references', //recommended as we use babel-loader
        }},
      ...
```

## Eslint Support

- Install Eslint dependencies

` npm i -D eslint @types/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser `

- Add  `.eslintrc` config file at root level, extend from recommended TypeScript linting rules..

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },

  "ignorePatterns": ["webpack.config.js"],
  "extends": ["plugin:@typescript-eslint/recommended"],
  "rules": {
  }
}

```

- in your `webpack.config.js` you should  set ts-checker-plugin with eslint config, include right set of files,

```js
 new ForkTsCheckerWebpackPlugin({
      typescript: {
        ...
      },
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,js,jsx}',
      }
 })
```

- add lint script in your `package.json`

```json
 "scripts": {
    "lint":"eslint src"
  },
```

## Adding React code

- create folder src `mkdir src` add a file called `Index.tsx` which will render some React component to root document node.

`Index.tsx`
```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <div>Hello world!</div>;
};

ReactDOM.render(<App/>, document.querySelector('#root'));
```


### Test Setup
Using testing-library/react instead of enzyme.
In babelrc config, in test env, we use node as the target platform
This allows latest regenerator runtime to work ok with jest asnyc tests.


### Running

run `npm start` and browse `http://locahost:8080`
