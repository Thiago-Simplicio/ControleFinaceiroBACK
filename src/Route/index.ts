import express, { Router } from "express";

import { LoginController } from "../Controllers/Login";
import { UserController } from '../Controllers/Users'
import { MetasController } from "../Controllers/MetasController";
import { CardsController } from "../Controllers/CardsController";
import { DeposController } from "../Controllers/DeposController";
import { GastosController } from "../Controllers/GastosController";
import { CardsInfosController } from "../Controllers/CardsInfosController";

const userController = new UserController();
const loginController = new LoginController();
const metasController = new MetasController();
const cardsController = new CardsController();
const deposController = new DeposController();
const gastosController = new GastosController();
const cardsInfosController = new CardsInfosController();

class Routes {
    public route: Router;

    public constructor () {
        this.route = Router();

        this.Users();
        this.Login();
        this.Metas();
        this.Cards();
        this.Depos();
        this.Gasto();
        this.Infos();
    }

    private Users () {
        this.route.post("/user/create", userController.create);
        this.route.get("/users", userController.all);
        this.route.delete("/user/delete/:idUser", userController.delete);
        this.route.get("/user/:idUser", userController.get);
        this.route.put("/user/update/:idUser", userController.update);
    }

    private Login () {
        this.route.post('/login', loginController.Login);
    }

    private Metas () {
        this.route.get('/metas/user', metasController.get);
        this.route.post('/metas/create', metasController.create);
        this.route.put('/metas/edit', metasController.edit);
        this.route.delete(`/metas/delete/:idMeta`, metasController.delete);
    }

    private Cards () {
        this.route.post(`/card/create`, cardsController.create);
        this.route.get(`/card/user`, cardsController.get);
        this.route.delete(`/card/delete`, cardsController.delete);
        this.route.put(`/card/update`, cardsController.update);
        this.route.get(`/card/read`, cardsController.read);
    }

    private Depos () {
        this.route.get(`/user/get/depos`, deposController.get);
        this.route.post(`/user/create/depos`, deposController.create);
        this.route.delete(`/delete/depos`, deposController.delete);
        this.route.put(`/update/depos`, deposController.update);
        this.route.get(`/get/depos`, deposController.read);
        this.route.get(`/user/get/depos/filter`, deposController.filter);
    }

    private Gasto () {
        this.route.get(`/user/get/gastos`, gastosController.get);
        this.route.post(`/user/create/gastos`, gastosController.create);
        this.route.delete(`/delete/gastos`, gastosController.delete);
        this.route.put(`/update/gastos`, gastosController.update);
        this.route.get(`/get/gastos`, gastosController.read);
        this.route.get(`/user/get/gastos/filter`, gastosController.filter);
    }

    private Infos () {
        this.route.get(`/get/infos/card`, cardsInfosController.getInfos);
    }
}

export default new Routes().route