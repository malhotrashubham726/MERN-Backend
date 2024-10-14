const jwt=require('jsonwebtoken');
const jwtSecret="Malho@123";

const midWare=((req, res, next) => {
    try {
        const token=req.header("authtoken");

        if(!token) {
            res.status(401).send("Please authenticate with valid token");
        }

        else {
            const data=jwt.verify(token, jwtSecret);
            req.id=data.id;
            next();
        }
    }
    
    catch(error) {
        res.status(500).send("Some error occured");
    }
    
}) 

module.exports=midWare;