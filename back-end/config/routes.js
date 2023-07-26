const goalRoute = require('../routes/goalRoute');
const { errroHandler } = require("../middleware/error");

module.exports = (app) => {

    app.use('/api/goals', goalRoute);
    app.use(errroHandler);

}