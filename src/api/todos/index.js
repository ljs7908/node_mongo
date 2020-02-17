const Router = require("koa-router");

const todos = new Router();
const todossCtrl = require("./todos.controller");

todos.get("/", todossCtrl.list);

todos.post("/", todossCtrl.create);

todos.delete("/", todossCtrl.delete);

todos.put("/", todossCtrl.replace);

todos.patch("/", todossCtrl.update);

module.exports = todos;
