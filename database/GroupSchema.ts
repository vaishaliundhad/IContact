import mongoose from "mongoose";
import { IGroup } from "../Model/IGroup";

const GroupSchema = new mongoose.Schema<IGroup>(

    {
        name:{type:String , requires:true , unique:true},
    
    },
    {
        timestamps:true
    }
);

const GroupsTable = mongoose.model<IGroup>("groups" , GroupSchema);

export default GroupsTable