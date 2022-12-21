import CardsSchema from "../../Models/CardsSchema";
import UserSchema from "../../Models/UserSchema";
import moment from 'moment'

class CardsServices {
    public async create (name: any, number: any, value: any, color: any, refUser: any) {
        try {
            const getUser = await UserSchema.find({_id: refUser});
            if (!getUser) {
                return ({
                    msg: `Usuario não encontrado`,
                    status: 1
                })
            }
            const data = {name, number, value, color, refUser};
            const create = await CardsSchema.create(data);
            return create
        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async getCardsUser (idUser: any) {
        try {
            let data: any[] = [];

            const user = await UserSchema.find({_id: idUser});
                if(!user) {
                    return({
                        msg: `Usuario não encontrado`,
                        status: 1
                    })
                }

                const card = await CardsSchema.find({refUser: idUser})
                    if(!card) {
                        return ({
                            msg: `Nenhum cartão registrado com esse usuario`,
                            status: 2
                        })
                    }

                await Promise.all(
                    card.map((result: any) => {
                        return data.push({
                            nameCard: result?.name,
                            numberCard: result?.number,
                            valueCard: result?.value,
                            colorStyle: result?.color,
                            idCard: result?._id,
                            refUser: result?.refUser,
                            createdAt: moment( new Date ( result?.createdAt ) ).format("DD/MM/YYYY hh:mm:ss")
                        })
                    })
                )

                return data

        } catch (error) {
            return (`Erro ${error}`)
        }
    }

    public async deleteCard (idCard: any) {
        try {
            let data: any[] = [];

            const card = await CardsSchema.find({_id: idCard});
                if(!card) {
                    return data.push({
                        msg: `Cartão não encontrado`,
                        status: 1
                    })
                }

                
                await Promise.all(
                    card.map(async (result: any) => {
                        await CardsSchema.findOneAndDelete({_id: result?._id});
                        return data.push({
                            nameCard: result?.name,
                            numberCard: result?.number,
                            valueCard: result?.value,
                            colorStyle: result?.color,
                            idCard: result?._id,
                            createdAt: moment( new Date ( result?.createdAt ) ).format("DD/MM/YYYY hh:mm:ss")
                        })
                    })
                )

                return data
        } catch (error) {
            return (`Erro ${error}`)
        }
    }

    public async editCard (idCard: any, name: any, number: any, value: any, color: any) {
        try {
            let cardData: any[] = [];
            let data: any[] = [];

            const card = await CardsSchema.find({_id: idCard});
                if(!card) {
                    return ({
                        msg: `Cartão não encontrado`,
                        status: 1
                    })
                }

                    await Promise.all(
                        card.map(async (result: any) => {
                            const dataUpdate = { idCard, name, number, value, color, refUser: result?.refUser }
                            const card = await CardsSchema.findOneAndUpdate({_id: idCard}, dataUpdate, {new: true});  
                            cardData.push(card);
                        })
                    )

                    return cardData

        } catch (error) {
            return (`Erro ${error}`);
        }
    }

    public async readCard (idCard: any) {
        try {
            let data: any[] = [];

            const card = await CardsSchema.find({_id: idCard});
                if(!card) {
                    return ({
                        msg: `Cartão não encontrado`,
                        status: 1
                    })
                }

                await Promise.all(
                    card.map((result: any) => {
                        data.push({
                            id: result?._id,
                            name: result?.name,
                            number: result?.number,
                            value: result?.value,
                            color: result?.color,
                            refUser: result?.refUser,
                            createdAt: moment( new Date ( result?.createdAt ) ).format("DD/MM/YYYY hh:mm:ss"),
                            updatedAt: moment( new Date ( result?.updatedAt ) ).format("DD/MM/YYYY hh:mm:ss")
                        })
                    })
                )

                return data

        } catch (error) {
            return (`Erro ${error}`);
        }
    }
}

export { CardsServices }