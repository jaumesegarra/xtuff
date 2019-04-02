# xtuff
A dev command to create your custom stuff easily! (components, services, etc...)

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