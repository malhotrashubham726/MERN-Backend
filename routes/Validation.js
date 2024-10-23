const express=require('express');
const router=express.Router();
const fetchUser='../middleware/middleware.js';
const {body, validationResult}=require('express-validator');
const validation=require('../models/Validate');

router.post('/adduser', fetchUser, [
    body("title", "Length of title should be greater than or equal to 3").isLength({min: 3}),
    body("description", "Length of description should be greater than or equal to 5").isLength({min:5}),
    body("tag", "Enter the valid tag").isLength({min:3})
], async(req, res) => {
    try {
        const errors=await validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(500).send("Some error occured");
        }

        else {
            const userReq=await validation.create({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,
                user: req.id
            })

            return res.status(200).json({userReq});
        }
    }

    catch(error) {
        return res.status(500).send("Internal server error occured")
    }
})

module.exports=router;