var express = require('express');
var router = express.Router();
const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const Tags = require('../model/tags');
//router-> [POST] /tags
router.post('/', async (req, res) => {
    try {
        const{name} = req.body;
        console.log("sdd");
        Tags.create({name})
        .then(({code, json})=>
        res.status(code).send(json["data"][0]))
        .catch(err =>{
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }
});
//router-> [GET] /tags
router.get('/', async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
    }
});
//router-> [GET] /tags/:id tag의 id 의미
router.get('/:id', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});
//router-> [DELETE] /tags/:id tag의 id 의미
router.delete('/:id', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;