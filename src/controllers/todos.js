const db = require('../db');

const {
  db: {
    COLLECTION_NAME,
  },
} = require('../config');

module.exports = {
  async addTodo(req, res) {
    try {
      const {
        todo,
      } = req.body;
      if (todo && todo.trim()) {
        const addedTodo = await db.getDB().collection(COLLECTION_NAME).insertOneAsync({
          todo: todo.toString(),
        });
        res.status(200).send({
          err: false,
          message: 'Successfully added a new todo',
          data: addedTodo.ops[0],
        });
        return;
      }
      res.status(403).send({
        err: true,
        message: 'Unable to add a new Todo.',
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        err: true,
        message: 'Internal server error',
      });
    }
  },

  async getTodos(req, res) {
    try {
      const todos = [];
      await db.getDB().collection(COLLECTION_NAME).findAsync({}).then((cursor) => {
        cursor.eachAsync(async (err, doc) => {
          try {
            const returnDoc = await new Promise((resolve) => resolve(doc));
            if (returnDoc) {
              todos.push(returnDoc);
            } else {
              res.status(200).send({
                err: false,
                data: todos,
                message: 'Successfully fetched todos',
              });
            }
            return returnDoc;
          } catch (error) {
            console.error(error);
            return null;
          }
        });
      });
      // return res.status(403).send({
      //   err: true,
      //   message: 'Unable to fetch todos',
      // });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        err: true,
        message: 'Internal server error',
      });
    }
  },

  async updateTodo(req, res) {
    try {
      const {
        id,
      } = req.params;
      const {
        todo,
      } = req.body;
      if (todo && todo.trim()) {
        const isUpdated = await db.getDB().collection(COLLECTION_NAME).findOneAndUpdateAsync({
          _id: db.getPrimaryKey(id),
        }, {
          $set: {
            todo: todo.toString(),
          },
        }, {
          returnOriginal: false,
        });
        res.status(200).send({
          err: false,
          message: 'Successfully updated the todo',
          data: isUpdated.value,
        });
        return;
      }
      res.status(403).send({
        err: false,
        message: 'Unable to update the todo',
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        err: true,
        message: 'Internal server error',
      });
    }
  },

  async deleteTodo(req, res) {
    try {
      const {
        id,
      } = req.params;
      if (id) {
        const isTodoDeleted = await db.getDB().collection(COLLECTION_NAME).findOneAndDeleteAsync({
          _id: db.getPrimaryKey(id),
        });
        res.status(200).send({
          err: false,
          message: 'Successfully deleted the todo',
          data: isTodoDeleted.value,
        });
        return;
      }
      res.status(403).send({
        err: true,
        message: 'Unable to delete the Todo.',
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        err: true,
        message: 'Internal server error',
      });
    }
  },
};
