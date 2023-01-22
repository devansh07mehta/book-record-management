const { UserModel, BookModel } = require("../models");

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Users found",
    });
  }

  //Henceforth here we r using only single / to avoid users/users.
  res.status(200).json({
    success: true,
    data: users, // This data as a key will show all the users which are present in the users.json which is stored inside users var.
  });
};

exports.getSingleUserById = async (req, res) => {
  const { id } = await req.params;

  const user = await UserModel.findById({ _id: id });

  if (!user) {
    res.status(404).json({
      // We can also use "key" inside json working fine with postman new request for getting a user by id.
      success: false,
      message: "User not found By Id",
    });
  } else {
    res.status(200).json({
      // Here inside json we are passing objects only they are not json objects so no "" for key.
      success: true,
      data: user,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = await req.params;
  const user = await UserModel.findOneAndDelete(id); //deleteOne()

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User to be deleted is not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Deleted the user successfully!!",
  });
};

exports.updatedUserData = async (req, res) => {
  const { id } = await req.params;
  const { data } = await req.body;
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { $set: { ...data } },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found by Id cannot update the user",
    });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
};

exports.createNewUser = async (req, res) => {
  const { data } = await req.body;
  const user = await UserModel.findOne(data);

  if (user) {
    return res.status(404).json({
      // return is the final statement of any function hence we do not require if-else & so for the if too.
      success: false,
      message: "User already exist cannot add a new user",
    });
  }

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No data was provided to add a new book",
    });
  }

  await UserModel.create(data);
  const allUsers = await UserModel.find();
  return res.status(201).json({
    success: true,
    data: allUsers,
  });
};

exports.getSubscriptionDetailsById = async (req, res) => {
  const { id } = await req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message:
        "User not found by their id hence cannot get the subscription details",
    });
  }

  const getDateInDays = (data = "") => {
    // data will contain different dates like returnDate & subscriptionDate & if it will be blank means it will return current date.
    let date;
    if (data === "") {
      // current data
      date = new Date(); // current date
    } else {
      date = new Date(data); // getting date on basis of varaible data
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24)); //Math.floor will return the number without precison or decimal points
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  // subscription calculation starts from Jan 1, 1970
  let returnDate = getDateInDays(user.returnDate);
  let currentdate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const uniquedata = {
    subscriptionExpired:
      subscriptionDate +
      (subscriptionType(subscriptionDate) - subscriptionDate) <=
      subscriptionExpiration,
    daysLeftForExpiration:
      subscriptionExpiration <= currentdate
        ? 0
        : subscriptionExpiration - currentdate,
    fine:
      subscriptionDate <= returnDate
        ? returnDate <= subscriptionExpiration
          ? 0
          : 100
        : 200,
  };
  const subscriptionData = {
    user,
    ...uniquedata,
  };
  return res.status(200).json({
    success: true,
    data: subscriptionData,
  });
};
