import {Request , Response} from 'express';
import { validationResult } from 'express-validator';
import GroupsTable from '../database/GroupSchema';
import { IGroup } from '../Model/IGroup';
import mongoose from 'mongoose';



/**
 @usage:to get all groups
 @methid:GET
 @params:no-params
 @url: https://localhost:9988/groups
 */
export const getAllGroup=async(request:Request , response:Response)=>{
 try{
    let groups:IGroup[] | undefined= await GroupsTable.find();
    if(groups){
        return response.status(200).json(groups)
    }
 }
 catch(error:any){
    return response.status(200).json({"msg":"Data not found"})
 }
}

/*
   @usage:to get  a group
   @method: GET
   @params:groupId
   @url: http://localhost:9988 /groups/:groupId
*/

 export const getGroup=async(request:Request , response:Response)=>{
   let {groupId}=request.params;
   const mongoGroupId=new mongoose.Types.ObjectId(groupId);
   let theGroup :IGroup | undefined | null = await GroupsTable.findById(
      mongoGroupId
   )

   if(!theGroup){
      return response.status(404).json({
         data:null,
         error:"No Group is found",
      });
   }

   return response.status(200).json(theGroup);
  }

/**
 @usage:create group 
 @methid:POST
 @params:name
 @url: https://localhost:9000/groups
 */

 export const createGroup=async(request:Request , response:Response)=>{
   let {name}=request.body;
   console.log("create group" , name)
   let theGroup:IGroup | null | undefined =await new GroupsTable({
      name:name,
   }).save();
   if(theGroup){
      return response.status(200).json({
      data:theGroup,
        msg:"group is created",
      })
   }
 }
  