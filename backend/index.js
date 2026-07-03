const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin:['http://localhost:3000','http://127.0.0.1:3000', process.env.FRONTEND_URL],
        methods:['GET','POST','PUT','DELETE'],
        //allowedHeaders:['Context-type','Authorization']
        credentials:true,
    }
)); 

app.get("/" ,(req,res) => {
    res.send("ShopNest Backend is running");
});

app.use('/api/auth',require('./routes/authRoute'));
// app.use("/api/cart",require("./routes/cartRoute"));
app.use('/api/products',require("./routes/productRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/payment",require("./routes/paymentRoute"));
app.use("/api/analytic",require("./routes/analyticRoute"))

const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// server frontend in production
if(process.env.NODE_ENV == 'production'){
    app.use(express.static(Path2D.join(__dirname,'../frontend/build')));

    app.get('*',(req,res) =>{
        res.sendFile(Path.resolve(__dirname, '../frontend/build/index.html'));
    });

}else{
    app.get('/',(req,res) =>{
        res.send('ShopNest API is running in Development mode ...');
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT,()  =>{
    console.log(`Server is running on port: ${PORT}`);
})