# ohm-cli

[![CircleCI](https://circleci.com/gh/robertothais/ohm-cli.svg?style=shield)](https://circleci.com/gh/robertothais/ohm-cli)
[![NPM](https://img.shields.io/npm/v/ohm-cli.svg?style=flat-square)](https://www.npmjs.com/package/ohm-cli)

> A CLI for the [Ohm](https://github.com/harc/ohm) parser generator

## Install

```shell
$ npm -g install ohm-cli
```

## Usage

Check if an Ohm grammar file is valid:

```shell
$ ohm check grammar.ohm
```

Parse an input file according to an Ohm grammar:

```shell
$ ohm parse grammar.ohm input
```

See the text trace for a parse:

```shell
$ ohm parse grammar.ohm input --trace
```

## License

MIT © [Roberto Thais](https://robertothais.org)

<p align="right">
Made with <img src="https://robertothais.org/img/recurse-center-logo.svg" width="12" alt="RC logo" align="center" /> at the <a href="https://www.recurse.com">Recurse Center</a>
</p>
