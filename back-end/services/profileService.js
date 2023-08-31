const Profile = require('../model/UserProfile')
const { isValidObjectId } = require('mongoose')
const asyncHandler = require('express-async-handler')

const getProfileData = asyncHandler(async (userId) => {

    //TODO populate and return goals data with the payload

    if (!isValidObjectId(userId)) {
        throw new Error('Invalid userId')
    }

    const profileData = await Profile.findOne({ userId })

    if (!profileData) {
        throw new Error('No profile finded!');
    }

    const payload = {
        username: profileData.username,
        avatarImg: profileData.avatarImg,
        category: profileData.category,
        about: profileData.about,
    }

    return payload

})

const createProfile = asyncHandler(async (data, userId) => {

    const hasProfile = await Profile.findOne({ userId })

    if (hasProfile) {
        throw new Error('You already have a profile!')
    }
    const payload = {
        userId,
        username: data.username,
        avatarImg: data.avatarImg,
        category: data.category,
        about: data.about,
    }

    const profile = await Profile.create(payload);

    return profile

})


module.exports = {
    getProfileData,
    createProfile
}