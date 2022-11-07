import * as Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import axios from "axios";
import { createVoucher } from "./db";

const server: Server = Hapi.server({
  port: 3000,
  host: "localhost",
});

const start = async () => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};
start();

server.route({
  method: "GET",
  path: "/",
  handler: function (request, h) {
    return "day la trang home";
  },
});

server.route({
  method: "GET",
  path: "/user",
  handler: function (request, h) {
    
    createVoucher();
    return "day la trang user";
  },
});

server.route({
  method: "POST",
  path: "/user/event/{id}",
  handler: function (request, h) {
    console.log("yeu cau tao event moi");
    return "day la trang tao event";
  },
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
