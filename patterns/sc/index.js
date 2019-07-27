String.prototype.toSnakeCase = function() {
    return this.toLowerStart().replace(/([A-Z])/g, '_$1').toLowerCase();
};

module.exports = (name) => name.toSnakeCase();