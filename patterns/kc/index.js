String.prototype.toKebabCase = function() {
    return this.toLowerStart().replace(/([A-Z])/g, '-$1').toLowerCase();
};

module.exports = (name) => name.toKebabCase();