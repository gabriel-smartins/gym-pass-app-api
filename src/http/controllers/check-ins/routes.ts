import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createCheckIns } from "./create-check-in.controller";
import { validate } from "./validate-check-in.controller";
import { history } from "./fetch-check-ins-history.controller";
import { metrics } from "./get-check-ins-metrics.controller";
import { verifyRole } from "@/http/middlewares/verify-user-role";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-ins", createCheckIns);
  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyRole("ADMIN")] },
    validate
  );
}
