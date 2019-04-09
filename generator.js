const path = require('path');
const fs = require('fs-extra');
const tmp = require('tmp');
const ejs = require('ejs');
const utils = require('./utils.js');
const relative = require('relative');

const EJS_EXTENSION = '.ejs';

String.prototype.toCapitalize = function() {
    return this.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
};

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

const resourcePatronize = (resource, stuffName) => {
    return resource.replace('%name%', stuffName)
               .replace('%Name%', stuffName.toCapitalize());
};

const generateFileFromTemplate = (stuffName, resourcePath, destinyPath) => new Promise((resolve, reject) => {
    fs.readFile(resourcePath, 'utf8', (err, data) => {
        if(err) onError('Error reading the file "'+file+'"', err, reject);

        const component = ejs.render(data, {
            name: stuffName,
            Name: stuffName.toCapitalize(),
            path: (v) => {
                const filePath = path.join(utils.getPackageFolder(), v);

                return relative(absoluteStuffPath, filePath).replace(/\\/g, '/');
            }
        });

        const p = destinyPath.replace(new RegExp(EJS_EXTENSION+'$'), '');

        fs.writeFile(p, component);
        resolve();
    });
});

const copyResourcesToTempFolder = (stuffName, folderPath, destinyFolderPath) => new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, resources) => {
        if (err) onError('Could not list the directory: ', err, reject);

        resources.forEach(resource => {
            let resourcePath = path.join(folderPath, resource);
            let destinyPath = path.join(destinyFolderPath, resourcePatronize(resource, stuffName));

            fs.stat(resourcePath, function (err, stat) {
              if (err) onError('Error getting info. of the file "'+resource+'"', err, reject);
        
              if (stat.isFile()){
                const extension = path.extname(resourcePath);

                if(extension === EJS_EXTENSION){
                    generateFileFromTemplate(stuffName, resourcePath, destinyPath)
                        .then(resolve)
                        .catch(reject);
                }else{
                    fs.copy(resourcePath, destinyPath)
                        .then(resolve)
                        .catch(err => onError('Could not copy "'+resource+'"', err, reject));
                }
              }else if (stat.isDirectory()){

                fs.mkdir(destinyPath, {}, (err) => {
                  if (err) onError('Could not create the folder "'+resource+'"', err, reject)
                });

                copyResourcesToTempFolder(stuffName, resourcePath, destinyPath)
                    .then(resolve)
                    .catch(reject);
              }
            });
        });

    });
});

const moveToPackageDestiny = (folderPath, destinyFolderPath) => new Promise((resolve, reject) => {
    fs.move(folderPath, destinyFolderPath, { overwrite: true }, err => {
        if (err) {
            console.error(err);
            reject(err);
        }

        resolve();
    });
});

let absoluteStuffPath;
module.exports = (generatorName, stuffPath) => {
    const generatorTemplateFolder = path.join(utils.getTemplatesFolder(), generatorName);

    if (fs.existsSync(generatorTemplateFolder)) {

        const stuffName = getStuffName(stuffPath);
        absoluteStuffPath = !path.isAbsolute(stuffPath) ? path.join(process.env.INIT_CWD, stuffPath) : stuffPath;
        
        createTempFolder().then(cacheFolderPath => {
            copyResourcesToTempFolder(stuffName, generatorTemplateFolder, cacheFolderPath).then(() => {
                moveToPackageDestiny(cacheFolderPath, absoluteStuffPath);
            });
        });
    }
}