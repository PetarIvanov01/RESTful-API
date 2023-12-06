const { MongooseError, isValidObjectId } = require("mongoose");

async function validateIds(model, ids) {
    try {

        ids.map(idObj => {
            const id = Object.values(idObj)[0]
            if (!isValidObjectId(id)) {
                throw new MongooseError(`Id is not in valid format - ${id} in model ${model.modelName}`);
            }
        })

        const promise = ids.map(async idObj => {
            const isValid = await model.findOne(idObj);
            if (isValid === null) {
                throw new MongooseError(`Id don\'t exist! - ${Object.values(idObj)[0]} in model ${model.modelName}`);
            }
        })
        await promise[0];

    } catch (error) {
        throw error
    }
}

module.exports = validateIds 