const goalRoute = require('../routes/goalRoute');
const authRoute = require('../routes/userRoute');

const { errroHandler } = require("../middleware/error");

module.exports = (app) => {

    //TODO Refactor user auth for my project purposes
    app.use('/api/user', authRoute);

    //TODO Refactor Goal Route for my project purposes
    app.use('/api/goals', goalRoute);
    app.use(errroHandler);

}