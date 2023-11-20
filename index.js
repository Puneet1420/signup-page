const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const dotenv = require("dotenv")


const app = express();
dotenv.config()

const port = process.env.PORT || 3002;


mongoose.connect("mongodb+srv://puneet1420:hnArXz3AI8ugE8th@cluster0.nslj2hv.mongodb.net/user");


const registrationSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        unique:[true, 'email alreday exists']
    },
    password:{
        type:String,
    }
} , {timestamps:true})

const registration = mongoose.model("Registration", registrationSchema)

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())




app.get('/' , (req , res) => {
    res.sendFile(__dirname + "/pages/index.html")
})

app.post('/register' , async (req , res) => {
    try {
        const {name , email , password } = req.body

        const registrationdata = new registration({
            name,
            email,
            password
        })

        await registrationdata.save();

        res.redirect("/success")

    } catch (error) {
        res.redirect("/error")
       
    }
})

app.get("/success", (req , res) => {
    res.sendFile(__dirname + "/pages/success.html")
})
app.get("/error", (req , res) => {
    res.sendFile(__dirname + "/pages/error.html")
})

app.listen(port , () => {console.log(`Server is running on port: ${port}`);})