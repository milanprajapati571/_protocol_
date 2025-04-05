import jwt from "jsonwebtoken";
import pool from "../lib/db.js"; // Adjust the path to your dbConfig.js

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - Invalid token " });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        // Find user in your PostgreSQL database
        const userResult = await pool.query(
            'SELECT id AS user_id, name AS fullname, email, role, profile_pic FROM employess WHERE id = $1',
            [decoded.userId]
        );
        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // User authenticated till here
        // Adding user in req
        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware ", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
// import jwt from "jsonwebtoken"
// import User from "../models/user.model.js"

// export const protectRoute =async (req,res,next)=>{
//     try {
//         const token = req.cookies.jwt;
//         if(!token){
//             return res.status(401).json({message:"Unauthorized - Invalid token "})
//         }

//         const decoded  =  jwt.verify(token,process.env.JWT_SECRET)

//         if(!decoded){
//           return res.status(401).json({message:"Unauthorized - Invalid token"});
//         }
//         //find user in User db
//         const user = await User.findById(decoded.userId).select("-password"); //will send everything except password 

//         if(!user){
//             return res.status(401).josn({message:"User not found"})
//         }
        
//         //user authenticated till here 
//         //adding user in req
//         req.user = user

//         next()

//     } catch (error) {
//           console.log("Error in protectRoute middleware ",error.message);
//           return res.status(500).json({message:"Inetrnal Server Error"});
//     }

// }
