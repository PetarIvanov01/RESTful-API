async function _cascadeDeleteGoalFromProfile(next) {
    try {
        const deletedDoc = await this.model.findById(this._conditions._id).populate({ path: 'ownerProfile', select: 'goals' }).exec();
        const goals = deletedDoc.ownerProfile.goals;

        const updatedGoals = goals.filter(e => e.toString() !== deletedDoc.id);

        deletedDoc.ownerProfile.goals = updatedGoals;

        await deletedDoc.ownerProfile.save();

        next();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function _cascadeDeleteLikedFromProfile(next) {
    try {
        const deletedDoc = await this.model.findById(this._conditions._id).populate({ path: 'likedProfile', select: 'liked' }).exec();

        const likedProfiles = deletedDoc.likedProfile;

        likedProfiles.forEach(async (user) => {

            user.liked = user.liked.filter((postId) => postId.toString() !== deletedDoc.id);

            await user.save();
        });

        next();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports = { _cascadeDeleteGoalFromProfile, _cascadeDeleteLikedFromProfile }