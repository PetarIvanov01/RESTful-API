const Profile = require('../model/UserProfile');
const { withTryCatch } = require('../util');


const getQueriesData = withTryCatch(async (queries) => {
    const results = {};

    const searchValue = queries.search;
    const filterValue = queries.category;

    let searchObj = {}
    
    if (searchValue || filterValue) {
        searchObj = {
            $and: [{
                username: { $regex: new RegExp(searchValue, "i") },
                category: { $regex: new RegExp(filterValue, "i") }
            }]
        }
    }
    const searchCount = await Profile.countDocuments(searchObj);

    const page = parseInt(queries.page || 1);
    const limit = parseInt(queries.limit || 4);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (endIndex < searchCount) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }
    results.count = searchCount
    results.results = await Profile.find(searchObj).limit(limit).skip(startIndex).populate('goals').exec();

    return results;
});

module.exports = {
    getQueriesData,
};
