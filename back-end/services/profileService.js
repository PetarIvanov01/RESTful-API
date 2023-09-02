const Profile = require('../model/UserProfile')
const { isValidObjectId } = require('mongoose')
const { withTryCatch } = require('../util');

const getProfileData = withTryCatch(async (userId) => {

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

const createProfile = withTryCatch(async (data, userId) => {

    const hasProfile = await Profile.findOne({ userId })

    if (hasProfile) {
        throw new Error('You already have a profile!')
    }
    const payload = {
        userId,
        username: data.username,
        avatarImg: data.avatarImg,
        category: data.category,
        about: data.aboutMe,
    }

    const profile = await Profile.create(payload);

    return profile

})

const editProfileData = withTryCatch(async (data, userId, currentUserId) => {

    const isOwner = userId === currentUserId;

    if (isOwner === false) {
        throw new Error('User not authorized');
    }
    const profile = await Profile.findOne({ userId }).lean();
    const id = profile._id.toString();

    return await Profile.findByIdAndUpdate(id, data, { new: true });

})


module.exports = {
    editProfileData,
    getProfileData,
    createProfile
}