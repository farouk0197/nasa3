
const express = require('express')
const app = express()
const port = 3001
const cors = require("cors")
const mongoose = require("mongoose")
const Users = require("./models/usersModels")
const bcrypt = require("bcrypt");


// middleware
app.use(cors())
app.use(express.json())


// routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.create({ username: username, password: hashedPassword })
    return user ? res.status(200).send(user) : res.status(500)
})


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ username: username });
    if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            res.send(user)
        } else {
            res.status(400).json({ error: "password doesn't match" });
        }
    } else {
        res.status(400).json({ error: "User doesn't exist" });
    }


})




mongoose.connect("mongodb+srv://admin:dAq7mHPoUJsZ82GM@nasa.uy1vnps.mongodb.net/Node-API?retryWrites=true&w=majority")
    .then(() => {
        console.log("mongosedb connected!");
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        });

    })
    .catch((error) => {
        console.log(error)
    })


    module.exports = {
        app
    }
