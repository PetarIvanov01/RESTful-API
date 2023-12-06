const Profile = require('../../model/UserProfile');
const { withTryCatch } = require('../../util');

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

});

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

});

module.exports = { followProfile, unFollowProfile }