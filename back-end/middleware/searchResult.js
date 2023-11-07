function searchResult(model) {
    return async (req, res, next) => {
        try {
            if (req.query.username) {

                const searchQuery = req.query.username;
                const results = {};

                if (searchQuery) {
                    results.results = await model
                        .find({ username: { $regex: new RegExp(searchQuery, "i") } })
                        .sort({ followers: -1 })
                        .limit(4)
                        .populate('goals')
                        .lean()
                }
                else {
                    results.results = await model.find({}).limit(4).populate('goals').lean();
                }

                res.searchData = results;
                next();
            }
            next();

        } catch (e) {
            res.status(500).json({ message: e.message })
        }


    }
}

module.exports = searchResult;