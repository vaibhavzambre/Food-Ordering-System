const { Router } = require('express');
const express = require('express');
const session = require('express-session')
const route = express.Router();
const User = require('../modul/user')
const dish = require("../modul/dish");
const order = require('../modul/order')
const { __express } = require('hbs');
const fs = require('fs')

route.get("/", (req, res) => {
    const loginUser = req.session.loginUser;
    res.render("index", {loginUser})
})
route.get("/register", (req, res) => {                   //
    const loginUser = req.session.loginUser;
    res.render("registration", {loginUser})
})
route.get('/login', (req, res) => {                //
    const loginUser = req.session.loginUser;
    res.render("login", {loginUser})
})
//food page normal user
route.get("/foods/:page", async (req, res) => {
    const loginUser = req.session.loginUser;
    let currentPage = 1;
    let page = req.params.page;
    if (page)
        currentPage = page;
    const total = 6;
    const start = (currentPage - 1) * total;
    const foods = await dish.find().skip(start).limit(total);
    const count = Math.ceil(await dish.find().countDocuments() / total);

    console.log(count + " :=> " + foods);
    res.render("showDishes", {
        loginUser: loginUser,
        foods: foods,
        count: count,
        currentPage: currentPage

    })
})
route.post("/saveRegistration", async (req, res) => {
    const data = await User.create(req.body)
    res.render("login",{newRegister:true})
})

route.post("/loginUser", async (req, res) => {
    const data = await User.findOne(req.body);
    console.log(data);

    if (data == null) {
        console.log("invalid passward or email");
        res.render("login", {
            invalid: true,
        })
    }
    else {
        req.session.loginUser = data;
        console.log('login user name : ' + req.session.loginUser.name);
        res.redirect("/dashboard");
    }
})

route.get("/dashboard", (req, res) => {
    if (req.session.loginUser) {
        const loginUser = req.session.loginUser;
            res.render("userPages/userDashboard", {
                loginUser: loginUser
            });
        } else
        res.render("login", {loginFirst: true})
})
//search food dish by user
route.post("/searchFood", async (req, res) => {
    const loginUser = req.session.loginUser;
    const search = req.body.foodSearch
    const data = await dish.find({ "dname": new RegExp(search, 'i') });
    res.render("showDishes", {
        loginUser: loginUser,
        foods: data,
        searchKey: search
    })
})

route.get("/logout", (req, res) => {
    req.session.destroy();
    res.render("login", {
        logout: true
    })
})

//check out
route.get("/user/orderFood", (req, res) => {
    if (req.session.loginUser) {
        const loginUser = req.session.loginUser
        res.render("userPages/userCheckout", {
            loginUser: loginUser
        })
    } else {
        res.render("login", {
            loginFirst: true
        })
    }
})

route.post("/orderNowFromBasket", (req, res) => {
    if (req.session.loginUser) {
        res.redirect("/")
        const loginUser = req.session.loginUser;
        const basket = JSON.parse(req.body.data)
        let dt_ob = new Date();
        let dateTime = "" + ("0" + dt_ob.getDate()).slice(-2) + "/" + ("0" + dt_ob.getMonth()).slice(-2) + "/" + dt_ob.getFullYear() + " T " + dt_ob.getHours() + ":" + dt_ob.getMinutes() + ":" + dt_ob.getSeconds();
        const paymentType = req.body.paymentType

        basket.forEach(async function (item) {
            let object = {
                dishId: item.id,
                userId: loginUser._id,
                user: loginUser,
                photo: item.image,
                dname: item.name,
                time: dateTime,
                price: item.price,
                quantity: item.quantity,
                paymentType: paymentType,
                states: "NA"
            }
            console.log(object)
            const data = await order.create(object);
            console.log(data)
            if (data) {
                console.log('data is save');
            }

        });
    } else {
        res.render("login", {
            loginFirst: true
        })
    }
})

//order page
route.get("/user/orders", async (req, res) => {
    if (req.session.loginUser) {
        const loginUser = req.session.loginUser;
        const data = await order.find({ $and: [{ "states": { $ne: "deliverd" } }, { "userId": req.session.loginUser._id }] });
        res.render("userPages/userOrders", {
            loginUser: loginUser,
            orderFood: data
        })
    } else {
        res.render("login", {
            loginFirst: true
        })
    }
})

route.get("/user/cancelOrder/:id", async (req, res) => {
    if (req.session.loginUser) {
        const loginUser = req.session.loginUser;
        const deleteData = await order.deleteOne({ _id: req.params.id });

        const data = await order.find({ $and: [{ "states": { $ne: "deliverd" } }, { "userId": req.session.loginUser._id }] });
        console.log("find data : " + data)
        if (deleteData)
            res.render("userPages/userOrders", {
                loginUser: loginUser,
                orderFood: data,
                cancelOrder: true
            })
    } else {
        res.render("login", {
            loginFirst: true
        })
    }
})

route.get("/user/history", async (req, res) => {
    if (req.session.loginUser) {

        const loginUser = req.session.loginUser;
        const data = await order.find({ "userId": req.session.loginUser._id });


        res.render("userPages/userHistory", {
            loginUser: loginUser,
            history: data
        })
    } else {
        res.render("login", {
            loginFirst: true
        })
    }
})
module.exports = route