import mongoose from "mongoose";
import { Request, Response } from "express";
import { IContact } from "../Model/IContact";
import ContactTable from "../database/ContactSchema";
import { request } from "http";



// createcontact
export const createContact = async(request:Request , response:Response)=>{
    let userBody= request.body;
    console.log("insert", userBody);
    try{
        const contact:any = new ContactTable(userBody);
        const contactData=await contact.save();
        if(contactData){
            return response.json({
                data:contactData
            });
        }
        else{
            return response.status(400).send("not found")
        }
    }
    catch(err){
        response.status(400).send("something went wrong.........")
    }
}


//read method => get All data

export const readAllContact = async(request:Request , response:Response)=>{
    try{
        console.log("get data");
        const contactData=await ContactTable.find();
        if(contactData.length === 0){
            return response.json({msg:"contactdata not found"})
        }
        else{
            return response.json({
                data:contactData
            })
        }
        
    }
    catch(err){
        return response.status(400).json({
            msg:"something went wrong"
        })
    }
}


// get singledata

export const readContact = async(request:Request , response:Response)=>{
    let {contactId}= request.params;
    const mongoContactId = new mongoose.Types.ObjectId(contactId);
    let theContact : IContact|undefined | null = await ContactTable.findById(
        mongoContactId
    ) 
    if(!theContact){
        return response.status(404).json({
            data:null,
            error:"no contact is found",
        })
    }
    return response.status(200).json(theContact);
}

//put method => update data

export const putContact = async(request:Request , response:Response)=>{
    const {contactId}=request.params;
    const putData = request.body;

    try{
        console.log("put data");

        const updatedContact = await ContactTable.findByIdAndUpdate(
            contactId,
            {$set: putData},
            {new:true , runValidators:true}
        );
        if(!updatedContact){
            return response.status(404).json({error:"conatct not found"});
        }
        return response.status(200).json({data:updatedContact})
    }
    catch(err){
        return response.status(400).json({error:"something went wrong" , details:err})
    }
}

//delete method

export const deletecontact = async (request:Request , response:Response)=>{
    const {contactId}= request.params;
    try{
        console.log("delete data");
        const deletecontact = await ContactTable.findByIdAndDelete(contactId);
        if(!deletecontact){
            return response.status(404).json({error: "conatct not found"})
        }
        return response.status(202).json({
            message:"conatct deleted successfully"
        });
    }

    catch(err){
        return response.status(500).json({
            error:"something went wrong",
            detail:err
        })
    }
}