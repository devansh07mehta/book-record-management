const express = require("express");
const { users } = require("../data/users.json"); //  We use {} => object destruction so that we do not get object again & we can directly access the array of users which consists certain json objects for users.
const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updatedUserData,
  createNewUser,
  getSubscriptionDetailsById,
} = require("../controllers/user-controller");
const router = express.Router(); // We r using router since the app is used only one time so instead of app we will use router.

// Documentation

/**
 * Route: //users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parameters: none
 */

// http://localhost:8081/users/user
router.get("/", getAllUsers);

/**
 * Route: /users/:id
 * /users/2
 * Method: GET
 * Description: Get single user by their id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getSingleUserById);

/**
 * Route: /users
 * Method: POST
 * Description: Creating/Adding a new user
 * Access: Public
 * Parameters: none
 */
router.post("/", createNewUser);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user data
 * Access: Public
 * Parameters: id
 */
router.put("/:id", updatedUserData);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting the user by their id
 * Access: Public
 * Parameters: id
 */
router.delete("/:id", deleteUser);

/**
 * Route: users/subscription-details/:id
 * Method: GET
 * Description: Getting subscription details of an user by their id.
 * Access: Public
 * Parameters: id
 */
router.get("/subscription-details/:id", getSubscriptionDetailsById);

// default export
module.exports = router;
