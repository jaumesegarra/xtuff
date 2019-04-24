# xtuff &middot; [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jaumesegarra/xtuff/blob/master/LICENSE)[![Version](http://img.shields.io/npm/v/xtuff.svg?style=flat-square)](https://npmjs.org/package/xtuff)

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
- **%lc(name)%**: get value to lowercase: if you run it, you'll get ‘helloworld’.
- **%uc(name)%**: get value to uppercase: if you run it, you'll get HELLOWORLD.
- **%cz(name)%**: get capitalized value: if you run it, you'll get ‘HelloWorld’.
- **%ls(name)%**: get value with start letter in lower case: if you run it with stuff name 'HelloWorld', you'll get ‘helloWorld’.
- **%cc(name)%**: get value to camel case: if you run it with stuff name 'hello-world', you'll get ‘helloWorld’.
- **%sc(name)%**: get value to snake case: if you run it, you'll get ‘hello_world’.
- **%kc(name)%**: get value to kebab case: if you run it, you'll get ‘hello-world’.
- **%path('some_path/file.js')%**: get relative path for the new stuff location ('src/helloWorld/'). 

  If you run it, you'll get '../../some_path/file.js'.

  Please, put the file path on template **relative to your package.json**.
- Also you can define and use your own custom patterns: With argument `--vars` (only works inside package.json:scripts) or passing a third parameter, like this: `npm run g component example '{"pattern": "value"}'`. At the moment only support json objects.


**Note**: You can change delimiter (by default '%') using `--delimiter` argument. For example putting `xtuff g --delimiter='$'` in your package.json script section.

## License

[MIT](https://github.com/jaumesegarra/xtuff/blob/master/LICENSE)