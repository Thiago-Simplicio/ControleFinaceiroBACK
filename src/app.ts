import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose';
import route from './Route'

class App {
    public express: express.Application;

    public constructor () {
        this.express = express()

        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares () {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private database () {
        mongoose.connect("mongodb://localhost:27017/Finances", {
            useNewUrlParser: true
        }).then(() => {
            console.log(`Servidor conectado ao MongoDB`)
        }).catch((error) => {
            console.log(`Erro ao se conectar com MongoDB ${error}`)
        })
    }

    private routes () {
        this.express.use(route)
    }
}

export default new App().express