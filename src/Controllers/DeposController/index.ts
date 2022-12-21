import { Request, Response } from "express";
import { DeposServices } from "../../Services/DeposServices";

class DeposController {
    public async get (req: Request, res: Response) {
        try {
            const {idUser} = req.query;

            const deposServices = new DeposServices();

            const execute = await deposServices.getRefUserDepos(idUser);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` })
        }
    }

    public async create (req: Request, res: Response) {
        try {
            const {idUser} = req.query;
            const {refUser, refCard, status, type, value, date} = req.body;

            const deposServices = new DeposServices();

            const execute = await deposServices.createDepos(idUser, refUser, refCard, status, type, value, date);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` })
        }
    }

    public async delete (req: Request, res: Response) {
        try {
            const {idUser, idDepos} = req.query;

            const deposServices = new DeposServices();

            const execute = await deposServices.deleteDepos(idUser, idDepos);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async update (req: Request, res: Response) {
        try {
            const {idUser, idDepos} = req.query;
            const {refUser, refCard, type, value} = req.body;

            const deposServices = new DeposServices();

            const execute = await deposServices.updateDepos(idUser, idDepos, refUser, refCard, type, value);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async read (req: Request, res: Response) {
        try {
            const {idDepos} = req.query;

            const deposServices = new DeposServices();

            const execute = await deposServices.readDepos(idDepos);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async filter (req: Request, res: Response) {
        try {
            const { idCard, idUser} = req.query;

            const deposServices = new DeposServices();

            const execute = await deposServices.filterDepos(idCard, idUser);

            return res.status(200).json(execute);
        }   catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }
}

export { DeposController }