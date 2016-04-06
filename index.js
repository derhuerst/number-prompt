'use strict'

const ui =       require('cli-styles')
const esc =      require('ansi-escapes')
const chalk =    require('chalk')
const wrap =     require('prompt-skeleton')



const isNumber = /[0-9]/

const NumberPrompt = {

	  reset: function () {
		this.typed = ''
		this.value = this.initialValue
		this.emit()
		this.render()
	}

	, abort: function () {
		this.done = this.aborted = true
		this.emit()
		this.render()
		this.out.write('\n')
		this.close()
	}

	, submit: function () {
		this.done = true
		this.aborted = false
		this.emit()
		this.render()
		this.out.write('\n')
		this.close()
	}

	, up: function () {
		this.typed = ''
		if (this.value >= this.max) return this.bell()
		this.value++
		this.emit()
		this.render()
	}
	, down: function () {
		this.typed = ''
		if (this.value <= this.min) return this.bell()
		this.value--
		this.emit()
		this.render()
	}



	, _: function (n) {
		if (!isNumber.test(n)) return this.bell()

		const now = Date.now()
		if ((now - this.lastHit) > 1000) this.typed = '' // 1s elapsed
		this.typed += n
		this.lastHit = now

		this.value = Math.min(parseInt(this.typed), this.max)
		if (this.value > this.max) this.value = this.max
		if (this.value < this.min) this.value = this.min

		this.emit()
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



const defaults = {
	  msg:       ''
	, transform: ui.render()

	, min:      -Infinity
	, max:       Infinity
	, value:     0

	, typed:     ''
	, lastHit:   0

	, done:      false
	, aborted:   false
}

const numberPrompt = (msg, opt) => {
	if ('string' !== typeof msg) throw new Error('Message must be string.')
	if (Array.isArray(opt) || 'object' !== typeof opt) opt = {}

	let p = Object.assign(Object.create(NumberPrompt), defaults, opt)
	p.msg          = msg
	p.initialValue = p.value

	return wrap(p)
}



module.exports = Object.assign(numberPrompt, {NumberPrompt})
