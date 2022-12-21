import { Schema, model } from 'mongoose'

interface MetaProps {
    name: string;
    dateRange: string | any;
    valueMax: number | string | any;
    valueMaxFormatted: number ;
    valueCurrent: number | string | any;
    refUser: string | any;
}

const MetaSchema = new Schema({
    name: {
        type: String
    },
    dateRange: {
        type: String
    },
    valueMax: {
        type: String || Number
    },
    valueMaxFormatted: {
        type: Number
    },
    valueCurrent: {
        type: String || Number
    },
    refUser: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios"
    }
},{
    timestamps: true
})

export default model<MetaProps>("Metas", MetaSchema);