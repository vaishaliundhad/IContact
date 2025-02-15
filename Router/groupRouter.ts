import { Request , Response  , Router} from "express";
import * as groupController from '../Controllers/groupController'
import { body } from "express-validator";


const gropRouter:Router= Router();
/*
   @usage:Get All Groups
   @method: GET
   @params:no-params
   @url: http://localhost:9988/groups
*/

gropRouter.get("/" , async(request:Request , response:Response)=>{
    await groupController.getAllGroup(request , response)
})

/*
   @usage:to get  a group
   @method: GET
   @params:groupId
   @url: http://localhost:9988/groups/:groupId
   @url: http://127.0.0.1:9988/groups/67ab4383c031c253df5cd497
*/


gropRouter.get("/:groupId" , async(request:Request , response:Response)=>{
    await groupController.getGroup(request , response)
})

/*
   @usage:create a group
   @method: POST
   @params:name
   @url: http://localhost:9988/groups
*/

gropRouter.post("/" , 
    //express validator
 [body('name').not().isEmpty().withMessage("name is requires")],
async(request:Request , response:Response)=>{
    console.log("post");
    
    await groupController.createGroup(request , response);
}
);



export default gropRouter