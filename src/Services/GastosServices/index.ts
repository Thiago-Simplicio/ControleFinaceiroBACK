import GastosSchema from "../../Models/GastosSchema";
import UserSchema from "../../Models/UserSchema";
import CardsSchema from "../../Models/CardsSchema";
import moment from "moment";

class GastosServices {
    public async getRefUserGasto (idUser: any) {
        try {
            const userRegister = await GastosSchema.find({refUser: idUser}).populate('refCard');
                if(userRegister.length == 0) {
                    return ({
                        msg: `Você ainda não tem nehum registro de saída`,
                        status: 1
                    })
                }
                    return userRegister

        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async createGasto (idUser: any, refUser: any, refCard: any, status: any, type: any, value: any, date: any) {
        try {
            let valueFormat: number | any;
            const user = await UserSchema.find({_id: idUser});
                if (!user) {
                    return ({
                        msg: `Usuario não encontrado`,
                        status: 1
                    })
                }
                    const card = await CardsSchema.find({refUser: idUser});
                        if(!card) {
                            return ({
                                msg: `Você não tem nenhum cartão cadastrado`,
                                status: 2
                            })
                        }   
                        date = moment(new Date ()).format("DD/MM/YYYY")
                            if (value.length == 4) {
                                let formatValue = value.substring(2, 0) + "," + value.substring(2,4);
                                valueFormat = formatValue;
                            } else if (value.length == 5) {
                                let formatValue = value.substring(3, 0) + "," + value.substring(2,4);
                                valueFormat = formatValue;
                            } else if (value.length == 6) {
                                let formatValue = value.substring(1, 0) + "." + value.substring(4,1) + "," + value.substring(5,3);
                                valueFormat = formatValue;
                            }

                                if (status == 2) {
                                    const data = {refUser: idUser, refCard, type: "exit", status, value: valueFormat, date};
                                    const deposCreate = await GastosSchema.create(data);
                                    return deposCreate;
                                } else {
                                    return ({
                                        msg: `Status incorreto para esse registro`,
                                        status: 3
                                    })
                                }
                            

        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async deleteGasto (idUser: any, idGasto: any) {
        try {
            const depos = await GastosSchema.find({refUser: idUser});
                if (depos.length == 0) {
                    return ({
                        msg: `Registro de saída não encontrado com esse usuario`,
                        status: 1
                    })
                }
                const deleteDepos = await GastosSchema.findOneAndDelete({_id: idGasto});
                return deleteDepos
        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async updateGasto (idUser: any, idGasto: any, refUser: any, refCard: any, type: any, value: any) {
        try {
            const depos = await GastosSchema.find({refUser: idUser});
                if (depos.length == 0) {
                    return ({
                        msg: `Registro de saída não encontrado com esse usuario`,
                        status: 1
                    })
                }
                    const data = {idUser, idGasto, refUser: idUser, refCard, type: "entry", value}
                    const deposUpdate = await GastosSchema.findOneAndUpdate({_id: idGasto}, data, {new: true});
                    return deposUpdate
        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async readGasto (idGasto: any) {
        try {
            const gasto = await GastosSchema.find({_id: idGasto}).populate('refCard');
                if (gasto.length == 0) {
                    return ({
                        msg: `Registro de saída não encontrado`,
                        status: 1
                    })
                } 
                    return gasto
        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async filterGasto (idCard: any, idUser: any) {
        try {
            if (idCard) {
                const card = await CardsSchema.find({_id: idCard});
                    if (card.length == 0) {
                        return ({
                            msg: `Cartão não encontrado`,
                            status: 1
                        })
                    }
                        const gasto = await GastosSchema.find({refCard: idCard}).populate('refCard');
                            if (gasto.length == 0) {
                                return ({
                                    msg: `Nenhum registro de saída com esse cartão`,
                                    status: 1
                                })
                            }
                            return gasto;
            } else {
                const gasto = await GastosSchema.find({refUser: idUser}).populate('refCard');
                    if (gasto.length == 0) {
                        return ({
                            msg: `Nenhum registro de saída com esse cartão`,
                            status: 1
                        })
                    }
                        return gasto;
            }
        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }
}

export { GastosServices }