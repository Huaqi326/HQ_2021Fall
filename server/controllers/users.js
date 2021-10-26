const express = require('express');
const model = require('../models/users');

const app = express.Router();

app
.get("/", (req,res,next) => {
    // res.send([ {name: 'Huaqi'} ]); // only one, or cannot see the header
    res.send(model.GetAll());
})
.get("/:user_id", (req, res, next) =>{
    res.send(model.Get(req.params.user_id));
})

module.exports = app;