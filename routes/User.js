const express=require('express');
const router=express.Router();
const {body, validationResult}=require('express-validator');
const uSchema=require('../models/Auth');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtSecret="Malho@123";

router.post('/signup', [
    body("name", "Enter a valid name").isLength({min: 3}),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a strong password").isLength({min: 5})
], async(req, res) => {
    const errors=await validationResult(req);

    if(!errors.isEmpty) {
        return res.status(400).send({errors: errors.array()})
    }

    else {
        try {
            // let salt=bcrypt.genSalt(10);
            // const pwd=bcrypt.hash(req.body.password, salt);
            console.log("Checkign");
            const addUser=await uSchema.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            res.send(addUser);

            // const data= {
            //     user: {
            //         id: addUser.id
            //     }
            // }

            // const authtoken=await jwt.sign(data, jwtSecret);
            // res.json({authtoken});
        }    

        catch(error) {
            res.status(500).send("Internal Server error1");
            console.log(error.message);
        }
        
    }
})

router.get('/login', [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({min: 5})
], (req, res) => {
    
    try { 
        const dupRec=uSchema.find({
            "email" : req.body.email
        })

        if(dupRec) {
            const pwdCompare=bcrypt.compare(dupRec.password, req.body.password);
            if(!pwdCompare) {
                res.status(500).send("Incorrect username or email");
            }

            else {
                const logData= {
                    logUser: {
                        id: dupRec.id
                    }
                }

                const authToken=jwt.sign(logData, jwtSecret);
                res.json({authToken});
            }
        }

        else {
            res.status(404).send("User details not found")
        }
    }

    catch(error) {
        res.status(500).send("Internal Server error");
        console.log(error.message);
    }
    
})

module.exports=router;