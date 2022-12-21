import DepositosSchema from '../../Models/DepositosSchema';
import GastosSchema from '../../Models/GastosSchema';
import CardsSchema from '../../Models/CardsSchema';
import User from '../../Models/UserSchema';
import moment, { utc } from 'moment';

class CardsInfosServices {
    public async getInfosCard (idCard: any, idUser: any, dateFilter: any) {
        try {
            let number = 0;
            let dataNot: any[] = [];
            let numbersEntry = 0;
            let numbersExit = 0;
            let data : any[] = [];

                const getDataDepos = await DepositosSchema.find({
                    $or: [ { refUser: idUser, refCard: idCard } ]
                });

                const getDataGastos = await GastosSchema.find({
                    $or: [ { refUser: idUser, refCard: idCard } ]
                });

                let startDateFilter: any;
                let endDateFilter: any;
                
                    if (dateFilter) {
                        let splitDate = dateFilter.split(",");
                        startDateFilter = moment ( new Date ( splitDate[0] + "T00:00:00") ).format();
                        endDateFilter = moment ( new Date ( splitDate[1] + "T23:59:59" ) ).format();
                    }

                    await Promise.all(
                        getDataDepos.map((result: any) => {
                            let valueReplace = result?.value.replace(".","");
                            let formatValue: number = parseFloat(valueReplace)
                            if ( 
                                moment ( new Date (result?.createdAt)).format() > startDateFilter  &&  
                                moment ( new Date (result?.createdAt)).format() < endDateFilter  ) {

                                    for (let i = 0; i <= getDataDepos.length; i++) {
                                        numbersEntry+= formatValue 
                                        break;
                                    }   

                            }  else {
                                return data.push({
                                    msg: `Nenhum registro encontrado com essa data`,
                                    status: 1
                                })
                            }
                        })
                    )

                    await Promise.all(
                        getDataGastos.map((result: any) => {
                            let valueReplace = result?.value.replace(".","");
                            let formatValue: number = parseFloat(valueReplace)
                            if ( 
                                moment ( new Date (result?.createdAt)).format() > startDateFilter  &&  
                                moment ( new Date (result?.createdAt)).format() < endDateFilter  ) {

                                    for (let i = 0; i <= getDataGastos.length; i++) {
                                        numbersExit+= formatValue 
                                        break;
                                    }

                            }  else {
                                return data.push({
                                    msg: `Nenhum registro encontrado com essa data`,
                                    status: 1
                                })
                            }
                        })
                    )

                    data.push({
                        entrada: numbersEntry,
                        saida: numbersExit
                    })

                    return data
        } catch (error) {
            return (`Erro no servidor ${error}`);
        }
    }
}

export { CardsInfosServices }