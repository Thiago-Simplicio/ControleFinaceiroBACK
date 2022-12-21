import { Schema, model } from 'mongoose';

interface User {
    name_user: string | any;
    lastName_user: string | any;
    email_user: string | any;
    password_user: string | any;
}

const UserSchema = new Schema({
    name_user: {
        type: String
    },
    lastName_user: {
        type: String
    },
    email_user: {
        type: String,
    },
    password_user: {
        type: String,
    }
},{
    timestamps: true
})

export default model<User>('Usuarios', UserSchema)