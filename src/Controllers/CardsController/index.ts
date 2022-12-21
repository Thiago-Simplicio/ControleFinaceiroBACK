import { Request, Response } from "express";
import { CardsServices } from "../../Services/CardsServices";

class CardsController {
    public async create ( req: Request, res: Response ) {
        try {
            const { name, number, value, color, refUser } = req.body;

            const cardsServices = new CardsServices();

            const execute = await cardsServices.create(name, number, value, color, refUser);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async get ( req: Request, res: Response ) {
        try {
            const { idUser } = req.query;

            const cardsServices = new CardsServices();

            const execute = await cardsServices.getCardsUser(idUser);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async delete ( req: Request, res: Response ) {
        try {
            const { idCard } = req.query;

            const cardsServices = new CardsServices();

            const execute = await cardsServices.deleteCard(idCard);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async update ( req: Request, res: Response ) {
        try {
            const { idCard } = req.query;
            const { name, number, value, color } = req.body;

            const cardsServices = new CardsServices();

            const execute = await cardsServices.editCard(idCard, name, number, value, color);

            return res.status(200).json(execute)
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }

    public async read ( req: Request, res: Response ) {
        try {
            const { idCard } = req.query;

            const cardsServices = new CardsServices();

            const execute = await cardsServices.readCard(idCard);

            return res.status(200).json(execute);
        } catch (error) {
            return res.status(400).json({ msg: `Erro no servidor ${error}` });
        }
    }
}
export { CardsController }