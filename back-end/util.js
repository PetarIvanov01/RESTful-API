function withTryCatch(func) {
    try {
        return func;
    } catch (error) {
        throw error;
    }
}
module.exports = { withTryCatch }