module.exports = (exp, replacement, v) => {
    return v.replace(new RegExp(exp), replacement);
}