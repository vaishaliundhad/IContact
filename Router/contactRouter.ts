import { Request , Response  , Router } from "express";
import * as contactController from '../Controllers/contactController'
import { request } from "http";

const conatctRouter:Router=Router();


/*
   @usage:Get User
   @method: POST
   @params:no-params
   @url: http://localhost:9988/contact
*/

// {
//     "user":"admin",
//      "name":"bansi",
//     "imageUrl":"image",
//      "mobile":"8799306948",
//     "email":"b@gmail.com",
//      "company":"tata",
//      "title":"contact",
//      "groupId":"1234"
   
//  }

conatctRouter.post("/" , async(request:Request , response:Response)=>{
    await contactController.createContact(request , response)
})

/*
   @usage:Get All User
   @method: GET
   @params:no-params
   @url: http://localhost:9988/contact
*/
conatctRouter.get("/" , async(request:Request , response:Response)=>{
    await contactController.readAllContact(request, response)
})

/*
   @usage: to Get a User
   @method: GET
   @params:userId
   @url: http://localhost:9988/user/:ContactId
*/

conatctRouter.get("/:contactId" , async(request:Request, response:Response)=>{
    await contactController.readContact(request , response)
})



//put method


/*
   @usage: put contact by ID
   @method: put
   @params: contactId
   @url: http://localhost:9988/contact/:contactId
   */
conatctRouter.put("/:contactId" , async(request:Request , response:Response)=>{
    await contactController.putContact(request, response)
})



/*
   @usage: Delete User by ID
   @method: DELETE
   @params: conatctId
   @url: http://localhost:9988/contact/:contactId
   */

   conatctRouter.delete("/:contactId" , async(request:Request , response:Response)=>{
    await contactController.deletecontact(request, response);
   })
  

export default conatctRouter