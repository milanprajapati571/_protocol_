// import express from "express";
// import {login,logout, updateProfile,checkAuth} from "../controllers/auth.controller.js";
// const router = express.Router()
// import { protectRoute } from "../middlewares/auth.middleware.js";

// router.post('/login',login)
// router.post('/logout',logout)

// router.post('/update-profile',updateProfile)
// router.get("/check",protectRoute,checkAuth)

// export default router;

import express from "express"
import { getPeers,getFeedback,sendFeedback } from "../controllers/employee.controller.js"  //will contain all controllers for employees page
import {protectRoute} from "../middlewares/auth.middleware.js"   
const router  = express.Router()   

router.get('/peers/:id',protectRoute,getPeers); //will lead to all the employees(peers except himself(id)) to giev feedback to whoever you want
router.get("/:id",protectRoute,getFeedback);  //now this route is for getting your own feedback

router.post("/send/:id",protectRoute,sendFeedback);    // this route is used to submit  feedback for that particular employee with id :id by employee logged in
    
export default router;

