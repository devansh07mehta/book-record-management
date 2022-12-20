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

router.put("/:id", (req,res) => {
  const {id} = req.params;
  const {data} = req.body;
  const user = users.find((each) => each.id === id);

  if(!user){
    return res.status(404).json({
      success: false,
      message: "User Not Found cannot update the user"
    });
  }

  const UpdatedUser = users.map((each) => {
    if(each.id === id){
      return {           // return is the last statement for if so it will not execute ahead so it is assumed to be part of else.
        ...each,...data  // Spread operators can be used to update or combining the entire object or array.
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: UpdatedUser
  });
});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting the user by their id
 * Access: Public
 * Parameters: id
 */

router.delete("/:id", (req, res) => {
  const {id} = req.params;
  const user = users.find((each) => each.id === id);

  if(!user){
    return res.status(404).json({
      success: false,
      message: "User to be deleted is not found"
    });
  }

  const index = users.indexOf(user);
  users.splice(index,1);

  return res.status(200).json({
    success: true,
    data: users
  });
});

/**
 * Route: users/subscription-details/:id
 * Method: GET
 * Description: Getting subscription details of an user by their id.
 * Access: Public
 * Parameters: id
 */
router.get("/subscription-details/:id", (req,res) => {
  const {id} = req.params;
  const user = users.find((each) => each.id === id);

  if(!user){
    return res.status(404).json({
      success: false,
      message: "User not found by their id"
    });
  }

  const getDateInDays = (data = "") => {  // data will contain different dates like returnDate & subscriptionDate & if it will be blank means it will return current date.
    let date;
    if(data === ""){  // current data
      date = new Date(); // current date
    } else{
      date = new Date(data);  // getting date on basis of varaible data
    }
    let days = Math.floor(date / (1000*60*60*24)); //Math.floor will return the number without precison or decimal points
    return days;
  };

  const subscriptionType = (date) => {
    if(user.subscriptionType === "Basic"){
      date = date + 90;
    }
    else if(user.subscriptionType === "Standard"){
      date = date + 180;
    }
    else if(user.subscriptionType === "Premium"){
      date = date + 365;
    }
    return date;
  };

  // subscription calculation starts from Jan 1, 1970
  let returnDate = getDateInDays(user.returnDate);
  let currentdate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate); 

  const subscriptionData = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentdate,
    daysLeftForExpiration: subscriptionExpiration <= currentdate ? 0 : subscriptionExpiration - currentdate,
    fine: returnDate > subscriptionExpiration ? subscriptionExpiration <= currentdate ? 200 : 100 : 0
  };
  return res.status(200).json({
    success: true,
    data: subscriptionData
  });
});

// default export
module.exports = router;
