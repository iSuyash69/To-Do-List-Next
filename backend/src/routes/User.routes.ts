import express , {Router} from "express"
import * as userController from "../controllers/User.controller"
import { isUser } from "../middlewares/isUserAuth";

const router:Router=express.Router();

router.post("/sign-up",userController.userSignUp);
router.post("/sign-in",userController.userSignIn);
router.get("/profile",isUser,(req,res)=>{
    res.json({success:true});
})

export default router;