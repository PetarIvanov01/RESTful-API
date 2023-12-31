const asyncHandler = require('express-async-handler');
const profile = require('../../services/profileServices/profile');
const { getQueriesData } = require('../../services/qurryService');

const getAllProfiles = asyncHandler(async (req, res) => {

    const data = await getQueriesData(req.query);

    res.status(200)
        .json({
            message: 'Method is Get',
            items: data
        });
});

const getHomeProfiles = asyncHandler(async (req, res) => {

    const goals = await profile.getHome(req.query);

    res.status(200)
        .json({
            message: 'Method is Get',
            items: goals
        });
});

const getProfileHandler = asyncHandler(async (req, res) => {

    const userId = req.params.userId;
    const profileData = await profile.getProfileData(userId);

    res.status(200).json(profileData);
});

const createProfileHandler = asyncHandler(async (req, res) => {

    if (!req.body) {
        throw new Error('Invalid body!');
    };

    const userId = req.user._id;
    const profileData = await profile.createProfile(req.body, userId);

    res.status(201).json(profileData);
});

const editProfileHandler = asyncHandler(async (req, res) => {

    const currentUserId = req.user._id;
    const userId = req.params.userId;

    const profileData = await profile.editProfileData(req.body, userId, currentUserId);

    res.status(201).json(profileData);
});

module.exports = {
    getAllProfiles,
    getHomeProfiles,
    getProfileHandler,
    createProfileHandler,
    editProfileHandler,
};