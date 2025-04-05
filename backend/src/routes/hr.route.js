import express from "express"
import {giveFeedback,getFeedback ,getEmployees} from "../controllers/hr.controller.js"  //will contain all controllers for employees page
import {protectRoute} from "../middlewares/auth.middleware.js"   
const router  = express.Router()   

router.get('/giveFeedbackHR:id',protectRoute,giveFeedback); //will lead to all the employees to giev feedback to whoever you want
router.get("/getFeedback:id",protectRoute,getFeedback);  //now this route is for getting the feedback of employee with id by HR
router.get('/getEmployees',getEmployees) //fn to get all employees so that HR can select whicch one to reviww

export default router;
