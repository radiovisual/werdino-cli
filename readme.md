# werdino-cli [![Build Status](https://travis-ci.org/radiovisual/werdino-cli.svg?branch=master)](https://travis-ci.org/radiovisual/werdino-cli)

> Werdino daily menu, in your terminal!


## Install

```
$ npm install werdino-cli
```


## Usage

```js
const werdinoCli = require('werdino-cli');

werdinoCli('unicorns');
//=> 'unicorns & rainbows'
```


## API

### werdinoCli(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global werdino-cli
```

```
$ werdino-cli --help

  Usage
    werdino-cli [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ werdino-cli
    unicorns & rainbows
    $ werdino-cli ponies
    ponies & rainbows
```


## License

MIT © [](http://numetriclabs.com)
