const path = require('path');
const fs = require('fs-extra');
const tmp = require('tmp');
const ejs = require('ejs');
const utils = require('./utils');
const relative = require('relative');

const patterns = require('./patterns');

const EJS_EXTENSION = '.ejs';
const WINDOWS = 'win32';
const DS_Store = '.DS_Store';

const getStuffName = (currentPath) => {
    return path.basename(currentPath);
};

const onError = (message, err, reject) => {
    console.error(message, err);
    reject(err);
}

const createTempFolder = () => new Promise((resolve, reject) => {
    tmp.dir(function _tempDirCreated(err, path) {
        if (err) onError('Error creating a temporal folder: ', err, reject);

        resolve(path);
    });
});

const delimitate = (exp, delimiter) => {
    return new RegExp('\\'+delimiter+exp+'\\'+delimiter, 'gi');
}

const resourcePatronize = (resource, stuffName, delimiter, vars) => {

    let res = resource.replace(delimitate('name', delimiter), stuffName);

    String.prototype.replaceFunctionPattern = function (pattern, func) {
        return this.replace(delimitate(pattern+'\\(.*\\)', delimiter), w => func(w.replace(delimitate(pattern+'\\((.*)\\)', delimiter), '$1')))
    }

    const replacer = (key, value) => {
        if(value instanceof Function){
            return res.replaceFunctionPattern(key, value);
        }else
            return res.replace(delimitate(key, delimiter), value);
    }

    for(let v in vars){
        res = replacer(v, vars[v]);
    };

    for(let p in patterns){
        res = replacer(p, patterns[p]);
    };

    return res;
};

const generateFileFromTemplate = (stuffName, resourcePath, destinyPath, delimiter, vars) => new Promise((resolve, reject) => {
    fs.readFile(resourcePath, 'utf8', (err, data) => {
        if(err) onError('Error reading the file "'+file+'"', err, reject);

        try {
            const component = ejs.render(data, {
                ...vars,
                "name": stuffName,
                ...patterns,
                "path": (v) => {
                    let relativePath = '';

                    try {
                        const filePath = path.join(utils.getPackageFolder(), v);

                        relativePath = relative(absoluteStuffPath, filePath, false);
                        
                        let separatorExp = /\//g;
                        if(process.platform === WINDOWS){
                            relativePath = relativePath.replace(/\\/g, '/'); // Fix windows path 
                            separatorExp = /\\/g;
                        }

                        /* Relative with stuff subfolders: */
                        let subfoldersNumber = 0;
                        const subfolders = destinyPath.replace(cacheStuffFolderPath, '').match(separatorExp);
                        if(subfolders) subfoldersNumber = subfolders.length-1;

                        for(let i = 0; i < subfoldersNumber; i++)
                            relativePath = '../'+relativePath;
                    }catch (err) {
                        console.info(`Error obtain the relative path for ${filePath}`, err);
                    }

                    return relativePath;
                }
            }, {delimiter: delimiter});

            const p = destinyPath.replace(new RegExp(EJS_EXTENSION+'$'), '');

            fs.writeFile(p, component);
            resolve();
        }catch(err){
            onError('Opss!', err, reject);
        }
    });
});

const copyResourcesToTempFolder = (stuffName, folderPath, destinyFolderPath, delimiter, vars) => new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, resources) => {
        if (err) onError('Could not list the directory: ', err, reject);

        resources.forEach(resource => {
            let resourcePath = path.join(folderPath, resource);
            let destinyPath = path.join(destinyFolderPath, resourcePatronize(resource, stuffName, delimiter, vars));

            fs.stat(resourcePath, function (err, stat) {
              if (err) onError('Error getting info. of the file "'+resource+'"', err, reject);
        
              if (stat.isFile()){
                const extension = path.extname(resourcePath);

                if(extension === EJS_EXTENSION){
                    generateFileFromTemplate(stuffName, resourcePath, destinyPath, delimiter, vars)
                        .then(resolve)
                        .catch(reject);
                }else{
                    if(path.basename(resource) !== DS_Store)
                        fs.copy(resourcePath, destinyPath)
                            .then(resolve)
                            .catch(err => onError('Could not copy "'+resource+'"', err, reject));
                    else resolve();
                }
              }else if (stat.isDirectory()){

                fs.mkdir(destinyPath, {}, (err) => {
                  if (err) onError('Could not create the folder "'+resource+'"', err, reject);

                  copyResourcesToTempFolder(stuffName, resourcePath, destinyPath, delimiter, vars)
                    .then(resolve)
                    .catch(reject);
                });
              }
            });
        });

    });
});

const moveToPackageDestiny = (folderPath, destinyFolderPath) => new Promise((resolve, reject) => {
    fs.move(folderPath, destinyFolderPath, { overwrite: true }, err => {
        if (err)
            return onError('Error moving xtuff to destiny folder', err, reject);

        fs.remove(folderPath, err => {
          if (err) return onError('Error removing tmp folder', err, reject);

          resolve();
        });
    });
});

let absoluteStuffPath;
let cacheStuffFolderPath;
module.exports = (generatorName, stuffPath, delimiter = '%', vars = {}) => {
    const generatorTemplateFolder = path.join(utils.getTemplatesFolder(), generatorName);

    if (fs.existsSync(generatorTemplateFolder)) {

        const stuffName = getStuffName(stuffPath);
        absoluteStuffPath = !path.isAbsolute(stuffPath) ? path.join(process.env.INIT_CWD, stuffPath) : stuffPath;
        
        createTempFolder().then(cacheFolderPath => {
            cacheStuffFolderPath = cacheFolderPath;

            copyResourcesToTempFolder(stuffName, generatorTemplateFolder, cacheFolderPath, delimiter, vars).then(() => {
                moveToPackageDestiny(cacheFolderPath, absoluteStuffPath);
            });
        });
    }
}