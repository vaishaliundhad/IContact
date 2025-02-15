import mongoose from 'mongoose';
import { Request, Response } from 'express'
import { IUser } from '../Model/IUser';
import UserTable from '../database/userSchema';
import { error } from 'console';

// create method =>post =>insert data

export const createUser = async (request: Request, response: Response) => {
    let userBody = request.body;
    console.log("insert", userBody);
    try {
        const user: any = new UserTable(userBody);
        const userData = await user.save();
        if (userData) {
            return response.json({ data: userData });
        }
        else {
            return response.status(400).send("Not Found");
        }
    }
    catch (err) {
        response.status(400).send("Somthing Went Wrong..........");
    }
}

// read method => get All  data

export const readUser = async (request: Request, response: Response) => {
    try {
        console.log("hello ji")
        const userData = await UserTable.find();
        if (userData.length === 0) {
            return response.json({ msg: "userData not found" })
        } else {
            return response.json({
                data: userData
            })
        }
    } catch (err) {
        return response.status(400).json({
            msg: "something went wrong"
        })
    }
}

/**
 * 
 * @usage: to get a group
 * @method: GET 
 * @params:userId 
 * @url:http://localhost:9988/user/:userId
 */
// get single data 
export const getUser = async (request: Request, response: Response) => {
    let { userId } = request.params;
    const mongoGroupId = new mongoose.Types.ObjectId(userId);
    let theGroup: IUser | undefined | null = await UserTable.findById(
        mongoGroupId
    )

    if (!theGroup) {
        return response.status(404).json({
            data: null,
            error: "no group is found",

        });
    }
    return response.status(200).json(theGroup);
}

//put method => update data

export const putUser = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const putData = request.body;

    try {
        console.log("put data");

        const updatedUser = await UserTable.findByIdAndUpdate(
            userId,
            { $set: putData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return response.status(404).json({ error: "user not found" });

        }

        return response.status(200).json({ data: updatedUser });
    }

    catch (err) {
        return response.status(400).json({ error: "something went wrong ", details: err })
    }
}


//delete

export const deleteUser = async (request: Request, response: Response) => {
    const { userId } = request.params;
    try {
        console.log("delate data");

        const deleteUser = await UserTable.findByIdAndDelete(userId);

        if (!deleteUser) {
            return response.status(404).json({ error: "user not found" });
        }

        return response.status(202).json({
            message: "user Deleted  Successfully",
            data: deleteUser
        });
    }

    catch (err) {
        return response.status(500).json({
            error: "something went wrong",
            detail: err
        })
    }

}