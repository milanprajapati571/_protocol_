import { generateToken } from '../lib/utils.js';
import bcrypt from 'bcryptjs';
import pool from '../lib/db.js'; // Adjust the path to your dbConfig.js
// Assuming you have a databaseOperations.js file for interacting with PostgreSQL
import { getUserByEmail } from '../lib/databaseOperations.js'; // Create this function

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //now check for password
        //decrypt it for checking
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user.user_id, res); // Assuming your user table has 'user_id'

        res.status(200).json({
            _id: user.user_id, // Assuming your user table has 'user_id'
            fullname: user.fullname, // Assuming your user table has 'fullname'
            password: user.password,
            email: user.email,
            profilePic: user.profile_pic, // Assuming your user table has 'profile_pic'
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller ", error.message);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export const updateProfile = async (req, res) => {
    //now after user authenticated from protectRoute middleware
    try {
        const { profilePic } = req.body //we are expecting frontend to return profilePic named param in req only (coded accordingly :-)
        //now we can access user from req cause we had added user in req in middlware protectRoute only
        const userId = req.user.user_id // Assuming you're storing user info in req.user

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }
        //upload profile image in cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        //now update user in database
        //Its clear that cloudinary is not our database ,its just a bucket for images
        //our database is in postgresSql only

        const updatedUser = await pool.query(
            'UPDATE users SET profile_pic = $1 WHERE user_id = $2 RETURNING user_id, fullname, email, profile_pic',
            [uploadResponse.secure_url, userId]
        );

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ updatedUser: updatedUser.rows[0], message: "Profile pic updated successfully " });

    } catch (error) {
        console.log("Error in update profilePic controller ", error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}