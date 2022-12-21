import mongoose from "mongoose";
import UserSchema from "../../Models/UserSchema";
import bcrypt from 'bcrypt'

class UsersServices {
    public async create (name_user: string, lastName_user: string, email_user: string, password_user: string) {
        try {
            const user = await UserSchema.findOne({ email_user: email_user });

            if ( user ) {
                return ({
                    status: 1,
                    msg: `Usuário com esse E-mail já cadastrado!`
                })
            } else {
                const salt = await bcrypt.genSalt(10)
                password_user = bcrypt.hashSync(password_user, salt);
                const data = { name_user, lastName_user , email_user, password_user };
                const createUser = await UserSchema.create(data);
                return({
                    status: 2,
                    data: createUser,
                    msg: `Usuário cadastrado com sucesso!`
                })
            }

        } catch (error) {
            console.log(`Erro ao criar usuario ${error}`)
        }
    }

    public async allUser () {
        try {
            const user = await UserSchema.find();

            if ( user.length > 0 ) {
                return user
            } else {
                return ({
                    status: 1,
                    msg: `Nenhum usuário cadastrado!`
                })
            }

        } catch (error) {
            console.log(`Erro ao buscar os usuarios ${error}`)
        }
    }

    public async deleteUser (idUser: string | any) {
        try {
            const user = await UserSchema.findOne({ id: idUser });

            if ( user ) {
                const userDel = await UserSchema.findOneAndDelete({id: idUser});
                return userDel
            } else {
                return ({
                    status: 1,
                    msg: `Usuário não encontrado`
                })
            }

        } catch (error) {
            console.log(`Erro ao buscar os usuarios ${error}`)
        }
    }

    public async getUser (idUser: string | any) {
        try {
            const user = await UserSchema.find({ id: idUser });

            if ( user ) {
                const userDel = await UserSchema.findOne({id: idUser});
                return userDel
            } else {
                return ({
                    status: 1,
                    msg: `Usuário não encontrado`
                })
            }

        } catch (error) {
            console.log(`Erro ao buscar os usuarios ${error}`)
        }
    }

    public async updateUser (idUser: any, name_user: any, lastName_user: any, email_user: any, password_user: any) {
        try {
            const user = await UserSchema.findOne({ _id: idUser });

            if ( user ) {
                if (password_user) {
                    password_user = bcrypt.hashSync(password_user, 10);
                    const data = { idUser, password_user };
                    const userUp = await UserSchema.findOneAndUpdate({_id: idUser}, data, { new: true });
                    return userUp    
                } else {
                    const data = { idUser, name_user, lastName_user, email_user };
                    const userUp = await UserSchema.findOneAndUpdate({_id: idUser}, data, { new: true });
                    return userUp
                }
            } else {
                return ({
                    status: 1,
                    msg: `Usuário não encontrado`
                })
            }

        } catch (error) {
            console.log(`Erro no servidor ${error}`)
        }
    }
}

export { UsersServices }