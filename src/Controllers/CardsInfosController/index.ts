import { Request, Response } from 'express';
import { CardsInfosServices } from '../../Services/CardsInfosServices';

class CardsInfosController {
    public async getInfos (req: Request, res: Response) {
        try {
            const { idCard, idUser, startDateFilter } = req.query;

            const cardsInfosServices = new CardsInfosServices();

            const execute = await cardsInfosServices.getInfosCard(idCard, idUser, startDateFilter);

            return res.status(200).json(execute);
        }  catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }
}

export { CardsInfosController }