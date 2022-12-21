import { Request, Response } from 'express';
import { UsersServices } from '../../Services/Users';

class UserController {
    public async create (req: Request, res: Response) {
        try {
            const { name_user, lastName_user, email_user, password_user } = req.body;

            const usersServices = new UsersServices();

            const execute = await usersServices.create(name_user, lastName_user, email_user, password_user);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: "Error" })
            
        }
    }

    public async all (req: Request, res: Response) {
        try {
            const usersServices = new UsersServices();

            const execute = await usersServices.allUser();

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: "Error" })
            
        }
    }

    public async delete (req: Request, res: Response) {
        try {
            const { idUser } = req.params;

            const usersServices = new UsersServices();

            const execute = await usersServices.deleteUser(idUser);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: "Error" })
            
        }
    }

    public async get (req: Request, res: Response) {
        try {
            const { idUser } = req.params;

            const usersServices = new UsersServices();

            const execute = await usersServices.getUser(idUser);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: "Error" })
            
        }
    }

    public async update (req: Request, res: Response) {
        try {
            const { idUser } = req.params;
            const { name_user, lastName_user, email_user, password_user } = req.body

            const usersServices = new UsersServices();

            const execute = await usersServices.updateUser(idUser, name_user, lastName_user, email_user, password_user);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: "Error" })
            
        }
    }
}

export { UserController }