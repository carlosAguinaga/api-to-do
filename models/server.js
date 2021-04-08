const { dbConnection } = require("../database/config");
const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      tasks: "/api/tasks",
    };

    // Conenctar base de datos
    this.connetDB();

    // Middelwares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async connetDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.users, require("../routes/users"));
    this.app.use(this.paths.tasks, require("../routes/tasks"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`run server on port ${this.port}`)
    );
  }
}

module.exports = Server;
