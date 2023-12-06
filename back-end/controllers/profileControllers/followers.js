const asyncHandler = require('express-async-handler');
const profile = require('../../services/profileServices/followers');

const followProfileHandler = asyncHandler(async (req, res) => {

    const { currentUserId, profileId } = req.body;

    const profileData = await profile.followProfile(currentUserId, profileId)

    res.status(200).json(profileData);
})

const unFollowProfileHandler = asyncHandler(async (req, res) => {

    const { currentUserId, profileId } = req.body;

    const profileData = await profile.unFollowProfile(currentUserId, profileId)

    res.status(200).json(profileData);
})
module.exports = {
    followProfileHandler,
    unFollowProfileHandler
}