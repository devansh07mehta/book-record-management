const { request } = require("express");
const express = require("express");
const { users } = require("../data/users.json");  //  We use {} => object destruction so that we do not get object again & we can directly access the array of users which consists certain json objects for users.
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
router.get("/", (req, res) => {
  //Henceforth here we r using only single / to avoid users/users.
  res.status(200).json({
    success: true,
    data: users, // This data as a key will show all the users which are present in the users.json which is stored inside users var.
  });
});

/**
 * Route: /users/:id
 * /users/2
 * Method: GET
 * Description: Get single user by their id
 * Access: Public
 * Parameters: id
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    res.status(404).json({
      // We can also use "key" inside json working fine with postman new request for getting a user by id.
      success: false,
      message: "User not found",
    });
  } else {
    res.status(200).json({
      // Here inside json we are passing objects only they are not json objects so no "" for key.
      success: true,
      data: user,
    });
  }
});

/**
 * Route: /users
 * Method: POST
 * Description: Creating/Adding a new user
 * Access: Public
 * Parameters: none
 */

router.post("/", (req,res) => {
  const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
  const user = users.find((each) => each.id === id);

  if(user){
    return res.status(404).json({   // return is the final statement of any function hence we do not require if-else & so for the if too.
      success: false,
      message: "User already exist"
    });
  }
  users.push({
    id,name,surname,email,subscriptionType,subscriptionDate
  });
  return res.status(200).json({
    success: true,
    data: users
  });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user data
 * Access: Public
 * Parameters: id
 */

// Need to implement from here for updating a user data in postman
router.put("/:id", (req,res) => {
  const {id} = req.params;
  const {data} = req.body;
  const user = users.find((each) => each.id === id);

  if(!user){
    return res.status(404).json({
      success: false,
      message: "User Not Found"
    });
  }
});
module.exports = router;
