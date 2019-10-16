# number-prompt 💯

**Deprecated. Use the [number prompt](https://github.com/enquirer/enquirer#number-prompt) from [`enquirer`](https://github.com/enquirer/enquirer).**

---

A CLI prompt to pick a number.

[![asciicast](https://asciinema.org/a/41487.png)](https://asciinema.org/a/41487)

[![npm version](https://img.shields.io/npm/v/number-prompt.svg)](https://www.npmjs.com/package/number-prompt)
[![dependency status](https://img.shields.io/david/derhuerst/number-prompt.svg)](https://david-dm.org/derhuerst/number-prompt)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/number-prompt.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)

*number-prompt* uses [*cli-styles*](https://github.com/derhuerst/cli-styles) and [*prompt-skeleton*](https://github.com/derhuerst/prompt-skeleton) to have a look & feel consistent with [other prompts](https://github.com/derhuerst/prompt-skeleton#prompts-using-prompt-skeleton).


## Installing

```shell
npm install number-prompt
```


## Usage

```javascript
const numberPrompt = require('number-prompt')
numberPrompt('How old are you?')
.on('data', (e) => console.log('Interim value', e.value))
.on('submit', (v) => console.log('Submitted with', v))
.on('abort', (v) => console.log('Aborted with', v))
```


## Related

- [`date-prompt`](https://github.com/derhuerst/date-prompt)
- [`mail-prompt`](https://github.com/derhuerst/mail-prompt)
- [`multiselect-prompt`](https://github.com/derhuerst/multiselect-prompt)
- [`range-prompt`](https://github.com/derhuerst/range-prompt)
- [`tree-select-prompt`](https://github.com/derhuerst/tree-select-prompt)
- [`cli-autocomplete`](https://github.com/derhuerst/cli-autocomplete)


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/number-prompt/issues).
