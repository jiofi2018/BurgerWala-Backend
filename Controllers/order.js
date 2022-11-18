const Order = require("../Models/order")

const putOrder = async (req,res,next)=>{
    // console.log(req.body);
    const {orderDetails,shippingDetails,user,amountDetails} = req.body;
    Order.create({orderDetails,shippingDetails,user,amountDetails})
    res.send("ok")
}

const getMyOrder = async (req,res,next)=>{
    // console.log(req.body);
    const orders = await Order.find({email: req.query.email});
    res.status(200).json(orders);
}

const getOrderDetails = async (req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if (!order) return res.send(("Invalid Order Id", 404));

    res.status(200).json({
        success: true,
        order,
    });
}

const getAdminOrders = async (req, res, next) => {
    const orders = await Order.find({});
  
    res.status(200).json({
      success: true,
      orders,
    });
};

const processOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    
    if(!order){
        res.status(400).json({
            success: false,
            message: "No order found",
          });
    }else{
        if(order.orderStatus == "Preparing")order.orderStatus = "Shipped";
        else if(order.orderStatus == "Shipped"){
            order.orderStatus = "Delivered";
            order.deliveredAt = new Date(Date.now());
        }
        else{
            return (res.status(400).json({
                success: false,
                message: "Already deliverd order found",
              }));
        }
        await order.save();
        res.status(200).json({
            success: true,
            message: "Status Updated Successfully",
          });
    }
};

module.exports = {putOrder, getMyOrder, getOrderDetails, getAdminOrders, processOrder};