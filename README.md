# Learning how compilers work

## About

A simple JSON editor implemented as an exercice
to learn more about:
 - context-free grammars (BNF)
 - languages,
 - lexers and
 - parsers

## Installation

Install [git](https://git-scm.org) and clone the project repository

```
git clone https://github.com/thierrymarianne/experimenting-with-compilation-principles
```

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
npm run webpack-serve
```

## Distribute

```
npm run distribute
```

## Test

```
npm run test
```

## Possible applications of the underling concepts 

 - Allow an interactive selection of packages among those available from remotes
 (e.g. package.json with npmjs.org or composer.json with packagist.org) to remove tedium 
 from these tasks
 - Make a semantic diff of parsed tokens (in order to consider not only characters deletion / 
 additions but also variations in language usage, control flow, variables and methods between
 refactoring sessions to identify patterns of improvement by grouping small and repeatable
 actions already indexed at https://refactoring.com), to provide help in reorganizing code in a
 reproducible way (think wayback machine / time travel for code) so that code review might also
 be an occasion to replay how decisions were made in context.
