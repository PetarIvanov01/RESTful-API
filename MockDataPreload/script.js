const mongoose = require('mongoose');
const GoalModel = require('../back-end/model/Goal');
const UserModel = require('../back-end/model/User');
const ProfileModel = require('../back-end/model/UserProfile');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/network', { useNewUrlParser: true, useUnifiedTopology: true });

const mockUsers = require('./MockData/mockUsers.json');
const mockProfiles = require('./MockData/mockProfiles.json');
const mockGoals = require('./MockData/mockGoals.json');

const insertMockUsers = async () => {
    try {
        await UserModel.deleteMany({});
        await ProfileModel.deleteMany({});
        await GoalModel.deleteMany({});

        const insertedUsers = await UserModel.insertMany(mockUsers.map(u => ({ ...u, password: bcrypt.hashSync(u.password, 10) })));

        let profiles = []
        for (let i = 0; i < insertedUsers.length; i++) {
            const user = insertedUsers[i];

            profiles.push(await ProfileModel.create({
                userId: user._id,
                ...mockProfiles[i]
            }))
        }

        const insertedGoals = await GoalModel.insertMany(
            mockGoals.map((goal,i) => ({ ...goal, owner: insertedUsers[i]._id }))
        );

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
