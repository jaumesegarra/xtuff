const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

function stuffPath(name){ return path.join(__dirname, './tmp_stuff/'+name) };

function cli(args, params = [], cwd = __dirname) {
  let command = `node ../../index.js g ${args.map(a => '"'+a+'"').join(' ')} --package-folder "${path.join(__dirname, '../')}"`

  for(const param of params)
     command += ` --${param.name} '${param.value}'`;

  return new Promise(resolve => { 
    exec(command,
    { cwd }, 
    (error, stdout, stderr) => { resolve({
    code: error && error.code ? error.code : 0,
    error,
    stdout,
    stderr })
  })
})}

function fileExists(stuffPath, filename) {
	return new Promise(resolve => resolve(fs.existsSync(path.join(stuffPath, filename))));
}

function getJson(folder, file) {
  return new Promise((resolve, reject) => {

  	const filePath = path.join(folder, file);

    fs.readFile(filePath, (err, data) => { 
        if (err) reject(err);

        const content = data.toString('utf8');

        try {
          resolve(JSON.parse(content));
        }catch(err){ reject(err) }
    });

  })
}

module.exports = {
	stuffPath,
	cli,
	getJson,
  fileExists
};