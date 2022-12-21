import { Request, Response } from "express";
import { GastosServices } from "../../Services/GastosServices";

class GastosController {
    public async get (req: Request, res: Response) {
        try {
            const {idUser} = req.query;

            const gastosServices = new GastosServices();

            const execute = await gastosServices.getRefUserGasto(idUser);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` })
        }
    }

    public async create (req: Request, res: Response) {
        try {
            const {idUser} = req.query;
            const {refUser, refCard, status, type, value, date} = req.body;

            const gastosServices = new GastosServices();

            const execute = await gastosServices.createGasto(idUser, refUser, refCard, status, type, value, date);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` })
        }
    }

    public async delete (req: Request, res: Response) {
        try {
            const {idUser, idGastos} = req.query;

            const gastosServices = new GastosServices();

            const execute = await gastosServices.deleteGasto(idUser, idGastos);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async update (req: Request, res: Response) {
        try {
            const {idUser, idGastos} = req.query;
            const {refUser, refCard, type, value} = req.body;

            const gastosServices = new GastosServices();

            const execute = await gastosServices.updateGasto(idUser, idGastos, refUser, refCard, type, value);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async read (req: Request, res: Response) {
        try {
            const {idGastos} = req.query;

            const gastosServices = new GastosServices();

            const execute = await gastosServices.readGasto(idGastos);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async filter (req: Request, res: Response) {
        try {
            const { idCard, idUser} = req.query;

            const gastosServices = new GastosServices();

            const execute = await gastosServices.filterGasto(idCard, idUser);

            return res.status(200).json(execute);
        }   catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }
}

export { GastosController }