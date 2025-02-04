import path from 'path';
import {IUser} from '../Models/IUser';


const jsonfile = require('jsonfile')


export class UserUtil{

    // private static userjsonpath = path.join(__dirname, "", 'db', 'user.json')
    private static userjsonpath = path.join(__dirname, "..","db", "user.json");
    public static getAllUserFromDB():Promise<IUser[]>{
        return new Promise( (resolve , reject)=>{
        jsonfile.readFile(this.userjsonpath , ( err: any , data:any)=>{
         if(err){
            reject(err);

         }
         else{
            resolve(data);
         }
        })
        })
    }
}


