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

## Patterns
Example command: `npm run g component src/hello`

- **%name%** : Stuff name: if you run it, you'll get ‘hello’.
- **%Name%** : Stuff name capitalized: if you run it, you'll get ‘Hello’.
- **%path('some_path/file.js')%**: get relative path for the new stuff location ('src/hello/'). 

  If you run it, you'll get '../../some_path/file.js'.

  Please, put the file path on template **relative to your package.json**.

## License

[MIT](https://github.com/jaumesegarra/xtuff/blob/master/LICENSE)