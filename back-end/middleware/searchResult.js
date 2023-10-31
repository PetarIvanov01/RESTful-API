function searchResult(model) {
    return async (req, res, next) => {
        try {
            if (req.query.search) {

                const searchQuery = req.query.search;
                const results = {};

                if (searchQuery) {
                    results.results = await model.find({ username: { $regex: new RegExp(searchQuery, "i") } }).populate('goals').lean()
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