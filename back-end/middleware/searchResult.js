function searchResult(model) {
    return async (req, res, next) => {

        try {
            const searchQuery = req.query.name;
            let result;
            if (searchQuery) {
                result = await model.find({ username: { $regex: new RegExp(searchQuery, "i") } }).populate('goals').lean()
            }
            else {
                result = await model.find({}).limit(4).populate('goals').lean();
            }

            res.searchData = result;
            next();

        } catch (e) {
            res.status(500).json({ message: e.message })
        }


    }
}

module.exports = searchResult;