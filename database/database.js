const mongoose = require('mongoose');

const connectDb = async()=>{
    try{
        // const conn = await mongoose.connect('mongodb+srv://admin:admin123@cluster0.33qvl1l.mongodb.net/userdb?retryWrites=true&w=majority');
        const con = await mongoose.connect("mongodb+srv://admin:admin123@cluster1.33qvl1l.mongodb.net/userdb?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }catch(e){
        console.log(e);
    }
    console.log("Database Connected Successfully.....");
}

module.exports = connectDb;