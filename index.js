'use strict'

const ui =       require('cli-styles')
const esc =      require('ansi-escapes')
const chalk =    require('chalk')
const keypress = require('keypress')



const defaults = {
	  in:        process.stdin
	, out:       process.stdout

	, transform: ui.render()

	, min:      -Infinity
	, max:       Infinity
	, value:     0
	, lastHit:   0

	, done:      false
	, aborted:   false
}

const isNumber = /[0-9]/



const DatePrompt = {

	  reset: function () {
		this.value = this.initialValue
		this.typed = ''
	}

	, abort: function () {
		this.done = this.aborted = true
		this.render()
		this._end()
		this.out.write('\n')
		this._reject()
	}

	, submit: function () {
		this.done = true
		this.aborted = false
		this.render()
		this._end()
		this.out.write('\n')
		this._resolve(this)
	}



	, onNumber: function (n) {
		const now = Date.now()
		if ((now - this.lastHit) > 1000) this.typed = '' // 1s elapsed
		this.typed += n

		this.value = Math.min(parseInt(this.typed), this.max)
		if (this.value > this.max) this.value = this.max
		if (this.value < this.min) this.value = this.min

		this.lastHit = now
		this.render()
	}

	, up: function () {
		if (this.value >= this.max) return this.out.write(esc.beep)
		this.value++
		this.typed = ''
		this.render()
	}
	, down: function () {
		if (this.value <= this.min) return this.out.write(esc.beep)
		this.value--
		this.typed = ''
		this.render()
	}



	, render: function () {
		let value = this.transform(this.value)
		if (!this.done) value = chalk.cyan.underline(value)

		this.out.write(esc.eraseLine + esc.cursorTo(0) + [
			  ui.symbol(this.done, this.aborted)
			, chalk.bold(this.msg), ui.delimiter, value
		].join(' '))
	}
}



const datePrompt = (msg, opt) => new Promise((resolve, reject) => {
	if ('string' !== typeof msg) throw new Error('Message must be string.')
	if (Array.isArray(opt) || 'object' !== typeof opt) opt = {}

	let prompt = Object.assign(Object.create(DatePrompt), defaults, opt)
	Object.assign(prompt, {
		  msg
		, initialValue: prompt.value
		, _resolve:     resolve
		, _reject:      reject
	})

	const onKeypress = function (raw, key) {
		let c = ui.keypress(raw, key)
		if (prompt[c]) prompt[c]()
		else if (isNumber.test(c)) prompt.onNumber(c)
	}
	keypress(prompt.in)
	prompt.in.on('keypress', onKeypress)

	const oldRawMode = prompt.in.isRaw
	prompt.in.setRawMode(true)

	prompt._end = () => {
		prompt.in.removeListener('keypress', onKeypress)
		prompt.in.setRawMode(oldRawMode)
	}

	prompt.render()
})



module.exports = Object.assign(datePrompt, {DatePrompt})
