var db = require('./db');

var getConnection = function(callback) {
    db.getConnection(function(err, connection) {
        if (err)
            throw err;
        callback(connection);
    });
};

var todoList= {
  getTasks(callback) {
    db.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('select * from todos;', callback);
      connection.release();
    });
  },

  deleteTask(id, callback) {
    db.getConnection(function(err, connection){
      if (err) throw err;
      connection.query('DELETE FROM todos WHERE id=?', [id], callback);
      connection.release();
    });
  },

  getTask(id, callback) {
    db.getConnection(function(err, connection){
      if (err) throw err;
      connection.query('SELECT * from todos WHERE id=?', [id], callback);
      connection.release();
    });
  },
  updateTask(id, text, completed, callback) {
    db.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('UPDATE todos SET text=?, completed=? WHERE id=?', [text, completed, id], callback);
      connection.release();
    });
  },
  addTask(text, completed, callback) {
    db.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('INSERT INTO todos (text, completed) VALUES (?, ?)', [text, completed], callback);
      connection.release();
    });
  }
}

module.exports = todoList;