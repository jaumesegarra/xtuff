String.prototype.toCapitalize = function() {
    return this.replace(/(?:^|\s)\S/g, w => w.toUpperCase());
};

module.exports = (name) => name.toCapitalize();