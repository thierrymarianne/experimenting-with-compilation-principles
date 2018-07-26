# Learning how compilers work

## Demo

![JSON Editor made with Vue components and ANTLR4](https://thierry.marianne.io/compilers/compilers-principles-techniques-and-tools.gif)

## About

A simple JSON editor implemented as an exercice
to learn more about:
 - context-free grammars (BNF)
 - languages,
 - lexers and
 - parsers

## Installation

Install [node.js](https://nodejs.org), 
preferally with [nvm](https://github.com/creationix/nvm)

Install the project JavaScript dependencies with [yarn](https://yarnpkg.com/en/docs/install#mac-stable) 

```
yarn install
```

or [npm](https://nodejs.org/en/download/)

```
npm install
```
## Development

Run a development server with [webpack](https://webpack.js.org/)

```
make webpack-server
```

## Distribute

```
make distribute
```

## Possible applications of the underling concepts 

 - Order methods by criteria
 - Order class member variables by criteria
 - In general, refactor code in a reproducible way (think wayback machine / time travel for code)
 - Allow an interactive selection of packages among those available from remotes (e.g. package.json with npmjs.org or composer.json with packagist.org) to remove tedium in these tasks
