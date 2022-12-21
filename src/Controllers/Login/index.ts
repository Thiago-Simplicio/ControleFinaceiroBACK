import { Request, Response } from 'express'
import { LoginServices } from "../../Services/Login";

class LoginController {
    public async Login (req: Request, res: Response) {
        try {
            const { email_user, password_user } = req.body;

            const loginServices = new LoginServices();

            const execute = await loginServices.Login(email_user, password_user);

            return res.status(200).json(execute);
        }   catch (error) {
            return res.status(404).json({ msg: `Erro no servidor ${error}` })
        }
    }
}

export { LoginController }