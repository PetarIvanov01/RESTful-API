const asyncHandler = require('express-async-handler');
const profile = require('../services/profileService');

const getProfileHandler = asyncHandler(async (req, res) => {

    const userId = req.params.userId;

    const profileData = await profile.getProfileData(userId);

    res.status(200).json(profileData);
})

const createProfileHandler = asyncHandler(async (req, res) => {

    if (!req.body) {
        throw new Error('Invalid body!')
    }

    const userId = req.user._id;
    const profileData = await profile.createProfile(req.body, userId);

    res.status(201).json(profileData);

})

module.exports = { getProfileHandler, createProfileHandler }