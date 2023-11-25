const mongoose = require('mongoose');
const GoalModel = require('../back-end/model/Goal');
const UserModel = require('../back-end/model/User');
const ProfileModel = require('../back-end/model/UserProfile');

mongoose.connect('mongodb://127.0.0.1:27017/network');

const mockUsers = require('./MockData/mockUsers.json');
const mockProfiles = require('./MockData/mockProfiles.json');
const mockGoals = require('./MockData/mockGoals.json');

const insertMockUsers = async () => {
    try {
        await UserModel.deleteMany({});
        await ProfileModel.deleteMany({});
        await GoalModel.deleteMany({});

        let insertedUsers = [];

        for (const user of mockUsers) {
            insertedUsers.push(await UserModel.create(user))
        }

        let profiles = []
        for (let i = 0; i < insertedUsers.length; i++) {
            const user = insertedUsers[i];

            profiles.push(await ProfileModel.create({
                userId: user._id,
                ...mockProfiles[i]
            }))
        }
        let insertedGoals = []

        for (let i = 0; i < mockGoals.length; i++) {
            const goal = mockGoals[i];
            insertedGoals.push(
                await GoalModel.create({
                    ...goal,
                    owner: profiles[i].userId
                }
                )
            )
        }

        for (let i = 0; i < profiles.length; i++) {

            await ProfileModel.findOneAndUpdate(
                { userId: insertedUsers[i]._id },
                {
                    $push: {
                        goals: insertedGoals[i]._id
                    }
                }
            );
        }

        console.log('Mock inserted successfully.');
    } catch (error) {
        console.error('Error inserting mock users:', error);
    } finally {
        mongoose.disconnect();
    }
};

insertMockUsers();
