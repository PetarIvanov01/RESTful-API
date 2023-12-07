async function populateRecursive(comment) {
    if (!comment) {
        return null;
    }

    await comment.populate({
        path: 'children',
        select: 'message ownerId children depth'
    });

    await comment.populate({
        path: 'ownerIdProfile',
        select: 'avatarImg username -_id -userId',
    });

    const childPromises = comment.children.map(populateRecursive);
    await Promise.all(childPromises);

    return comment;
}

module.exports = populateRecursive;