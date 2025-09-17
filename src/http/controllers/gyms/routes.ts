import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { search } from "./search-gyms.controller";
import { nearbyGyms } from "./fetch-nearby-gyms.controller";
import { createGyms } from "./create-gyms.controller";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearbyGyms);

  app.post("/gyms", createGyms);
}
