const Todo = require("models/todo");

exports.list = ctx => {
  ctx.body = "listed";
};

exports.create = async ctx => {
  console.log(ctx.request.body);
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

exports.delete = ctx => {
  ctx.body = "deleted";
};

exports.replace = ctx => {
  ctx.body = "replaced";
};

exports.update = ctx => {
  ctx.body = "updated";
};
