import User from '../../Models/UserSchema'
import Meta from '../../Models/MetasSchema'

class MetasServices {
    public async getMetaFromUser (idUser: any) {
        try {
            const user = await Meta.find({refUser: idUser});
                if (!user) {
                    return (`Usuario não encontrado!`)
                }
            return user
        } catch (error) {
            return (`Erro no servidor ${error}`)
        }
    }

    public async createMetaFromUser (name: string, dateRange: string ,valueMax: string | number | any, valueMaxFormatted: number, valueCurrent: string | number, refUser: string) {
        try {
            valueCurrent = "0"
            let replaceValueMax = valueMax.replace(".","");
            let formattedValue = parseInt(replaceValueMax);
            const data = { name, dateRange, valueMax, valueMaxFormatted: formattedValue ,valueCurrent, refUser };
            const meta = await Meta.create(data);
            return meta
        } catch (error) {
            return (`Erro no servidor ${error}`)
        }
    }

    public async editMetaFromUser (idMeta: any, name: any, value: any, valueMax: any, refUser: any) {
        try {
            const verifyMeta = await Meta.find({_id: idMeta});
                if (verifyMeta) {
                    const data = { idMeta, name, value, valueMax, refUser };
                    const editMeta = await Meta.findOneAndUpdate({idMeta}, data, {new: true});
                    return editMeta
                }
        } catch (error) {
            return (`Erro no servidor ${error}`)
        }
    }

    public async deleteMetaFromUser (idMeta: any) {
        try {
            const meta = await Meta.find({_id: idMeta});
                if (!meta) {
                    return ({
                        status: 1,
                        msg: `Meta não encontrada`
                    })
                }

            const metaDelete = await Meta.findOneAndDelete({_id: idMeta});
            return metaDelete
        } catch (error) {
            return (`Erro no servidor ${error}`)
        }
    }
}

export { MetasServices }