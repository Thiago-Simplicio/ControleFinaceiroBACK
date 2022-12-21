import DepositosSchema from "../../Models/DepositosSchema";
import UserSchema from "../../Models/UserSchema";
import CardsSchema from "../../Models/CardsSchema";
import moment from "moment";

class DeposServices {
    public async getRefUserDepos (idUser: any) {
        try {
            const userRegister = await DepositosSchema.find({refUser: idUser}).populate('refCard');
                if(userRegister.length == 0) {
                    return ({
                        msg: `Você ainda não tem nehum deposito`,
                        status: 1
                    })
                }
                    return userRegister

        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async createDepos (idUser: any, refUser: any, refCard: any, status: any, type: any, value: any, date: any) {
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

                                if (status == 1) {
                                    const data = {refUser: idUser, refCard, type: "entry", status, value: valueFormat, date};
                                    const deposCreate = await DepositosSchema.create(data);
                                    return deposCreate;
                                } else {
                                    return ({
                                        msg: `Status para esse registro incorreta!`,
                                        status: 3
                                    })
                                }
                            

        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async deleteDepos (idUser: any, idDepos: any) {
        try {
            const depos = await DepositosSchema.find({refUser: idUser});
                if (depos.length == 0) {
                    return ({
                        msg: `Depositos não encontrado com esse usuario`,
                        status: 1
                    })
                }
                const deleteDepos = await DepositosSchema.findOneAndDelete({_id: idDepos});
                return deleteDepos
        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async updateDepos (idUser: any, idDepos: any, refUser: any, refCard: any, type: any, value: any) {
        try {
            const depos = await DepositosSchema.find({refUser: idUser});
                if (depos.length == 0) {
                    return ({
                        msg: `Depositos não encontrado com esse usuario`,
                        status: 1
                    })
                }
                    const data = {idUser, idDepos, refUser: idUser, refCard, type: "entry", value}
                    const deposUpdate = await DepositosSchema.findOneAndUpdate({_id: idDepos}, data, {new: true});
                    return deposUpdate
        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async readDepos (idDepos: any) {
        try {
            const depos = await DepositosSchema.find({_id: idDepos}).populate('refCard');
                if (depos.length == 0) {
                    return ({
                        msg: `Deposito não encontrado`,
                        status: 1
                    })
                } 
                    return depos
        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }

    public async filterDepos (idCard: any, idUser: any) {
        try {
            if (idCard) {
                const card = await CardsSchema.find({_id: idCard});
                    if (card.length == 0) {
                        return ({
                            msg: `Cartão não encontrado`,
                            status: 1
                        })
                    }
                        const depo = await DepositosSchema.find({refCard: idCard}).populate('refCard');
                            if (depo.length == 0) {
                                return ({
                                    msg: `Nenhum deposito com esse cartão`,
                                    status: 1
                                })
                            }
                            return depo;
            } else {
                const depo = await DepositosSchema.find({refUser: idUser}).populate('refCard');
                    if (depo.length == 0) {
                        return ({
                            msg: `Nenhum deposito com esse cartão`,
                            status: 1
                        })
                    }
                        return depo;
            }
        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }
}

export { DeposServices }