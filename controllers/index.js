const todoUsers = require('../models/todoUser');

exports.welcomeMessage = (req, res) => {
    res.json({
        success: 'true',
        message: 'This the todo api server'
    });
}

exports.users = (req, res) => {
    todoUsers.find({}).then((allUsers) => {
        res.json({
            success: 'true',
            message: allUsers
        });
        console.log('All user data sent');
    })
} 