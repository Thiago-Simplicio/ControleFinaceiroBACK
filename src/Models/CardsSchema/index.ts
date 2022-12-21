import { model, Schema } from 'mongoose'

interface Cards {
    name: string | any;
    number: string | number | any;
    value: string | any;
    color: string | any;
    refUser: string | any;
}

const CardsSchema = new Schema({
    name: {
        type: String
    },
    number: {
        type: String || Number
    } ,
    value: {
        type: String || Number
    },
    color: {
        type: String
    },
    refUser: {
        type: Schema.Types.ObjectId
    }
},{
    timestamps: true
})

export default model<Cards>("Cards", CardsSchema);