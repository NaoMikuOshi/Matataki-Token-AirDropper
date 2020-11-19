import express from "express";
import indexController from "./controllers/index";

const port = process.env.EXPRESS_PORT

const server = express();

server.use(indexController);
  
server.listen(port, () => {
  console.log("Server listening on port:", port);
});
