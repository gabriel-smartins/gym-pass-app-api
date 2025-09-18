import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { search } from "./search-gyms.controller";
import { nearbyGyms } from "./fetch-nearby-gyms.controller";
import { createGyms } from "./create-gyms.controller";
import { verifyRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearbyGyms);

  app.post("/gyms", { onRequest: [verifyRole("ADMIN")] }, createGyms);
}
