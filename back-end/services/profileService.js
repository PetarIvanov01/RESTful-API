const Profile = require('../model/UserProfile')
const { isValidObjectId } = require('mongoose')
const { withTryCatch } = require('../util');

const getProfileData = withTryCatch(async (userId) => {


    if (!isValidObjectId(userId)) {
        throw new Error('Invalid userId')
    }

    const profileData = await Profile.findOne({ userId }).populate('goals');

    if (!profileData) {
        throw {
            message: 'No profile finded!',
            type: 'custom'
        }
    }

    const payload = {
        username: profileData.username,
        avatarImg: profileData.avatarImg,
        category: profileData.category,
        aboutMe: profileData.aboutMe,
        goals: [...profileData.goals],
        followers: [...profileData.followers]
    }

    return payload

})

const createProfile = withTryCatch(async (data, userId) => {

    const hasProfile = await Profile.findOne({ userId })

    if (hasProfile) {
        throw {
            message: 'You already have a profile!',
            type: 'custom'
        };
    }
    const payload = {
        userId,
        username: data.username,
        avatarImg: data.avatarImg,
        category: data.category,
        aboutMe: data.aboutMe,
    }

    const profile = await Profile.create(payload);

    return profile

})

const editProfileData = withTryCatch(async (data, userId, currentUserId) => {

    const isOwner = userId === currentUserId;

    if (isOwner === false) {
        throw {
            message: 'User not authorized',
            type: 'custom'
        };
    }
    const profile = await Profile.findOne({ userId }).lean();
    const id = profile._id.toString();

    return await Profile.findByIdAndUpdate(id, data, { new: true });

})

const followProfile = withTryCatch(async (currentUserId, profileId) => {

    const profile = await Profile.findOne({ userId: profileId });
    const currentUser = await Profile.findOne({ userId: currentUserId });

    if (!profile || !currentUser) {
        throw new Error('Profile not found.');
    }

    await Profile.findByIdAndUpdate(currentUser._id,
        {
            $push: { following: profileId }
        },
        { new: true })


    return await Profile.findByIdAndUpdate(profile._id,
        {
            $push: { followers: currentUserId }
        },
        { new: true })

})

const unFollowProfile = withTryCatch(async (currentUserId, profileId) => {

    const profile = await Profile.findOne({ userId: profileId });
    const currentUser = await Profile.findOne({ userId: currentUserId });

    if (!profile || !currentUser) {
        throw new Error('Profile not found.');
    }

    await Profile.findByIdAndUpdate(currentUser._id,
        {
            $pull: { following: profileId }
        },
        { new: true })


    return await Profile.findByIdAndUpdate(profile._id,
        {
            $pull: { followers: currentUserId }
        },
        { new: true })

})

const getHome = withTryCatch(async (query) => {

    const limit = parseInt(query.limit || 2);

    const results = {};
    const profiles = await Profile.aggregate([
        {
            $addFields: {
                followersCount: { $size: '$followers' }
            }
        },
        {
            $sort: {
                followersCount: -1
            }
        },
        {
            $limit: limit
        },
        {
            $lookup: {
                from: 'goals',
                localField: 'goals',
                foreignField: '_id',
                as: 'goals'
            }
        }
    ]);

    results.results = profiles

    return results;

})
module.exports = {
    editProfileData,
    getProfileData,
    createProfile,
    followProfile,
    unFollowProfile,
    getHome
}