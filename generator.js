const path = require('path');
const fs = require('fs-extra');
const tmp = require('tmp');
const ejs = require('ejs');
const utils = require('./utils.js');

const EJS_EXTENSION = '.ejs';

const getStuffName = (currentPath) => {
    const splits = currentPath.split('/');

    return splits[splits.length - 1];
};

String.prototype.toCapitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

const copyFolderResources = (name, pathname, folder, cacheFolderPath) => new Promise(function(resolve, reject) {
    fs.readdir(folder, function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            reject();
        }

        files.forEach(function (file, index) {
            let resourcePath = path.join(folder, file);
            let destinyPath = path.join(cacheFolderPath, file);

            fs.stat(resourcePath, function (err, stat) {
              if (err) {
                console.error("Error stating file.", err);
                reject();
              }
        
              if (stat.isFile()){
                const extension = path.extname(resourcePath);
                if(extension === EJS_EXTENSION){
                    fs.readFile(resourcePath, 'utf8', function (err, data) {
                        const component = ejs.render(data, {
                            name: getStuffName(pathname),
                            Name: getStuffName(pathname).toCapitalize()
                        });

                        const filename = path.basename(resourcePath).toLowerCase().replace('%name%', getStuffName(pathname)).replace(EJS_EXTENSION, '');

                        fs.writeFile(path.join(cacheFolderPath, filename), component);
                        resolve();
                    });
                }else
                    fs.copy(resourcePath, destinyPath).then(resolve)
                        .catch(err => { console.error(err); reject(); });
              }else if (stat.isDirectory()){
                fs.mkdirSync(destinyPath);
                copyFolderResources(name, pathname, resourcePath, destinyPath).then(resolve).catch(reject);
              }
            });
        });

    });
});

module.exports = (name, pathname) => {
    const templateFolder = path.join(utils.getTemplatesFolder(), name);

    if (fs.existsSync(templateFolder)) {

        tmp.dir(function _tempDirCreated(err, path, cleanupCallback) {
            if (err) throw err;

            copyFolderResources(name, pathname, templateFolder, path).then(() => {
                fs.move(path, pathname, { overwrite: true }, err => {
                    if (err) return console.error(err);
                });
            });
        });
    }
}