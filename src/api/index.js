const Router = require("koa-router");

const api = new Router();
const todos = require("./todos");

api.use("/todos", todos.routes());

module.exports = api;
