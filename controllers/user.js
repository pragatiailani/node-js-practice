const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allUsers = await User.find({});
    return res.json(allUsers);
}

async function handleCreateNewUser(req, res) {
    body = req.body;
    const result = await User.create({
        firstname: body.first_name,
        lastname: body.last_name,
        email: body.email,
        gender: body.gender,
        job: body.job,
    });
    return res.status(201).json({ id: result._id });
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "user removed" });
}

async function handleUpdateUserById(req, res) {
    const body = req.body;
    const updatedUser = {
        firstname: body.first_name,
        lastname: body.last_name,
        email: body.email,
        gender: body.gender,
        job: body.job,
    };
    await User.findByIdAndUpdate(req.params.id, updatedUser);
    return res.json({ status: "user updated" });
}

module.exports = {
    handleGetAllUsers,
    handleCreateNewUser,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById,
};
