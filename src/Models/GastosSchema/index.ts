import { Schema, model } from 'mongoose'

interface Gastos {
    refUser: string | any;
    refCard: string | any;
    status: string | number | any;
    type: string | any;
    value: string | any;
    date: string | any;
}

const GastosSchema = new Schema({
    refUser: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios"
    },
    refCard: {
        type: Schema.Types.ObjectId,
        ref: "Cards"
    },
    status: {
        type: String || Number
    },
    type: {
        type: String
    },
    value: {
        type: String || Number
    },
    date: {
        type: String
    }
},{
    timestamps: true
})

export default model<Gastos>("Gastos", GastosSchema);