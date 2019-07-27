String.prototype.toCamelCase = function() {
    return this.replace(/(?!^)(-|_)(.?)/g, w => w.replace(/(-|_)/, '').toUpperCase());
};

module.exports = (name) => name.toCamelCase();