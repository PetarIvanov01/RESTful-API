const goalRoute = require('../routes/goalRoute');
const authRoute = require('../routes/userRoute');

const { errroHandler } = require("../middleware/error");

module.exports = (app) => {

    app.use('/api/user', authRoute);

    app.use('/api/goals', goalRoute);
    app.use(errroHandler);

}