import express ,{Router}from "express"
import * as userController from "../controllers/User.controller"

const router:Router=express.Router();


router.get("/login",userController.userLogin);


export default router;