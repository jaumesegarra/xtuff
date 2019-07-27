String.prototype.toLowerStart = function() {
    return this.replace(/(?:^|\s)\S/g, w => w.toLowerCase());
};

module.exports = (name) => name.toLowerStart();