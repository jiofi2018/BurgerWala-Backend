// const { Order } = require("../../mbaburgerwalaServer-master/models/Order");
const User = require("../Models/users")
const Order = require("../Models/order")

const register = async (req,res,next)=>{
  const {
    user,
    email,
    password,
    photo,
  } = req.body;
  const alreadyUser = await User.findOne({email: email});
  if(!alreadyUser){
    const UserCreate = {
      user,
      email,
      password,
      photo,
    };
    await User.create(UserCreate)
    console.log(req.body);
    res.status(200).json({
      success: true,
      message: "Registerd Successfully",
    });
  }else{
    res.status(200).json({
      success: false,
      message: "User already Exist",
    });
  }
}

const myProfile = async (req,res,next)=>{
  const e = req.session.username;
  const user = await User.findOne({email: e});
  const {
    email,photo,role } = user;
  // console.log(req.cookies);
  res.status(200).json({
    success: true,
    user: email,
    photo: photo,
    role: role,
  })
}

const login = async (req,res,next)=>{
  //console.log(req.body.email);
  req.session.username = req.body.email;
  console.log(`connect.sid`,req.cookies['connect.sid']);
  res.cookie(`connect.sid`,req.cookies['connect.sid']);
  res.status(200).json({
    success: true,
    message: "Logged in Successfully",
  });
}
const loginnew = async (req,res,next)=>{
  console.log(req.body.email);
  req.session.username = req.body.email;
  console.log(`connect.sid`,req.cookies['connect.sid']);
  // res.cookie(`connect.sid`,req.cookies['connect.sid']);
  req.session.save((err) => console.log(err));
  res.header("Content-Type", "application/json");
  //res.send({hasSession: true, user: {name: req.session.username}});
  res.status(200).json({
    success: true,
    message: "Logged in Successfully",
  });
}

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    // res.redirect("/api/v1/login");
    //res.send("Logged out Successfully");
    res.status(200).json({
      success: true,
      message: "Logged out Successfully",
    });
  });
};

const allUsers = async (req,res,next)=>{
  const users = await User.find({});
  if(!users){
    res.status(400).json({
      success: false,
      message: "No User found",
    });
  }else{
    res.status(200).json({
      success: true,
      users,
    });
  }
}

const allStats = async (req,res,next)=>{
  const usersCount = await User.countDocuments();
  const orders = await Order.find({})

  const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing");
  const shippedOrders = orders.filter((i) => i.orderStatus === "Shipped");
  const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");

  let totalIncome = 0;

  orders.forEach((i) => {
    totalIncome += i.amountDetails.totalAmount;
  });

  res.status(200).json({
    success: true,
    usersCount,
    ordersCount: {
      total: orders.length,
      preparing: preparingOrders.length,
      shipped: shippedOrders.length,
      delivered: deliveredOrders.length,
    },
    totalIncome,
  });
}

module.exports = {register, login, loginnew, logout, myProfile, allUsers, allStats};