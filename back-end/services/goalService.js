const Goal = require('../model/Goal');
const Profile = require('../model/UserProfile');
const Comment = require('../model/Comments');

const { withTryCatch } = require('../util');
const { default: mongoose } = require('mongoose');

const getById = withTryCatch(async (goalId) => {

    return await Goal.findOne({ _id: goalId }).populate('comments');

})

const create = withTryCatch(async (user, { title, image, description }) => {

    const userGoals = await Profile.findOne({ userId: user._id });
    if (!userGoals) {
        throw new Error('Invalid Request');
    }
    if (userGoals.goals.length >= 2) {
        throw new Error('Exceeded Maximum Goals Limit!')
    }
    const goals = await Goal.create({
        title,
        description,
        image,
        owner: user._id
    })

    userGoals.goals.push(goals);
    await userGoals.save();

    return goals;
});

const update = withTryCatch(async (id, data, user) => {

    const goal = await Goal.findById(id);

    if (goal.owner.toString() !== user._id) {
        throw new Error('User not authorized');
    }

    const options = { new: true, runValidators: true };

    return await Goal.findOneAndUpdate({ _id: id, owner: user._id }, data, options);
});

const del = withTryCatch(async (id, user) => {

    const goal = await Goal.findById(id);

    if (!goal) {
        throw new Error('Goal not found');
    }

    if (goal.owner.toString() !== user._id) {
        throw new Error('User not authorized')
    }


    await Goal.findOneAndDelete({ _id: id });
})

const like = withTryCatch(async (currentUserId, postId) => {
    const currentUser = await Profile.findOne({ userId: currentUserId });

    if (!currentUser) {
        throw new Error('Profile not found.');
    }
    const isLiked = currentUser.liked.some(id => id.toString() === postId);

    if (isLiked) {
        throw new Error('Post is already liked.');
    }
    await Goal.findByIdAndUpdate(postId,
        {
            $push: { likes: currentUserId }
        },
        { new: true });


    return await Profile.findOneAndUpdate({ userId: currentUserId },
        {
            $push: { liked: postId }
        },
        { new: true });
})

const unLike = withTryCatch(async (currentUserId, postId) => {

    const currentUser = await Profile.findOne({ userId: currentUserId });

    if (!currentUser) {
        throw new Error('Profile not found.');
    }

    const isLiked = currentUser.liked.some(id => id.toString() === postId);

    if (!isLiked) {
        throw new Error('You cannot unlike a post you haven\'t liked.');
    }

    await Goal.findByIdAndUpdate(postId,
        {
            $pull: { likes: currentUserId }
        },
        { new: true })


    return await Profile.findOneAndUpdate({ userId: currentUserId },
        {
            $pull: { liked: postId }
        },
        { new: true })
})

const createComment = withTryCatch(async (postId, message, userId, parentId) => {
    //TODO
    /*  
        Client sends the current post id, comment message, the userId from where i get the id,
        and also should send if he reply to comment the parent id comment.
        On the client i should show every comment and to add the id into the key,
        When the user submit in the form, it should check is it a reply or a normal comment,
        and depending on the IsReply state should call the right function to create a comment

        On the server i have to check is the parentId different than null,
        and if its not that mean the user want to reply on a comment.
        
        !Steps
        * Check the parrentId 
        * If null -> Just create a normal comment.
        * If !null -> 
        * 1. Create the children comment
        * 2. Add to the parent reference to the parentId which is taked from the props 
        * 3. Find the parent document
        * 4. Add to his children props reference to the current comment id which is his children 
    */

    const payload = {
        message,
        userId,
        postId,
        parent: parentId
    };

    const createdComment = await Comment.create(payload);

    if (parentId) {
        console.log(parentId);
        const comment = await Comment.findByIdAndUpdate(parentId, {
            $push: { children: createdComment._id }
        },
            { new: true });

        console.log(comment);

    }

    return createdComment;
});
module.exports = {
    create,
    update,
    del,
    getById,
    like,
    unLike,
    createComment
};