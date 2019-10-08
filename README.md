# xtuff [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jaumesegarra/xtuff/blob/master/LICENSE) [![Version](http://img.shields.io/npm/v/xtuff.svg?style=flat-square)](https://npmjs.org/package/xtuff)

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
Example command: `npm run g component src/helloWorld`

- **%name%** : Stuff name: if you run it, you'll get ‘helloWorld’.
- **%username** : get the current username of the PC.
- **%now(format)** : get now date with the format introduced (MM/DD/YYYY, DD-MM-YYYY, HH:ii, etc...)
- **%lc(name)%**: get value to lowercase: if you run it, you'll get ‘helloworld’.
- **%uc(name)%**: get value to uppercase: if you run it, you'll get HELLOWORLD.
- **%cz(name)%**: get capitalized value: if you run it, you'll get ‘HelloWorld’.
- **%ls(name)%**: get value with start letter in lower case: if you run it with stuff name 'HelloWorld', you'll get ‘helloWorld’.
- **%cc(name)%**: get value to camel case: if you run it with stuff name 'hello-world', you'll get ‘helloWorld’.
- **%sc(name)%**: get value to snake case: if you run it, you'll get ‘hello_world’.
- **%kc(name)%**: get value to kebab case: if you run it, you'll get ‘hello-world’.
- **%replace("World", "word", name)%**: search on a text by regular expression and replace by other text: if you run it, you'll get ‘helloword’.
- **%path('some_path/file.js')%**: get relative path for the new stuff location ('src/helloWorld/'). 

  If you run it, you'll get '../../some_path/file.js'.

  Please, put the file path on template **relative to your package.json**.

Also you can define and use your own custom patterns ('vars' option).

## Options
You can set these options passing as parameter (for example: --delimiter '%') or declaring in your package.json with 'xtuff' key (for example: "xtuff": { "delimiter": "%" }).

	- vars: Define and use your own custom patterns. Also you can pass as third parameter, like this: `npm run g component example '{"pattern": "value"}'`. 
	- delimiter: Change patterns delimiter (by default '%').

## License

[MIT](https://github.com/jaumesegarra/xtuff/blob/master/LICENSE)