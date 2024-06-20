import { Request, Response } from "express";
import _ from 'lodash'
import User from "../model/user.model";
class userController {
    static async getUser(req:Request, res:Response) {
        res.json({"message":"get user"});
    }
    static async getUserById(req:Request, res:Response) {
        
    }
    static async createUser(req:Request, res:Response) {
        try 
        {
            const data = req.body;
            const { userName } = data;
      
            const existingUser = await User.findOne({ where: { userName } });
            const existingUserList = 
            await User.findAll({
                order: [
                    ['ID', 'DESC'],
                ]
            })
            console.log('lít', existingUserList);
            let IDHighest 
            if(existingUserList.length == 0){
                IDHighest = 1;
            }
            else
            {
                IDHighest = existingUserList[0].ID;
                IDHighest = Number (IDHighest.slice(2)) + 1;
            }
            data.ID = "US" + IDHighest.toString();
            if (existingUser) {
              return res.json({ message: 'Username already exists' });
            }

            const result = await User.create(data);
            
            res.json({
              message: 'Success!',
              data: result
            });
        } 
        catch (error) 
        {
            console.error(error);
            res.json({ message: 'An error occurred while creating the user' });
        }
    }
    static async updateUser(req:Request, res:Response) {
        try 
        {
            const { id } = req.params; 
            const { userName, passWord } = req.body;
      
            const user = await User.findByPk(id);
      
            if (!user) {
              return res.json({ message: 'User not found' });
            }
      
            user.userName = userName || user.userName;
            user.passWord = passWord || user.passWord;
      
            await user.save();
      
            return res.json(user);
        } 
        catch (error) 
        {
            console.error(error);
            return res.json({ message: 'An error occurred while updating the user' });
        }
    }
    static async deleteUser(req:Request, res:Response) {
        try 
        {
            const { id } = req.params;

            const user = await User.findByPk(id);
      
            if (!user) {
              return res.json({ message: 'User not found' });
            }

            await user.destroy();
      
            return res.json({ message: 'User deleted successfully' });
        } 
        catch (error) 
        {
            console.error(error);
            return res.json({ message: 'An error occurred while deleting the user' });
        }
    }
}
export default userController;