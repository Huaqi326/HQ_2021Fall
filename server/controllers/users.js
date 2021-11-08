const express = require("express");
const model = require("../models/users");

const app = express.Router();

app
    .get("/async", async (req, res, next) =>{
        console.log("Function 1");
        model.Async();
        res.send("Done");
        console.log("Function 2");
    })
    .get("/", (req, res, next) =>{
        res.send(model.GetAll());
    })
    .get("/:user_id", (req, res, next) =>{
        res.send(model.Get(req.params.user_id));
    })
    .post("/login", (req, res, next) =>{
        model.Login(req.body.handle, req.body.password)
            .then(user=>{ 
                res.send(user);
            })
            .catch(next)
    })
    .post("/register", (req, res, next) =>{
        model.Add(req.body)
            .then(user=>{
                res.status(201).send(user);
            })
            .catch(next) 
    })
module.exports = app;