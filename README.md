# xtuff
[![Version](http://img.shields.io/npm/v/xtuff.svg?style=flat-square)](https://npmjs.org/package/xtuff)

> A dev command to create your custom stuff easily! (components, services, etc...)

With xtuff you can create new custom components, services, etc .. for your application dynamically.

Just create its templates on xtuff's templates folder of your package, and run the command after that.

EASY! :sunglasses:

## Installation
```
npm install xtuff --save-dev
```
Steps:
- Put this in your "scripts" section of the package.json:

	```json
	"g": "xtuff g"
	```
- Create your custom stuff inside the new `_templates_` folder that you should be have.
- Run (for example) `npm run g component helloComponent`
	- "component": It's the name of the folder inside `_templates_`.
	- "helloComponent": Path where the new thing will generated and also: the name of thing.

## License

[MIT](https://github.com/jaumesegarra/xtuff/blob/master/LICENSE)