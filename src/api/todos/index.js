const Router = require("koa-router");

const todos = new Router();
const todossCtrl = require("./todos.controller");

todos.get("/", todossCtrl.list);

todos.get("/:id", todossCtrl.get);

todos.post("/", todossCtrl.create);

todos.delete("/:id", todossCtrl.delete);

todos.patch("/:id", todossCtrl.update);

module.exports = todos;
