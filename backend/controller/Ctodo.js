const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 - 완료 */
exports.readAll = async (req, res) => {
  try {
    const todosAll = await Todo.findAll();
    res.status(200).send(todosAll);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      isSuccess: false,
      message: "서버 오류가 발생했습니다.",
    });
  }
};

/* Todo 한 개 불러오기 - 완료 */
exports.readOne = async (req, res) => {
  try {
    const target = req.params.id;
    const todo = await Todo.findOne({
      where: { id: target },
    });
    if (todo) {
      res.status(200).send(todo);
    } else {
      res.status(200).send({ message: "Todo not found" });
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      isSuccess: false,
      message: "서버 오류가 발생했습니다.",
    });
  }
};

/* 새로운 Todo 생성 - 완료 */
exports.create = async (req, res) => {
  try {
    const newTitle = req.body.title || "";
    const newDone = req.body.done || false;

    if (newTitle === "") {
      res.status(200).send({ message: "Internal Server Error" });
    } else {
      const result = await Todo.create({
        title: newTitle,
        done: newDone,
      });
      res.status(200).send({ result });
    }
  } catch (err) {
    console.log("err", err);
    res
      .status(500)
      .send({ isSuccess: false, message: "서버 오류가 발생했습니다." });
  }
};

/* 기존 Todo 수정 - 완료 */
exports.update = async (req, res) => {
  try {
    const target = req.params.id;
    const newTitle = req.body.title || "";
    const newDone = req.body.done || "";
    if (newTitle != "" && newDone != "") {
      const [result] = await Todo.update(
        {
          title: newTitle,
          done: newDone,
        },
        {
          where: {
            id: target,
          },
        }
      );

      const final = await Todo.findOne({ where: { id: target } });
      if (Boolean(result)) {
        res.send(final);
      } else {
        res.send({ message: "Todo not found" });
      }
    } else if (newTitle != "") {
      const [result] = await Todo.update(
        {
          title: newTitle,
        },
        {
          where: {
            id: target,
          },
        }
      );
      if (Boolean(result)) {
        const final = await Todo.findOne({ where: { id: target } });
        res.send(final);
      } else {
        res.send({ message: "Todo not found" });
      }
    } else if (newDone != "") {
      const [result] = await Todo.update(
        {
          done: newDone,
        },
        {
          where: {
            id: target,
          },
        }
      );
      if (Boolean(result)) {
        const final = await Todo.findOne({ where: { id: target } });
        res.send(final);
      } else {
        res.send({ message: "Todo not found" });
      }
    } else {
      res.send({ message: "수정된 내용이 없습니다." });
    }
  } catch (err) {
    console.log("err", err);
    res
      .status(500)
      .send({ isSuccess: false, message: "서버 오류가 발생했습니다." });
  }
};

/* 기존 Todo 삭제 - 완료 */
exports.delete = async (req, res) => {
  try {
    const target = req.params.id;
    const result = await Todo.destroy({
      where: { id: target },
    });
    if (Boolean(result)) {
      res
        .status(200)
        .send({ message: "Todo deleted successfully", deletedId: target });
    } else {
      res.status(200).send({ message: "Todo do not found" });
    }
  } catch (err) {
    console.log("err", err);
    res
      .status(500)
      .send({ isSuccess: false, message: "서버 오류가 발생했습니다." });
  }
};
