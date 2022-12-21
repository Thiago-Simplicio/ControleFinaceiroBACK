import UserSchema from "../../Models/UserSchema";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const mysecret = "@mysecret#"

class LoginServices {
    public async Login (email_user: string, password_user: string) {
        try {
            const user = await UserSchema.findOne({ email_user: email_user })
                if (!user) {
                    return ({
                        status: 1,
                        msg: `Usuário não cadastrado`
                    })
                } else {
                    const isComparePassword = await bcrypt.compare(password_user, user?.password_user)
                        if (!isComparePassword) {
                            return ({
                                status: 2,
                                msg: `Senha não confere com email de usuário`
                            })
                        } else {
                            const payload = {email_user}
                            const token = jwt.sign(payload, mysecret, {
                                expiresIn: '24h'
                            })
                            return ({
                                status: 3,
                                auth: true,
                                token: token,
                                id: user?._id
                            })
                        }
                }
        }   catch (error) {
            console.log(`Erro no servidor ${error}`)
        }
    }
}

export { LoginServices }