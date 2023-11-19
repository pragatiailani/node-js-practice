const express = require("express");
const {
    handleGetAllUsers,
    handleCreateNewUser,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
    .route("/:id")
    .get(handleGetUserById)
    .delete(handleDeleteUserById)
    .patch(handleUpdateUserById);

module.exports = router;
