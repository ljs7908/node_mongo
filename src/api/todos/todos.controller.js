const Todo = require("models/todo");
const Joi = require("joi");
const {
  Types: { ObjectId }
} = require("mongoose");

exports.list = async ctx => {
  let todos;

  try {
    todos = await Todo.find()
      .sort({ _id: 1 })
      .limit(5)
      .exec();
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = todos;
};

exports.get = async ctx => {
  const { id } = ctx.params;

  let todo;

  try {
    todo = await Todo.findById(id).exec();
  } catch (e) {
    if (e.name === "CastError") {
      ctx.status = 400;
      return;
    }
    return ctx.throw(500, e);
  }
  if (!todo) {
    ctx.status = 404;
    ctx.body = { message: "todo not found" };
    return;
  }

  ctx.body = todo;
};

exports.create = async ctx => {
  const { id, text, done } = ctx.request.body;

  const todo = new Todo({
    id,
    text,
    done
  });

  try {
    await todo.save();
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = todo;
};

exports.delete = async ctx => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    await Todo.findByIdAndRemove(id).exec();
  } catch (e) {
    if (e.name === "CastError") {
      ctx.status = 400;
      return;
    }
  }

  ctx.status = 204;
};

exports.update = async ctx => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  let todo;

  try {
    todo = await Todo.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    });
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = todo;
};
