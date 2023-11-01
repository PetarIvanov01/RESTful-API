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

const editProfileHandler = asyncHandler(async (req, res) => {

    const currentUserId = req.user._id;
    const userId = req.params.userId;

    const profileData = await profile.editProfileData(req.body, userId, currentUserId);

    res.status(201).json(profileData);


})

const followProfileHandler = asyncHandler(async (req, res) => {

    const { currentUserId, profileId } = req.body;

    console.log(currentUserId, profileId);

    const profileData = await profile.followProfile(currentUserId, profileId)

    res.status(200).json(profileData);
})

const unFollowProfileHandler = asyncHandler(async (req, res) => {

    const { currentUserId, profileId } = req.body;

    const profileData = await profile.unFollowProfile(currentUserId, profileId)

    res.status(200).json(profileData);
})
module.exports = { getProfileHandler, createProfileHandler, editProfileHandler, followProfileHandler, unFollowProfileHandler }