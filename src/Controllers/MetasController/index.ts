import { Request, Response } from 'express'
import { MetasServices } from '../../Services/MetasServices'

class MetasController {
    public async get (req: Request, res: Response) {
        try {
            const { idUser } = req.query;

            const metasServices = new MetasServices();

            const execute = await metasServices.getMetaFromUser(idUser);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async create (req: Request, res: Response) {
        try {
            const { name, dateRange, valueMax, formattedValue, valueCurrent, refUser } = req.body;

            const metasServices = new MetasServices();

            const execute = await metasServices.createMetaFromUser(name, dateRange, valueMax, formattedValue, valueCurrent, refUser)

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async edit (req: Request, res: Response) {
        try {
            const { idMeta } = req.query;
            const { name, value, valueMax, refUser } = req.body;

            const metasServices = new MetasServices();

            const execute = await metasServices.editMetaFromUser(idMeta, name, value, valueMax, refUser)

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async delete (req: Request, res: Response) {
        try {
            const { idMeta } = req.params;

            const metasServices = new MetasServices();

            const execute = await metasServices.deleteMetaFromUser(idMeta)

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }
}

export { MetasController }