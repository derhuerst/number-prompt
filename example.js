'use strict'

const numberPrompt = require('./index')

numberPrompt('How old are you?', {value: 3, min: 1, max: 18})
.on('abort', (v) => console.log(`Aborted with ${v}.`))
.on('submit', (v) => console.log(`Submitted with ${v}.`))
