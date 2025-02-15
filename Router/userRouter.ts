import {Request , Response , Router} from 'express';
import * as userController from '../Controllers/userController'
import { request } from 'http';



const userRouter:Router=Router();


/*
   @usage:Get User
   @method: POST
   @params:no-params
   @url: http://localhost:9988/user
*/

// {
//     "username":"username",
//     "email":"b@gmail.com",
//     "password":"123",
//     "imageUrl":"image",
//     "isAdmin":true
  
//   }

userRouter.post("/", async(request:Request , response:Response)=>{
    await userController.createUser(request , response)
})


/*
   @usage: to Get a User
   @method: GET
   @params:userId
   @url: http://localhost:9988/user/:groupId
*/
userRouter.get("/:userId" , async (request:Request , response:Response)=>{
    await userController.getUser(request , response)
})

/*
   @usage:Get All User
   @method: GET
   @params:no-params
   @url: http://localhost:9988/user
*/

userRouter.get("/", async(request:Request , response:Response)=>{
    await userController.readUser(request , response)
})

export default userRouter


//put method


userRouter.put("/:userId", async(request:Request , response:Response)=>{
    await userController.putUser(request, response)
})


/*
   @usage: Delete User by ID
   @method: DELETE
   @params: userId
   @url: http://localhost:9988/user/:userId
*/

userRouter.delete("/:userId" , async (request:Request , response:Response)=>{
    await userController.deleteUser(request , response);
})